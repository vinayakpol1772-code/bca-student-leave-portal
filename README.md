# BCA Student Leave Management System

A full-stack, responsive web application for managing student leave applications, faculty counselor verifications, and administrative record-keeping for college departments.

---

## 📌 Overview

The **Student Leave Management System** simplifies the leave application process for students and faculty. Students can apply for leave directly with all required academic details and optional supporting medical certificates without needing prior registration. Faculty counselors and administrators can review, approve, reject, and maintain leave records with analytics and audit trails.

---

## ✨ Features

- **Direct Student Leave Application**:
  - No prior account registration required for students to apply.
  - Captures student details: Full Name, PRN, Roll No, Class Year (FY/SY/TY), Division, Semester, Contact & Parent Contact.
  - Leave types supported: Casual Leave, Medical Leave, Emergency Leave, Duty / Event Leave.
  - Optional supporting document/medical certificate upload (supports PDF, JPG, PNG up to 50 MB).
  - Automatic calculation of leave duration based on selected dates.
  - Generates unique Leave Application Tracking IDs (`LV-BCA-2026-XXX`).

- **Faculty Counselor Portal**:
  - Review pending student leave applications organized by year and division.
  - View full leave details, including student reason, parent phone number, and attached medical certificates.
  - Action buttons to Approve or Reject with counselor remarks.

- **Admin Control Panel**:
  - Secure session-based authentication backed by SQLite database.
  - Add and manage Faculty Counselors with assigned counselor classes.
  - Real-time leave status metrics and visual analytics via Chart.js.
  - Security settings to update Admin username, email, and password (requires current password verification).
  - Forgot Password and reset token recovery flow.
  - JSON backup and data export.

- **Security & Best Practices**:
  - Salted PBKDF2 HMAC SHA-256 password hashing (100,000 iterations).
  - 100% Parameterized SQLite queries to prevent SQL injection.
  - HTTP-Only, SameSite session cookies.
  - Security HTTP headers (`X-Content-Type-Options`, `X-XSS-Protection`, `X-Frame-Options`).

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Modern Glassmorphism & Responsive Grid), Vanilla JavaScript (ES6+), FontAwesome icons, Chart.js
- **Backend**: Python 3 (Standard Library: `http.server`, `socketserver`, `sqlite3`, `hashlib`, `secrets`)
- **Database**: SQLite3 (`bca_portal.db`)

---

## 📁 Project Structure

```text
student-leave-management/
├── assets/                  # Logos and institution graphic assets
├── css/
│   └── styles.css           # Styling, layout, and dark/light mode themes
├── js/
│   └── app.js               # Frontend application logic and UI state
├── .gitignore               # Git ignore rules
├── bca_portal.db            # SQLite database file
├── index.html               # Main single-page application interface
├── README.md                # Project documentation
├── server.py                # Python backend server and REST API engine
└── start_server.bat         # Windows one-click server starter script
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.8 or higher installed on your system.

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/student-leave-management.git
   cd student-leave-management
   ```

2. **Start the backend server**:
   - **On Windows**: Double-click `start_server.bat` OR run:
     ```bash
     python server.py
     ```
   - **On Linux/macOS**:
     ```bash
     python3 server.py
     ```

3. **Access the portal**:
   Open your browser and navigate to:
   ```
   http://127.0.0.1:8000
   ```

---

## 🔐 Default Admin Credentials

On first run, the database automatically seeds a default administrator account:

| Field | Value |
|---|---|
| **Username** | `admin` |
| **Email** | `admin@college.com` |
| **Password** | `Admin@123` |

> **Note**: You can change the username, email, and password after logging in by clicking **Admin Profile & Settings** in the Admin Control Panel.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
