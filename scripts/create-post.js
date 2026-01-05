#!/usr/bin/env node

/**
 * SoonTech Blog Post Creation CLI
 * Automates the creation of new blog posts by prompting for details
 * and appending them to the blog-posts.json database.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m'
};

// Path to blog posts JSON file
const BLOG_POSTS_PATH = path.join(__dirname, '..', 'src', 'data', 'blog-posts.json');

// Valid categories
const VALID_CATEGORIES = [
    'Cybersecurity',
    'AI & Innovation',
    'Business Growth',
    'Smart Home',
    'Tech Tutorials'
];

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
 * Generate slug from title
 * Removes special characters, converts to lowercase, replaces spaces with hyphens
 */
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .replace(/-+/g, '-');          // Replace multiple hyphens with single
}

/**
 * Format current date as "Month DD, YYYY"
 */
function formatDate() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Generate ISO date string for sorting
 */
function generateISODate() {
    const date = new Date();
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * Read existing blog posts from JSON file
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
 * Validate category
 */
function isValidCategory(category) {
    return VALID_CATEGORIES.includes(category);
}

/**
 * Display welcome banner
 */
function displayBanner() {
    console.log(`\n${colors.bright}${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}║   SoonTech Insights - New Post Creator    ║${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}╚════════════════════════════════════════════╝${colors.reset}\n`);
}

/**
 * Display category options
 */
function displayCategories() {
    console.log(`${colors.yellow}Available Categories:${colors.reset}`);
    VALID_CATEGORIES.forEach((cat, index) => {
        console.log(`  ${index + 1}. ${cat}`);
    });
    console.log('');
}

/**
 * Main function to create a new post
 */
async function createPost() {
    try {
        displayBanner();

        // Read existing posts
        const posts = readBlogPosts();
        console.log(`${colors.blue}ℹ Current posts in database: ${posts.length}${colors.reset}\n`);

        // Collect post details
        const title = await question(`${colors.bright}Enter Post Title:${colors.reset} `);
        if (!title.trim()) {
            console.error(`${colors.red}❌ Title cannot be empty${colors.reset}`);
            rl.close();
            return;
        }

        displayCategories();
        const category = await question(`${colors.bright}Enter Category:${colors.reset} `);
        if (!isValidCategory(category)) {
            console.error(`${colors.red}❌ Invalid category. Please choose from the list above.${colors.reset}`);
            rl.close();
            return;
        }

        const imageFilename = await question(`${colors.bright}Enter Image Filename (e.g., ai-trend.jpg):${colors.reset} `);
        if (!imageFilename.trim()) {
            console.error(`${colors.red}❌ Image filename cannot be empty${colors.reset}`);
            rl.close();
            return;
        }

        const excerpt = await question(`${colors.bright}Enter Short Excerpt:${colors.reset} `);
        if (!excerpt.trim()) {
            console.error(`${colors.red}❌ Excerpt cannot be empty${colors.reset}`);
            rl.close();
            return;
        }

        console.log(`${colors.yellow}Enter Main Content (HTML allowed). Type 'END' on a new line when finished:${colors.reset}`);
        let content = '';
        let line;
        while ((line = await question('')) !== 'END') {
            content += line + '\n';
        }

        if (!content.trim()) {
            console.error(`${colors.red}❌ Content cannot be empty${colors.reset}`);
            rl.close();
            return;
        }

        const readTime = await question(`${colors.bright}Enter Read Time (e.g., "5 min"):${colors.reset} `);
        const author = await question(`${colors.bright}Enter Author Name (default: "SoonTech Team"):${colors.reset} `) || 'SoonTech Team';

        // Generate post data
        const newPost = {
            id: getNextId(posts),
            title: title.trim(),
            category: category.trim(),
            date: generateISODate(),
            image: `Assets/Images/${imageFilename.trim()}`,
            excerpt: excerpt.trim(),
            content: content.trim(),
            readTime: readTime.trim() || '5 min',
            author: author.trim()
        };

        // Add new post to the beginning of the array
        posts.unshift(newPost);

        // Write updated posts to file
        writeBlogPosts(posts);

        // Display success message
        console.log(`\n${colors.green}${colors.bright}✅ New Insight Published Successfully!${colors.reset}`);
        console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.cyan}Post ID:${colors.reset} ${newPost.id}`);
        console.log(`${colors.cyan}Title:${colors.reset} ${newPost.title}`);
        console.log(`${colors.cyan}Category:${colors.reset} ${newPost.category}`);
        console.log(`${colors.cyan}Date:${colors.reset} ${formatDate()}`);
        console.log(`${colors.cyan}Slug:${colors.reset} ${generateSlug(newPost.title)}`);
        console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
        console.log(`${colors.blue}ℹ Total posts in database: ${posts.length}${colors.reset}\n`);

        rl.close();
    } catch (error) {
        console.error(`${colors.red}❌ Unexpected error: ${error.message}${colors.reset}`);
        rl.close();
        process.exit(1);
    }
}

// Run the script
createPost();
