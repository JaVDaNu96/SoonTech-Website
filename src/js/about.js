// Animated Counter Script for About Us Page
// Uses IntersectionObserver for scroll-triggered animations

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    // Counter animation function
    function animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        const isDecimal = target % 1 !== 0;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                if (isDecimal) {
                    element.textContent = current.toFixed(1);
                } else if (target >= 1000) {
                    element.textContent = Math.floor(current).toLocaleString() + '+';
                } else {
                    element.textContent = Math.floor(current) + '%';
                }
                requestAnimationFrame(updateCounter);
            } else {
                // Final value
                if (isDecimal) {
                    element.textContent = target.toFixed(1) + '%';
                } else if (target >= 1000) {
                    element.textContent = target.toLocaleString() + '+';
                } else {
                    element.textContent = target + '%';
                }
            }
        };

        updateCounter();
    }

    // IntersectionObserver for scroll trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                stats.forEach(stat => {
                    animateCounter(stat);
                });
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% visible
    });

    // Observe the stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
