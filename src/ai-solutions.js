// AI Solutions Page - Modal System for Real-World AI Applications
import i18n from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.querySelector('.close-modal');
    const useCaseCards = document.querySelectorAll('.use-case-card[data-modal]');

    // Guard clause if modal doesn't exist on page
    if (!modal || !modalTitle || !modalText) return;

    // Mapping of modal keys to translation keys
    const modalMapping = {
        'customer-service': 'ai.modals.customer-service',
        'document-processing': 'ai.modals.document-processing',
        'email-management': 'ai.modals.email-management',
        'smart-scheduling': 'ai.modals.smart-scheduling',
        'content-translation': 'ai.modals.content-translation',
        'security-monitoring': 'ai.modals.security-monitoring'
    };

    // Function to open modal
    function openModal(serviceKey) {
        const translationKey = modalMapping[serviceKey];
        if (translationKey) {
            const translatedService = i18n.t(translationKey);
            if (translatedService && typeof translatedService === 'object') {
                modalTitle.textContent = translatedService.title;
                modalText.textContent = translatedService.text;
                modal.classList.remove('hidden');
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            }
        }
    }

    // Function to close modal
    function closeModal() {
        modal.classList.add('hidden');
        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Add click listeners to use case cards
    useCaseCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalKey = card.dataset.modal;
            if (modalKey) {
                openModal(modalKey);
            }
        });
    });

    // Close modal when clicking close button
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Close modal when clicking overlay background
    modal.addEventListener('click', (e) => {
        // Only close if clicking the overlay itself, not the content
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});
