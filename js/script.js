console.log("VERSION: 0.0.1 Default script")

class PresentationEngine {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.slide').length;
        this.init();
    }

    init() {
        this.createParticles();
        this.createNavigation();
        this.bindEvents();
        this.updateProgress();
        console.log('✅ PromptX Presentation Engine loaded successfully');
    }

    // Particle background
    createParticles() {
        const container = document.getElementById('particles');
        const count = 50;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 6 + 's';
            p.style.animationDuration = (Math.random() * 3 + 3) + 's';
            container.appendChild(p);
        }
    }

    // Navigation dots
    createNavigation() {
        const nav = document.getElementById('navigation');
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            nav.appendChild(dot);
        }
    }

    // All input events
    bindEvents() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    this.goToSlide(0);
                    break;
                case 'End':
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });

        // Buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());

        // Touch swipe
        let startX = 0;
        document.addEventListener('touchstart', e => startX = e.touches[0].clientX);
        document.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? this.nextSlide() : this.prevSlide();
        });

        // Mouse wheel (debounced)
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                e.deltaY > 0 ? this.nextSlide() : this.prevSlide();
            }, 80);
        });

        // Mouse-follow particles
        document.addEventListener('mousemove', (e) => {
            const particles = document.querySelectorAll('.particle');
            const mx = (e.clientX / window.innerWidth - 0.5);
            const my = (e.clientY / window.innerHeight - 0.5);
            particles.forEach((p, i) => {
                const speed = (i % 3 + 1) * 0.6;
                p.style.transform = `translate(${mx * speed * 30}px, ${my * speed * 30}px)`;
            });
        });
    }

    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides) return;

        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i === index) slide.classList.add('active');
            else if (i < index) slide.classList.add('prev');
        });

        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

        this.currentSlide = index;
        this.updateProgress();
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    updateProgress() {
        const progress = document.getElementById('progress');
        const percent = ((this.currentSlide + 1) / this.totalSlides) * 100;
        progress.style.width = percent + '%';
    }
}

// Start the engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const presentation = new PresentationEngine();

    console.log(`
🎯 DAVIT Presentation – Ready
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎮 Controls
   ← →  or  Space          Next / Previous
   Home / End              First / Last slide
   Mouse wheel             Scroll navigation
   Swipe (mobile)          Touch navigation
📊 ${presentation.totalSlides} slides • Fully responsive
🚀 Open source – fork & customize!
    `);
});

// Prevent accidental refresh with Ctrl+R (optional)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') e.preventDefault();
});

// Fullscreen toggle with F11
document.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
        e.preventDefault();
        document.fullscreenElement
            ? document.exitFullscreen()
            : document.documentElement.requestFullscreen();
    }
});
