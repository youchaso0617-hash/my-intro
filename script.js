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
    const carContainer = document.getElementById('minicar');
    const canvas = document.getElementById('tire-tracks');
    const ctx = canvas.getContext('2d');

    const carTypes = [
        {
            name: 'Sports',
            svg: `<svg viewBox="0 0 100 60" class="minicar-svg">
                <path class="car-body" d="M 5 30 L 15 15 Q 40 10 70 15 L 95 30 L 70 45 Q 40 50 15 45 Z" fill="#333" />
                <rect class="car-glass" x="30" y="20" width="25" height="20" rx="2" fill="rgba(255,255,255,0.3)" />
                <rect class="wheel" x="15" y="8" width="12" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="65" y="8" width="12" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="15" y="46" width="12" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="65" y="46" width="12" height="6" rx="2" fill="#000" />
                <rect x="85" y="20" width="3" height="20" fill="#000" /> <!-- Spoiler -->
            </svg>`
        },
        {
            name: 'Sedan',
            svg: `<svg viewBox="0 0 100 60" class="minicar-svg">
                <rect class="car-body" x="10" y="10" width="80" height="40" rx="6" fill="#333" />
                <rect class="car-glass" x="25" y="15" width="20" height="30" rx="2" fill="rgba(255,255,255,0.2)" />
                <rect class="car-glass" x="60" y="15" width="15" height="30" rx="2" fill="rgba(255,255,255,0.2)" />
                <rect class="wheel" x="20" y="5" width="14" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="65" y="5" width="14" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="20" y="49" width="14" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="65" y="49" width="14" height="6" rx="2" fill="#000" />
            </svg>`
        },
        {
            name: 'Family',
            svg: `<svg viewBox="0 0 100 60" class="minicar-svg">
                <rect class="car-body" x="10" y="8" width="75" height="44" rx="4" fill="#333" />
                <rect class="car-glass" x="20" y="12" width="55" height="36" rx="2" fill="rgba(255,255,255,0.2)" />
                <rect class="wheel" x="15" y="4" width="16" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="60" y="4" width="16" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="15" y="50" width="16" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="60" y="50" width="16" height="6" rx="2" fill="#000" />
            </svg>`
        },
        {
            name: 'Kei',
            svg: `<svg viewBox="0 0 100 60" class="minicar-svg">
                <rect class="car-body" x="20" y="10" width="60" height="40" rx="2" fill="#333" />
                <rect class="car-glass" x="30" y="15" width="40" height="30" rx="1" fill="rgba(255,255,255,0.2)" />
                <rect class="wheel" x="25" y="6" width="12" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="60" y="6" width="12" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="25" y="48" width="12" height="6" rx="2" fill="#000" />
                <rect class="wheel" x="60" y="48" width="12" height="6" rx="2" fill="#000" />
            </svg>`
        }
    ];

    // Select random car on load
    const selectedCar = carTypes[Math.floor(Math.random() * carTypes.length)];
    carContainer.innerHTML = selectedCar.svg;

    let mouseX = -100, mouseY = -100;
    let carX = -100, carY = -100;
    let angle = 0;
    let lastX = -100, lastY = -100;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animate = () => {
        // Slower Easing (from 0.05 to 0.02)
        const dx = mouseX - carX;
        const dy = mouseY - carY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            carX += dx * 0.02; // Slower response
            carY += dy * 0.02; // Slower response

            const targetAngle = Math.atan2(dy, dx);
            let diff = targetAngle - angle;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            angle += diff * 0.04; // Slower rotation (from 0.1 to 0.04)

            carContainer.style.left = `${carX}px`;
            carContainer.style.top = `${carY}px`;
            carContainer.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;

            if (lastX !== -100) {
                // Thicker and Darker Tracks
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'; // Darker (from 0.05 to 0.15)
                ctx.lineWidth = 2.5; // Thicker (from 1 to 2.5)
                ctx.beginPath();
                
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

        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'; // Faster fade (from 0.003 to 0.02)
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
