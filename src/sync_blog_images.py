import json
import codecs

en_path = r"c:\Users\patri\Desktop\Soon-Tech\soontech\SoonTech-Website\src\data\blog-posts-en.json"
es_path = r"c:\Users\patri\Desktop\Soon-Tech\soontech\SoonTech-Website\src\data\blog-posts-es.json"

with codecs.open(en_path, 'r', 'utf-8') as f:
    en_data = json.load(f)
    
with codecs.open(es_path, 'r', 'utf-8') as f:
    es_data = json.load(f)

# Map EN images by ID
en_images = {post['id']: post.get('image', '') for post in en_data}

# Update ES images
for post in es_data:
    if post['id'] in en_images:
        post['image'] = en_images[post['id']]

with codecs.open(es_path, 'w', 'utf-8') as f:
    json.dump(es_data, f, ensure_ascii=False, indent=4)

print("Synced ES images with EN images.")
