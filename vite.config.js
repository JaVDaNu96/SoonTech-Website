import { defineConfig } from 'vite';
import inject from 'vite-plugin-html-inject';
import { resolve } from 'path';
import fs from 'fs';

// Helper to find all HTML files in src
function getHtmlEntries() {
    const srcDir = resolve(__dirname, 'src');
    const files = fs.readdirSync(srcDir);
    const entries = {};

    files.forEach(file => {
        if (file.endsWith('.html') && !['header.html', 'footer.html'].includes(file)) {
            const name = file.replace('.html', '');
            entries[name] = resolve(srcDir, file);
        }
    });
    return entries;
}

export default defineConfig({
    root: 'src',
    base: './', // relative base for portability
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: getHtmlEntries(),
        },
    },
    plugins: [
        inject({
            // Configuration for vite-plugin-html-inject
            // It automatically looks for <load src="..." />
        }),
    ],
    server: {
        open: true
    }
});
