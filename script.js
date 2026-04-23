document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal Logic ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, observerOptions);

    const elementsToReveal = [
        '.profile-frame', '#hero h1', '#hero .subtitle', '#hero .hero-stats',
        '.section-header', '.about-grid .card', '.sketch-visual', '.hobby-item', '#vision .card'
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    });

    // --- Interactive Minicar & Tire Tracks ---
    const car = document.getElementById('minicar');
    const canvas = document.getElementById('tire-tracks');
    const ctx = canvas.getContext('2d');

    let mouseX = -100, mouseY = -100;
    let carX = -100, carY = -100;
    let angle = 0;
    let lastX = -100, lastY = -100;

    // Resize canvas
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Track mouse
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animation Loop
    const animate = () => {
        // Easing for smooth following
        const dx = mouseX - carX;
        const dy = mouseY - carY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            // Update position
            carX += dx * 0.05;
            carY += dy * 0.05;

            // Update angle
            const targetAngle = Math.atan2(dy, dx);
            // Smoothly interpolate angle
            let diff = targetAngle - angle;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            angle += diff * 0.1;

            // Apply transform to car
            car.style.left = `${carX}px`;
            car.style.top = `${carY}px`;
            car.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;

            // Draw tire tracks
            if (lastX !== -100) {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                
                // Track positions based on car angle (two tracks)
                const trackOffset = 15;
                const tx1 = carX + Math.sin(angle) * trackOffset;
                const ty1 = carY - Math.cos(angle) * trackOffset;
                const lx1 = lastX + Math.sin(angle) * trackOffset;
                const ly1 = lastY - Math.cos(angle) * trackOffset;
                
                ctx.moveTo(lx1, ly1);
                ctx.lineTo(tx1, ty1);

                const tx2 = carX - Math.sin(angle) * trackOffset;
                const ty2 = carY + Math.cos(angle) * trackOffset;
                const lx2 = lastX - Math.sin(angle) * trackOffset;
                const ly2 = lastY + Math.cos(angle) * trackOffset;

                ctx.moveTo(lx2, ly2);
                ctx.lineTo(tx2, ty2);
                
                ctx.stroke();
            }
            lastX = carX;
            lastY = carY;
        }

        // Fade out tracks over time (very subtle)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.005)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        requestAnimationFrame(animate);
    };
    animate();

    // --- Smooth Scroll ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
