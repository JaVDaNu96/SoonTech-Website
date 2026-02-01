// i18n.js - Internationalization Manager for SoonTech Website
// Handles English/Spanish translation switching

class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.translations = {};
        this.initialized = false;
    }

    /**
     * Get stored language from localStorage
     * @returns {string|null} Stored language code or null
     */
    getStoredLanguage() {
        try {
            return localStorage.getItem('soontech_language');
        } catch (e) {
            console.warn('localStorage not available:', e);
            return null;
        }
    }

    /**
     * Store language preference in localStorage
     * @param {string} lang - Language code (en/es)
     */
    setStoredLanguage(lang) {
        try {
            localStorage.setItem('soontech_language', lang);
        } catch (e) {
            console.warn('Could not save language preference:', e);
        }
    }

    /**
     * Load translation file for specified language
     * @param {string} lang - Language code (en/es)
     * @returns {Promise<Object>} Translation data
     */
    async loadTranslations(lang) {
        try {
            const response = await fetch(`/translations/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang} translations`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${lang} translations:`, error);
            // Fallback to English if loading fails
            if (lang !== 'en') {
                return await this.loadTranslations('en');
            }
            return {};
        }
    }

    /**
     * Wait for header to be loaded
     */
    waitForHeader() {
        return new Promise((resolve) => {
            const checkHeader = () => {
                const header = document.querySelector('.site-header');
                if (header) {
                    resolve();
                } else {
                    setTimeout(checkHeader, 100);
                }
            };
            checkHeader();
        });
    }

    /**
     * Initialize i18n system
     * Loads translations and applies them to the page
     */
    async init() {
        if (this.initialized) return;

        // Load translations for current language
        this.translations = await this.loadTranslations(this.currentLanguage);

        // Wait for header to load (it's loaded dynamically by includes.js)
        await this.waitForHeader();

        // Apply translations to page
        this.translatePage();

        // Update language selector
        this.updateLanguageSelector();

        // Set up language selector listener
        this.setupLanguageSelector();

        // Set up mutation observer to translate dynamically added content
        this.setupMutationObserver();

        this.initialized = true;

        console.log(`i18n initialized with language: ${this.currentLanguage}`);
    }

    /**
     * Set up mutation observer to handle dynamically loaded content
     */
    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Translate the new node and its children
                        if (node.hasAttribute && node.hasAttribute('data-i18n')) {
                            this.translateElement(node);
                        }
                        // Translate children with data-i18n
                        const elements = node.querySelectorAll ? node.querySelectorAll('[data-i18n]') : [];
                        elements.forEach(el => this.translateElement(el));
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Translate a single element
     * @param {Element} element - Element to translate
     */
    translateElement(element) {
        const key = element.getAttribute('data-i18n');
        if (!key) return;

        const translation = this.t(key);

        // Check if element has data-i18n-attr to translate attribute instead of text
        const attr = element.getAttribute('data-i18n-attr');
        if (attr) {
            element.setAttribute(attr, translation);
        } else {
            element.textContent = translation;
        }
    }

    /**
     * Get translation value by key path
     * @param {string} keyPath - Dot-notation path (e.g., 'nav.home')
     * @returns {string} Translated text or key if not found
     */
    t(keyPath) {
        const keys = keyPath.split('.');
        let value = this.translations;

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                console.warn(`Translation key not found: ${keyPath}`);
                return keyPath;
            }
        }

        return value;
    }

    /**
     * Translate all elements with data-i18n attribute
     */
    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            this.translateElement(element);
        });
    }

    /**
     * Switch to specified language
     * @param {string} lang - Language code (en/es)
     */
    async switchLanguage(lang) {
        if (lang === this.currentLanguage) return;

        this.currentLanguage = lang;
        this.setStoredLanguage(lang);

        // Load new translations
        this.translations = await this.loadTranslations(lang);

        // Re-translate page
        this.translatePage();

        // Update language selector
        this.updateLanguageSelector();

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Dispatch custom event for other scripts to listen to
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));

        console.log(`Language switched to: ${lang}`);
    }

    /**
     * Update language selector dropdown to show current language
     */
    updateLanguageSelector() {
        const selector = document.querySelector('.language-selector select');
        if (selector) {
            selector.value = this.currentLanguage;
        }
    }

    /**
     * Set up event listener for language selector
     */
    setupLanguageSelector() {
        const selector = document.querySelector('.language-selector select');
        if (!selector) {
            console.warn('Language selector not found');
            return;
        }

        selector.addEventListener('change', (e) => {
            this.switchLanguage(e.target.value);
        });
    }
}

// Create global i18n instance
const i18n = new I18n();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
    i18n.init();
}

// Export for use in other modules
export default i18n;
