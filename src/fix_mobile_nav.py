import os
import codecs

src_dir = r"c:\Users\patri\Desktop\Soon-Tech\soontech\SoonTech-Website\src"

# 1. Update header.html
header_path = os.path.join(src_dir, 'header.html')
with codecs.open(header_path, 'r', 'utf-8') as f:
    header_html = f.read()

# Insert hamburger
if '<div class="hamburger">' not in header_html:
    hamburger_html = """
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <!-- Right Section: CTA Links -->"""
    header_html = header_html.replace('<!-- Right Section: CTA Links -->', hamburger_html)
    with codecs.open(header_path, 'w', 'utf-8') as f:
        f.write(header_html)


# 2. Update includes.js
includes_path = os.path.join(src_dir, 'includes.js')
with codecs.open(includes_path, 'r', 'utf-8') as f:
    includes_js = f.read()

# Replace the fetch header block
old_fetch = """// Load Header
fetch('header.html')
    .then(response => response.text())
    .then(data => document.getElementById('header-placeholder').innerHTML = data);"""

new_fetch = """// Load Header
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        
        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const headerRight = document.querySelector('.header-right');
        const menuRight = document.querySelector('.menu-right');
        
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('toggle');
                if (headerRight) headerRight.classList.toggle('nav-active');
                if (menuRight) menuRight.classList.toggle('nav-active');
            });
        }
    });"""

if old_fetch in includes_js:
    includes_js = includes_js.replace(old_fetch, new_fetch)
    with codecs.open(includes_path, 'w', 'utf-8') as f:
        f.write(includes_js)


# 3. Update styles.css
styles_path = os.path.join(src_dir, 'styles.css')
with codecs.open(styles_path, 'r', 'utf-8') as f:
    styles_css = f.read()

old_css = """/* Mobile Responsive Design */
@media (max-width: 768px) {
    .site-header {
        padding: 0.5rem 2rem;
    }

    .header-content {
        flex-direction: column;
    }

    .header-nav {
        flex-direction: column;
        gap: 1rem;
    }

    .menu-right {
        margin-top: 1rem;
    }
}"""

new_css_block = """/* Mobile Menu Button - hidden on desktop */
.hamburger {
    display: none;
    cursor: pointer;
    flex-direction: column;
    gap: 6px;
    z-index: 1001; /* Ensure it stays above the menu */
}
.hamburger .bar {
    width: 25px;
    height: 3px;
    background-color: var(--primary-green);
    transition: all 0.3s ease-in-out;
}

/* Mobile Responsive Design */
@media (max-width: 900px) {
    .site-header {
        padding: 1rem 2rem;
    }

    .header-content {
        flex-direction: row; /* Keep logo and hamburger inline */
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap; /* Allow the navs to wrap below the header */
    }

    .hamburger {
        display: flex; /* Show hamburger button */
    }

    .header-right,
    .menu-right {
        width: 100%; /* Take full width */
        flex-direction: column;
        align-items: flex-start;
        display: none; /* Hide by default */
        padding: 0;
        margin: 0;
    }
    
    .menu-right {
        padding-top: 1rem;
        padding-bottom: 1rem;
        background-color: var(--pure-white);
        box-shadow: 0 4px 6px -2px rgba(0,0,0,0.1);
    }

    .header-right.nav-active,
    .menu-right.nav-active {
        display: flex; /* Show when active */
        animation: navFade 0.3s ease forwards;
    }
    
    @keyframes navFade {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .header-nav {
        flex-direction: column;
        width: 100%;
        gap: 0;
        align-items: stretch;
    }

    .header-nav li {
        width: 100%;
        padding: 0.8rem 0;
        border-bottom: 1px solid #f0f0f0;
    }

    .dropdown-menu {
        position: relative;
        top: 0;
        width: 100%;
        box-shadow: none;
        padding-left: 1rem;
        padding-top: 0.5rem;
        border-left: 2px solid var(--secondary-green);
        margin-left: 0.5rem;
    }
    
    /* Hamburger animation */
    .hamburger.toggle .bar:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }
    .hamburger.toggle .bar:nth-child(2) {
        opacity: 0;
    }
    .hamburger.toggle .bar:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }
}"""

if old_css in styles_css:
    styles_css = styles_css.replace(old_css, new_css_block)
    with codecs.open(styles_path, 'w', 'utf-8') as f:
        f.write(styles_css)

print("Mobile menu patched successfully.")
