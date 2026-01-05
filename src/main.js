// This file replaces the old includes.js
// Header and Footer are now injected at build time via Vite.

/////// SLIDER & CONTENT TOGGLE /////////
document.addEventListener('DOMContentLoaded', () => {
    const themeSlider = document.querySelector('.theme-slider');

    // Guard clause in case element doesn't exist on page
    if (!themeSlider) return;

    const indicator = document.querySelector('.slider-indicator');
    const labels = document.querySelectorAll('.slider-label');
    const homeContents = document.querySelectorAll('.home-content');
    const businessContents = document.querySelectorAll('.business-content');

    function toggleContent(isHome) {
        // Toggle Active State on Labels
        labels.forEach(lbl => lbl.classList.remove('active'));
        labels[isHome ? 0 : 1].classList.add('active');

        // Update Indicator Position
        indicator.style.left = isHome ? '0' : '120px';

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

    // Initialize with home view
    toggleContent(true);
});

// ABOUT US TABS //
document.addEventListener("DOMContentLoaded", function () {
    // Initialize tabs for both home and business sections
    document.querySelectorAll('.about-section').forEach(section => {
        initializeTabs(section);
    });
});

function initializeTabs(tabsContainer) {
    const tabs = tabsContainer.querySelectorAll(".tab");
    const contents = tabsContainer.querySelectorAll(".content-text");

    if (tabs.length === 0 || contents.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            contents.forEach(content => content.style.display = "none");
            const selectedContent = tab.getAttribute("data-content");
            const contentToShow = tabsContainer.querySelector(`#${selectedContent}`);
            if (contentToShow) contentToShow.style.display = "block";
        });
    });

    // Initial setup
    tabs[0].classList.add("active");
    contents[0].style.display = "block";
}

/////// SERVICE MODAL SYSTEM /////////
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.querySelector('.close-modal');
    const serviceItems = document.querySelectorAll('.service-item');

    // Guard clause if modal doesn't exist on page
    if (!modal || !modalTitle || !modalText) return;

    // Function to open modal
    function openModal(title, text) {
        modalTitle.textContent = title;
        modalText.textContent = text;
        modal.classList.remove('hidden');
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModal() {
        modal.classList.add('hidden');
        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Add click listeners to service items
    serviceItems.forEach(item => {
        // Only add listener if item has data attributes
        if (item.dataset.title && item.dataset.text) {
            item.addEventListener('click', () => {
                openModal(item.dataset.title, item.dataset.text);
            });
        }
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

/////// SMART SCROLL - HEADER HIDE/SHOW /////////
document.addEventListener('DOMContentLoaded', () => {
    (function initSmartScroll() {
        const header = document.querySelector('.site-header');

        // Guard clause if header doesn't exist
        if (!header) {
            console.warn('Smart Scroll: Header not found');
            return;
        }

        let lastScrollTop = 0;
        const scrollThreshold = 100; // Don't hide header until scrolled past 100px

        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Check if mobile menu is open (safeguard)
            const mobileMenu = document.querySelector('.mobile-menu, .header-nav');
            const isMobileMenuOpen = mobileMenu && (
                mobileMenu.classList.contains('active') ||
                mobileMenu.classList.contains('open') ||
                mobileMenu.classList.contains('show')
            );

            // Don't hide header if mobile menu is open
            if (isMobileMenuOpen) {
                return;
            }

            // Scrolling down AND past threshold
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                header.classList.add('header-hidden');
            }
            // Scrolling up
            else if (scrollTop < lastScrollTop) {
                header.classList.remove('header-hidden');
            }

            // Update last scroll position
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative values
        }

        // Attach scroll listener with passive option for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        console.log('Smart Scroll: Initialized successfully');
    })();
});
