import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let currentHeroTimeline = null;
let currentHeaderTimelines = [];

/**
 * 1. Custom Smooth Cursor with Trailing Flame Ember Follower
 */
export function initCustomCursor() {
    const follower = document.querySelector('.custom-cursor-follower');
    const dot = document.querySelector('.custom-cursor-dot');

    if (!follower || !dot || window.innerWidth < 1024) return () => {};

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    const onMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(dot, {
            x: mouseX,
            y: mouseY,
            duration: 0.08,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const tickerCallback = () => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        gsap.set(follower, {
            x: followerX,
            y: followerY
        });
    };

    gsap.ticker.add(tickerCallback);

    const refreshInteractables = () => {
        const interactables = document.querySelectorAll('a, button, input, select, textarea, .tab-btn, .time-slot-pill, .experience-card-select, .interactive-card, [data-menu-item]');
        interactables.forEach((el) => {
            el.onmouseenter = () => follower.classList.add('hovering');
            el.onmouseleave = () => follower.classList.remove('hovering');
        });
    };

    refreshInteractables();

    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        gsap.ticker.remove(tickerCallback);
    };
}

/**
 * 2. Hero Section Entrance Animation
 */
export function initHeroAnimations() {
    if (currentHeroTimeline) {
        currentHeroTimeline.kill();
        currentHeroTimeline = null;
    }

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroBadge = document.querySelector('.hero-badge');
    const heroBg = document.querySelector('.hero-bg-layer');

    if (!heroTitle && !heroBadge && !heroSubtitle) return;

    currentHeroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

    if (heroBg) {
        currentHeroTimeline.fromTo(heroBg, 
            { scale: 1.15, opacity: 0.6 },
            { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' }, 0
        );
    }

    if (heroBadge) {
        currentHeroTimeline.fromTo(heroBadge,
            { y: -25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 }, 0.2
        );
    }

    if (heroTitle) {
        currentHeroTimeline.fromTo(heroTitle,
            { y: 45, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2 }, 0.4
        );
    }

    if (heroSubtitle) {
        currentHeroTimeline.fromTo(heroSubtitle,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }, 0.6
        );
    }

    if (heroCta) {
        currentHeroTimeline.fromTo(heroCta,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.5)' }, 0.8
        );
    }
}

/**
 * 3. ScrollTrigger Batch & Individual Scroll Reveal System
 */
export function initScrollRevealSystem() {
    ScrollTrigger.batch('.gsap-reveal', {
        interval: 0.1,
        batchMax: 6,
        onEnter: (batch) => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.0,
                stagger: 0.1,
                ease: 'power3.out',
                overwrite: 'auto'
            });
        },
        start: 'top 90%',
        once: true
    });

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

        currentHeaderTimelines.push(tl);
    });

    const imageCurtains = document.querySelectorAll('.gsap-image-reveal');
    imageCurtains.forEach((wrapper) => {
        const img = wrapper.querySelector('img');
        if (!img) return;

        gsap.fromTo(img,
            { scale: 1.2, filter: 'grayscale(40%)' },
            {
                scale: 1,
                filter: 'grayscale(0%)',
                duration: 1.5,
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
export function initParallaxScrubbers() {
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
    parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.3;
        const yOffset = speed * 100;

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

    const heroBg = document.querySelector('.hero-bg-layer');
    if (heroBg) {
        gsap.to(heroBg, {
            yPercent: 25,
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
export function initMagneticElements() {
    if (window.innerWidth < 1024) return;
    const magneticBtns = document.querySelectorAll('.magnetic-target');

    magneticBtns.forEach((btn) => {
        btn.onmousemove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.35;

            gsap.to(btn, {
                x: x,
                y: y,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        };

        btn.onmouseleave = () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)',
                overwrite: 'auto'
            });
        };
    });
}

/**
 * 6. Smooth Number Counter Animation
 */
export function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter-target]');
    counters.forEach((counter) => {
        const targetValue = parseFloat(counter.getAttribute('data-counter-target')) || 0;
        const prefix = counter.getAttribute('data-counter-prefix') || '';
        const suffix = counter.getAttribute('data-counter-suffix') || '';

        const obj = { val: 0 };
        gsap.to(obj, {
            val: targetValue,
            duration: 2.0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: counter,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            onUpdate: () => {
                counter.textContent = prefix + Math.floor(obj.val).toLocaleString() + suffix;
            }
        });
    });
}

/**
 * Cleanup function to tear down old triggers before new page loads
 */
export function cleanupPageAnimations() {
    if (currentHeroTimeline) {
        currentHeroTimeline.kill();
        currentHeroTimeline = null;
    }
    currentHeaderTimelines.forEach(tl => tl.kill());
    currentHeaderTimelines = [];
    ScrollTrigger.getAll().forEach(st => st.kill());
}

/**
 * Master Page Animation Initializer
 */
export function initPageAnimations() {
    cleanupPageAnimations();
    initHeroAnimations();
    initScrollRevealSystem();
    initParallaxScrubbers();
    initMagneticElements();
    initCounterAnimations();
    ScrollTrigger.refresh();
}
