// Load Header
fetch('header.html')
    .then(response => response.text())
    .then(data => document.getElementById('header-placeholder').innerHTML = data);


// Load Footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer-placeholder').innerHTML = data);

/////// SLIDER & CONTENT TOGGLE /////////
document.addEventListener('DOMContentLoaded', () => {
    const themeSlider = document.querySelector('.theme-slider');
    const indicator = document.querySelector('.slider-indicator');
    const labels = document.querySelectorAll('.slider-label');
    const homeContents = document.querySelectorAll('.home-content');
    const businessContents = document.querySelectorAll('.business-content');

    function toggleContent(isHome) {
        const activeLabel = labels[isHome ? 0 : 1];

        // Toggle Active State on Labels
        labels.forEach(lbl => lbl.classList.remove('active'));
        activeLabel.classList.add('active');

        // Update Indicator Position & Width dynamically
        indicator.style.left = activeLabel.offsetLeft + 'px';
        indicator.style.width = activeLabel.offsetWidth + 'px';

        if (isHome) {
            indicator.classList.remove('business-active');
        } else {
            indicator.classList.add('business-active');
        }

        // Toggle Content Visibility
        homeContents.forEach(content => {
            content.style.display = isHome ? 'block' : 'none';
            content.classList.toggle('hidden', !isHome);
        });

        businessContents.forEach(content => {
            content.style.display = isHome ? 'none' : 'block';
            content.classList.toggle('hidden', isHome);
        });
    }

    // Add click handlers to labels
    labels.forEach(label => {
        label.addEventListener('click', () => {
            const isHome = label.classList.contains('home');
            toggleContent(isHome);
        });
    });

    // Handle resize
    window.addEventListener('resize', () => {
        const activeLabel = document.querySelector('.slider-label.active');
        if (activeLabel && indicator) {
            indicator.style.transition = 'none';
            indicator.style.left = activeLabel.offsetLeft + 'px';
            indicator.style.width = activeLabel.offsetWidth + 'px';
            setTimeout(() => indicator.style.transition = '', 50);
        }
    });

    // Initialize with home view
    toggleContent(true);
});

// ABOUT US TABS //
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const contentTexts = document.querySelectorAll(".content-text");

    function initializeTabs(tabsContainer) {
        const tabs = tabsContainer.querySelectorAll(".tab");
        const contents = tabsContainer.querySelectorAll(".content-text");

        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                contents.forEach(content => content.style.display = "none");
                const selectedContent = tab.getAttribute("data-content");
                tabsContainer.querySelector(`#${selectedContent}`).style.display = "block";
            });
        });

        // Initial setup
        tabs[0].classList.add("active");
        contents[0].style.display = "block";
    }

    // Initialize tabs for both home and business sections
    document.querySelectorAll('.about-section').forEach(section => {
        initializeTabs(section);
    });
});
