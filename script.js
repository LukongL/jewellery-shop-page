document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const closeBtn = document.querySelector('.close-btn');

    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('nav-active');
        const expanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
        hamburgerMenu.setAttribute('aria-expanded', !expanded);
    }

    // Open/Close menu on hamburger click
    hamburgerMenu.addEventListener('click', toggleMenu);

    // Close menu on close button click
    closeBtn.addEventListener('click', toggleMenu);
});

