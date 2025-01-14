document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    // Toggle mobile menu
    mobileMenuBtn?.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navLinks.style.transform = isMenuOpen ? 'translateX(0)' : 'translateX(100%)';
        mobileMenuBtn.innerHTML = isMenuOpen ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (isMenuOpen) {
                    navLinks.style.transform = 'translateX(100%)';
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    isMenuOpen = false;
                }

                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background on scroll
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Hide/show navbar on scroll up/down
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (elementPosition < screenPosition - 100) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Demo video modal
    const demoBtn = document.querySelector('.secondary-btn');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="video-container">
                <iframe src="about:blank" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    `;

    demoBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.appendChild(modal);
        modal.querySelector('iframe').src = 'https://www.youtube.com/embed/your-video-id';
        document.body.style.overflow = 'hidden';
        modal.style.display = 'flex';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.className === 'close-modal') {
            modal.querySelector('iframe').src = 'about:blank';
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 50; // Adjust speed here
            const duration = 2000; // Animation duration in milliseconds
            const step = duration / 50;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + suffix;
                    setTimeout(updateCounter, step);
                } else {
                    stat.textContent = target + suffix;
                }
            };

            updateCounter();
        });
    };

    // Observe stats section
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateStats();
                    hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    showError(input, 'This field is required');
                } else {
                    removeError(input);
                }

                // Email validation
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        showError(input, 'Please enter a valid email');
                    }
                }
            });

            if (isValid) {
                // Show success message
                showSuccess(form);
                
                // Optional: Submit form data
                // submitForm(form);
            }
        });
    });

    // Error/Success message handlers
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.classList.add('input-error');
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
    }

    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.classList.remove('input-error');
    }

    function showSuccess(form) {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.textContent = 'Thank you! We will get back to you soon.';
        form.appendChild(success);

        setTimeout(() => {
            success.remove();
            form.reset();
        }, 3000);
    }

    // Handle responsive navigation
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.transform = 'translateX(0)';
            isMenuOpen = false;
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Add loading animation for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
});
