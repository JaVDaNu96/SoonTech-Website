#!/usr/bin/env node

/**
 * SoonTech Blog Management System (CMS)
 * Full CRUD operations for blog posts with menu-driven interface
 * Create, Read, Edit, and Delete blog posts
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

// Path to blog posts JSON file
const BLOG_POSTS_PATH = path.join(__dirname, '..', 'src', 'data', 'blog-posts.json');

// Category mapping (Numeric input for ease of use)
const CATEGORIES = {
    1: "Cybersecurity",
    2: "AI & Innovation",
    3: "Business Growth",
    4: "Smart Home",
    5: "Tech Tutorials"
};

/**
 * Create readline interface for user input
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Promisified question function
 */
function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

/**
 * Clear console screen
 */
function clearScreen() {
    console.clear();
}

/**
 * Generate slug from title
 */
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

/**
 * Generate ISO date string
 */
function generateISODate() {
    const date = new Date();
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Read blog posts from JSON file
 */
function readBlogPosts() {
    try {
        if (!fs.existsSync(BLOG_POSTS_PATH)) {
            console.error(`${colors.red}❌ Error: Blog posts file not found at ${BLOG_POSTS_PATH}${colors.reset}`);
            process.exit(1);
        }

        const data = fs.readFileSync(BLOG_POSTS_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`${colors.red}❌ Error reading blog posts file: ${error.message}${colors.reset}`);
        process.exit(1);
    }
}

/**
 * Write blog posts to JSON file
 */
function writeBlogPosts(posts) {
    try {
        const jsonData = JSON.stringify(posts, null, 2);
        fs.writeFileSync(BLOG_POSTS_PATH, jsonData, 'utf8');
    } catch (error) {
        console.error(`${colors.red}❌ Error writing blog posts file: ${error.message}${colors.reset}`);
        process.exit(1);
    }
}

/**
 * Get next available ID
 */
function getNextId(posts) {
    if (posts.length === 0) return 1;
    const maxId = Math.max(...posts.map(post => post.id));
    return maxId + 1;
}

/**
 * Display main menu banner
 */
function displayBanner() {
    console.log(`\n${colors.bright}${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}║   SoonTech Blog Management System (CMS)   ║${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}╚════════════════════════════════════════════╝${colors.reset}\n`);
}

/**
 * Display category options
 */
function displayCategories() {
    console.log(`${colors.yellow}Available Categories:${colors.reset}`);
    Object.entries(CATEGORIES).forEach(([num, name]) => {
        console.log(`  ${colors.cyan}[${num}]${colors.reset} ${name}`);
    });
    console.log('');
}

/**
 * Get category by number
 */
async function getCategoryByNumber() {
    displayCategories();
    while (true) {
        const input = await question(`${colors.bright}Enter Category Number (1-5):${colors.reset} `);
        const num = parseInt(input);
        if (num >= 1 && num <= 5) {
            return CATEGORIES[num];
        }
        console.log(`${colors.red}❌ Invalid selection. Please enter a number between 1 and 5.${colors.reset}`);
    }
}

/**
 * Display list of all posts
 */
function displayPostsList(posts) {
    console.log(`\n${colors.bright}${colors.blue}Current Blog Posts (${posts.length} total):${colors.reset}`);
    console.log(`${colors.dim}${'─'.repeat(80)}${colors.reset}`);

    posts.forEach((post, index) => {
        console.log(`${colors.cyan}[${index}]${colors.reset} ${colors.bright}${post.title}${colors.reset}`);
        console.log(`    ${colors.dim}Category: ${post.category} | Date: ${post.date} | ID: ${post.id}${colors.reset}`);
    });

    console.log(`${colors.dim}${'─'.repeat(80)}${colors.reset}\n`);
}

/**
 * CREATE: Add a new blog post
 */
async function addPost() {
    clearScreen();
    console.log(`${colors.bright}${colors.green}➕ ADD NEW BLOG POST${colors.reset}\n`);

    const posts = readBlogPosts();

    // Collect post details
    const title = await question(`${colors.bright}Post Title:${colors.reset} `);
    if (!title.trim()) {
        console.log(`${colors.red}❌ Title cannot be empty${colors.reset}`);
        return;
    }

    const category = await getCategoryByNumber();

    const imageFilename = await question(`${colors.bright}Image Filename (e.g., ai-trend.jpg):${colors.reset} `);
    if (!imageFilename.trim()) {
        console.log(`${colors.red}❌ Image filename cannot be empty${colors.reset}`);
        return;
    }

    const excerpt = await question(`${colors.bright}Short Excerpt:${colors.reset} `);
    if (!excerpt.trim()) {
        console.log(`${colors.red}❌ Excerpt cannot be empty${colors.reset}`);
        return;
    }

    console.log(`${colors.yellow}Enter Main Content (HTML allowed). Type 'END' on a new line when finished:${colors.reset}`);
    let content = '';
    let line;
    while ((line = await question('')) !== 'END') {
        content += line + '\n';
    }

    if (!content.trim()) {
        console.log(`${colors.red}❌ Content cannot be empty${colors.reset}`);
        return;
    }

    const readTime = await question(`${colors.bright}Read Time (e.g., "5 min"):${colors.reset} `) || '5 min';
    const author = await question(`${colors.bright}Author Name (default: "SoonTech Team"):${colors.reset} `) || 'SoonTech Team';

    // Generate post data
    const newPost = {
        id: getNextId(posts),
        title: title.trim(),
        category: category,
        date: generateISODate(),
        image: `Assets/Images/${imageFilename.trim()}`,
        excerpt: excerpt.trim(),
        content: content.trim(),
        readTime: readTime.trim(),
        author: author.trim()
    };

    // Add to beginning of array
    posts.unshift(newPost);

    // Save
    writeBlogPosts(posts);

    // Success message
    console.log(`\n${colors.green}${colors.bright}✅ Blog Post Created Successfully!${colors.reset}`);
    console.log(`${colors.green}${'━'.repeat(50)}${colors.reset}`);
    console.log(`${colors.cyan}ID:${colors.reset} ${newPost.id}`);
    console.log(`${colors.cyan}Title:${colors.reset} ${newPost.title}`);
    console.log(`${colors.cyan}Category:${colors.reset} ${newPost.category}`);
    console.log(`${colors.cyan}Date:${colors.reset} ${formatDate(newPost.date)}`);
    console.log(`${colors.green}${'━'.repeat(50)}${colors.reset}\n`);
}

/**
 * READ: View all posts
 */
async function viewPosts() {
    clearScreen();
    console.log(`${colors.bright}${colors.blue}📋 VIEW ALL BLOG POSTS${colors.reset}\n`);

    const posts = readBlogPosts();
    displayPostsList(posts);

    await question(`${colors.dim}Press Enter to continue...${colors.reset}`);
}

/**
 * EDIT: Update an existing post
 */
async function editPost() {
    clearScreen();
    console.log(`${colors.bright}${colors.yellow}✏️  EDIT BLOG POST${colors.reset}\n`);

    const posts = readBlogPosts();

    if (posts.length === 0) {
        console.log(`${colors.red}❌ No posts available to edit${colors.reset}\n`);
        await question(`${colors.dim}Press Enter to continue...${colors.reset}`);
        return;
    }

    displayPostsList(posts);

    const indexInput = await question(`${colors.bright}Enter Post Index to Edit (0-${posts.length - 1}):${colors.reset} `);
    const index = parseInt(indexInput);

    if (isNaN(index) || index < 0 || index >= posts.length) {
        console.log(`${colors.red}❌ Invalid index${colors.reset}`);
        return;
    }

    const post = posts[index];
    console.log(`\n${colors.bright}Editing: ${post.title}${colors.reset}`);
    console.log(`${colors.dim}Press Enter to keep current value${colors.reset}\n`);

    // Edit Title
    const newTitle = await question(`${colors.cyan}Title${colors.reset} [${post.title}]: `);
    if (newTitle.trim()) post.title = newTitle.trim();

    // Edit Category
    console.log(`${colors.cyan}Current Category:${colors.reset} ${post.category}`);
    const changeCategory = await question(`${colors.bright}Change category? (y/n):${colors.reset} `);
    if (changeCategory.toLowerCase() === 'y') {
        post.category = await getCategoryByNumber();
    }

    // Edit Image
    const newImage = await question(`${colors.cyan}Image Filename${colors.reset} [${post.image.replace('Assets/Images/', '')}]: `);
    if (newImage.trim()) post.image = `Assets/Images/${newImage.trim()}`;

    // Edit Excerpt
    const newExcerpt = await question(`${colors.cyan}Excerpt${colors.reset} [${post.excerpt.substring(0, 50)}...]: `);
    if (newExcerpt.trim()) post.excerpt = newExcerpt.trim();

    // Edit Content
    const changeContent = await question(`${colors.bright}Edit content? (y/n):${colors.reset} `);
    if (changeContent.toLowerCase() === 'y') {
        console.log(`${colors.yellow}Enter new content (HTML allowed). Type 'END' on a new line when finished:${colors.reset}`);
        let content = '';
        let line;
        while ((line = await question('')) !== 'END') {
            content += line + '\n';
        }
        if (content.trim()) post.content = content.trim();
    }

    // Edit Read Time
    const newReadTime = await question(`${colors.cyan}Read Time${colors.reset} [${post.readTime}]: `);
    if (newReadTime.trim()) post.readTime = newReadTime.trim();

    // Edit Author
    const newAuthor = await question(`${colors.cyan}Author${colors.reset} [${post.author}]: `);
    if (newAuthor.trim()) post.author = newAuthor.trim();

    // Save changes
    writeBlogPosts(posts);

    console.log(`\n${colors.green}${colors.bright}✅ Post Updated Successfully!${colors.reset}\n`);
}

/**
 * DELETE: Remove a post
 */
async function deletePost() {
    clearScreen();
    console.log(`${colors.bright}${colors.red}🗑️  DELETE BLOG POST${colors.reset}\n`);

    const posts = readBlogPosts();

    if (posts.length === 0) {
        console.log(`${colors.red}❌ No posts available to delete${colors.reset}\n`);
        await question(`${colors.dim}Press Enter to continue...${colors.reset}`);
        return;
    }

    displayPostsList(posts);

    const indexInput = await question(`${colors.bright}Enter Post Index to Delete (0-${posts.length - 1}):${colors.reset} `);
    const index = parseInt(indexInput);

    if (isNaN(index) || index < 0 || index >= posts.length) {
        console.log(`${colors.red}❌ Invalid index${colors.reset}`);
        return;
    }

    const post = posts[index];
    console.log(`\n${colors.yellow}⚠️  You are about to delete:${colors.reset}`);
    console.log(`${colors.bright}${post.title}${colors.reset}`);
    console.log(`${colors.dim}Category: ${post.category} | ID: ${post.id}${colors.reset}\n`);

    const confirm = await question(`${colors.red}${colors.bright}Are you sure? This cannot be undone! (yes/no):${colors.reset} `);

    if (confirm.toLowerCase() === 'yes') {
        posts.splice(index, 1);
        writeBlogPosts(posts);
        console.log(`\n${colors.green}✅ Post deleted successfully${colors.reset}\n`);
    } else {
        console.log(`\n${colors.blue}ℹ Deletion cancelled${colors.reset}\n`);
    }
}

/**
 * Main Menu
 */
async function mainMenu() {
    while (true) {
        clearScreen();
        displayBanner();

        const posts = readBlogPosts();
        console.log(`${colors.blue}ℹ Current posts in database: ${posts.length}${colors.reset}\n`);

        console.log(`${colors.bright}Choose an action:${colors.reset}`);
        console.log(`  ${colors.green}[1]${colors.reset} ➕ Add New Post`);
        console.log(`  ${colors.blue}[2]${colors.reset} 📋 View All Posts`);
        console.log(`  ${colors.yellow}[3]${colors.reset} ✏️  Edit Post`);
        console.log(`  ${colors.red}[4]${colors.reset} 🗑️  Delete Post`);
        console.log(`  ${colors.dim}[5]${colors.reset} 🚪 Exit\n`);

        const choice = await question(`${colors.bright}Enter your choice (1-5):${colors.reset} `);

        switch (choice) {
            case '1':
                await addPost();
                await question(`\n${colors.dim}Press Enter to continue...${colors.reset}`);
                break;
            case '2':
                await viewPosts();
                break;
            case '3':
                await editPost();
                await question(`\n${colors.dim}Press Enter to continue...${colors.reset}`);
                break;
            case '4':
                await deletePost();
                await question(`\n${colors.dim}Press Enter to continue...${colors.reset}`);
                break;
            case '5':
                console.log(`\n${colors.cyan}👋 Goodbye! Happy blogging!${colors.reset}\n`);
                rl.close();
                process.exit(0);
            default:
                console.log(`\n${colors.red}❌ Invalid choice. Please enter 1-5.${colors.reset}`);
                await question(`\n${colors.dim}Press Enter to continue...${colors.reset}`);
        }
    }
}

// Start the application
mainMenu().catch(error => {
    console.error(`${colors.red}❌ Unexpected error: ${error.message}${colors.reset}`);
    rl.close();
    process.exit(1);
});
