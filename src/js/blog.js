// ===================================================================
// BLOG ENGINE - SoonTech Insights
// Dynamic search, filter, and rendering system
// ===================================================================

let allPosts = [];
let filteredPosts = [];
let currentCategory = 'all';
let currentSearchTerm = '';

// DOM Elements
const blogGrid = document.getElementById('blogGrid');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.category-btn');
const noResults = document.getElementById('noResults');

// Initialize Blog System
async function initBlog() {
    try {
        // Fetch blog posts from JSON database based on language
        const lang = localStorage.getItem('soontech_language') || 'en';
        console.log(`Blog Engine: Fetching blog-posts-${lang}.json...`);
        const response = await fetch(`./data/blog-posts-${lang}.json`);

        if (!response.ok) {
            // Fallback to default if localized version fails
            console.warn(`Blog Engine: ${lang} version not found, falling back to blog-posts.json`);
            const fallbackResponse = await fetch('./data/blog-posts.json');
            if (!fallbackResponse.ok) throw new Error('Could not load blog posts');
            allPosts = await fallbackResponse.json();
        } else {
            allPosts = await response.json();
        }

        filteredPosts = [...allPosts];

        // Initial render
        renderBlogPosts(filteredPosts);

        // Attach event listeners
        attachEventListeners();

        console.log(`✅ Blog initialized with ${allPosts.length} posts`);
    } catch (error) {
        console.error('❌ Error loading blog posts:', error);
        showError();
    }
}

// Render Blog Posts to Grid
function renderBlogPosts(posts) {
    // Clear existing content
    blogGrid.innerHTML = '';

    if (posts.length === 0) {
        // Show "No Results" message
        noResults.style.display = 'block';
        blogGrid.style.display = 'none';
        return;
    }

    // Hide "No Results" and show grid
    noResults.style.display = 'none';
    blogGrid.style.display = 'grid';

    // Generate HTML for each post
    posts.forEach(post => {
        const postCard = createPostCard(post);
        blogGrid.innerHTML += postCard;
    });
}

// Create HTML Card for a Single Post
function createPostCard(post) {
    // Generate slug from title if not provided in data
    const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

    return `
        <div class="news-item" data-id="${post.id}" data-slug="${slug}">
            <div class="news-image-link" data-post-id="${post.id}">
                <img src="${post.image}" alt="${post.title}" class="news-image">
            </div>
            <div class="card-text-content">
                <span class="post-category">${post.category}</span>
                <div class="news-title-link" data-post-id="${post.id}">
                    <h3 class="news-title">${post.title}</h3>
                </div>
                <p class="news-excerpt">${post.excerpt}</p>
                <div class="news-meta">
                    <span class="news-date"><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span class="news-read-time"><i class="far fa-clock"></i> ${post.readTime} <span data-i18n="blogPage.article.readTime">read</span></span>
                </div>
                <button class="read-more" data-post-id="${post.id}" data-i18n="blogPage.article.readMore">Read Article →</button>
            </div>
        </div>
    `;
}

// Format Date (e.g., "Jan 15, 2024")
function formatDate(dateString) {
    const lang = localStorage.getItem('soontech_language') || 'en';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', options);
}

// Attach Event Listeners
function attachEventListeners() {
    // Search Input - Real-time filtering
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase().trim();
        applyFilters();
    });

    // Category Buttons - Click filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            e.target.classList.add('active');

            // Update current category
            currentCategory = e.target.dataset.category;

            // Apply filters
            applyFilters();
        });
    });
}

// Apply Combined Filters (Search + Category)
function applyFilters() {
    filteredPosts = allPosts.filter(post => {
        // Category Filter
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;

        // Search Filter (searches title, excerpt, and content)
        const matchesSearch = currentSearchTerm === '' ||
            post.title.toLowerCase().includes(currentSearchTerm) ||
            post.excerpt.toLowerCase().includes(currentSearchTerm) ||
            post.content.toLowerCase().includes(currentSearchTerm) ||
            post.category.toLowerCase().includes(currentSearchTerm);

        return matchesCategory && matchesSearch;
    });

    // Re-render with filtered results
    renderBlogPosts(filteredPosts);

    // Log filter results
    console.log(`🔍 Filters applied: Category="${currentCategory}", Search="${currentSearchTerm}" → ${filteredPosts.length} results`);
}

// Show Error State
function showError() {
    blogGrid.innerHTML = `
        <div class="error-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #d9534f; margin-bottom: 1rem;"></i>
            <h3 style="color: #285a3b; margin-bottom: 0.5rem;" data-i18n="blogPage.error.title">Unable to Load Articles</h3>
            <p style="color: rgba(40, 90, 59, 0.7);" data-i18n="blogPage.error.message">Please check your connection and try again.</p>
        </div>
    `;
}

// ===================================================================
// READER MODE - Single Article View
// ===================================================================

// Toggle between list view and article view
function toggleView(view) {
    const listView = document.getElementById('blog-list-view');
    const articleView = document.getElementById('blog-article-view');

    if (view === 'article') {
        listView.classList.add('hidden');
        articleView.classList.remove('hidden');
        window.scrollTo(0, 0); // Scroll to top
    } else {
        listView.classList.remove('hidden');
        articleView.classList.add('hidden');
        window.scrollTo(0, 0); // Scroll to top
    }
}

// Display full article
function displayArticle(postId) {
    const post = allPosts.find(p => p.id === parseInt(postId));

    if (!post) {
        console.error('❌ Post not found:', postId);
        return;
    }

    // Populate article elements
    document.getElementById('articleImage').src = post.image;
    document.getElementById('articleImage').alt = post.title;
    document.getElementById('articleCategory').textContent = post.category;
    document.getElementById('articleDate').textContent = formatDate(post.date);
    document.getElementById('articleTitle').textContent = post.title;
    document.getElementById('articleAuthor').textContent = post.author;
    document.getElementById('articleReadTime').innerHTML = `${post.readTime} <span data-i18n="blogPage.article.readTime">read</span>`;
    document.getElementById('articleBody').innerHTML = post.content;

    // Generate slug for URL
    const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

    // Update URL without reloading
    const newUrl = `${window.location.pathname}?post=${slug}`;
    window.history.pushState({ postId: post.id }, '', newUrl);

    // Switch to article view
    toggleView('article');

    console.log(`📖 Displaying article: ${post.title}`);
}

// Handle back to insights
function handleBackToInsights() {
    // Clear URL parameter
    window.history.pushState({}, '', window.location.pathname);

    // Switch back to list view
    toggleView('list');

    console.log('📋 Returned to insights list');
}

// Attach click handlers to blog cards (Event Delegation)
function attachCardClickHandlers() {
    // Use event delegation on the blog grid
    blogGrid.addEventListener('click', (e) => {
        // Find the closest element with data-post-id
        const target = e.target.closest('[data-post-id]');

        if (target) {
            e.preventDefault();
            const postId = target.dataset.postId;
            displayArticle(postId);
        }
    });
}

// Check URL for post parameter on load
function checkUrlForPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');

    if (postSlug) {
        // Find post by slug
        const post = allPosts.find(p => {
            const slug = p.slug || p.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
            return slug === postSlug;
        });

        if (post) {
            displayArticle(post.id);
        }
    }
}

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initBlog().then(() => {
        // Attach card click handlers after posts are loaded
        attachCardClickHandlers();

        // Check if URL has a post parameter
        checkUrlForPost();

        // Attach back button handler
        const backButton = document.getElementById('backToInsights');
        if (backButton) {
            backButton.addEventListener('click', handleBackToInsights);
        }
    });
});
