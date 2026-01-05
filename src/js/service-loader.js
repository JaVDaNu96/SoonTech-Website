// ===================================================================
// SERVICE LOADER - Dynamic Service Detail Page
// ===================================================================

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

        // Render the service
        renderService(service);

    } catch (error) {
        console.error('Service Loader: Error loading service data:', error);
        showNotFound();
    }
});

/**
 * Render service details to the page
 */
function renderService(service) {
    console.log('Service Loader: Rendering service...');

    // Update page title and meta description
    document.getElementById('pageTitle').textContent = `${service.title} - SoonTech`;
    document.getElementById('pageDescription').content = service.subtitle;

    // Update hero section
    const heroSection = document.getElementById('serviceHero');
    heroSection.style.backgroundImage = `linear-gradient(rgba(40, 90, 59, 0.85), rgba(40, 90, 59, 0.85)), url('${service.heroImage}')`;
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';

    document.getElementById('serviceTitle').textContent = service.title;
    document.getElementById('serviceSubtitle').textContent = service.subtitle;

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

    console.log('Service Loader: Rendering complete ✓');
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
