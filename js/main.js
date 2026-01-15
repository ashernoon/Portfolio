/* Premium Portfolio Interaction Engine */

document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');

    // 1. Unified Header Scroll Logic
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Initial check

    // 2. Mobile Menu Toggle Logic
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        navToggle.classList.toggle('active');
        // Toggle icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.replace('bi-list', 'bi-x-lg');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        } else {
            icon.classList.replace('bi-x-lg', 'bi-list');
            document.body.style.overflow = ''; // Restore scroll
        }
    };

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMenu);
    }

    // 3. Active Link Highlighting on Scroll
    const updateActiveLink = () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    };
    window.addEventListener('scroll', updateActiveLink);

    // 4. Optimized Scroll Reveal Interaction
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

    // 5. Premium Smooth Scrolling & Auto-Close Mobile Menu
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }

                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
