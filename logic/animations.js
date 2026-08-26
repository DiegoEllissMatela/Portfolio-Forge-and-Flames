/**
 * FORGE & FLAME - GSAP MASTER ANIMATION ENGINE
 * Production-ready ScrollTrigger, Multi-Layer Parallax, Magnetic Physics, and Reveal System
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded.');
        return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Initialize all master animation subsystems
    initCustomCursor();
    initHeroAnimations();
    initScrollRevealSystem();
    initParallaxScrubbers();
    initMagneticElements();
    initCounterAnimations();
});

/**
 * 1. Custom Smooth Cursor with Trailing Flame Ember Follower
 */
function initCustomCursor() {
    const follower = document.querySelector('.custom-cursor-follower');
    const dot = document.querySelector('.custom-cursor-dot');

    if (!follower || !dot || window.innerWidth < 1024) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(dot, {
            x: mouseX,
            y: mouseY,
            duration: 0.08,
            ease: 'power2.out'
        });
    });

    // Smooth Lerp loop for follower
    gsap.ticker.add(() => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        gsap.set(follower, {
            x: followerX,
            y: followerY
        });
    });

    // Hover state over interactive elements
    const interactables = document.querySelectorAll('a, button, input, select, textarea, .tab-btn, .time-slot-pill, .experience-card-select, .interactive-card');
    interactables.forEach((el) => {
        el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });
}

/**
 * 2. Hero Section Entrance Animation
 */
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroBadge = document.querySelector('.hero-badge');
    const heroBg = document.querySelector('.hero-bg-layer');

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    if (heroBg) {
        tl.fromTo(heroBg, 
            { scale: 1.2, filter: 'blur(10px) brightness(0.4)' },
            { scale: 1, filter: 'blur(0px) brightness(0.8)', duration: 2.2, ease: 'power2.out' }, 0
        );
    }

    if (heroBadge) {
        tl.fromTo(heroBadge,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }, 0.3
        );
    }

    if (heroTitle) {
        tl.fromTo(heroTitle,
            { y: 60, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1.4 }, 0.5
        );
    }

    if (heroSubtitle) {
        tl.fromTo(heroSubtitle,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2 }, 0.8
        );
    }

    if (heroCta) {
        tl.fromTo(heroCta,
            { y: 30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, 1.1
        );
    }
}

/**
 * 3. ScrollTrigger Batch & Individual Scroll Reveal System
 */
function initScrollRevealSystem() {
    if (typeof ScrollTrigger === 'undefined') return;

    // Batch reveal for grid items, cards, and menu lists
    ScrollTrigger.batch('.gsap-reveal', {
        interval: 0.1,
        batchMax: 6,
        onEnter: (batch) => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.1,
                stagger: 0.12,
                ease: 'power3.out',
                overwrite: 'auto'
            });
        },
        start: 'top 88%',
        once: true
    });

    // Luxury Section Header reveals
    const sectionHeaders = document.querySelectorAll('.gsap-section-header');
    sectionHeaders.forEach((header) => {
        const title = header.querySelector('h2, h1');
        const tag = header.querySelector('.header-tag');
        const desc = header.querySelector('p');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        if (tag) tl.fromTo(tag, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 });
        if (title) tl.fromTo(title, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3');
        if (desc) tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
    });

    // Image reveal curtain effect
    const imageCurtains = document.querySelectorAll('.gsap-image-reveal');
    imageCurtains.forEach((wrapper) => {
        const img = wrapper.querySelector('img');
        if (!img) return;

        gsap.fromTo(img,
            { scale: 1.25, filter: 'grayscale(60%)' },
            {
                scale: 1,
                filter: 'grayscale(0%)',
                duration: 1.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

/**
 * 4. Multi-Layer Parallax Scrubbers
 */
function initParallaxScrubbers() {
    if (typeof ScrollTrigger === 'undefined') return;

    // Background and photo parallax
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
    parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.3;
        const yOffset = speed * 120;

        gsap.fromTo(el,
            { y: yOffset },
            {
                y: -yOffset,
                ease: 'none',
                scrollTrigger: {
                    trigger: el.parentElement || el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.2,
                    refreshPriority: -1
                }
            }
        );
    });

    // Hero background smooth depth scrub
    const heroBg = document.querySelector('.hero-bg-layer');
    if (heroBg) {
        gsap.to(heroBg, {
            yPercent: 30,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
                trigger: heroBg.closest('section') || 'body',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
}

/**
 * 5. Magnetic Buttons & UI Controls
 */
function initMagneticElements() {
    if (window.innerWidth < 1024) return;
    const magneticBtns = document.querySelectorAll('.magnetic-target');

    magneticBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.35;

            gsap.to(btn, {
                x: x,
                y: y,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

/**
 * 6. Smooth Number Counter Animation
 */
function initCounterAnimations() {
    if (typeof ScrollTrigger === 'undefined') return;

    const counters = document.querySelectorAll('[data-counter-target]');
    counters.forEach((counter) => {
        const targetValue = parseFloat(counter.getAttribute('data-counter-target')) || 0;
        const prefix = counter.getAttribute('data-counter-prefix') || '';
        const suffix = counter.getAttribute('data-counter-suffix') || '';

        const obj = { val: 0 };
        gsap.to(obj, {
            val: targetValue,
            duration: 2.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: counter,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            onUpdate: () => {
                counter.textContent = prefix + Math.floor(obj.val).toLocaleString() + suffix;
            }
        });
    });
}
