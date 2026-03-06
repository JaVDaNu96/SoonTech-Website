const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const srcDir = './src';
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

function fetchAndHash(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchAndHash(res.headers.location).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
            }
            let data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(data);
                const hash = crypto.createHash('sha384').update(buffer).digest('base64');
                resolve(`sha384-${hash}`);
            });
        }).on('error', reject);
    });
}

async function processFiles() {
    const changes = {};

    for (const file of files) {
        const filePath = path.join(srcDir, file);
        let html = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        const scriptRegex = /<script\s+([^>]*)src="([^"]+)"([^>]*)><\/script>/gi;
        let match;

        const scriptMatches = [...html.matchAll(scriptRegex)];
        for (const m of scriptMatches) {
            const fullTag = m[0];
            const beforeSrc = m[1];
            const src = m[2];
            const afterSrc = m[3];

            if (src.startsWith('http') && !fullTag.includes('integrity=')) {
                try {
                    let hash = changes[src];
                    if (!hash) {
                        console.log(`Fetching ${src}...`);
                        hash = await fetchAndHash(src);
                        changes[src] = hash;
                        console.log(`Generated hash for ${src}: ${hash}`);
                    }
                    const newTag = `<script ${beforeSrc}src="${src}" integrity="${hash}" crossorigin="anonymous"${afterSrc}></script>`;
                    html = html.replace(fullTag, newTag);
                    modified = true;
                } catch (e) {
                    console.error(`Error with script ${src}: `, e.message);
                }
            }
        }

        const linkRegex = /<link\s+([^>]*)href="([^"]+)"([^>]*)>/gi;
        const linkMatches = [...html.matchAll(linkRegex)];
        for (const m of linkMatches) {
            const fullTag = m[0];
            const beforeHref = m[1];
            const href = m[2];
            const afterHref = m[3];

            if (href.startsWith('http') && fullTag.includes('stylesheet') && !fullTag.includes('integrity=') && !href.includes('fonts.googleapis.com')) {
                try {
                    let hash = changes[href];
                    if (!hash) {
                        console.log(`Fetching ${href}...`);
                        hash = await fetchAndHash(href);
                        changes[href] = hash;
                        console.log(`Generated hash for ${href}: ${hash}`);
                    }
                    const newTag = `<link ${beforeHref}href="${href}" integrity="${hash}" crossorigin="anonymous"${afterHref}>`;
                    html = html.replace(fullTag, newTag);
                    modified = true;
                } catch (e) {
                    console.error(`Error with link ${href}: `, e.message);
                }
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, html);
            console.log(`Updated ${file}`);
        }
    }
}

processFiles().catch(console.error);
