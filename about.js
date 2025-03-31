document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.classList.toggle('light-theme', savedTheme === 'light');
    }

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        root.classList.toggle('light-theme');
        const currentTheme = root.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });
}); 