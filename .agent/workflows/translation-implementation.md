---
description: English/Spanish Translation Implementation Guide
---

# SoonTech Website - Translation System (i18n)

This guide explains how to use and extend the English/Spanish translation system.

---

## 📁 File Structure

```
src/
├── translations/
│   ├── en.json          # English translations
│   └── es.json          # Spanish translations
├── i18n.js              # Translation manager
└── *.html               # HTML pages with data-i18n attributes
```

---

## 🚀 How It Works

### 1. Translation Files (JSON)

Translations are stored in JSON format with nested keys:

**Example (`en.json`):**
```json
{
  "nav": {
    "home": "Home",
    "business": "Business"
  },
  "hero": {
    "title": "Tech Support That Feels Like Family"
  }
}
```

**Example (`es.json`):**
```json
{
  "nav": {
    "home": "Hogar",
    "business": "Negocios"
  },
  "hero": {
    "title": "Soporte Técnico Que Se Siente Como Familia"
  }
}
```

### 2. HTML Markup

Add `data-i18n` attributes to elements that need translation:

```html
<h1 data-i18n="hero.title">Tech Support That Feels Like Family</h1>
<a data-i18n="nav.home">Home</a>
```

### 3. Translation Manager (i18n.js)

The `i18n.js` file:
- Loads translation files
- Stores language preference in localStorage
- Automatically translates all elements with `data-i18n`
- Handles language switching

---

## 📝 Step-by-Step Implementation

### Step 1: Load i18n.js in HTML

Add to the `<head>` section of each page:

```html
<script type="module" src="i18n.js"></script>
```

### Step 2: Add data-i18n Attributes

For each text element that needs translation:

```html
<!-- Before -->
<h1>Tech Support That Feels Like Family</h1>

<!-- After -->
<h1 data-i18n="hero.home.title">Tech Support That Feels Like Family</h1>
```

**Key naming convention:**
- Use dot notation: `section.subsection.key`
- Be descriptive: `hero.home.title` not `h1`
- Group related items: All nav items under `nav.*`

### Step 3: Add Translations to JSON Files

Add the same key to both `en.json` and `es.json`:

**en.json:**
```json
{
  "hero": {
    "home": {
      "title": "Tech Support That Feels Like Family"
    }
  }
}
```

**es.json:**
```json
{
  "hero": {
    "home": {
      "title": "Soporte Técnico Que Se Siente Como Familia"
    }
  }
}
```

### Step 4: Test Language Switching

1. Open the page in browser
2. Use the language selector in the header
3. Verify text changes to Spanish
4. Refresh page - language should persist

---

## 🎯 Current Implementation Status

### ✅ Completed

- [x] Translation file structure created
- [x] i18n.js manager implemented
- [x] English translations (en.json) - partial
- [x] Spanish translations (es.json) - partial
- [x] Language selector in header (already exists)

### 🔄 In Progress

- [ ] Add data-i18n attributes to index.html
- [ ] Add data-i18n attributes to ai-solutions.html
- [ ] Add data-i18n attributes to other pages
- [ ] Complete all translations in en.json
- [ ] Complete all translations in es.json

### 📋 To Do

- [ ] Test on all pages
- [ ] Add meta tags for SEO (lang attribute)
- [ ] Add more languages (optional)

---

## 🔧 How to Add Translations

### For a New Page Section

**1. Identify translatable text:**
```html
<section class="services">
  <h2>Our Services</h2>
  <p>We provide excellent IT support</p>
</section>
```

**2. Add data-i18n attributes:**
```html
<section class="services">
  <h2 data-i18n="services.title">Our Services</h2>
  <p data-i18n="services.description">We provide excellent IT support</p>
</section>
```

**3. Add to en.json:**
```json
{
  "services": {
    "title": "Our Services",
    "description": "We provide excellent IT support"
  }
}
```

**4. Add to es.json:**
```json
{
  "services": {
    "title": "Nuestros Servicios",
    "description": "Proporcionamos excelente soporte de TI"
  }
}
```

---

## 🎨 Special Cases

### Translating Attributes (e.g., alt text, placeholders)

Use `data-i18n-attr` to specify which attribute to translate:

```html
<img src="logo.png" 
     alt="SoonTech Logo" 
     data-i18n="common.logoAlt"
     data-i18n-attr="alt">

<input type="text" 
       placeholder="Enter your name"
       data-i18n="form.namePlaceholder"
       data-i18n-attr="placeholder">
```

### Dynamic Content (Modals, etc.)

For content loaded dynamically (like modals), you can manually translate:

```javascript
import i18n from './i18n.js';

// Get translation
const title = i18n.t('modal.title');
modalElement.textContent = title;
```

---

## 📊 Translation Coverage

### Pages to Translate

| Page | Status | Priority |
|------|--------|----------|
| index.html | 🔄 In Progress | High |
| ai-solutions.html | ⏳ Pending | High |
| services-home.html | ⏳ Pending | High |
| services-business.html | ⏳ Pending | High |
| about-us.html | ⏳ Pending | Medium |
| contact-us.html | ⏳ Pending | Medium |
| support.html | ⏳ Pending | Low |
| blog.html | ⏳ Pending | Low |

### Components to Translate

| Component | Status | Location |
|-----------|--------|----------|
| Header/Nav | ⏳ Pending | header.html |
| Footer | ⏳ Pending | footer.html |
| Modals | ⏳ Pending | Various |

---

## 🐛 Troubleshooting

### Issue: Translations not loading

**Check:**
1. Is `i18n.js` loaded in the HTML?
2. Are translation files in `/translations/` folder?
3. Check browser console for errors

**Solution:**
```bash
# Verify files exist
ls src/translations/

# Check for JSON syntax errors
cat src/translations/en.json | python -m json.tool
```

### Issue: Text not changing when switching language

**Check:**
1. Does element have `data-i18n` attribute?
2. Does the key exist in both en.json and es.json?
3. Is the key path correct?

**Solution:**
```html
<!-- Verify attribute exists -->
<h1 data-i18n="hero.title">Text</h1>

<!-- Verify key in JSON -->
{
  "hero": {
    "title": "Translated text"
  }
}
```

### Issue: Language not persisting after refresh

**Check:**
1. Is localStorage enabled in browser?
2. Check browser console for localStorage errors

**Solution:**
- Clear browser cache
- Check if browser allows localStorage
- Test in incognito mode

---

## 📈 Best Practices

### 1. Consistent Key Naming
```json
// ✅ Good
{
  "nav": {
    "home": "Home",
    "business": "Business"
  }
}

// ❌ Bad
{
  "homeLink": "Home",
  "nav_business": "Business"
}
```

### 2. Group Related Translations
```json
// ✅ Good
{
  "hero": {
    "home": {
      "title": "...",
      "subtitle": "...",
      "cta": "..."
    }
  }
}

// ❌ Bad
{
  "heroHomeTitle": "...",
  "heroHomeSubtitle": "...",
  "heroHomeCta": "..."
}
```

### 3. Keep Default Text in HTML
```html
<!-- ✅ Good - Shows English while loading -->
<h1 data-i18n="hero.title">Tech Support That Feels Like Family</h1>

<!-- ❌ Bad - Shows nothing while loading -->
<h1 data-i18n="hero.title"></h1>
```

### 4. Use Descriptive Keys
```json
// ✅ Good
{
  "cta": {
    "getStarted": "Get Started Today",
    "learnMore": "Learn More"
  }
}

// ❌ Bad
{
  "button1": "Get Started Today",
  "btn2": "Learn More"
}
```

---

## 🔄 Next Steps

1. **Add data-i18n to index.html** - Start with navigation and hero
2. **Complete translation files** - Add all text content
3. **Test thoroughly** - Switch languages on each page
4. **Add to other pages** - Repeat for all pages
5. **SEO optimization** - Add hreflang tags

---

## 📚 Resources

- [MDN: Internationalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [Google i18n Best Practices](https://developers.google.com/international/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

**Last Updated:** 2026-01-16  
**Maintained By:** Development Team
