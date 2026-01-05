// ===================================================================
// CONTACT FORM - Success Simulation
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');
    const sendAnotherBtn = document.getElementById('send-another');

    // Guard clause if form doesn't exist on page
    if (!contactForm || !successMessage) {
        console.warn('Contact Form: Form elements not found');
        return;
    }

    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const serviceType = document.getElementById('service-type').value;
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !phone || !serviceType || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Log form data (for debugging)
        console.log('Form submitted:', {
            name,
            email,
            phone,
            serviceType,
            message
        });

        // Hide the form
        contactForm.classList.add('hidden');

        // Show success message
        successMessage.classList.remove('hidden');

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        console.log('✅ Contact Form: Success message displayed');
    });

    // Handle "Send Another Message" button
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', () => {
            // Hide success message
            successMessage.classList.add('hidden');

            // Show form again
            contactForm.classList.remove('hidden');

            // Reset form
            contactForm.reset();

            // Scroll to form
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });

            console.log('🔄 Contact Form: Reset for new message');
        });
    }

    console.log('Contact Form: Initialized successfully');
});
