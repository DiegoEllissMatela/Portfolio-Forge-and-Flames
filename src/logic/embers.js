/**
 * FORGE & FLAME - EMBER PARTICLE ENGINE
 * High-performance lightweight HTML5 Canvas ember simulation
 */

export class EmberParticleSystem {
    constructor(canvas) {
        if (typeof canvas === 'string') {
            this.canvas = document.getElementById(canvas);
        } else {
            this.canvas = canvas;
        }
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 35 : 75;
        this.animationFrameId = null;
        this.handleResize = () => this.resize();
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', this.handleResize);

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle(true));
        }

        this.animate();
    }

    resize() {
        if (!this.canvas) return;
        this.width = this.canvas.width = this.canvas.parentElement ? this.canvas.parentElement.offsetWidth : window.innerWidth;
        this.height = this.canvas.height = this.canvas.parentElement ? this.canvas.parentElement.offsetHeight : window.innerHeight;
    }

    createParticle(initial = false) {
        return {
            x: Math.random() * (this.width || window.innerWidth),
            y: initial ? Math.random() * (this.height || window.innerHeight) : (this.height || window.innerHeight) + 20,
            size: Math.random() * 2.5 + 1,
            speedY: Math.random() * 1.2 + 0.6,
            speedX: (Math.random() - 0.5) * 0.8,
            opacity: Math.random() * 0.8 + 0.2,
            fadeSpeed: Math.random() * 0.006 + 0.002,
            hue: Math.random() > 0.6 ? 12 : Math.random() > 0.3 ? 28 : 42, // red, orange, golden ember
            turbulance: Math.random() * 0.04 + 0.01,
            wobble: Math.random() * Math.PI * 2
        };
    }

    animate() {
        if (!this.ctx || !this.canvas) return;
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            p.wobble += p.turbulance;
            p.x += p.speedX + Math.sin(p.wobble) * 0.6;
            p.y -= p.speedY;
            p.opacity -= p.fadeSpeed;

            if (p.y < -10 || p.opacity <= 0 || p.x < -10 || p.x > this.width + 10) {
                this.particles[i] = this.createParticle(false);
                continue;
            }

            // Draw glowing ember particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.opacity})`;
            this.ctx.shadowBlur = p.size * 4;
            this.ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, ${p.opacity})`;
            this.ctx.fill();
        }

        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        window.removeEventListener('resize', this.handleResize);
    }
}
