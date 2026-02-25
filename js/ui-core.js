/**
 * Shared UI Layout for EduStream
 */
const UI = (() => {
    const renderSidebar = () => {
        const user = Auth.getCurrentUser();
        const isAdmin = user.role === 'Admin';
        const currentPath = window.location.pathname;

        const sidebarHTML = `
            <div class="sidebar">
                <div class="sidebar-header">
                    <div class="logo">
                        <i class="fas fa-graduation-cap"></i>
                        <span>Edu<span>Stream</span></span>
                    </div>
                </div>
                <div class="nav-menu">
                    <p class="nav-label">Main Menu</p>
                    <a href="${isAdmin ? 'dashboard.html' : 'student-dashboard.html'}" class="nav-link ${currentPath.includes('dashboard') ? 'active' : ''}">
                        <i class="fas fa-th-large"></i>
                        <span>Dashboard</span>
                    </a>
                    
                    ${isAdmin ? `
                        <p class="nav-label">Management</p>
                        <a href="students.html" class="nav-link ${currentPath.includes('students') ? 'active' : ''}">
                            <i class="fas fa-user-graduate"></i>
                            <span>Students</span>
                        </a>
                        <a href="courses.html" class="nav-link ${currentPath.includes('courses') ? 'active' : ''}">
                            <i class="fas fa-book"></i>
                            <span>Courses</span>
                        </a>
                        <a href="enrollment.html" class="nav-link ${currentPath.includes('enrollment') ? 'active' : ''}">
                            <i class="fas fa-user-plus"></i>
                            <span>Enrollment</span>
                        </a>
                        <a href="attendance.html" class="nav-link ${currentPath.includes('attendance') ? 'active' : ''}">
                            <i class="fas fa-calendar-check"></i>
                            <span>Attendance</span>
                        </a>
                        <a href="results.html" class="nav-link ${currentPath.includes('results') ? 'active' : ''}">
                            <i class="fas fa-poll"></i>
                            <span>Results</span>
                        </a>
                    ` : `
                        <p class="nav-label">My Area</p>
                        <a href="my-courses.html" class="nav-link ${currentPath.includes('courses') ? 'active' : ''}">
                            <i class="fas fa-book-open"></i>
                            <span>My Courses</span>
                        </a>
                        <a href="my-attendance.html" class="nav-link ${currentPath.includes('attendance') ? 'active' : ''}">
                            <i class="fas fa-clock"></i>
                            <span>My Attendance</span>
                        </a>
                        <a href="my-results.html" class="nav-link ${currentPath.includes('results') ? 'active' : ''}">
                            <i class="fas fa-award"></i>
                            <span>My Results</span>
                        </a>
                    `}
                </div>
                <div class="sidebar-footer">
                    <a href="#" onclick="Auth.logout()" class="nav-link">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        `;

        const wrapper = document.querySelector('.app-layout');
        if (wrapper) {
            wrapper.insertAdjacentHTML('afterbegin', sidebarHTML);
        }
    };

    const renderTopBar = (pageTitle) => {
        const user = Auth.getCurrentUser();
        const topBarHTML = `
            <div class="top-bar">
                <div class="page-info">
                    <h1>${pageTitle}</h1>
                </div>
                <div class="user-nav">
                    <div class="notifications">
                        <i class="fas fa-bell"></i>
                        <span class="notif-badge">3</span>
                    </div>
                    <div class="user-menu-trigger">
                        <div class="user-info text-right">
                            <p class="user-name">${user.name}</p>
                            <p style="font-size: 0.7rem; color: var(--text-muted); text-align: right;">${user.role}</p>
                        </div>
                        <div class="user-avatar">${user.name[0]}</div>
                    </div>
                </div>
            </div>
        `;

        const mainWrapper = document.querySelector('.main-wrapper');
        if (mainWrapper) {
            mainWrapper.insertAdjacentHTML('afterbegin', topBarHTML);
        }
    };

    const init = (pageTitle) => {
        renderSidebar();
        renderTopBar(pageTitle);
    };

    return { init };
})();
