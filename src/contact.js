// Contact Form - Topic Suggestion Buttons Handler
// Allows users to quickly populate the message field with pre-defined topics

document.addEventListener('DOMContentLoaded', () => {
    // Select all topic buttons and the message textarea
    const topicButtons = document.querySelectorAll('.topic-btn');
    const messageTextarea = document.getElementById('message');

    // Guard clause - ensure elements exist
    if (!messageTextarea || topicButtons.length === 0) {
        console.warn('Contact form elements not found');
        return;
    }

    // Add click event listener to each topic button
    topicButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the text content of the clicked button
            const topicText = this.textContent.trim();
            
            // Get current textarea value
            const currentValue = messageTextarea.value.trim();
            
            // Check if textarea already has content
            if (currentValue) {
                // Append new topic with a newline separator
                messageTextarea.value = currentValue + '\n\n' + topicText;
            } else {
                // Set the value to the topic text
                messageTextarea.value = topicText;
            }
            
            // Add visual feedback - toggle selected class
            this.classList.toggle('selected');
            
            // Focus the textarea so user can continue typing
            messageTextarea.focus();
            
            // Move cursor to the end of the text
            messageTextarea.setSelectionRange(messageTextarea.value.length, messageTextarea.value.length);
            
            // Optional: Scroll textarea to bottom if content is long
            messageTextarea.scrollTop = messageTextarea.scrollHeight;
            
            // Remove selected class after a short delay for visual feedback
            setTimeout(() => {
                this.classList.remove('selected');
            }, 300);
        });
    });

    // Optional: Add keyboard support (Enter or Space to activate button)
    topicButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});
