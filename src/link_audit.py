import os
import re

src_dir = r"c:\Users\patri\Desktop\Soon-Tech\soontech\SoonTech-Website\src"

html_files = []
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

dead_links = []
href_pattern = re.compile(r'href=["\'](.*?)["\']')

valid_targets = {os.path.basename(f) for f in html_files}
valid_targets.add('')
valid_targets.add('/')

for file in html_files:
    # Skip temporary files or error pages like 404.html if expected to have dead links
    with open(file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    links = href_pattern.findall(content)
    for link in links:
        if link.startswith('http') or link.startswith('mailto:') or link.startswith('tel:') or link.startswith('javascript:'):
            continue
        
        if link.startswith('#') and link != '#':
            id_to_find = link[1:]
            if f'id="{id_to_find}"' not in content and f"id='{id_to_find}'" not in content:
                 dead_links.append(f"{os.path.basename(file)}: Dead local anchor {link}")
            continue
            
        if link == '#':
            # Lots of valid JS buttons use href="#" so we just flag a few potential ones, 
            # but let's just log them as 'Empty anchor'
            dead_links.append(f"{os.path.basename(file)}: Empty anchor href='#'")
            continue
            
        page = link.split('?')[0].split('#')[0]
        if page == '':
            continue
            
        # Assets
        if page.endswith(('.css', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.webp', '.js')):
             asset_path = os.path.normpath(os.path.join(src_dir, page.lstrip('/')))
             if not os.path.exists(asset_path):
                  dead_links.append(f"{os.path.basename(file)}: Missing asset {page}")
             continue
             
        # HTML Pages
        if page not in valid_targets:
            dead_links.append(f"{os.path.basename(file)}: Dead link to {page}")

print("Dead Links Audit:")
for link in sorted(list(set(dead_links))):
    print(link)
if not dead_links:
    print("No dead links found!")
