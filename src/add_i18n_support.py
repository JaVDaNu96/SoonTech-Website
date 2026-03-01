import re

filepath = r"c:\Users\patri\Desktop\Soon-Tech\soontech\SoonTech-Website\src\support.html"

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# JS Substitution
js_old = """            if (type === 'home') {
                inp.placeholder = "Search for help... (e.g., 'wifi not working')";
                subtitle.textContent = 'Quick fixes for common issues';
                faqSub.textContent = 'Common questions from home users';
            } else {
                inp.placeholder = "Search for help... (e.g., 'server down')";
                subtitle.textContent = 'Enterprise IT solutions at your fingertips';
                faqSub.textContent = 'Enterprise IT questions answered';
            }"""
js_new = """            if (type === 'home') {
                inp.setAttribute('data-i18n', 'supportPage.hero.searchPlaceholder.home');
                subtitle.setAttribute('data-i18n', 'supportPage.resources.subtitleHome');
                faqSub.setAttribute('data-i18n', 'supportPage.faq.subtitleHome');
            } else {
                inp.setAttribute('data-i18n', 'supportPage.hero.searchPlaceholder.business');
                subtitle.setAttribute('data-i18n', 'supportPage.resources.subtitleBiz');
                faqSub.setAttribute('data-i18n', 'supportPage.faq.subtitleBiz');
            }
            if (window.i18n) {
                window.i18n.translateElement(inp);
                window.i18n.translateElement(subtitle);
                window.i18n.translateElement(faqSub);
            }"""
html = html.replace(js_old, js_new)

# Resources Home
html = html.replace('<h3>Wi-Fi Issues</h3>', '<h3 data-i18n="supportPage.resources.items.wifi.title">Wi-Fi Issues</h3>')
html = html.replace('<p>Troubleshoot connectivity</p>', '<p data-i18n="supportPage.resources.items.wifi.description">Troubleshoot connectivity</p>')

html = html.replace('<h3>Email Problems</h3>', '<h3 data-i18n="supportPage.resources.items.email.title">Email Problems</h3>')
html = html.replace('<p>Fix sync and access</p>', '<p data-i18n="supportPage.resources.items.email.description">Fix sync and access</p>')

html = html.replace('<h3>Printer Setup</h3>', '<h3 data-i18n="supportPage.resources.items.printer.title">Printer Setup</h3>')
html = html.replace('<p>Configure printers</p>', '<p data-i18n="supportPage.resources.items.printer.description">Configure printers</p>')

html = html.replace('<h3>Security Alerts</h3>', '<h3 data-i18n="supportPage.resources.items.security.title">Security Alerts</h3>')
html = html.replace('<p>Respond to warnings</p>', '<p data-i18n="supportPage.resources.items.security.description">Respond to warnings</p>')

html = html.replace('<h3>Billing Questions</h3>', '<h3 data-i18n="supportPage.resources.items.billing.title">Billing Questions</h3>')
html = html.replace('<p>Invoice and payments</p>', '<p data-i18n="supportPage.resources.items.billing.description">Invoice and payments</p>')

html = html.replace('<h3>Account Access</h3>', '<h3 data-i18n="supportPage.resources.items.account.title">Account Access</h3>')
html = html.replace('<p>Reset passwords</p>', '<p data-i18n="supportPage.resources.items.account.description">Reset passwords</p>')

# Resources view guide buttons
html = html.replace('View Guide', '<span data-i18n="supportPage.resources.viewGuide">View Guide</span>')

# Resources Business
html = html.replace('<h3>Server & Infrastructure</h3>', '<h3 data-i18n="supportPage.resources.itemsBiz.bizServer.title">Server & Infrastructure</h3>')
html = html.replace('<p>Outages, performance, hardware</p>', '<p data-i18n="supportPage.resources.itemsBiz.bizServer.description">Outages, performance, hardware</p>')

html = html.replace('<h3>Microsoft 365 & Cloud</h3>', '<h3 data-i18n="supportPage.resources.itemsBiz.bizM365.title">Microsoft 365 & Cloud</h3>')
html = html.replace('<p>Teams, SharePoint, OneDrive</p>', '<p data-i18n="supportPage.resources.itemsBiz.bizM365.description">Teams, SharePoint, OneDrive</p>')

html = html.replace('<h3>Network & VPN</h3>', '<h3 data-i18n="supportPage.resources.itemsBiz.bizNetwork.title">Network & VPN</h3>')
html = html.replace('<p>Business connectivity & remote access</p>', '<p data-i18n="supportPage.resources.itemsBiz.bizNetwork.description">Business connectivity & remote access</p>')

html = html.replace('<h3>Cybersecurity & Compliance</h3>', '<h3 data-i18n="supportPage.resources.itemsBiz.bizCyber.title">Cybersecurity & Compliance</h3>')
html = html.replace('<p>Threats, audits, policies</p>', '<p data-i18n="supportPage.resources.itemsBiz.bizCyber.description">Threats, audits, policies</p>')

html = html.replace('<h3>VoIP & Communications</h3>', '<h3 data-i18n="supportPage.resources.itemsBiz.bizVoip.title">VoIP & Communications</h3>')
html = html.replace('<p>Phone systems & Teams calling</p>', '<p data-i18n="supportPage.resources.itemsBiz.bizVoip.description">Phone systems & Teams calling</p>')

html = html.replace('<h3>Managed IT Support</h3>', '<h3 data-i18n="supportPage.resources.itemsBiz.bizManaged.title">Managed IT Support</h3>')
html = html.replace('<p>Monitoring, helpdesk, devices</p>', '<p data-i18n="supportPage.resources.itemsBiz.bizManaged.description">Monitoring, helpdesk, devices</p>')

# FAQs - Home
html = html.replace('<span>How do I reset my password?</span>', '<span data-i18n="supportPage.faq.items.q1.q">How do I reset my password?</span>')
html = html.replace('<span>What are your support hours?</span>', '<span data-i18n="supportPage.faq.items.q2.q">What are your support hours?</span>')
html = html.replace('<span>How do I schedule remote support?</span>', '<span data-i18n="supportPage.faq.items.q3.q">How do I schedule remote support?</span>')
html = html.replace('<span>What should I include in a ticket?</span>', '<span data-i18n="supportPage.faq.items.q4.q">What should I include in a ticket?</span>')
html = html.replace('<span>How long does it typically take to resolve an issue?</span>', '<span data-i18n="supportPage.faq.items.q5.q">How long does it typically take to resolve an issue?</span>')
html = html.replace('<span>What areas does SoonTech serve?</span>', '<span data-i18n="supportPage.faq.items.q6.q">What areas does SoonTech serve?</span>')
html = html.replace('<span>Is my data safe when you access my computer remotely?</span>', '<span data-i18n="supportPage.faq.items.q7.q">Is my data safe when you access my computer remotely?</span>')
html = html.replace('<span>What happens if my issue occurs outside business hours?</span>', '<span data-i18n="supportPage.faq.items.q8.q">What happens if my issue occurs outside business hours?</span>')
html = html.replace('<span>Do you offer monthly support plans for businesses?</span>', '<span data-i18n="supportPage.faq.items.q9.q">Do you offer monthly support plans for businesses?</span>')

# For the FAQ Answers (which are full divs), we can replace `<div class="faq-answer">` with `<div class="faq-answer" data-i18n="...">` if we're careful.
# Actually, iterating through the lines is safer.

faq_q_match = re.compile(r'<details class="faq-item" id="(faq|bfaq)-(\d+)">')
lines = html.split('\n')
new_lines = []
in_answer = False
current_id = None

for line in lines:
    m = faq_q_match.search(line)
    if m:
        current_id = f"{m.group(1)}{m.group(2)}" # e.g. faq1, bfaq2

    if '<div class="faq-answer">' in line and current_id:
        if current_id.startswith('faq'):
            q_num = f"q{current_id[3:]}"
            line = line.replace('<div class="faq-answer">', f'<div class="faq-answer" data-i18n="supportPage.faq.items.{q_num}.a">')
        elif current_id.startswith('bfaq'):
            q_num = f"bfaq{current_id[4:]}"
            line = line.replace('<div class="faq-answer">', f'<div class="faq-answer" data-i18n="supportPage.faq.itemsBiz.{q_num}.a">')

    # FAQs - Business Questions
    if 'bfaq' in (current_id or ''):
        line = line.replace('<span>What does your Managed IT service include?</span>', '<span data-i18n="supportPage.faq.itemsBiz.bfaq1.q">What does your Managed IT service include?</span>')
        line = line.replace('<span>What is your SLA response time for business clients?</span>', '<span data-i18n="supportPage.faq.itemsBiz.bfaq2.q">What is your SLA response time for business clients?</span>')
        line = line.replace('<span>How do you handle cybersecurity for business clients?</span>', '<span data-i18n="supportPage.faq.itemsBiz.bfaq3.q">How do you handle cybersecurity for business clients?</span>')
        line = line.replace('<span>Can you migrate our business to Microsoft 365?</span>', '<span data-i18n="supportPage.faq.itemsBiz.bfaq4.q">Can you migrate our business to Microsoft 365?</span>')
        line = line.replace('<span>Do you offer on-site support, or is it only remote?</span>', '<span data-i18n="supportPage.faq.itemsBiz.bfaq5.q">Do you offer on-site support, or is it only remote?</span>')
        line = line.replace('<span>How do you handle backups and disaster recovery for businesses?</span>', '<span data-i18n="supportPage.faq.itemsBiz.bfaq6.q">How do you handle backups and disaster recovery for businesses?</span>')
        line = line.replace('<span>Can SoonTech support a multi-location business?</span>', '<span data-i18n="supportPage.faq.itemsBiz.bfaq7.q">Can SoonTech support a multi-location business?</span>')
        line = line.replace('<span>What information do you need to onboard our business?</span>', '<span data-i18n="supportPage.faq.itemsBiz.bfaq8.q">What information do you need to onboard our business?</span>')

    new_lines.append(line)

html = '\n'.join(new_lines)

# Initial Subtitles that need i18n
html = html.replace('<p class="section-subtitle" id="resources-subtitle">Quick fixes for common issues</p>', '<p class="section-subtitle" id="resources-subtitle" data-i18n="supportPage.resources.subtitleHome">Quick fixes for common issues</p>')
html = html.replace('<p class="section-subtitle" id="faq-subtitle"\n                style="text-align:center;margin-bottom:1.5rem;color:#6b7280;font-size:.95rem;">Common questions from\n                home users</p>', 
'<p class="section-subtitle" id="faq-subtitle"\n                style="text-align:center;margin-bottom:1.5rem;color:#6b7280;font-size:.95rem;" data-i18n="supportPage.faq.subtitleHome">Common questions from\n                home users</p>')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)

print("Support HTML updated.")
