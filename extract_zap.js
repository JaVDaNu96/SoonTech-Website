const fs = require('fs');
const html = fs.readFileSync('./src/2026-03-03-ZAP-Report-.html', 'utf8');

const alertSections = html.split('<h4 id="alert-type-');
const results = {};

for (let i = 1; i < alertSections.length; i++) {
    const section = alertSections[i];
    const titleMatch = section.match(/">([^<]+)<\/h4>/);
    if (!titleMatch) continue;
    const title = titleMatch[1];

    const riskMatch = section.match(/<th scope="row">Risk<\/th>\s*<td[^>]*>(?:<span>)?([^<]+)/);
    const risk = riskMatch ? riskMatch[1].trim() : 'Unknown';

    const descMatch = section.match(/<h6>Description<\/h6>\s*<p(?:[^>]*)>([\s\S]*?)<\/p>/);
    const desc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    const solutionMatch = section.match(/<h6>Solution<\/h6>\s*<p(?:[^>]*)>([\s\S]*?)<\/p>/);
    const solution = solutionMatch ? solutionMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    const tablePart = section.includes('<table class="alerts-table">') ? section.split('<table class="alerts-table">')[1].split('</table>')[0] : '';

    const urls = [];
    const urlMatches = tablePart.matchAll(/<td>(?:<div[^>]*>)?\s*<a[^>]*href="([^"]+)"/g);
    for (const match of urlMatches) {
        if (!urls.includes(match[1])) {
            urls.push(match[1]);
        }
    }

    const soontechUrls = urls.filter(u => u.includes('soon-tech') || u.includes('192.168.1.153'));
    if (soontechUrls.length > 0) {
        if (!results[risk]) results[risk] = [];
        results[risk].push({ title, desc, solution, urls: soontechUrls });
    }
}

console.log(JSON.stringify(results, null, 2));
