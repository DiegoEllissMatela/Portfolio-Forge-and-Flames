/**
 * Toast Notification System
 */
export function showToast(message, type = 'success') {
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
}
