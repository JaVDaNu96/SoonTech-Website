// ===================================================================
// SERVICE LOADER - Dynamic Service Detail Page
// ===================================================================

// Icon Mapping for Services
const ICON_MAP = {
    'home-network': 'fa-wifi',
    'home-device-setup': 'fa-laptop-medical',
    'home-data-backup': 'fa-cloud-upload-alt',
    'home-digital-wellness': 'fa-user-shield',
    'business-it-support': 'fa-headset',
    'business-cloud-migration': 'fa-cloud',
    'business-cybersecurity': 'fa-shield-alt',
    'default': 'fa-cogs'
};

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Service Loader: Initializing...');

    // Parse URL to get service ID
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    console.log('Service Loader: Requested ID:', serviceId);

    // Check if ID exists
    if (!serviceId) {
        console.error('Service Loader: No service ID provided in URL');
        showNotFound();
        return;
    }

    try {
        // Fetch services data
        console.log('Service Loader: Fetching services.json...');
        const response = await fetch('data/services.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const services = await response.json();
        console.log('Service Loader: Loaded', services.length, 'services');

        // Find the matching service
        const service = services.find(s => s.id === serviceId);

        if (!service) {
            console.error('Service Loader: Service not found for ID:', serviceId);
            showNotFound();
            return;
        }

        console.log('Service Loader: Found service:', service.title);

        // Render the service (pass all services for related services)
        renderService(service, services);

    } catch (error) {
        console.error('Service Loader: Error loading service data:', error);
        showNotFound();
    }
});

/**
 * Render service details to the page
 * @param {Object} service - The current service object
 * @param {Array} allServices - All services for related services section
 */
function renderService(service, allServices) {
    console.log('Service Loader: Rendering service...');

    // Update page title and meta description
    document.getElementById('pageTitle').textContent = `${service.title} - SoonTech`;
    document.getElementById('pageDescription').content = service.subtitle;

    // Update hero section with icon visual
    renderHeroSection(service);

    // Update overview
    document.getElementById('serviceOverview').innerHTML = `<p>${service.overview}</p>`;

    // Render features list
    const featureList = document.getElementById('featureList');
    featureList.innerHTML = ''; // Clear loading message

    service.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${feature}`;
        featureList.appendChild(li);
    });

    // Render benefits list (if available)
    if (service.benefits && service.benefits.length > 0) {
        const benefitsList = document.getElementById('benefitsList');
        benefitsList.innerHTML = ''; // Clear any existing content

        service.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-star"></i> ${benefit}`;
            benefitsList.appendChild(li);
        });
    } else {
        // Hide benefits section if no benefits
        document.getElementById('serviceBenefits').style.display = 'none';
    }

    // Update CTA button
    if (service.ctaText) {
        document.getElementById('ctaText').textContent = service.ctaText;
    }

    if (service.ctaLink) {
        document.getElementById('ctaButton').href = service.ctaLink;
    }

    // === NEW: Trust Module (Home Services Only) ===
    if (service.category === 'home') {
        renderTrustModule();
    }

    // === NEW: Service Inclusions ===
    if (service.inclusions && service.inclusions.length > 0) {
        renderInclusions(service.inclusions);
    }

    // === NEW: Related Services ===
    if (allServices && allServices.length > 0) {
        renderRelatedServices(service, allServices);
    }

    console.log('Service Loader: Rendering complete ✓');
}

/**
 * Render Hero Section with Icon Visual
 * @param {Object} service - The current service object
 */
function renderHeroSection(service) {
    const heroSection = document.getElementById('serviceHero');
    const heroContentWrapper = heroSection.querySelector('.hero-content-wrapper');

    // Get icon class for this service
    const iconClass = ICON_MAP[service.id] || ICON_MAP['default'];

    // Theme Switcher: Apply business theme for business services
    if (service.category === 'business') {
        document.body.classList.add('business-theme');
        // Change Hero Gradient to Navy
        heroSection.style.background = 'linear-gradient(135deg, rgba(26, 44, 78, 0.9) 0%, rgba(15, 26, 46, 0.9) 100%)';
    } else {
        document.body.classList.remove('business-theme');
        // Keep Home Green Gradient
        heroSection.style.background = 'linear-gradient(135deg, #285a3b 0%, #1a3c27 100%)';
    }

    // Create hero content with icon visual
    heroContentWrapper.innerHTML = `
        <div class="hero-text">
            <h1 id="serviceTitle">${service.title}</h1>
            <p id="serviceSubtitle">${service.subtitle}</p>
        </div>
        <div class="hero-icon-visual">
            <i class="fas ${iconClass}"></i>
        </div>
    `;
}

/**
 * Render Trust Module for Home Services
 */
function renderTrustModule() {
    const trustContainer = document.getElementById('trustModuleContainer');

    const trustHTML = `
        <section class="trust-module">
            <div class="trust-container">
                <h2 class="trust-heading">Trust & Safety</h2>
                <p class="trust-subheading">Your home, your privacy, our commitment</p>
                <div class="trust-grid">
                    <div class="trust-item">
                        <div class="trust-icon">
                            <i class="fas fa-user-shield"></i>
                        </div>
                        <h3>Verified Experts</h3>
                        <p>Background-checked technicians with years of experience</p>
                    </div>
                    <div class="trust-item">
                        <div class="trust-icon">
                            <i class="fas fa-lock"></i>
                        </div>
                        <h3>Data Privacy</h3>
                        <p>Your information stays private and secure</p>
                    </div>
                    <div class="trust-item">
                        <div class="trust-icon">
                            <i class="fas fa-certificate"></i>
                        </div>
                        <h3>Satisfaction Guarantee</h3>
                        <p>100% satisfaction or your money back</p>
                    </div>
                </div>
            </div>
        </section>
    `;

    trustContainer.innerHTML = trustHTML;
    console.log('Service Loader: Trust Module rendered ✓');
}

/**
 * Render Service Inclusions
 * @param {Array} inclusions - List of inclusion items
 */
function renderInclusions(inclusions) {
    const inclusionsSection = document.getElementById('inclusionsSection');
    const inclusionsGrid = document.getElementById('inclusionsGrid');

    inclusionsGrid.innerHTML = ''; // Clear any existing content

    inclusions.forEach(inclusion => {
        const card = document.createElement('div');
        card.className = 'inclusion-card';
        card.innerHTML = `
            <div class="inclusion-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h4>${inclusion}</h4>
        `;
        inclusionsGrid.appendChild(card);
    });

    // Show the section
    inclusionsSection.classList.remove('hidden');
    console.log('Service Loader: Inclusions rendered ✓', inclusions.length, 'items');
}

/**
 * Render Related Services with FontAwesome Icons
 * @param {Object} currentService - The current service object
 * @param {Array} allServices - All available services
 */
function renderRelatedServices(currentService, allServices) {
    // Filter services: same category, exclude current service
    const relatedServices = allServices.filter(s =>
        s.category === currentService.category && s.id !== currentService.id
    ).slice(0, 3); // Get top 3

    if (relatedServices.length === 0) {
        console.log('Service Loader: No related services found');
        return;
    }

    const relatedSection = document.getElementById('relatedServicesSection');
    const relatedGrid = document.getElementById('relatedGrid');

    relatedGrid.innerHTML = ''; // Clear any existing content

    relatedServices.forEach(service => {
        // Get icon class for this service
        const iconClass = ICON_MAP[service.id] || ICON_MAP['default'];

        const card = document.createElement('div');
        card.className = 'related-card';
        card.innerHTML = `
            <div class="related-icon-circle">
                <i class="fas ${iconClass}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.subtitle}</p>
            <a href="service-detail.html?id=${service.id}" class="related-link">
                Learn More <i class="fas fa-arrow-right"></i>
            </a>
        `;
        relatedGrid.appendChild(card);
    });

    // Show the section
    relatedSection.classList.remove('hidden');
    console.log('Service Loader: Related Services rendered ✓', relatedServices.length, 'services');
}

/**
 * Show "Service Not Found" message
 */
function showNotFound() {
    console.log('Service Loader: Showing not found message');

    // Hide main content sections
    document.getElementById('serviceHero').style.display = 'none';
    document.querySelector('.service-content-section').style.display = 'none';
    document.getElementById('serviceCTA').style.display = 'none';

    // Show not found message
    const notFoundSection = document.getElementById('serviceNotFound');
    notFoundSection.classList.remove('hidden');

    // Update page title
    document.getElementById('pageTitle').textContent = 'Service Not Found - SoonTech';
}
