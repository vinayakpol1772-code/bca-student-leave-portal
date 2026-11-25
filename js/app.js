/* ==========================================================================
   PIMPRI CHINCHWAD EDUCATION TRUST'S
   PIMPRI CHINCHWAD COLLEGE OF ENGINEERING & RESEARCH (PCCOER)
   Department of Computer Applications (BCA) - Student Leave Management System
   JavaScript Core Application Engine (js/app.js)
   ========================================================================== */

// Pre-seeded BCA Department Data
const DEFAULT_BCA_USERS = [
    // Students
    {
        id: "STU-BCA-101",
        role: "student",
        name: "Rahul Sharma",
        rollNo: "305",
        prn: "1032210452",
        department: "BCA",
        year: "TY BCA",
        division: "A",
        semester: "Sem 6",
        email: "rahul.bca@pccoer.org",
        mobile: "+91 81081 81099",
        parentContact: "9822012345",
        address: "Sector 26, Nigdi Pradhikaran, Ravet, Pune",
        gender: "Male",
        bloodGroup: "B+",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
        id: "STU-BCA-102",
        role: "student",
        name: "Ananya Deshmukh",
        rollNo: "212",
        prn: "1032220114",
        department: "BCA",
        year: "SY BCA",
        division: "B",
        semester: "Sem 4",
        email: "ananya.bca@pccoer.org",
        mobile: "+91 99234 13003",
        parentContact: "9822098765",
        address: "Flat 204, Royal Palms, Akurdi, Pune",
        gender: "Female",
        bloodGroup: "O+",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
    },
    {
        id: "STU-BCA-103",
        role: "student",
        name: "Aditya Verma",
        rollNo: "115",
        prn: "1032230089",
        department: "BCA",
        year: "FY BCA",
        division: "C",
        semester: "Sem 2",
        email: "aditya.bca@pccoer.org",
        mobile: "+91 98765 12345",
        parentContact: "9822055555",
        address: "Pimple Saudagar, Pune",
        gender: "Male",
        bloodGroup: "A+",
        photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
    },
    // Faculty Counselor
    {
        id: "FAC-BCA-201",
        role: "faculty",
        name: "Prof. A. V. Kulkarni",
        department: "BCA",
        email: "kulkarni.bca@pccoer.org",
        mobile: "+91 94220 11223"
    },
    // HOD
    {
        id: "HOD-BCA-301",
        role: "hod",
        name: "Dr. S. R. Patil",
        department: "BCA",
        email: "hod.bca@pccoer.org",
        mobile: "+91 98230 99887"
    },
    // Admin
    {
        id: "ADM-BCA-001",
        role: "admin",
        name: "PCCOER BCA Admin",
        department: "BCA",
        email: "pccoer.ravet@gmail.com",
        mobile: "+91 81081 81099"
    }
];

const DEFAULT_BCA_LEAVES = [
    {
        id: "LV-BCA-2026-001",
        studentId: "STU-BCA-101",
        studentName: "Rahul Sharma",
        rollNo: "305",
        prn: "1032210452",
        department: "BCA",
        year: "TY BCA",
        division: "A",
        semester: "Sem 6",
        leaveType: "Medical Leave",
        fromDate: "2026-08-10",
        toDate: "2026-08-14",
        days: 5,
        reason: "Severe viral fever and doctor recommended bed rest.",
        parentContact: "9822012345",
        status: "Approved",
        appliedOn: "2026-08-01 10:15 AM",
        medicalCertificate: "demo_medical_doc_sample.pdf",
        facultyRemark: "Recommended. Medical certificate verified.",
        facultyApprovedOn: "2026-08-02 02:30 PM",
        hodRemark: "Final Approval Granted. Take care.",
        hodApprovedOn: "2026-08-03 11:00 AM"
    },
    {
        id: "LV-BCA-2026-002",
        studentId: "STU-BCA-101",
        studentName: "Rahul Sharma",
        rollNo: "305",
        prn: "1032210452",
        department: "BCA",
        year: "TY BCA",
        division: "A",
        semester: "Sem 6",
        leaveType: "Sports Leave",
        fromDate: "2026-08-20",
        toDate: "2026-08-22",
        days: 3,
        reason: "Representing PCCOER at Inter-College Hackathon / Coding Contest.",
        parentContact: "9822012345",
        status: "Pending HOD",
        appliedOn: "2026-08-04 04:20 PM",
        medicalCertificate: null,
        facultyRemark: "Recommended. Good academic record.",
        facultyApprovedOn: "2026-08-05 09:45 AM",
        hodRemark: null,
        hodApprovedOn: null
    },
    {
        id: "LV-BCA-2026-003",
        studentId: "STU-BCA-102",
        studentName: "Ananya Deshmukh",
        rollNo: "212",
        prn: "1032220114",
        department: "BCA",
        year: "SY BCA",
        division: "B",
        semester: "Sem 4",
        leaveType: "Casual Leave",
        fromDate: "2026-08-15",
        toDate: "2026-08-16",
        days: 2,
        reason: "Attending family function.",
        parentContact: "9822098765",
        status: "Pending Faculty",
        appliedOn: "2026-08-06 09:30 AM",
        medicalCertificate: null,
        facultyRemark: null,
        hodRemark: null
    }
];

const DEFAULT_BCA_NOTIFICATIONS = [
    {
        id: 1,
        userRole: "student",
        studentId: "STU-BCA-101",
        title: "Leave Approved by HOD",
        message: "Your Medical Leave (LV-BCA-2026-001) was approved by Dr. S. R. Patil.",
        time: "10 mins ago",
        read: false
    }
];

// LocalStorage Manager
class Store {
    static get(key, fallback) {
        const item = localStorage.getItem(`PCCOER_BCA_${key}`);
        return item ? JSON.parse(item) : fallback;
    }
    static set(key, value) {
        localStorage.setItem(`PCCOER_BCA_${key}`, JSON.stringify(value));
    }
}

// Global Application State
let appData = {
    users: Store.get("users", DEFAULT_BCA_USERS),
    leaves: Store.get("leaves", DEFAULT_BCA_LEAVES),
    notifications: Store.get("notifications", DEFAULT_BCA_NOTIFICATIONS),
    currentUser: Store.get("currentUser", DEFAULT_BCA_USERS[0]),
    currentRole: Store.get("currentRole", "landing")
};

function saveState() {
    Store.set("users", appData.users);
    Store.set("leaves", appData.leaves);
    Store.set("notifications", appData.notifications);
    Store.set("currentUser", appData.currentUser);
    Store.set("currentRole", appData.currentRole);
}

// Chart Instances
let studentMonthlyChartInst = null;
let studentTypeChartInst = null;
let hodYearChartInst = null;
let hodReasonChartInst = null;

// File Upload Storage
let uploadedFileBase64 = null;
let uploadedFileNameStr = null;

/* ==========================================================================
   ROLE SWITCHER & VIEW ENGINE
   ========================================================================== */
function switchRole(role) {
    appData.currentRole = role;
    
    if (role === 'student') {
        appData.currentUser = appData.users.find(u => u.role === 'student') || DEFAULT_BCA_USERS[0];
    } else if (role === 'faculty') {
        appData.currentUser = appData.users.find(u => u.role === 'faculty') || DEFAULT_BCA_USERS[3];
    } else if (role === 'hod') {
        appData.currentUser = appData.users.find(u => u.role === 'hod') || DEFAULT_BCA_USERS[4];
    } else if (role === 'admin') {
        appData.currentUser = appData.users.find(u => u.role === 'admin') || DEFAULT_BCA_USERS[5];
    } else {
        appData.currentUser = null;
    }
    
    saveState();
    updateUIViews();
}

function updateUIViews() {
    const role = appData.currentRole;
    
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('#roleSwitcherPills .role-pill').forEach(pill => pill.classList.remove('active'));
    
    const activePill = Array.from(document.querySelectorAll('#roleSwitcherPills .role-pill')).find(p => p.getAttribute('onclick')?.includes(role));
    if (activePill) activePill.classList.add('active');

    const guestNav = document.getElementById('guestNavAction');
    const userNav = document.getElementById('userNavAction');
    const publicLinks = document.getElementById('publicNavLinks');

    if (role === 'admin') {
        fetch('/api/admin/me')
            .then(res => res.json())
            .then(data => {
                if (!data.authenticated) {
                    appData.currentRole = 'landing';
                    appData.currentUser = null;
                    saveState();
                    updateUIViews();
                    openLoginModal('admin');
                    showToast("Please log in to access the Admin Control Panel.", "warning");
                }
            })
            .catch(err => console.error("Admin session check failed", err));
    }

    if (role === 'landing' || !appData.currentUser) {
        document.getElementById('view-landing').classList.add('active');
        guestNav.style.display = 'block';
        userNav.style.display = 'none';
        publicLinks.style.display = 'flex';
    } else {
        publicLinks.style.display = 'none';
        guestNav.style.display = 'none';
        userNav.style.display = 'block';

        document.getElementById('navUserName').innerText = appData.currentUser.name;
        document.getElementById('navUserRole').innerText = appData.currentUser.role.toUpperCase();
        document.getElementById('navUserAvatar').innerText = getInitials(appData.currentUser.name);

        const viewSec = document.getElementById(`view-${role}`);
        if (viewSec) viewSec.classList.add('active');

        if (role === 'student') renderStudentDashboard();
        if (role === 'faculty') renderFacultyDashboard();
        if (role === 'hod') renderHODDashboard();
        if (role === 'admin') renderAdminDashboard();
    }

    updateNotificationBadge();
}

function getInitials(name) {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

/* ==========================================================================
   STUDENT DASHBOARD LOGIC
   ========================================================================== */
function renderStudentDashboard() {
    const student = appData.currentUser;
    if (!student) return;

    document.getElementById('studentNameDisplay').innerText = student.name;
    document.getElementById('studentDeptYear').innerText = `${student.year} (${student.semester}) &bull; Div ${student.division}`;
    document.getElementById('studentRollDisplay').innerText = student.rollNo;
    document.getElementById('studentPrnDisplay').innerText = student.prn;

    const studentLeaves = appData.leaves.filter(l => l.studentId === student.id || l.prn === student.prn);

    document.getElementById('stTotalLeaves').innerText = studentLeaves.length;
    document.getElementById('stApprovedLeaves').innerText = studentLeaves.filter(l => l.status === 'Approved').length;
    document.getElementById('stPendingLeaves').innerText = studentLeaves.filter(l => l.status.startsWith('Pending')).length;
    document.getElementById('stMedicalLeaves').innerText = studentLeaves.filter(l => l.leaveType === 'Medical Leave').length;

    renderStudentLeaveTable(studentLeaves);
    renderStudentCharts(studentLeaves);
}

function renderStudentLeaveTable(leavesList) {
    const tbody = document.getElementById('studentLeaveTableBody');
    if (!tbody) return;

    if (leavesList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No BCA leave applications submitted yet. Click "Apply for Leave".</td></tr>`;
        return;
    }

    tbody.innerHTML = leavesList.map(l => {
        let statusBadge = '';
        if (l.status === 'Approved') statusBadge = `<span class="badge badge-approved"><i class="fa-solid fa-circle-check"></i> Approved</span>`;
        else if (l.status.startsWith('Pending')) statusBadge = `<span class="badge badge-pending"><i class="fa-solid fa-clock"></i> ${l.status}</span>`;
        else if (l.status === 'Rejected') statusBadge = `<span class="badge badge-rejected"><i class="fa-solid fa-circle-xmark"></i> Rejected</span>`;
        else statusBadge = `<span class="badge badge-returned">${l.status}</span>`;

        let actionBtns = ``;
        if (l.status === 'Approved') {
            actionBtns += `
                <button class="btn btn-primary btn-sm" onclick="generateApprovalLetter('${l.id}')" title="Download Letter">
                    <i class="fa-solid fa-download"></i> Letter
                </button>
            `;
        }

        if (l.status.startsWith('Pending')) {
            actionBtns += `
                <button class="btn btn-danger btn-sm" onclick="cancelLeaveRequest('${l.id}')" title="Withdraw">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
        }

        return `
            <tr>
                <td><strong>${l.id}</strong><br><small style="color: var(--text-muted);">${l.appliedOn}</small></td>
                <td>${l.leaveType}</td>
                <td>${l.fromDate} to ${l.toDate}</td>
                <td><strong>${l.days} Days</strong></td>
                <td style="max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${l.reason}</td>
                <td>${statusBadge}</td>
                <td><div class="flex gap-1">${actionBtns}</div></td>
            </tr>
        `;
    }).join('');
}

function filterStudentTable() {
    const student = appData.currentUser;
    let leaves = appData.leaves.filter(l => l.studentId === student.id || l.prn === student.prn);
    
    const search = document.getElementById('studentSearchInput').value.toLowerCase();
    const status = document.getElementById('studentStatusFilter').value;

    if (status !== 'ALL') leaves = leaves.filter(l => l.status.includes(status));
    if (search) leaves = leaves.filter(l => l.id.toLowerCase().includes(search) || l.reason.toLowerCase().includes(search));

    renderStudentLeaveTable(leaves);
}

function renderStudentCharts(leaves) {
    const ctxMonthly = document.getElementById('studentMonthlyChart')?.getContext('2d');
    if (ctxMonthly) {
        if (studentMonthlyChartInst) studentMonthlyChartInst.destroy();
        studentMonthlyChartInst = new Chart(ctxMonthly, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Days Taken',
                    data: [0, 2, 0, 1, 0, 0, 3, leaves.reduce((acc, l) => acc + l.days, 0), 0, 0, 0, 0],
                    borderColor: '#004b93',
                    backgroundColor: 'rgba(0, 75, 147, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }

    const ctxType = document.getElementById('studentTypeChart')?.getContext('2d');
    if (ctxType) {
        if (studentTypeChartInst) studentTypeChartInst.destroy();
        studentTypeChartInst = new Chart(ctxType, {
            type: 'doughnut',
            data: {
                labels: ['Casual', 'Medical', 'Sports', 'Emergency'],
                datasets: [{
                    data: [
                        leaves.filter(l => l.leaveType === 'Casual Leave').length || 1,
                        leaves.filter(l => l.leaveType === 'Medical Leave').length || 1,
                        leaves.filter(l => l.leaveType === 'Sports Leave').length || 1,
                        leaves.filter(l => l.leaveType === 'Emergency Leave').length || 0
                    ],
                    backgroundColor: ['#0284c7', '#10b981', '#f59e0b', '#ef4444']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

/* ==========================================================================
   FACULTY DASHBOARD LOGIC
   ========================================== */
function renderFacultyDashboard() {
    const faculty = appData.currentUser;
    if (!faculty) return;

    let bcaLeaves = [...appData.leaves];

    const pending = bcaLeaves.filter(l => l.status === 'Pending Faculty').length;
    const approved = bcaLeaves.filter(l => l.status === 'Pending HOD' || l.status === 'Approved').length;
    const rejected = bcaLeaves.filter(l => l.status === 'Rejected').length;
    const medical = bcaLeaves.filter(l => l.leaveType === 'Medical Leave').length;

    document.getElementById('fcPendingReview').innerText = pending;
    document.getElementById('fcApprovedCount').innerText = approved;
    document.getElementById('fcRejectedCount').innerText = rejected;
    document.getElementById('fcMedicalCount').innerText = medical;

    const year = document.getElementById('fcYearFilter').value;
    const div = document.getElementById('fcDivFilter').value;
    const search = document.getElementById('fcSearchInput').value.toLowerCase();

    if (year !== 'ALL') bcaLeaves = bcaLeaves.filter(l => l.year === year);
    if (div !== 'ALL') bcaLeaves = bcaLeaves.filter(l => l.division === div);
    if (search) bcaLeaves = bcaLeaves.filter(l => l.studentName.toLowerCase().includes(search) || l.rollNo.includes(search) || l.prn.includes(search));

    const tbody = document.getElementById('facultyTableBody');
    if (!tbody) return;

    if (bcaLeaves.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 2rem;">No leave applications found matching filters.</td></tr>`;
        return;
    }

    tbody.innerHTML = bcaLeaves.map(l => {
        let medBtn = l.medicalCertificate ? 
            `<button class="btn btn-secondary btn-sm" onclick="inspectMedicalDoc('${l.id}')"><i class="fa-solid fa-paperclip"></i> Inspect Certificate</button>` : 
            `<span style="color: var(--text-muted); font-size: 0.8rem;">None</span>`;

        let actionCol = '';
        if (l.status === 'Pending Faculty') {
            actionCol = `
                <button class="btn btn-success btn-sm" onclick="openReviewModal('${l.id}', 'faculty_approve')"><i class="fa-solid fa-check"></i> Approve</button>
                <button class="btn btn-danger btn-sm" onclick="openReviewModal('${l.id}', 'faculty_reject')"><i class="fa-solid fa-xmark"></i> Reject</button>
            `;
        } else {
            actionCol = `<span style="font-size: 0.8rem; color: var(--text-muted);">${l.status}</span>`;
        }

        return `
            <tr>
                <td><strong>${l.studentName}</strong><br><small style="color: var(--text-muted);">PRN: ${l.prn} | Roll: ${l.rollNo}</small></td>
                <td>${l.year} - Div ${l.division}<br><small style="color: var(--text-muted);">${l.semester}</small></td>
                <td><strong>${l.leaveType}</strong></td>
                <td>${l.fromDate} to ${l.toDate}<br><small style="color: var(--primary); font-weight: 700;">${l.days} Days</small></td>
                <td style="max-width: 220px;"><div style="font-size: 0.85rem; font-weight: 600; color: var(--text-main); line-height: 1.3;">${l.reason}</div><small style="color: var(--text-muted);"><i class="fa-solid fa-phone" style="font-size: 0.7rem;"></i> Parent: ${l.parentContact || 'N/A'}</small></td>
                <td>${medBtn}</td>
                <td><span class="badge ${l.status === 'Approved' ? 'badge-approved' : l.status.startsWith('Pending') ? 'badge-pending' : 'badge-rejected'}">${l.status}</span></td>
                <td><div class="flex gap-1 flex-wrap">${actionCol}</div></td>
            </tr>
        `;
    }).join('');
}

/* ==========================================================================
   HOD DASHBOARD LOGIC
   ========================================== */
function renderHODDashboard() {
    let bcaLeaves = [...appData.leaves];

    const pending = bcaLeaves.filter(l => l.status === 'Pending HOD').length;
    const approved = bcaLeaves.filter(l => l.status === 'Approved').length;
    const rejected = bcaLeaves.filter(l => l.status === 'Rejected').length;

    document.getElementById('hdPendingCount').innerText = pending;
    document.getElementById('hdApprovedCount').innerText = approved;
    document.getElementById('hdRejectedCount').innerText = rejected;

    const search = document.getElementById('hodSearchInput').value.toLowerCase();
    if (search) bcaLeaves = bcaLeaves.filter(l => l.studentName.toLowerCase().includes(search) || l.rollNo.includes(search));

    const tbody = document.getElementById('hodTableBody');
    if (!tbody) return;

    if (bcaLeaves.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No pending final approvals.</td></tr>`;
        return;
    }

    tbody.innerHTML = bcaLeaves.map(l => {
        let medBtn = l.medicalCertificate ? 
            `<button class="btn btn-secondary btn-sm" onclick="inspectMedicalDoc('${l.id}')"><i class="fa-solid fa-file-pdf"></i> Certificate</button>` : 
            `<span style="color: var(--text-muted); font-size: 0.8rem;">N/A</span>`;

        let decisionCol = '';
        if (l.status === 'Pending HOD') {
            decisionCol = `
                <button class="btn btn-primary btn-sm" onclick="openReviewModal('${l.id}', 'hod_approve')"><i class="fa-solid fa-signature"></i> Final Approve</button>
                <button class="btn btn-danger btn-sm" onclick="openReviewModal('${l.id}', 'hod_reject')"><i class="fa-solid fa-ban"></i> Reject</button>
            `;
        } else {
            decisionCol = `<span class="badge ${l.status === 'Approved' ? 'badge-approved' : 'badge-rejected'}">${l.status}</span>`;
        }

        return `
            <tr>
                <td><strong>${l.studentName}</strong><br><small style="color: var(--text-muted);">${l.year} (${l.prn})</small></td>
                <td>${l.leaveType}</td>
                <td>${l.fromDate} to ${l.toDate} (<strong>${l.days}d</strong>)</td>
                <td style="max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${l.reason}</td>
                <td><small style="color: var(--success); font-weight: 600;">${l.facultyRemark || 'Approved by Counselor'}</small></td>
                <td>${medBtn}</td>
                <td><div class="flex gap-1">${decisionCol}</div></td>
            </tr>
        `;
    }).join('');

    renderHODCharts(bcaLeaves);
}

function renderHODCharts(leaves) {
    const ctxYear = document.getElementById('hodYearChart')?.getContext('2d');
    if (ctxYear) {
        if (hodYearChartInst) hodYearChartInst.destroy();
        hodYearChartInst = new Chart(ctxYear, {
            type: 'bar',
            data: {
                labels: ['FY BCA', 'SY BCA', 'TY BCA'],
                datasets: [{
                    label: 'Approved Leaves',
                    data: [14, 19, leaves.filter(l => l.status === 'Approved').length + 5],
                    backgroundColor: ['#004b93', '#0284c7', '#10b981']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    const ctxReason = document.getElementById('hodReasonChart')?.getContext('2d');
    if (ctxReason) {
        if (hodReasonChartInst) hodReasonChartInst.destroy();
        hodReasonChartInst = new Chart(ctxReason, {
            type: 'pie',
            data: {
                labels: ['Medical Leave', 'Sports Leave', 'Casual Leave', 'Industrial Visit'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: ['#10b981', '#f59e0b', '#0284c7', '#8b5cf6']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

/* ==========================================================================
   ADMIN DASHBOARD LOGIC
   ========================================== */
function renderAdminDashboard() {
    const studentsCount = appData.users.filter(u => u.role === 'student').length;
    const facultyCount = appData.users.filter(u => u.role === 'faculty').length;

    document.getElementById('adStudentCount').innerText = studentsCount;
    document.getElementById('adFacultyCount').innerText = facultyCount;

    let userList = [...appData.users];
    const roleF = document.getElementById('adminRoleFilter').value;
    const search = document.getElementById('adminSearchInput').value.toLowerCase();

    if (roleF !== 'ALL') userList = userList.filter(u => u.role === roleF);
    if (search) userList = userList.filter(u => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search));

    const tbody = document.getElementById('adminUserTableBody');
    if (!tbody) return;

    tbody.innerHTML = userList.map(u => `
        <tr>
            <td><strong>${u.id || u.prn}</strong></td>
            <td><strong>${u.name}</strong></td>
            <td><span class="badge badge-approved">${u.role.toUpperCase()}</span></td>
            <td>${u.year || 'BCA Dept'}</td>
            <td>${u.email}<br><small style="color: var(--text-muted);">${u.mobile || ''}</small></td>
            <td><span class="badge badge-approved">Active</span></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteUserAdmin('${u.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

/* ==========================================================================
   LEAVE FORM & MANDATORY MEDICAL UPLOAD VALIDATION
   ========================================== */
function openApplyLeaveModal() {
    const nextIdNum = appData.leaves.length + 1;
    document.getElementById('appLeaveID').value = `LV-BCA-2026-00${nextIdNum}`;
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appFromDate').value = today;
    document.getElementById('appToDate').value = today;
    calculateLeaveDays();

    uploadedFileBase64 = null;
    uploadedFileNameStr = null;
    const medFileName = document.getElementById('medicalFileName');
    if (medFileName) medFileName.innerText = '';

    openModal('applyLeaveModal');
}

function toggleMedicalUploadField() {
    const type = document.getElementById('appLeaveType').value;
    const medGroup = document.getElementById('medicalUploadGroup');
    if (medGroup) {
        medGroup.style.display = 'block';
    }
}

function calculateLeaveDays() {
    const fromStr = document.getElementById('appFromDate').value;
    const toStr = document.getElementById('appToDate').value;

    if (!fromStr || !toStr) return;

    const from = new Date(fromStr);
    const to = new Date(toStr);

    if (to < from) {
        document.getElementById('appDayCount').innerText = "Invalid Date Range";
        return;
    }

    const diffDays = Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24)) + 1;
    document.getElementById('appDayCount').innerText = `${diffDays} Day(s)`;
}

function handleFileUpload(input) {
    const file = input.files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
        showToast("File size exceeds 50 MB limit!", "danger");
        input.value = "";
        return;
    }

    uploadedFileNameStr = file.name;
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    document.getElementById('medicalFileName').innerText = `Attached: ${file.name} (${sizeInMB} MB)`;

    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedFileBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
}

function handleLeaveFormSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    const studentName = document.getElementById('appStudentName')?.value?.trim() || "BCA Student";
    const prn = document.getElementById('appPRN')?.value?.trim() || `PRN-${Date.now().toString().slice(-6)}`;
    const rollNo = document.getElementById('appRollNo')?.value?.trim() || "101";
    const year = document.getElementById('appYear')?.value || "FY BCA";
    const division = document.getElementById('appDiv')?.value || "Div A";
    const semester = document.getElementById('appSem')?.value || "Sem 1";
    const studentEmail = document.getElementById('appStudentEmail')?.value?.trim() || "student.bca@pccoer.org";
    const studentMobile = document.getElementById('appStudentMobile')?.value?.trim() || "9823413003";
    const parentContact = document.getElementById('appParentContact')?.value?.trim() || "9923413003";
    const leaveType = document.getElementById('appLeaveType')?.value || "Casual Leave";
    let fromDate = document.getElementById('appFromDate')?.value;
    let toDate = document.getElementById('appToDate')?.value;
    const reason = document.getElementById('appReason')?.value?.trim() || "Leave Application";
    const leaveId = document.getElementById('appLeaveID')?.value || `LV-BCA-2026-${Date.now().toString().slice(-3)}`;

    const todayStr = new Date().toISOString().split('T')[0];
    if (!fromDate) fromDate = todayStr;
    if (!toDate) toDate = fromDate;

    const from = new Date(fromDate);
    const to = new Date(toDate);
    const days = Math.max(1, Math.ceil(Math.abs(to - from) / (1000 * 60 * 60 * 24)) + 1);

    const newLeave = {
        id: leaveId,
        studentId: `STU-${prn}`,
        studentName: studentName,
        rollNo: rollNo,
        prn: prn,
        department: "BCA",
        year: year,
        division: division,
        semester: semester,
        studentEmail: studentEmail,
        studentMobile: studentMobile,
        leaveType: leaveType,
        fromDate: fromDate,
        toDate: toDate,
        days: days,
        reason: reason,
        parentContact: parentContact,
        status: "Pending Faculty",
        appliedOn: new Date().toLocaleString(),
        medicalCertificate: uploadedFileBase64 || null,
        facultyRemark: null,
        hodRemark: null
    };

    appData.leaves.unshift(newLeave);

    appData.notifications.unshift({
        id: Date.now(),
        userRole: "faculty",
        title: "New BCA Leave Application",
        message: `${studentName} (${year}) submitted a ${leaveType} (${leaveId}).`,
        time: "Just now",
        read: false
    });

    saveState();
    
    // Clear form & reset upload state
    document.getElementById('leaveAppForm').reset();
    uploadedFileBase64 = null;
    uploadedFileNameStr = null;
    const medFileName = document.getElementById('medicalFileName');
    if (medFileName) medFileName.innerText = 'Click or Drag to Upload Certificate File (Optional)';

    closeModal('applyLeaveModal');
    updateUIViews();
    
    alert(`🎉 BCA Leave Application Submitted Successfully!\n\nApplication ID: ${leaveId}\nStudent Name: ${studentName}\nPRN: ${prn}\nLeave Type: ${leaveType}\n\nYour Faculty Counselor has been notified for approval.`);
    showToast(`Leave Application ${leaveId} submitted successfully!`, "success");
}

function openReviewModal(leaveId, actionType) {
    const leave = appData.leaves.find(l => l.id === leaveId);
    if (!leave) return;

    document.getElementById('reviewLeaveId').value = leaveId;
    document.getElementById('reviewActionType').value = actionType;

    const isApprove = actionType.includes('approve');
    document.getElementById('reviewModalTitle').innerText = isApprove ? "Approve BCA Leave Request" : "Reject BCA Leave Request";
    document.getElementById('reviewSubmitBtn').className = isApprove ? "btn btn-success" : "btn btn-danger";

    document.getElementById('reviewDetailsSummary').innerHTML = `
        <strong>${leave.studentName}</strong> (${leave.year} Div ${leave.division})<br>
        <strong>Type:</strong> ${leave.leaveType} | <strong>Duration:</strong> ${leave.fromDate} to ${leave.toDate} (${leave.days} Days)<br>
        <strong>Reason:</strong> ${leave.reason}
    `;

    openModal('reviewModal');
}

function handleReviewSubmit(e) {
    e.preventDefault();
    const leaveId = document.getElementById('reviewLeaveId').value;
    const actionType = document.getElementById('reviewActionType').value;
    const remarks = document.getElementById('reviewRemarks').value;

    const leave = appData.leaves.find(l => l.id === leaveId);
    if (!leave) return;

    if (actionType === 'faculty_approve') {
        leave.status = 'Approved';
        leave.facultyRemark = remarks;

        appData.notifications.unshift({
            id: Date.now(),
            userRole: "student",
            studentId: leave.studentId,
            title: "Leave Approved by Faculty Counselor!",
            message: `Your ${leave.leaveType} (${leave.id}) has been officially approved.`,
            time: "Just now",
            read: false
        });
    } else if (actionType === 'faculty_reject') {
        leave.status = 'Rejected';
        leave.facultyRemark = remarks;
    } else if (actionType === 'hod_approve') {
        leave.status = 'Approved';
        leave.hodRemark = remarks;

        appData.notifications.unshift({
            id: Date.now(),
            userRole: "student",
            studentId: leave.studentId,
            title: "Leave Approved by HOD!",
            message: `Your ${leave.leaveType} (${leave.id}) has received final approval from BCA HOD.`,
            time: "Just now",
            read: false
        });
    } else if (actionType === 'hod_reject') {
        leave.status = 'Rejected';
        leave.hodRemark = remarks;
    }

    saveState();
    closeModal('reviewModal');
    showToast("Review decision saved!", "success");

    if (appData.currentRole === 'faculty') renderFacultyDashboard();
    if (appData.currentRole === 'hod') renderHODDashboard();
}

function cancelLeaveRequest(leaveId) {
    if (!confirm("Are you sure you want to withdraw this BCA leave application?")) return;
    appData.leaves = appData.leaves.filter(l => l.id !== leaveId);
    saveState();
    showToast("Leave application withdrawn.", "warning");
    renderStudentDashboard();
}

/* ==========================================================================
   OFFICIAL APPROVAL LETTER & INSPECTION
   ========================================== */
function inspectMedicalDoc(leaveId) {
    const leave = appData.leaves.find(l => l.id === leaveId);
    const content = document.getElementById('medicalViewerContent');

    if (!leave || !leave.medicalCertificate) {
        content.innerHTML = `<div style="padding: 2rem; color: var(--text-muted);">No medical certificate attached.</div>`;
    } else if (leave.medicalCertificate.startsWith('data:image')) {
        content.innerHTML = `<img src="${leave.medicalCertificate}" alt="Medical Certificate" style="max-width: 100%; max-height: 65vh; border-radius: 8px;">`;
    } else {
        content.innerHTML = `
            <iframe src="${leave.medicalCertificate}" style="width: 100%; height: 60vh; border: none;"></iframe>
            <div style="margin-top: 1rem;"><a href="${leave.medicalCertificate}" download="Medical_Certificate.pdf" class="btn btn-primary btn-sm"><i class="fa-solid fa-download"></i> Download Certificate File</a></div>
        `;
    }

    openModal('medicalViewerModal');
}

function generateApprovalLetter(leaveId) {
    const leave = appData.leaves.find(l => l.id === leaveId);
    if (!leave) return;

    const letterHtml = `
        <div style="text-align: center; border-bottom: 2px solid #004b93; padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <h3 style="font-size: 0.85rem; color: #475569; margin-bottom: 0.2rem;">PIMPRI CHINCHWAD EDUCATION TRUST'S</h3>
            <h2 style="font-size: 1.4rem; color: #004b93; font-weight: 800;">PIMPRI CHINCHWAD COLLEGE OF ENGINEERING & RESEARCH</h2>
            <p style="font-size: 0.8rem; color: #64748b;">Sector 26, Pradhikaran, Ravet, Pune 412101 &bull; Affiliated to SPPU Pune &bull; DTE CODE: 6822</p>
            <div style="background: #004b93; color: white; display: inline-block; padding: 0.25rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 800; margin-top: 0.75rem;">DEPARTMENT OF COMPUTER APPLICATIONS (BCA)</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #004b93; margin-top: 1rem;">OFFICIAL LEAVE APPROVAL CERTIFICATE</div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 1.25rem; font-size: 0.85rem;">
            <div><strong>Approval Ref:</strong> PCCOER/BCA/LEAVE/${leave.id}</div>
            <div><strong>Date Issued:</strong> ${new Date().toLocaleDateString()}</div>
        </div>

        <p style="font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.6;">
            To,<br>
            <strong>${leave.studentName}</strong><br>
            PRN: ${leave.prn} | Roll No: ${leave.rollNo}<br>
            Year & Division: <strong>${leave.year} (${leave.division})</strong>
        </p>

        <p style="font-size: 0.9rem; margin-bottom: 1.25rem; line-height: 1.6;">
            This is to certify that your leave application for <strong>${leave.leaveType}</strong> spanning <strong>${leave.days} Day(s)</strong> from <strong>${leave.fromDate}</strong> to <strong>${leave.toDate}</strong> has been officially verified by the BCA Class Counselor and granted <strong>FINAL APPROVAL</strong> by the Head of Department.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.85rem;" border="1" cellpadding="8">
            <tr style="background: #f8fafc;">
                <th>Reason Stated</th>
                <td>${leave.reason}</td>
            </tr>
            <tr>
                <th>Counselor Remark</th>
                <td>${leave.facultyRemark || 'Approved and Verified'}</td>
            </tr>
            <tr style="background: #f8fafc;">
                <th>HOD Sign-off</th>
                <td>${leave.hodRemark || 'Granted Official Sanction'}</td>
            </tr>
        </table>

        <div style="display: flex; justify-content: space-between; margin-top: 3rem; text-align: center; font-size: 0.85rem;">
            <div>
                <br>_______________________<br>
                <strong>BCA Class Counselor</strong><br>
                Prof. A. V. Kulkarni
            </div>
            <div>
                <br>_______________________<br>
                <strong>Head of Department (BCA)</strong><br>
                Dr. S. R. Patil
            </div>
        </div>
    `;

    document.getElementById('approvalLetterContent').innerHTML = letterHtml;
    openModal('approvalLetterModal');
}

/* ==========================================================================
   REPORT EXPORTS & UTILITIES
   ========================================== */
function exportHODReport(format) {
    if (format === 'excel') {
        let csvContent = "data:text/csv;charset=utf-8,Leave ID,Student Name,PRN,Roll No,Year,Leave Type,From Date,To Date,Days,Status\n";
        appData.leaves.forEach(l => {
            csvContent += `"${l.id}","${l.studentName}","${l.prn}","${l.rollNo}","${l.year}","${l.leaveType}","${l.fromDate}","${l.toDate}","${l.days}","${l.status}"\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `PCCOER_BCA_Leave_Report_2026.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("BCA Excel/CSV Report downloaded!", "success");
    } else {
        window.print();
    }
}

function exportFacultyReport() {
    exportHODReport('excel');
}

function exportFullSystemData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "PCCOER_BCA_System_Backup_2026.json");
    dlAnchorElem.click();
    showToast("Full BCA System JSON Backup exported!", "success");
}

/* ==========================================================================
   NOTIFICATION CENTER & FAQ ACCORDION
   ========================================== */
function updateNotificationBadge() {
    const notifDot = document.getElementById('notifDot');
    const unreadCount = appData.notifications.filter(n => !n.read).length;
    if (notifDot) notifDot.style.display = unreadCount > 0 ? 'block' : 'none';

    const notifList = document.getElementById('notifList');
    if (!notifList) return;

    if (appData.notifications.length === 0) {
        notifList.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">No notifications.</div>`;
        return;
    }

    notifList.innerHTML = appData.notifications.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}">
            <div style="font-size: 0.82rem; font-weight: 700;">${n.title}</div>
            <div style="font-size: 0.78rem; color: var(--text-main); margin: 0.2rem 0;">${n.message}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">${n.time}</div>
        </div>
    `).join('');
}

function toggleNotificationsDrawer() {
    const drawer = document.getElementById('notifDrawer');
    drawer.classList.toggle('active');
    appData.notifications.forEach(n => n.read = true);
    saveState();
    updateNotificationBadge();
}

function clearAllNotifications() {
    appData.notifications = [];
    saveState();
    updateNotificationBadge();
    showToast("Notifications cleared", "info");
}

function toggleFaq(item) {
    item.classList.toggle('active');
}

/* ==========================================================================
   AUTH & MODAL CONTROLLERS
   ========================================== */
function openLoginModal(role = 'student') {
    switchLoginTab(role);
    openModal('loginModal');
}

function switchLoginTab(role) {
    document.getElementById('loginRole').value = role;
    document.querySelectorAll('#loginModal .role-pill').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-login-${role}`)?.classList.add('active');

    const modalTitle = document.querySelector('#loginModal .modal-header h3');
    const emailInput = document.getElementById('loginEmail');

    if (role === 'student') {
        if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-user-graduate" style="color: var(--primary);"></i> BCA Student Login`;
        emailInput.value = "rahul.bca@pccoer.org";
    } else if (role === 'faculty') {
        if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-chalkboard-user" style="color: var(--primary);"></i> BCA Faculty Counselor Login`;
        emailInput.value = "kulkarni.bca@pccoer.org";
    } else if (role === 'admin') {
        if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-user-gear" style="color: var(--primary);"></i> BCA System Admin Login`;
        emailInput.value = "admin@college.com";
    }
}

async function handleLoginFormSubmit(e) {
    e.preventDefault();
    const role = document.getElementById('loginRole').value;
    const emailVal = document.getElementById('loginEmail').value.trim();
    const passwordVal = document.getElementById('loginPassword').value;

    if (role === 'admin') {
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: emailVal, password: passwordVal })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                closeModal('loginModal');
                appData.currentRole = 'admin';
                appData.currentUser = {
                    id: data.admin.id,
                    name: data.admin.username,
                    email: data.admin.email,
                    role: 'admin'
                };
                saveState();
                showToast("Admin session authenticated!", "success");
                updateUIViews();
            } else {
                showToast(data.message || "Invalid Admin credentials!", "danger");
            }
        } catch (err) {
            showToast("Error connecting to server! Ensure server.py is running.", "danger");
        }
        return;
    }

    closeModal('loginModal');
    switchRole(role);
    showToast(`Logged into BCA Portal as ${role.toUpperCase()}`, "success");
}

function openModal(id) { document.getElementById(id)?.classList.add('active'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('active'); }

function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    document.getElementById('themeIcon').className = newTheme === 'dark' ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
    showToast(`Switched to ${newTheme} mode`, "info");
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'danger' ? 'fa-triangle-exclamation' : 'fa-circle-info'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function openRegisterModal() {
    closeModal('loginModal');
    openModal('registerModal');
    toggleRegFields();
}

function toggleRegFields() {
    const role = document.getElementById('regRole').value;
    const studentFields = document.querySelectorAll('.reg-student-field');
    studentFields.forEach(f => {
        f.style.display = role === 'student' ? 'flex' : 'none';
    });
}

function handleRegistrationSubmit(e) {
    e.preventDefault();
    const role = document.getElementById('regRole').value;
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const prn = document.getElementById('regPrn').value;
    const mobile = document.getElementById('regMobile').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        showToast("Passwords do not match!", "danger");
        return;
    }

    if (appData.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast("Email is already registered!", "warning");
        return;
    }

    let newUser = {
        id: role === 'student' ? `STU-BCA-${Date.now().toString().slice(-4)}` : `FAC-BCA-${Date.now().toString().slice(-4)}`,
        role: role,
        name: name,
        email: email,
        prn: prn,
        mobile: mobile,
        department: "BCA"
    };

    if (role === 'student') {
        newUser.year = document.getElementById('regYear').value;
        newUser.division = document.getElementById('regDiv').value;
        newUser.semester = document.getElementById('regSem').value;
        newUser.rollNo = document.getElementById('regRoll').value || "100";
        newUser.parentContact = document.getElementById('regParentMobile').value || mobile;
    }

    appData.users.push(newUser);
    appData.currentUser = newUser;
    appData.currentRole = role;
    saveState();

    closeModal('registerModal');
    showToast(`Registration successful! Logged in as ${name}`, "success");
    updateUIViews();
}

function openAddUserModal() {
    const form = document.getElementById('adminUserForm');
    if (form) form.reset();
    openModal('addUserModal');
}

function handleAdminUserSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('admUserName').value;
    const email = document.getElementById('admUserEmail').value;
    const prn = document.getElementById('admUserPrn').value;
    const mobile = document.getElementById('admUserMobile').value;
    const assignedYear = document.getElementById('admUserYear').value;
    const designation = document.getElementById('admUserDesignation').value || "Assistant Professor";

    if (appData.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast("Email address is already registered!", "warning");
        return;
    }

    let newFaculty = {
        id: `FAC-BCA-${Date.now().toString().slice(-4)}`,
        role: "faculty",
        name: name,
        email: email,
        prn: prn,
        mobile: mobile,
        department: "BCA",
        year: assignedYear,
        designation: designation,
        status: "Active"
    };

    appData.users.push(newFaculty);
    saveState();

    closeModal('addUserModal');
    showToast(`Faculty Counselor (${name}) added successfully!`, "success");
    renderAdminDashboard();
}

async function logoutUser() {
    if (appData.currentRole === 'admin') {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
        } catch (e) {}
    }
    switchRole('landing');
    showToast("Logged out successfully.", "info");
}

function openAdminProfileModal() {
    openModal('adminProfileModal');
}

async function handleAdminProfileUpdate(e) {
    e.preventDefault();
    const current_password = document.getElementById('admProfCurrentPassword').value;
    const new_username = document.getElementById('admProfNewUsername').value.trim();
    const new_email = document.getElementById('admProfNewEmail').value.trim();
    const new_password = document.getElementById('admProfNewPassword').value;
    const confirm_password = document.getElementById('admProfConfirmPassword').value;

    if (new_password && new_password !== confirm_password) {
        showToast("New passwords do not match!", "danger");
        return;
    }

    try {
        const res = await fetch('/api/admin/profile/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ current_password, new_username, new_email, new_password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            closeModal('adminProfileModal');
            document.getElementById('adminProfileForm').reset();
            showToast(data.message, "success");
            if (data.admin) {
                appData.currentUser.name = data.admin.username;
                appData.currentUser.email = data.admin.email;
                saveState();
                updateUIViews();
            }
        } else {
            showToast(data.message || "Profile update failed!", "danger");
        }
    } catch (err) {
        showToast("Server communication error!", "danger");
    }
}

let currentForgotRole = 'admin';
let facultyResetTarget = null;

function openAdminForgotModal() {
    const currentRole = document.getElementById('loginRole')?.value || 'admin';
    currentForgotRole = currentRole;
    facultyResetTarget = null;

    const titleElem = document.getElementById('forgotModalTitle');
    const descElem = document.getElementById('forgotModalDesc');
    const emailInput = document.getElementById('admForgotEmail');

    if (currentRole === 'faculty') {
        if (titleElem) titleElem.innerText = 'Faculty Counselor Password Reset';
        if (descElem) descElem.innerText = 'Enter your registered Faculty Email Address (e.g. kulkarni.bca@pccoer.org) to reset your password.';
        if (emailInput) {
            emailInput.value = 'kulkarni.bca@pccoer.org';
            emailInput.placeholder = 'kulkarni.bca@pccoer.org';
        }
    } else {
        if (titleElem) titleElem.innerText = 'Admin Password Reset';
        if (descElem) descElem.innerText = 'Enter your registered Admin Email Address (admin@college.com) or username (admin).';
        if (emailInput) {
            emailInput.value = 'admin@college.com';
            emailInput.placeholder = 'admin@college.com or admin';
        }
    }

    closeModal('loginModal');
    document.getElementById('adminForgotStep1').style.display = 'block';
    document.getElementById('adminForgotStep2').style.display = 'none';
    openModal('adminForgotModal');
}

async function handleAdminForgotStep1(e) {
    e.preventDefault();
    const inputVal = document.getElementById('admForgotEmail').value.trim();

    // 1. Check if input belongs to a Faculty member in appData.users
    const facultyUser = appData.users.find(u => 
        (u.role === 'faculty') && 
        (u.email?.toLowerCase() === inputVal.toLowerCase() || 
         u.name?.toLowerCase() === inputVal.toLowerCase() || 
         u.prn?.toLowerCase() === inputVal.toLowerCase())
    );

    if (facultyUser) {
        facultyResetTarget = facultyUser;
        const mockToken = `FAC-${Math.floor(100000 + Math.random() * 900000)}`;
        facultyUser._tempResetToken = mockToken;
        saveState();

        document.getElementById('adminForgotStep1').style.display = 'none';
        document.getElementById('adminForgotStep2').style.display = 'block';
        document.getElementById('admForgotToken').value = mockToken;
        showToast(`Reset token issued for ${facultyUser.name}! Enter new password below.`, "success");
        return;
    }

    // 2. Otherwise handle Admin via backend server API
    try {
        const res = await fetch('/api/admin/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: inputVal })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            facultyResetTarget = null;
            document.getElementById('adminForgotStep1').style.display = 'none';
            document.getElementById('adminForgotStep2').style.display = 'block';
            if (data.reset_token) {
                document.getElementById('admForgotToken').value = data.reset_token;
            }
            showToast("Reset token issued! Enter new password below.", "info");
        } else {
            showToast(data.message || "Account lookup failed! Please check your email or username.", "danger");
        }
    } catch (err) {
        showToast("Server communication error! Make sure server.py is running.", "danger");
    }
}

async function handleAdminForgotStep2(e) {
    e.preventDefault();
    const reset_token = document.getElementById('admForgotToken').value.trim();
    const new_password = document.getElementById('admForgotNewPassword').value;

    if (!new_password || new_password.length < 4) {
        showToast("Password must be at least 4 characters long!", "warning");
        return;
    }

    // 1. Handle Faculty password reset
    if (facultyResetTarget && facultyResetTarget._tempResetToken === reset_token) {
        facultyResetTarget.password = new_password;
        delete facultyResetTarget._tempResetToken;
        saveState();

        closeModal('adminForgotModal');
        document.getElementById('adminForgotStep1').reset();
        document.getElementById('adminForgotStep2').reset();
        showToast(`Faculty password reset successfully! You can now log in.`, "success");
        openLoginModal('faculty');
        return;
    }

    // 2. Handle Admin password reset via backend API
    try {
        const res = await fetch('/api/admin/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reset_token, new_password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            closeModal('adminForgotModal');
            document.getElementById('adminForgotStep1').reset();
            document.getElementById('adminForgotStep2').reset();
            showToast(data.message, "success");
            openLoginModal('admin');
        } else {
            showToast(data.message || "Password reset failed!", "danger");
        }
    } catch (err) {
        showToast("Server communication error!", "danger");
    }
}

function deleteUserAdmin(userId) {
    if (!confirm("Are you sure you want to delete this user account?")) return;
    appData.users = appData.users.filter(u => u.id !== userId);
    saveState();
    showToast("User record removed.", "warning");
    renderAdminDashboard();
}

document.addEventListener('DOMContentLoaded', () => {
    updateUIViews();
});
