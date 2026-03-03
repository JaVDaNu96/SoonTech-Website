// ===================================================================
// CONTACT FORM - EmailJS Integration
// ===================================================================

// EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_ub5lmzk';
const EMAILJS_TEMPLATE_ID = 'template_sdzzv8b';
const EMAILJS_PUBLIC_KEY = 'hhNru_IulPnyzbji_';

document.addEventListener('DOMContentLoaded', () => {
    // Initialise EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');
    const sendAnotherBtn = document.getElementById('send-another');
    const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;

    // Guard clause if form doesn't exist on page
    if (!contactForm || !successMessage) {
        console.warn('Contact Form: Form elements not found');
        return;
    }

    // ── Pre-select service from URL param (?service=... or ?type=...) ──
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service') || params.get('type');
    if (serviceParam) {
        const serviceSelect = document.getElementById('service-type');
        if (serviceSelect) {
            const option = serviceSelect.querySelector(`option[value="${serviceParam}"]`);
            if (option) option.selected = true;
        }
    }

    // ── Form submission ──
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const serviceType = document.getElementById('service-type').value;
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !phone || !serviceType || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Disable button while sending
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
        }

        try {
            const serviceSelect = document.getElementById('service-type');
            const selectedService = serviceSelect.options[serviceSelect.selectedIndex].text || serviceType;

            const contactParams = {
                from_name: name,
                from_email: email,
                phone: phone,
                service_type: serviceType,
                message: message,
                to_email: 'info@soon-tech.com',
                auto_reply_subject: "We've received your SoonTech inquiry",
                auto_reply_message: "Thank you for reaching out about " + selectedService + ". Our team is reviewing your request and will contact you within 24 hours."
            };

            await emailjs.send(EMAILJS_SERVICE_ID, 'template_kxxtdwy', contactParams);

            // Hide the form & show success
            contactForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.log('✅ Contact Form: Email sent via EmailJS');

        } catch (error) {
            console.error('❌ EmailJS error:', error);
            alert('Sorry, there was an error sending your message. Please email us directly at info@soon-tech.com');
            // Re-enable button so user can try again
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
            }
        }
    });

    // ── "Send Another Message" button ──
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', () => {
            successMessage.classList.add('hidden');
            contactForm.classList.remove('hidden');
            contactForm.reset();
            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
            }
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log('🔄 Contact Form: Reset for new message');
        });
    }

    console.log('✅ Contact Form: EmailJS initialized successfully');
});
