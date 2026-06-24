document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between list and x
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
    }

    // Transparent Header Scroll Logic
    const transparentHeader = document.querySelector('.transparent-header');
    if (transparentHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                transparentHeader.classList.add('scrolled');
            } else {
                transparentHeader.classList.remove('scrolled');
            }
        });
    }
});
