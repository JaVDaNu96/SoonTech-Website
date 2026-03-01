import os
import glob

src_dir = r"c:\Users\patri\Desktop\Soon-Tech\soontech\SoonTech-Website\src"

for f in glob.glob(os.path.join(src_dir, 'home-*.html')):
    with open(f, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
    content = content.replace('href="contact.html"', 'href="contact-us.html"')
    with open(f, 'w', encoding='utf-8') as file:
         file.write(content)

for f in glob.glob(os.path.join(src_dir, 'business-cyber-*.html')):
    with open(f, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
    content = content.replace('href="#cloud-solutions"', 'href="services-business.html"')
    with open(f, 'w', encoding='utf-8') as file:
         file.write(content)

print("Replaced all dead links.")
