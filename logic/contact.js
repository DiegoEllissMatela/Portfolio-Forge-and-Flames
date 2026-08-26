/**
 * FORGE & FLAME - CONTACT & PRIVATE DINING ENGINE
 * Form validation, interactive feedback, and GSAP accordion controls
 */

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initFaqAccordion();
});

/**
 * 1. Contact Form Submission
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('contactName');
        const name = nameInput ? nameInput.value : 'Guest';

        if (window.showToast) {
            window.showToast(`Thank you, ${name}. Our VIP concierge will contact you within 24 hours.`, 'success');
        }

        form.reset();
    });
}

/**
 * 2. FAQ Accordion Interaction
 */
function initFaqAccordion() {
    const accordionHeaders = document.querySelectorAll('.faq-header');

    accordionHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            const parent = header.closest('.faq-accordion-item');
            if (!parent) return;

            const isActive = parent.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.faq-accordion-item').forEach((item) => {
                item.classList.remove('active');
            });

            // Toggle clicked item
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });
}
