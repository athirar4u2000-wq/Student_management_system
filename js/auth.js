/**
 * Authentication Logic for EduStream
 */
const Auth = (() => {
    const SESSION_KEY = 'eduStreamSession';

    const login = (username, password) => {
        const users = DataStore.getUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
            return true;
        }
        return false;
    };

    const register = (userData) => {
        const success = DataStore.addUser(userData);
        if (success && userData.role === 'Student') {
            DataStore.addStudent({
                regNo: userData.regNo,
                name: userData.name,
                dept: 'General',
                year: '1st Year'
            });
        }
        return success;
    };

    const logout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = 'index.html';
    };

    const getCurrentUser = () => {
        const session = sessionStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    };

    const isLoggedIn = () => {
        return sessionStorage.getItem(SESSION_KEY) !== null;
    };

    const checkAuth = (roleRequired) => {
        const user = getCurrentUser();
        if (!user) {
            window.location.href = 'index.html';
            return;
        }
        if (roleRequired && user.role !== roleRequired) {
            window.location.href = user.role === 'Admin' ? 'dashboard.html' : 'student-dashboard.html';
        }
    };

    return {
        login, register, logout, getCurrentUser, isLoggedIn, checkAuth
    };
})();
