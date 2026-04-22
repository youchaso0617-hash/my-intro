document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Apply reveal class to elements
    const elementsToReveal = [
        '.profile-frame',
        '#hero h1',
        '#hero .subtitle',
        '#hero .hero-stats',
        '.section-header',
        '.about-grid .card',
        '.sketch-visual',
        '.hobby-item',
        '#vision .card'
    ];

    elementsToReveal.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            el.classList.add('reveal');
            observer.observe(el);
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
