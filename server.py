import http.server
import socketserver
import json
import sqlite3
import hashlib
import secrets
import os
import urllib.parse
from datetime import datetime, timedelta

PORT = 8000
DB_FILE = "bca_portal.db"

# In-memory session cache: token -> {admin_id, username, email, expires_at}
SESSIONS = {}

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # 1. Create Admins Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            reset_token TEXT,
            reset_token_expiry TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 2. Check & Seed Default Admin Account
    cursor.execute('SELECT * FROM admins WHERE username = ? OR email = ?', ('admin', 'admin@college.com'))
    admin = cursor.fetchone()
    
    if not admin:
        # Seed default admin: admin / admin@college.com / Admin@123
        salt = secrets.token_bytes(16)
        password_hash = hash_password("Admin@123", salt)
        cursor.execute(
            'INSERT INTO admins (username, email, password_hash) VALUES (?, ?, ?)',
            ('admin', 'admin@college.com', password_hash)
        )
        conn.commit()
        print(" [DATABASE SEEDED] Default Admin Created -> Username: admin | Email: admin@college.com | Password: Admin@123")
    else:
        print(" [DATABASE READY] Admin table verified.")
        
    conn.close()

def hash_password(password, salt=None):
    if salt is None:
        salt = secrets.token_bytes(16)
    elif isinstance(salt, str):
        salt = bytes.fromhex(salt)
    
    derived = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return f"{salt.hex()}${derived.hex()}"

def verify_password(stored_password_hash, provided_password):
    try:
        salt_hex, hash_hex = stored_password_hash.split('$')
        computed = hash_password(provided_password, salt_hex)
        return secrets.compare_digest(stored_password_hash, computed)
    except Exception:
        return False

def get_session_from_cookie(cookie_header):
    if not cookie_header:
        return None
    cookies = urllib.parse.parse_qs(cookie_header.replace('; ', '&'))
    token_list = cookies.get('admin_session')
    if not token_list:
        return None
    token = token_list[0]
    session = SESSIONS.get(token)
    if not session:
        return None
    if datetime.now() > session['expires_at']:
        del SESSIONS[token]
        return None
    return token, session

class BCAAuthHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Security Protections (XSS, Clickjacking, MIME Sniffing)
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        super().end_headers()

    def send_json(self, status_code, data, cookie_to_set=None):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        if cookie_to_set:
            self.send_header('Set-Cookie', cookie_to_set)
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        # Protected API: Get current logged-in admin details
        if path == '/api/admin/me':
            cookie_header = self.headers.get('Cookie')
            session_data = get_session_from_cookie(cookie_header)
            if session_data:
                token, session = session_data
                return self.send_json(200, {
                    'authenticated': True,
                    'admin': {
                        'id': session['admin_id'],
                        'username': session['username'],
                        'email': session['email']
                    }
                })
            else:
                return self.send_json(401, {'authenticated': False, 'message': 'Unauthenticated or session expired'})

        # Static File Serving
        return super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8')
        
        try:
            body = json.loads(post_data) if post_data else {}
        except Exception:
            body = {}

        # 1. Admin Login Endpoint
        if path == '/api/admin/login':
            username_or_email = body.get('username', '').strip()
            password = body.get('password', '')

            if not username_or_email or not password:
                return self.send_json(400, {'success': False, 'message': 'Username/Email and Password are required.'})

            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute('SELECT id, username, email, password_hash FROM admins WHERE username = ? OR email = ?', (username_or_email, username_or_email))
            admin = cursor.fetchone()
            conn.close()

            if admin and verify_password(admin[3], password):
                token = secrets.token_hex(32)
                expires_at = datetime.now() + timedelta(hours=12)
                SESSIONS[token] = {
                    'admin_id': admin[0],
                    'username': admin[1],
                    'email': admin[2],
                    'expires_at': expires_at
                }
                cookie = f"admin_session={token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=43200"
                return self.send_json(200, {
                    'success': True,
                    'message': 'Admin authenticated successfully!',
                    'admin': {'id': admin[0], 'username': admin[1], 'email': admin[2]}
                }, cookie_to_set=cookie)
            else:
                return self.send_json(401, {'success': False, 'message': 'Invalid username/email or password.'})

        # 2. Admin Logout Endpoint
        elif path == '/api/admin/logout':
            cookie_header = self.headers.get('Cookie')
            session_data = get_session_from_cookie(cookie_header)
            if session_data:
                token, _ = session_data
                if token in SESSIONS:
                    del SESSIONS[token]
            cookie = "admin_session=; HttpOnly; Path=/; Max-Age=0"
            return self.send_json(200, {'success': True, 'message': 'Logged out successfully.'}, cookie_to_set=cookie)

        # 3. Admin Profile Update Endpoint
        elif path == '/api/admin/profile/update':
            cookie_header = self.headers.get('Cookie')
            session_data = get_session_from_cookie(cookie_header)
            if not session_data:
                return self.send_json(401, {'success': False, 'message': 'Unauthorized. Session expired.'})
            
            token, session = session_data
            current_password = body.get('current_password', '')
            new_username = body.get('new_username', '').strip()
            new_email = body.get('new_email', '').strip()
            new_password = body.get('new_password', '')

            if not current_password:
                return self.send_json(400, {'success': False, 'message': 'Current password is required to save profile changes.'})

            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute('SELECT id, password_hash FROM admins WHERE id = ?', (session['admin_id'],))
            admin = cursor.fetchone()

            if not admin or not verify_password(admin[1], current_password):
                conn.close()
                return self.send_json(400, {'success': False, 'message': 'Current password verification failed!'})

            updates = []
            params = []
            
            if new_username:
                updates.append("username = ?")
                params.append(new_username)
                session['username'] = new_username
            if new_email:
                updates.append("email = ?")
                params.append(new_email)
                session['email'] = new_email
            if new_password:
                new_hash = hash_password(new_password)
                updates.append("password_hash = ?")
                params.append(new_hash)

            if not updates:
                conn.close()
                return self.send_json(400, {'success': False, 'message': 'No changes specified.'})

            params.append(session['admin_id'])
            query = f"UPDATE admins SET {', '.join(updates)} WHERE id = ?"
            
            try:
                cursor.execute(query, tuple(params))
                conn.commit()
                conn.close()
                return self.send_json(200, {
                    'success': True,
                    'message': 'Admin profile and credentials updated successfully!',
                    'admin': {'username': session['username'], 'email': session['email']}
                })
            except sqlite3.IntegrityError:
                conn.close()
                return self.send_json(400, {'success': False, 'message': 'Username or Email already exists.'})

        # 4. Admin Forgot Password Request
        elif path == '/api/admin/forgot-password':
            email = body.get('email', '').strip()
            if not email:
                return self.send_json(400, {'success': False, 'message': 'Email address is required.'})

            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute('SELECT id, username FROM admins WHERE email = ?', (email,))
            admin = cursor.fetchone()

            if admin:
                token = secrets.token_hex(16)
                expiry = (datetime.now() + timedelta(hours=1)).isoformat()
                cursor.execute('UPDATE admins SET reset_token = ?, reset_token_expiry = ? WHERE id = ?', (token, expiry, admin[0]))
                conn.commit()
                conn.close()
                return self.send_json(200, {
                    'success': True,
                    'message': f'Password reset token generated successfully.',
                    'reset_token': token
                })
            else:
                conn.close()
                return self.send_json(404, {'success': False, 'message': 'No admin account found with this email.'})

        # 5. Admin Reset Password Endpoint
        elif path == '/api/admin/reset-password':
            reset_token = body.get('reset_token', '').strip()
            new_password = body.get('new_password', '')

            if not reset_token or not new_password:
                return self.send_json(400, {'success': False, 'message': 'Reset token and new password are required.'})

            conn = sqlite3.connect(DB_FILE)
            cursor = conn.cursor()
            cursor.execute('SELECT id, reset_token_expiry FROM admins WHERE reset_token = ?', (reset_token,))
            admin = cursor.fetchone()

            if admin:
                expiry_dt = datetime.fromisoformat(admin[1])
                if datetime.now() > expiry_dt:
                    conn.close()
                    return self.send_json(400, {'success': False, 'message': 'Reset token has expired.'})
                
                new_hash = hash_password(new_password)
                cursor.execute('UPDATE admins SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?', (new_hash, admin[0]))
                conn.commit()
                conn.close()
                return self.send_json(200, {'success': True, 'message': 'Password has been reset successfully! You can now log in.'})
            else:
                conn.close()
                return self.send_json(400, {'success': False, 'message': 'Invalid reset token.'})

        return self.send_json(404, {'success': False, 'message': 'API route not found.'})

if __name__ == "__main__":
    init_db()
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), BCAAuthHandler) as httpd:
        print(f" [SERVER STARTED] BCA Leave System running at http://127.0.0.1:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n [SERVER STOPPED] Shutting down cleanly.")
