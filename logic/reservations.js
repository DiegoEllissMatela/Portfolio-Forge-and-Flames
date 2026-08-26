/**
 * FORGE & FLAME - RESERVATION ENGINE
 * Interactive multi-step booking, seating area selector, live summary card & confirmation
 */

document.addEventListener('DOMContentLoaded', () => {
    initReservationEngine();
});

function initReservationEngine() {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    // Seating Experience Cards
    const expCards = document.querySelectorAll('.experience-card-select');
    let selectedExperience = 'Main Dining Room';
    let experiencePrice = '₱0 deposit';

    expCards.forEach((card) => {
        card.addEventListener('click', () => {
            expCards.forEach((c) => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedExperience = card.getAttribute('data-experience-name') || 'Main Dining Room';
            experiencePrice = card.getAttribute('data-deposit') || '₱0 deposit';
            updateSummary();
        });
    });

    // Time Slot Pills
    const timePills = document.querySelectorAll('.time-slot-pill');
    let selectedTime = '19:00';

    timePills.forEach((pill) => {
        pill.addEventListener('click', () => {
            timePills.forEach((p) => p.classList.remove('active'));
            pill.classList.add('active');
            selectedTime = pill.getAttribute('data-time') || pill.textContent.trim();
            updateSummary();
        });
    });

    // Guests Input
    const guestInput = document.getElementById('resGuests');
    const dateInput = document.getElementById('resDate');
    const seatingAreaSummary = document.getElementById('summaryExperience');
    const dateSummary = document.getElementById('summaryDate');
    const timeSummary = document.getElementById('summaryTime');
    const guestsSummary = document.getElementById('summaryGuests');

    // Default Date to tomorrow
    if (dateInput && !dateInput.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
        dateInput.min = new Date().toISOString().split('T')[0];
    }

    function updateSummary() {
        if (seatingAreaSummary) seatingAreaSummary.textContent = selectedExperience;
        if (dateSummary && dateInput) {
            const d = new Date(dateInput.value);
            dateSummary.textContent = isNaN(d) ? dateInput.value : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        }
        if (timeSummary) timeSummary.textContent = selectedTime;
        if (guestsSummary && guestInput) guestsSummary.textContent = `${guestInput.value} ${parseInt(guestInput.value) === 1 ? 'Guest' : 'Guests'}`;
    }

    if (guestInput) guestInput.addEventListener('input', updateSummary);
    if (dateInput) dateInput.addEventListener('change', updateSummary);

    updateSummary();

    // Close confirmation modal handlers
    const confirmationModal = document.getElementById('reservationSuccessModal');
    if (confirmationModal) {
        const closeBtns = confirmationModal.querySelectorAll('[data-close-modal]');
        const closeModal = () => {
            confirmationModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtns.forEach((btn) => {
            btn.addEventListener('click', closeModal);
        });

        confirmationModal.addEventListener('click', (e) => {
            if (e.target === confirmationModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && confirmationModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('resName')?.value || 'Valued Guest';

        if (confirmationModal) {
            const confirmName = confirmationModal.querySelector('.confirm-guest-name');
            const confirmDetails = confirmationModal.querySelector('.confirm-details');

            if (confirmName) confirmName.textContent = name;
            if (confirmDetails) {
                confirmDetails.textContent = `${selectedExperience} • ${dateSummary ? dateSummary.textContent : ''} at ${selectedTime} (${guestInput ? guestInput.value : '2'} Guests)`;
            }

            confirmationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else if (window.showToast) {
            window.showToast(`Reservation confirmed for ${name}! We look forward to hosting you.`, 'success');
        }
    });
}
