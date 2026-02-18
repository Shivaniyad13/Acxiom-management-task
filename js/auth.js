// Authentication Module
// Handles login, logout, and role verification

const AUTH = {
    // Check if user is logged in
    isLoggedIn: function() {
        return localStorage.getItem('user') !== null;
    },

    // Get current user
    getCurrentUser: function() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Get user role
    getUserRole: function() {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    },

    // Login function
    login: function(username, password) {
        // Mock authentication - replace with actual backend call
        if (username && password) {
            const user = {
                username: username,
                role: this.determineRole(username), // Mock role determination
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        }
        return false;
    },

    // Mock role determination
    determineRole: function(username) {
        // This should be replaced with actual role determination from backend
        if (username.includes('admin')) return 'admin';
        if (username.includes('librarian')) return 'librarian';
        return 'member';
    },

    // Logout function
    logout: function() {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    },

    // Check if user has required role
    hasRole: function(requiredRole) {
        const userRole = this.getUserRole();
        return userRole === requiredRole;
    },

    // Restrict access based on role
    checkAccess: function() {
        if (!this.isLoggedIn()) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }
};

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (AUTH.login(username, password)) {
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            AUTH.logout();
        });
    }

    // Check access on protected pages
    if (window.location.pathname !== '/index.html') {
        AUTH.checkAccess();
    }
});
