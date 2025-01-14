document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', role);
            
            // Redirect based on role
            switch(role) {
                case 'admin':
                    window.location.href = 'admin-dashboard.html';
                    break;
                case 'manager':
                    window.location.href = 'manager-dashboard.html';
                    break;
                case 'employee':
                    window.location.href = 'employee-dashboard.html';
                    break;
                default:
                    window.location.href = 'dashboard.html';
            }
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        showError('Login failed: ' + error.message);
    }
}
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('.register-form').insertBefore(errorDiv, document.querySelector('.register-button'));
    setTimeout(() => errorDiv.remove(), 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.querySelector('.register-form').insertBefore(successDiv, document.querySelector('.register-button'));
    setTimeout(() => successDiv.remove(), 5000);
}

function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    }
}

function handleLogin(username, password) {
    // Your existing login logic
    if (username === 'admin' && password === 'admin123') {
        // Set admin status
        if (document.getElementById('rememberMe').checked) {
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('adminAuthenticated', 'true');
        } else {
            sessionStorage.setItem('isAdmin', 'true');
            sessionStorage.setItem('adminAuthenticated', 'true');
        }
        
        window.location.href = 'dashboard.html';
    }
}

// Add logout handling
function handleLogout() {
    // Clear admin status and authentication
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('adminAuthenticated');
    
    window.location.href = 'login.html';
}

function setActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const menuItems = document.querySelectorAll('.sidebar-nav li');
    
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    checkAdminStatus();
    setActiveMenuItem();
});
