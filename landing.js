// Theme switching functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme based on user preference or stored value
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('light-theme', savedTheme === 'light');
} else {
    document.body.classList.toggle('light-theme', !prefersDarkScheme.matches);
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
});

// Page transition handling
document.addEventListener('DOMContentLoaded', () => {
    // Fix for browsers that might not show initial animation
    requestAnimationFrame(() => {
        document.body.style.opacity = '0';
        requestAnimationFrame(() => {
            document.body.style.opacity = '';
        });
    });

    // Handle navigation transitions
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only handle internal links
            const href = link.getAttribute('href');
            if (href.startsWith('http') || href.startsWith('//')) return;

            e.preventDefault();
            document.body.classList.add('page-exiting');

            setTimeout(() => {
                window.location.href = href;
            }, 400); // Match CSS animation duration
        });
    });
});

// Optimize animation performance for intersection observer
const optimizedObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add will-change before adding visible class
            entry.target.style.willChange = 'transform, opacity';
            
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                entry.target.classList.add('visible');
                
                // Remove will-change after animation
                setTimeout(() => {
                    entry.target.style.willChange = 'auto';
                }, 1000); // After animation completes
            });
            
            observer.unobserve(entry.target);
        }
    });
}, optimizedObserverOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-up').forEach(element => {
    observer.observe(element);
});

// Optimize staggered animations
const applyStaggeredAnimation = (elements, baseDelay = 0.08) => {
    elements.forEach((element, index) => {
        element.style.transitionDelay = `${index * baseDelay}s`;
        // Add will-change temporarily
        element.style.willChange = 'transform';
        
        // Remove will-change after animation
        setTimeout(() => {
            element.style.willChange = 'auto';
        }, (index * baseDelay * 1000) + 1000);
    });
};

applyStaggeredAnimation(document.querySelectorAll('.feature-card'));
applyStaggeredAnimation(document.querySelectorAll('.step'));

// Mobile sidebar menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (mobileMenuToggle && sidebar && overlay) {
        // Open sidebar - add event listener with stopPropagation
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            sidebar.classList.add('open');
            overlay.classList.add('visible');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
        });

        // Close sidebar when clicking the close button
        if (sidebarClose) {
            sidebarClose.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event from bubbling up
                sidebar.classList.remove('open');
                overlay.classList.remove('visible');
                document.body.style.overflow = '';
            });
        }

        // Close sidebar when clicking the overlay
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('visible');
            document.body.style.overflow = '';
        });

        // Add click listener to sidebar to prevent clicks from closing it
        sidebar.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent clicks from bubbling to document
        });

        // Add escape key press for closing
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                overlay.classList.remove('visible');
                document.body.style.overflow = '';
            }
        });

        // Close sidebar when screen resizes to larger size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                overlay.classList.remove('visible');
                document.body.style.overflow = '';
            }
        });
    }
}); 