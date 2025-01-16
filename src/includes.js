// Load Header
fetch('header.html')
    .then(response => response.text())
    .then(data => document.getElementById('header-placeholder').innerHTML = data);

// Load Footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer-placeholder').innerHTML = data);

/////// SLIDER /////////
document.addEventListener('DOMContentLoaded', () => {
    const themeSlider = document.querySelector('.theme-slider');
    const indicator = document.querySelector('.slider-indicator');
    const labels = document.querySelectorAll('.slider-label');

    labels.forEach(label => {
        label.addEventListener('click', () => {
            const isHome = label.classList.contains('home');

            // Toggle Active State on Labels
            labels.forEach(lbl => lbl.classList.remove('active'));
            label.classList.add('active');

            // Update Indicator Position
            indicator.style.left = isHome ? '0' : '120px';

            // Additional: Trigger Content Change (Optional)
            if (isHome) {
                console.log('Switching to Home');
                // Insert logic to display Home content
            } else {
                console.log('Switching to Business');
                // Insert logic to display Business content
            }
        });
    });
});

// TOGGLE HERO CONTENT//

document.addEventListener('DOMContentLoaded', () => {
    const labels = document.querySelectorAll('.slider-label');
    const homeContent = document.querySelector('.home-content');
    const businessContent = document.querySelector('.business-content');

    labels.forEach(label => {
        label.addEventListener('click', () => {
            const isHome = label.classList.contains('home');

            // Toggle Active Content
            if (isHome) {
                homeContent.style.display = 'block';
                homeContent.classList.remove('hidden');
                businessContent.style.display = 'none';
                businessContent.classList.add('hidden');
            } else {
                homeContent.style.display = 'none';
                homeContent.classList.add('hidden');
                businessContent.style.display = 'block';
                businessContent.classList.remove('hidden');
            }
        });
    });
});

// ABOUT US //
document.addEventListener("DOMContentLoaded", function() {
    // Select all tab elements
    const tabs = document.querySelectorAll(".tab");
    // Select all content elements
    const contentTexts = document.querySelectorAll(".content-text");

    // Loop through each tab and add a click event listener
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove 'active' class from all tabs
            tabs.forEach(t => t.classList.remove("active"));
            // Add 'active' class to the clicked tab
            tab.classList.add("active");

            // Hide all content sections
            contentTexts.forEach(content => content.style.display = "none");

            // Show the selected content based on the data-content attribute
            const selectedContent = tab.getAttribute("data-content");
            document.getElementById(selectedContent).style.display = "block";
        });
    });

    // Initial setup - Show the first content by default
    tabs[0].classList.add("active"); // Make the first tab active
    contentTexts[0].style.display = "block"; // Show the first content section
});
