document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // User Profile Dropdown
    const userProfile = document.querySelector('.user-profile');
    const profileDropdown = document.querySelector('.profile-dropdown');

    userProfile?.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        profileDropdown?.classList.remove('active');
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your logout logic here
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'login.html';
    });

    // Check user role and update UI accordingly
    function checkUserRole() {
        const role = localStorage.getItem('role');
        const adminElements = document.querySelectorAll('.admin-only');
        
        adminElements.forEach(element => {
            if (role !== 'admin') {
                element.style.display = 'none';
            }
        });

        // Update user info
        const userRole = document.querySelector('.user-role');
        if (userRole) {
            userRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);
        }
    }

    // Initialize role-based content
    checkUserRole();

    // Add click handlers for action buttons
    const restockBtns = document.querySelectorAll('.restock-btn');
    restockBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your restock logic here
            alert('Restock functionality to be implemented');
        });
    });

    // Example of updating stats dynamically
    function updateStats() {
        // Add your logic to fetch and update statistics
        // This is just a placeholder
        const stats = {
            products: 2459,
            orders: 1287,
            revenue: 45820,
            lowStock: 12
        };

        // Update the UI
        document.querySelector('.stat-number').textContent = stats.products;
    }

    // Call updateStats periodically
    setInterval(updateStats, 60000); // Update every minute
});
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const body = document.body;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    body.appendChild(overlay);

    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // User Profile Dropdown
    const userProfile = document.querySelector('.user-profile');
    const profileDropdown = document.querySelector('.profile-dropdown');

    userProfile?.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userProfile.contains(e.target)) {
            profileDropdown?.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});
// Add this to your dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    const userProfile = document.querySelector('.user-profile');
    const profileDropdown = document.querySelector('.profile-dropdown');

    // Toggle dropdown on profile click
    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        userProfile.classList.toggle('active');
        profileDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userProfile.contains(e.target)) {
            userProfile.classList.remove('active');
            profileDropdown.classList.remove('active');
        }
    });

    // Handle logout
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Add your logout logic here
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = 'login.html';
    });
});
// Add this to your script section
document.addEventListener('DOMContentLoaded', function() {
    checkAdminStatus();
});

function checkAdminStatus() {
    // Check if user is admin (you can modify this based on your authentication system)
    const isAdmin = localStorage.getItem('isAdmin') || sessionStorage.getItem('isAdmin');
    
    if (isAdmin === 'true') {
        document.querySelector('.sidebar-nav').classList.add('is-admin');
    }
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
