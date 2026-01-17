// AI Solutions Page - Modal System for Real-World AI Applications
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.querySelector('.close-modal');
    const useCaseCards = document.querySelectorAll('.use-case-card[data-modal]');

    // Guard clause if modal doesn't exist on page
    if (!modal || !modalTitle || !modalText) return;

    // Service descriptions for each AI application
    const serviceDescriptions = {
        'customer-service': {
            title: 'Customer Service Automation',
            text: `Transform your customer support with AI-powered chatbots that provide instant, accurate responses 24/7. Our intelligent systems learn from every interaction to continuously improve service quality.

Features include: multi-language support, sentiment analysis to detect frustrated customers, seamless handoff to human agents when needed, and integration with your existing CRM systems.

Reduce response times by up to 80% while maintaining high customer satisfaction scores. Perfect for businesses handling high volumes of repetitive inquiries, allowing your human team to focus on complex issues that require personal attention.`
        },
        'document-processing': {
            title: 'Document Processing',
            text: `Eliminate manual data entry with our advanced AI document processing solution. Automatically extract, classify, and organize information from invoices, receipts, contracts, forms, and any business documents.

Our system uses optical character recognition (OCR) combined with machine learning to understand document structure and context. Features include: automatic field extraction, data validation, duplicate detection, multi-format support (PDF, images, scanned documents), and direct integration with your accounting or ERP systems.

Save countless hours of manual work, reduce errors by up to 95%, and accelerate your document workflows from days to minutes.`
        },
        'email-management': {
            title: 'Email Management',
            text: `Take control of your inbox with AI-powered email management that works like a personal assistant. Our system intelligently categorizes emails, identifies priority messages, suggests responses, and can even draft replies based on your communication style.

Features include: smart filtering and labeling, automatic response suggestions, meeting scheduling detection, follow-up reminders, spam and phishing detection, and VIP sender prioritization.

The AI learns your preferences over time, becoming more accurate at understanding what matters most to you. Reduce email processing time by 60% and never miss an important message again.`
        },
        'smart-scheduling': {
            title: 'Smart Scheduling',
            text: `Optimize your calendar with AI that understands your priorities, preferences, and productivity patterns. Our smart scheduling system automatically finds the best meeting times, manages conflicts, and ensures you have adequate focus time for deep work.

Features include: intelligent meeting time suggestions based on attendee availability, automatic buffer time between meetings, travel time calculation, priority-based scheduling, timezone management for global teams, and integration with video conferencing platforms.

The system learns your work patterns and can suggest optimal times for different types of activities. Reclaim up to 5 hours per week previously lost to scheduling coordination.`
        },
        'content-translation': {
            title: 'Content Translation',
            text: `Break down language barriers with AI-powered translation that goes beyond word-for-word conversion. Our system understands context, cultural nuances, and industry-specific terminology to deliver accurate, natural-sounding translations in real-time.

Features include: support for 100+ languages, industry-specific glossaries, brand voice consistency, real-time translation for live conversations, document translation with formatting preservation, and continuous learning from corrections.

Perfect for businesses expanding globally, multilingual customer support, or international team collaboration. Maintain your brand voice across all languages while ensuring clear, culturally appropriate communication.`
        },
        'security-monitoring': {
            title: 'Security Monitoring',
            text: `Protect your business with AI-powered security monitoring that detects threats before they become breaches. Our system continuously analyzes network traffic, user behavior, and system logs to identify anomalies and potential security risks.

Features include: real-time threat detection, behavioral analysis to spot insider threats, automated incident response, compliance monitoring, vulnerability assessment, and predictive threat intelligence.

The AI learns your normal business patterns and immediately flags suspicious activities like unusual login locations, abnormal data access, or potential malware behavior. Reduce security incident response time from hours to minutes and prevent breaches before they occur.`
        }
    };

    // Function to open modal
    function openModal(serviceKey) {
        const service = serviceDescriptions[serviceKey];
        if (service) {
            modalTitle.textContent = service.title;
            modalText.textContent = service.text;
            modal.classList.remove('hidden');
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
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
