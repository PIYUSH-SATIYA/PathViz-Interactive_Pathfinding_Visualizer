document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.classList.toggle('light-theme', savedTheme === 'light');
    } else {
        // Use prefers-color-scheme as a fallback
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        root.classList.toggle('light-theme', !prefersDarkScheme.matches);
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        root.classList.toggle('light-theme');
        const currentTheme = root.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });

    // Mobile sidebar menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (mobileMenuToggle && sidebar && overlay) {
        // Function to close sidebar with consistent behavior
        const closeSidebar = () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('visible');
            document.body.style.overflow = '';
            
            // Force sidebar off-screen to ensure it's hidden
            sidebar.style.left = '-280px';
            
            // Reset inline style after transition completes
            setTimeout(() => {
                sidebar.style.left = '';
            }, 350); // Slightly longer than transition time to ensure completion
        };

        // Open sidebar
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.add('open');
            overlay.classList.add('visible');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        // Close sidebar when clicking X button
        if (sidebarClose) {
            sidebarClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeSidebar();
            });
        }

        // Close sidebar when clicking overlay
        overlay.addEventListener('click', closeSidebar);

        // Prevent clicks within sidebar from closing it
        sidebar.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });

        // Close on window resize to larger size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
    }
}); 