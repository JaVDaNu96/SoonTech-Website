# Quick Reference - Blog Management System

## Launch Command
```bash
npm run manage-blog
```

## Main Menu Options

| Key | Action | Description |
|-----|--------|-------------|
| `1` | ➕ Add | Create new blog post |
| `2` | 📋 View | List all posts |
| `3` | ✏️ Edit | Update existing post |
| `4` | 🗑️ Delete | Remove post |
| `5` | 🚪 Exit | Close application |

## Category Numbers

| # | Category |
|---|----------|
| 1 | Cybersecurity |
| 2 | AI & Innovation |
| 3 | Business Growth |
| 4 | Smart Home |
| 5 | Tech Tutorials |

## Quick Workflows

### Add Post
```
1. Select [1]
2. Enter title
3. Select category (1-5)
4. Enter image filename
5. Enter excerpt
6. Enter content (type END to finish)
7. Enter read time
8. Enter author (or press Enter for default)
```

### Edit Post
```
1. Select [3]
2. Enter post index (0, 1, 2, etc.)
3. Press Enter to keep values, or type new values
4. Confirm changes
```

### Delete Post
```
1. Select [4]
2. Enter post index
3. Type "yes" to confirm (not just "y")
```

## Tips

- **Keep values**: Press Enter during edit
- **Multi-line input**: Type `END` on new line
- **Image path**: Just filename, path auto-added
- **Backup**: Copy `blog-posts.json` before bulk changes
- **Index**: Posts are 0-indexed (first post is 0)

## Common Commands

```bash
# Launch CMS
npm run manage-blog

# Legacy add-only (still works)
npm run new-post
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Invalid index | Check post list, use 0 to (n-1) |
| Category error | Use numbers 1-5 only |
| Script won't run | Ensure you're in project root |
| JSON error | Validate at jsonlint.com |

---

For full documentation, see `scripts/README.md`
