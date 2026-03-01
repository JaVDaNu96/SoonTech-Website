import codecs
import re

filepath = "c:\\Users\\patri\\Desktop\\Soon-Tech\\soontech\\SoonTech-Website\\src\\support.html"
with codecs.open(filepath, 'r', 'utf-8') as f:
    content = f.read()

new_kb_home = """        const KB_HOME = [
            {
                icon: 'fa-phone', color: '#ef4444', title: 'Emergency Call — +1 (778) 862-4365',
                desc: 'Critical issue? Call our 24/7 emergency line for immediate help.',
                keys: ['emergency', 'urgent', 'call', 'asap', '24/7', 'critical', 'outage', 'phone', 'emergencia', 'urgente', 'llamar', 'caído', 'falla'],
                go: () => { const b = document.querySelector('.red-btn'); if (b) b.click(); }
            },
            {
                icon: 'fa-ticket-alt', color: '#3b82f6', title: 'Submit a Support Ticket',
                desc: 'Open a ticket and our team will follow up within the hour.',
                keys: ['ticket', 'submit', 'request', 'open ticket', 'log', 'issue', 'report', 'help', 'soporte', 'problema', 'ayuda', 'solicitud'],
                go: () => location.href = 'contact-us.html?type=ticket'
            },
            {
                icon: 'fa-desktop', color: '#22c55e', title: 'Remote Support (TeamViewer)',
                desc: 'Connect instantly with a technician — no code needed.',
                keys: ['remote', 'teamviewer', 'connect', 'screen share', 'session', 'tech help', 'online help', 'live support', 'remoto', 'conectar', 'pantalla', 'técnico'],
                go: () => window.open('https://get.teamviewer.com/6v4teme', '_blank')
            },
            {
                icon: 'fa-wifi', color: '#f59e0b', title: 'Wi-Fi Issues',
                desc: 'Troubleshoot internet connectivity, slow speeds, or Wi-Fi drops.',
                keys: ['wifi', 'wi-fi', 'internet', 'wireless', 'connection', 'slow internet', 'no internet', 'router', 'modem', 'network', 'red', 'conexión', 'lento'],
                go: () => openGuide('wifi')
            },
            {
                icon: 'fa-envelope', color: '#8b5cf6', title: 'Email Problems',
                desc: 'Fix Outlook, Gmail, or webmail sync, login, and setup issues.',
                keys: ['email', 'outlook', 'gmail', 'mail', 'smtp', 'imap', 'sync', 'not receiving', 'send', 'inbox', 'correo', 'enviar', 'recibir', 'bandeja'],
                go: () => openGuide('email')
            },
            {
                icon: 'fa-print', color: '#06b6d4', title: 'Printer Setup & Issues',
                desc: 'Set up a new printer or troubleshoot print queue and driver problems.',
                keys: ['printer', 'print', 'scanning', 'scanner', 'driver', 'queue', 'ink', 'paper jam', 'wireless printer', 'impresora', 'imprimir', 'escanear', 'tinta', 'papel'],
                go: () => openGuide('printer')
            },
            {
                icon: 'fa-shield-alt', color: '#ef4444', title: 'Security Alerts',
                desc: 'Suspected virus, malware, ransomware, or phishing attack?',
                keys: ['virus', 'malware', 'security', 'hacked', 'phishing', 'ransomware', 'antivirus', 'pop-up', 'scam', 'suspicious', 'seguridad', 'hackeo'],
                go: () => openGuide('security')
            },
            {
                icon: 'fa-file-invoice-dollar', color: '#10b981', title: 'Billing & Invoices',
                desc: 'Questions about your invoice, payment methods, or service charges.',
                keys: ['billing', 'invoice', 'payment', 'charge', 'receipt', 'overdue', 'refund', 'pricing', 'cost', 'factura', 'pago', 'cobro', 'precio', 'tarjeta'],
                go: () => openGuide('billing')
            },
            {
                icon: 'fa-user-lock', color: '#6366f1', title: 'Account Access & Passwords',
                desc: 'Locked out? Forgot your password? We can help you regain access.',
                keys: ['password', 'login', 'account', 'locked', 'forgot', 'reset', 'access', 'sign in', '2fa', 'mfa', 'authenticator', 'contraseña', 'clave', 'acceso', 'bloqueado', 'cuenta'],
                go: () => openGuide('account')
            },
            {
                icon: 'fa-clock', color: '#f59e0b', title: 'FAQ: Support hours',
                desc: 'Mon–Fri 8AM–6PM PST. 24/7 emergency line for critical issues.',
                keys: ['hours', 'when', 'open', 'schedule', 'availability', 'weekend', 'holiday', 'horas', 'horario', 'abierto', 'cuando'],
                go: () => openFaq('faq-2')
            },
        ];"""

new_kb_business = """        const KB_BUSINESS = [
            {
                icon: 'fa-phone', color: '#ef4444', title: 'Emergency Call — +1 (778) 862-4365',
                desc: 'Server down? Complete outage? Call our 24/7 business emergency line.',
                keys: ['emergency', 'urgent', 'critical', 'down', 'outage', 'call', 'asap', '24/7', 'server down', 'network down', 'emergencia', 'urgente', 'servidor caído', 'caído', 'crítico'],
                go: () => { const b = document.querySelector('.red-btn'); if (b) b.click(); }
            },
            {
                icon: 'fa-ticket-alt', color: '#3b82f6', title: 'Submit a Business Support Ticket',
                desc: 'Log a detailed ticket — priority response for business clients.',
                keys: ['ticket', 'submit', 'request', 'open ticket', 'log', 'issue', 'report', 'help request', 'soporte', 'problema', 'ayuda', 'reportar'],
                go: () => location.href = 'contact-us.html?type=ticket'
            },
            {
                icon: 'fa-desktop', color: '#22c55e', title: 'Remote Business Support',
                desc: 'Connect a technician to your server, workstation, or endpoint instantly.',
                keys: ['remote', 'teamviewer', 'connect', 'screen share', 'session', 'technician', 'remoto', 'conectar', 'pantalla', 'técnico'],
                go: () => window.open('https://get.teamviewer.com/6v4teme', '_blank')
            },
            {
                icon: 'fa-server', color: '#6366f1', title: 'Server & Infrastructure',
                desc: 'Server outage, performance degradation, hardware failure.',
                keys: ['server', 'infrastructure', 'hardware', 'rack', 'vm', 'virtual machine', 'hyper-v', 'vmware', 'esxi', 'host', 'data center', 'performance', 'slow server', 'server crash', 'reboot server', 'servidor', 'infraestructura', 'caído', 'lento'],
                go: () => highlight('biz-server')
            },
            {
                icon: 'fa-cloud', color: '#0ea5e9', title: 'Microsoft 365 & Cloud Services',
                desc: 'Teams, SharePoint, OneDrive, Exchange — setup, migration, licensing.',
                keys: ['microsoft 365', 'm365', 'office 365', 'teams', 'sharepoint', 'onedrive', 'exchange', 'azure', 'cloud', 'licensing', 'migration', 'mailbox', 'tenant', 'intune', 'microsoft', 'nube', 'correo', 'email', 'outlook'],
                go: () => highlight('biz-m365')
            },
            {
                icon: 'fa-network-wired', color: '#f59e0b', title: 'Network & VPN',
                desc: 'Business LAN/WAN, VPN access, switch/router config, performance.',
                keys: ['network', 'vpn', 'lan', 'wan', 'switch', 'router', 'firewall', 'bandwidth', 'latency', 'dns', 'dhcp', 'vlan', 'remote access', 'cisco', 'ubiquiti', 'site to site', 'red', 'internet', 'wifi', 'wi-fi', 'conexión', 'lento', 'wireless'],
                go: () => highlight('biz-network')
            },
            {
                icon: 'fa-shield-alt', color: '#ef4444', title: 'Cybersecurity & Compliance',
                desc: 'Ransomware, phishing, endpoint protection, policy audits.',
                keys: ['cybersecurity', 'security', 'ransomware', 'malware', 'phishing', 'hacked', 'breach', 'compliance', 'gdpr', 'pipa', 'endpoint', 'antivirus', 'soc', 'mfa', 'privileged access', 'vulnerability', 'ciberseguridad', 'seguridad', 'brecha', 'auditoría'],
                go: () => highlight('biz-cyber')
            },
            {
                icon: 'fa-phone-alt', color: '#8b5cf6', title: 'VoIP & Business Communications',
                desc: 'Business phone systems, Teams calling, SIP trunks, call quality.',
                keys: ['voip', 'phone', 'sip', 'pbx', 'call', 'teams calling', 'business phone', 'extension', 'fax', 'call quality', 'dropped calls', 'ring central', '3cx', 'teléfono', 'llamada', 'centralita'],
                go: () => highlight('biz-voip')
            },
            {
                icon: 'fa-laptop-code', color: '#10b981', title: 'Managed IT Support Plans',
                desc: 'Proactive monitoring, helpdesk, patch management, device management.',
                keys: ['managed', 'msp', 'managed it', 'monitoring', 'helpdesk', 'patch', 'rpa', 'endpoint management', 'maintenance', 'support plan', 'contract', 'monthly', 'soporte it', 'mantenimiento', 'contrato', 'monitoreo', 'printer', 'impresora', 'print'],
                go: () => highlight('biz-managed')
            },
            {
                icon: 'fa-database', color: '#06b6d4', title: 'Backup & Disaster Recovery',
                desc: 'Business backup solutions, restore points, DR planning.',
                keys: ['backup', 'disaster recovery', 'restore', 'data loss', 'dr', 'business continuity', 'replication', 'veeam', 'acronis', 'offsite', 'recovery point', 'respaldo', 'recuperación', 'desastre', 'datos'],
                go: () => location.href = 'contact-us.html?service=business-cloud-solutions'
            },
            {
                icon: 'fa-file-invoice-dollar', color: '#10b981', title: 'Business Billing & Contracts',
                desc: 'Invoice queries, managed service plan adjustments, or renewals.',
                keys: ['billing', 'invoice', 'contract', 'renewal', 'pricing', 'quote', 'service plan', 'payment', 'retainer', 'facturación', 'contrato', 'renovación', 'pago'],
                go: () => highlight('res-billing')
            },
            {
                icon: 'fa-clock', color: '#f59e0b', title: 'FAQ: Support hours & SLA',
                desc: 'Mon–Fri 8AM–6PM PST standard. 24/7 emergency for business-critical issues.',
                keys: ['hours', 'sla', 'response time', 'when', 'open', 'availability', 'weekend', 'emergency', 'tiempo de respuesta', 'horario'],
                go: () => openFaq('faq-2')
            },
            {
                icon: 'fa-question-circle', color: '#6366f1', title: 'FAQ: What to include in a ticket?',
                desc: 'System affected, users impacted, error messages, and screenshots.',
                keys: ['ticket info', 'what to include', 'screenshot', 'ticket details', 'describe issue', 'qué incluir', 'detalles', 'captura'],
                go: () => openFaq('faq-4')
            },
            {
                icon: 'fa-handshake', color: '#22c55e', title: 'Request a Managed IT Quote',
                desc: 'Get a custom proposal for your business within 24 hours.',
                keys: ['quote', 'proposal', 'managed', 'pricing', 'plan', 'contract', 'business plan', 'new client', 'cotización', 'presupuesto', 'precio', 'plan'],
                go: () => location.href = 'contact-us.html?service=business-managed-it'
            },
        ];"""

import re
content = re.sub(
    r'const KB_HOME = \[.*?\}\s*,\s*\];', 
    new_kb_home, 
    content, 
    flags=re.DOTALL
)

content = re.sub(
    r'const KB_BUSINESS = \[.*?\}\s*,\s*\];', 
    new_kb_business, 
    content, 
    flags=re.DOTALL
)

with codecs.open(filepath, 'w', 'utf-8') as f:
    f.write(content)

print("Updated KB arrays in support.html")
