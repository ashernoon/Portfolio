// Main JavaScript File

document.addEventListener('DOMContentLoaded', () => {

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });

    // Header Shadow on Scroll
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });

});
