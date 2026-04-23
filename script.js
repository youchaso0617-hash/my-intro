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
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    });

    // Minicar animation interval (every 2 minutes)
    const minicar = document.getElementById('minicar');
    const triggerMinicar = () => {
        minicar.classList.add('drive');
        setTimeout(() => {
            minicar.classList.remove('drive');
        }, 6000); // Remove class after animation finishes
    };

    // Trigger every 120 seconds
    setInterval(triggerMinicar, 120000);
    
    // Initial trigger after 5 seconds to show it to the user
    setTimeout(triggerMinicar, 5000);

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
