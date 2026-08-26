/**
 * FORGE & FLAME - MENU INTERACTION SYSTEM
 * Category switching, dietary tag filter, and item details modal
 */

document.addEventListener('DOMContentLoaded', () => {
    initMenuCategoryTabs();
    initDietaryFilter();
    initMenuItemModal();
});

/**
 * 1. Category Switching with GSAP Fade Transitions
 */
function initMenuCategoryTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn[data-category]');
    const menuSections = document.querySelectorAll('.menu-category-section');

    if (!tabButtons.length || !menuSections.length) return;

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetCategory = btn.getAttribute('data-category');

            tabButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            menuSections.forEach((section) => {
                const sectionCat = section.getAttribute('data-category');
                if (targetCategory === 'all' || sectionCat === targetCategory) {
                    section.style.display = 'block';
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(section,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                        );
                    }
                } else {
                    section.style.display = 'none';
                }
            });

            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        });
    });
}

/**
 * 2. Dietary Tag Filtering
 */
function initDietaryFilter() {
    const filterSelect = document.getElementById('dietaryFilterSelect');
    const menuItems = document.querySelectorAll('.menu-item-row');

    if (!filterSelect || !menuItems.length) return;

    filterSelect.addEventListener('change', () => {
        const selectedTag = filterSelect.value.toUpperCase();

        menuItems.forEach((item) => {
            if (selectedTag === 'ALL') {
                item.style.display = 'flex';
                return;
            }

            const badges = Array.from(item.querySelectorAll('.badge-tag')).map((b) => b.textContent.trim().toUpperCase());
            if (badges.includes(selectedTag)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
}

/**
 * 3. Menu Item Quick Details Modal
 */
function initMenuItemModal() {
    const modal = document.getElementById('menuItemModal');
    const items = document.querySelectorAll('[data-menu-item]');
    if (!modal) return;

    const modalTitle = modal.querySelector('.modal-item-title');
    const modalDesc = modal.querySelector('.modal-item-desc');
    const modalPrice = modal.querySelector('.modal-item-price');
    const modalImg = modal.querySelector('.modal-item-img');
    const modalPairing = modal.querySelector('.modal-item-pairing');
    const closeBtns = modal.querySelectorAll('[data-close-modal]');

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtns.forEach((btn) => {
        btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    items.forEach((item) => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title') || item.querySelector('h3')?.textContent || 'Culinary Selection';
            const desc = item.getAttribute('data-desc') || item.querySelector('p')?.textContent || '';
            const price = item.getAttribute('data-price') || item.querySelector('.text-fire')?.textContent || '';
            const img = item.getAttribute('data-img');
            const pairing = item.getAttribute('data-pairing') || 'Sommelier Selected Cabernet Sauvignon';

            if (modalTitle) modalTitle.textContent = title;
            if (modalDesc) modalDesc.textContent = desc;
            if (modalPrice) modalPrice.textContent = price;
            if (modalPairing) modalPairing.textContent = pairing;

            if (modalImg) {
                if (img) {
                    modalImg.src = img;
                    modalImg.parentElement.style.display = 'block';
                } else {
                    modalImg.parentElement.style.display = 'none';
                }
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}
