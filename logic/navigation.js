/**
 * FORGE & FLAME - GLOBAL NAVIGATION CONTROLLER
 * Active route highlighter, scroll backdrop, mobile menu drawer, and quick booking modal
 */

document.addEventListener('DOMContentLoaded', () => {
    initStickyNav();
    initActiveNavLinks();
    initMobileMenu();
    initQuickBookingModal();
});

/**
 * 1. Sticky Navigation Scroll Effect
 */
function initStickyNav() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    const handleScroll = () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * 2. Active Route Link Indicator
 */
function initActiveNavLinks() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;

        const targetFile = href.split('#')[0].split('/').pop() || 'index.html';

        if (currentPath === targetFile || (currentPath === '' && targetFile === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * 3. Mobile Hamburger Menu Drawer
 */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const closeBtn = document.getElementById('mobileMenuClose');
    const drawer = document.getElementById('mobileMenuDrawer');
    const drawerLinks = drawer ? drawer.querySelectorAll('a, button') : [];

    if (!toggleBtn || !drawer) return;

    const openMenu = () => {
        drawer.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(drawerLinks,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
            );
        }
    };

    const closeMenu = () => {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    drawerLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
}

/**
 * 4. Quick Table Booking Modal
 */
function initQuickBookingModal() {
    const modal = document.getElementById('quickBookingModal');
    const openBtns = document.querySelectorAll('[data-open-booking-modal]');
    const closeBtns = document.querySelectorAll('[data-close-modal]');

    if (!modal) return;

    openBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Helper: Toast Notification Dispatcher
 */
window.showToast = function(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span class="material-symbols-outlined text-fire" style="font-variation-settings: 'FILL' 1;">
            ${type === 'success' ? 'check_circle' : 'info'}
        </span>
        <div style="font-size: 0.875rem; font-weight: 500;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
};
