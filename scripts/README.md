# SoonTech Blog Management System (CMS)

## Overview

The **Blog Management System** is a comprehensive CLI-based Content Management System for SoonTech Insights. It provides full CRUD (Create, Read, Update, Delete) operations through an intuitive menu-driven interface.

---

## 🚀 Quick Start

### Launch the CMS

```bash
npm run manage-blog
```

### Main Menu

```
╔════════════════════════════════════════════╗
║   SoonTech Blog Management System (CMS)   ║
╚════════════════════════════════════════════╝

ℹ Current posts in database: 12

Choose an action:
  [1] ➕ Add New Post
  [2] 📋 View All Posts
  [3] ✏️  Edit Post
  [4] 🗑️  Delete Post
  [5] 🚪 Exit

Enter your choice (1-5):
```

---

## 📋 Features

### ✅ Full CRUD Operations
- **Create**: Add new blog posts with guided prompts
- **Read**: View all posts with details
- **Update**: Edit existing posts field-by-field
- **Delete**: Remove posts with confirmation

### ✅ Enhanced User Experience
- **Menu-Driven Interface**: Easy navigation with numbered options
- **Numeric Category Selection**: Choose categories by number (1-5)
- **Color-Coded Output**: Visual feedback with ANSI colors
- **Field-by-Field Editing**: Update only what you need
- **Confirmation Prompts**: Prevent accidental deletions
- **Data Validation**: Ensures data integrity

### ✅ Smart Features
- **Auto-Generated IDs**: Automatic ID assignment
- **Auto-Generated Dates**: Current date stamping
- **Slug Generation**: URL-friendly identifiers
- **Keep Current Values**: Press Enter to skip editing fields
- **Post Count Display**: Always shows total posts

---

## 🎯 Operations Guide

### 1️⃣ **Add New Post**

**Steps**:
1. Select `[1]` from main menu
2. Enter post details when prompted:
   - **Title**: Post title
   - **Category**: Select number 1-5
   - **Image**: Filename only (e.g., `ai-trends.jpg`)
   - **Excerpt**: Short description
   - **Content**: Multi-line (type `END` to finish)
   - **Read Time**: Estimated time (e.g., "5 min")
   - **Author**: Author name (default: "SoonTech Team")

**Category Selection**:
```
Available Categories:
  [1] Cybersecurity
  [2] AI & Innovation
  [3] Business Growth
  [4] Smart Home
  [5] Tech Tutorials

Enter Category Number (1-5): 2
```

**Example**:
```
Post Title: 10 AI Trends for 2026
Enter Category Number (1-5): 2
Image Filename: ai-trends-2026.jpg
Short Excerpt: Discover the top AI trends shaping the future...
Enter Main Content (HTML allowed). Type 'END' on a new line when finished:
<p>Artificial intelligence continues to evolve...</p>
END
Read Time: 7 min
Author Name: [Press Enter for default]

✅ Blog Post Created Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ID: 13
Title: 10 AI Trends for 2026
Category: AI & Innovation
Date: January 4, 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 2️⃣ **View All Posts**

**Steps**:
1. Select `[2]` from main menu
2. View list of all posts with details

**Display Format**:
```
Current Blog Posts (12 total):
────────────────────────────────────────────────────────────────────────────────
[0] 10 AI Trends for 2026
    Category: AI & Innovation | Date: 2026-01-04 | ID: 13
[1] Cybersecurity Best Practices for Small Businesses
    Category: Cybersecurity | Date: 2026-01-03 | ID: 12
[2] Smart Home Automation Guide
    Category: Smart Home | Date: 2026-01-02 | ID: 11
────────────────────────────────────────────────────────────────────────────────
```

---

### 3️⃣ **Edit Post**

**Steps**:
1. Select `[3]` from main menu
2. View list of all posts
3. Enter the **index number** of the post to edit (e.g., `0`, `1`, `2`)
4. For each field:
   - **Press Enter** to keep current value
   - **Type new value** to update

**Editable Fields**:
- Title
- Category (y/n prompt, then numeric selection)
- Image filename
- Excerpt
- Content (y/n prompt, then multi-line input)
- Read time
- Author

**Note**: ID and Date are preserved (not editable)

**Example**:
```
Enter Post Index to Edit (0-11): 0

Editing: 10 AI Trends for 2026
Press Enter to keep current value

Title [10 AI Trends for 2026]: 
Current Category: AI & Innovation
Change category? (y/n): n
Image Filename [ai-trends-2026.jpg]: 
Excerpt [Discover the top AI trends shaping the future...]: 
Edit content? (y/n): n
Read Time [7 min]: 8 min
Author [SoonTech Team]: 

✅ Post Updated Successfully!
```

---

### 4️⃣ **Delete Post**

**Steps**:
1. Select `[4]` from main menu
2. View list of all posts
3. Enter the **index number** of the post to delete
4. Confirm deletion by typing `yes`

**Safety Features**:
- Shows post details before deletion
- Requires typing `yes` (not just `y`)
- Cannot be undone warning

**Example**:
```
Enter Post Index to Delete (0-11): 5

⚠️  You are about to delete:
Old Blog Post Title
Category: Tech Tutorials | ID: 8

Are you sure? This cannot be undone! (yes/no): yes

✅ Post deleted successfully
```

---

### 5️⃣ **Exit**

**Steps**:
1. Select `[5]` from main menu
2. Application closes gracefully

```
👋 Goodbye! Happy blogging!
```

---

## 🎨 Category System

### Numeric Selection

Instead of typing full category names, simply enter a number:

| Number | Category |
|--------|----------|
| **1** | Cybersecurity |
| **2** | AI & Innovation |
| **3** | Business Growth |
| **4** | Smart Home |
| **5** | Tech Tutorials |

**Benefits**:
- ✅ Faster input
- ✅ No typos
- ✅ Consistent naming
- ✅ Validation built-in

---

## 📊 Data Structure

### Post Object

```json
{
  "id": 13,
  "title": "10 AI Trends for 2026",
  "category": "AI & Innovation",
  "date": "2026-01-04",
  "image": "Assets/Images/ai-trends-2026.jpg",
  "excerpt": "Discover the top AI trends...",
  "content": "<p>Full content here...</p>",
  "readTime": "7 min",
  "author": "SoonTech Team"
}
```

### Field Preservation

**Auto-Generated (Not Editable)**:
- `id` - Unique identifier (preserved during edit)
- `date` - Creation date (preserved during edit)

**User-Provided (Editable)**:
- `title` - Post title
- `category` - Selected from predefined list
- `image` - Image path (auto-prepends `Assets/Images/`)
- `excerpt` - Short description
- `content` - Full post content (HTML allowed)
- `readTime` - Estimated reading time
- `author` - Author name

---

## 🛡️ Data Integrity

### Validation

- **Required Fields**: Title, category, image, excerpt, content
- **Category Validation**: Must be 1-5
- **Index Validation**: Must be valid array index
- **File Existence**: Checks if JSON file exists
- **JSON Parsing**: Handles corrupt JSON gracefully

### Safety Features

- **Confirmation for Delete**: Requires typing `yes`
- **Preview Before Delete**: Shows post details
- **Keep Current Values**: Press Enter to skip editing
- **Error Messages**: Clear, color-coded feedback
- **Backup Recommendation**: Always backup `blog-posts.json` before bulk operations

---

## 💡 Tips & Best Practices

### Adding Posts

1. **Upload images first** to `src/Assets/Images/`
2. **Use descriptive filenames** (e.g., `ai-trends-2026.jpg`)
3. **Keep excerpts concise** (~150 characters)
4. **Use HTML in content** for formatting
5. **Estimate read time** (~200 words/minute)

### Editing Posts

1. **Press Enter to keep** current values
2. **Edit only what changed** (faster workflow)
3. **Preview changes** by viewing all posts after editing
4. **ID and date preserved** automatically

### Deleting Posts

1. **Double-check the index** before confirming
2. **Type `yes` fully** (not just `y`)
3. **Cannot be undone** - be certain
4. **Backup first** for bulk deletions

### Category Selection

1. **Use numbers 1-5** for speed
2. **No need to type** full category name
3. **Validation prevents errors**
4. **Consistent naming** across all posts

---

## 🔧 Troubleshooting

### Script Won't Run

```bash
# Make sure you're in project root
cd /path/to/SoonTech-Website

# Run the management system
npm run manage-blog
```

### Invalid Index Error

- **Issue**: Entered index out of range
- **Solution**: Check the post list, use index 0 to (n-1)

### Category Not Saving

- **Issue**: Typed category name instead of number
- **Solution**: Use numbers 1-5 only

### JSON Syntax Error

- **Issue**: Manual JSON edit caused corruption
- **Solution**: Validate JSON at [jsonlint.com](https://jsonlint.com)

### Permission Denied

```bash
# On Unix/Mac, make script executable
chmod +x scripts/manage-blog.js
```

---

## 🆚 Comparison: Old vs New

### Old System (`create-post.js`)

- ✅ Add new posts
- ❌ No editing capability
- ❌ No deletion capability
- ❌ No post viewing
- ❌ Type full category names
- ❌ Single-purpose tool

### New System (`manage-blog.js`)

- ✅ Add new posts
- ✅ **Edit existing posts**
- ✅ **Delete posts**
- ✅ **View all posts**
- ✅ **Numeric category selection**
- ✅ **Menu-driven interface**
- ✅ **Full CMS functionality**

---

## 📁 File Locations

```
SoonTech-Website/
├── scripts/
│   ├── create-post.js          # Legacy (still available)
│   └── manage-blog.js          # New CMS ⭐
├── src/
│   └── data/
│       └── blog-posts.json     # Blog database
└── package.json                # npm scripts
```

---

## 🎯 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` | Add New Post |
| `2` | View All Posts |
| `3` | Edit Post |
| `4` | Delete Post |
| `5` | Exit |
| `Enter` | Keep current value (during edit) |
| `END` | Finish multi-line input |

---

## 🚀 Advanced Usage

### Batch Operations

For multiple posts, use the menu repeatedly:
```bash
npm run manage-blog
# Add post 1
# Return to menu
# Add post 2
# Return to menu
# Exit when done
```

### Backup Before Bulk Changes

```bash
# Backup blog posts
cp src/data/blog-posts.json src/data/blog-posts.backup.json

# Run management system
npm run manage-blog
```

### Restore from Backup

```bash
# If something went wrong
cp src/data/blog-posts.backup.json src/data/blog-posts.json
```

---

## 📚 Command Reference

### Primary Command

```bash
npm run manage-blog
```

### Legacy Command (Still Available)

```bash
npm run new-post
```

**Note**: `new-post` still works for backward compatibility, but `manage-blog` is recommended for full functionality.

---

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] Search posts by keyword
- [ ] Filter posts by category
- [ ] Bulk edit operations
- [ ] Import from CSV/Markdown
- [ ] Export to different formats
- [ ] Draft mode (unpublished posts)
- [ ] Post scheduling
- [ ] Tag management
- [ ] SEO metadata fields
- [ ] Image upload integration

---

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the operations guide
- Ensure JSON file is valid
- Verify you're in the project root directory

---

## 📄 License

Part of the SoonTech Website project. See main LICENSE file.

---

**Happy Content Managing! 🎉**
