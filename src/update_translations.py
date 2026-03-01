import json
import os

EN_FILE = "translations/en.json"
ES_FILE = "translations/es.json"

def load_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

en = load_json(EN_FILE)
es = load_json(ES_FILE)

# 1. Add JS Subtitles
en['supportPage']['resources']['subtitleHome'] = "Quick fixes for common issues"
en['supportPage']['resources']['subtitleBiz'] = "Enterprise IT solutions at your fingertips"
en['supportPage']['faq']['subtitleHome'] = "Common questions from home users"
en['supportPage']['faq']['subtitleBiz'] = "Enterprise IT questions answered"

es['supportPage']['resources']['subtitleHome'] = "Soluciones rápidas para problemas comunes"
es['supportPage']['resources']['subtitleBiz'] = "Soluciones de TI empresarial a tu alcance"
es['supportPage']['faq']['subtitleHome'] = "Preguntas comunes de usuarios domésticos"
es['supportPage']['faq']['subtitleBiz'] = "Respuestas a preguntas de TI empresarial"

# 2. Add remaining Home FAQs (q5 to q9)
en['supportPage']['faq']['items']['q5'] = {
    "q": "How long does it typically take to resolve an issue?",
    "a": "Resolution time depends on the complexity of the issue. Most common problems are resolved within 1–2 hours during business hours. Emergency calls are answered within 15 minutes, 24/7."
}
en['supportPage']['faq']['items']['q6'] = {
    "q": "What areas does SoonTech serve?",
    "a": "We are based in Surrey, BC and serve clients throughout the Lower Mainland. Remote support is available for clients anywhere in Canada."
}
en['supportPage']['faq']['items']['q7'] = {
    "q": "Is my data safe when you access my computer remotely?",
    "a": "Absolutely. We use TeamViewer for remote sessions, which employs AES 256-bit encryption. You can see everything our technician does and can end the session at any moment."
}
en['supportPage']['faq']['items']['q8'] = {
    "q": "What happens if my issue occurs outside business hours?",
    "a": "Our standard support hours are Mon-Fri, 8 AM - 6 PM PST. For urgent situations, our 24/7 emergency line is available at +1 (778) 862-4365."
}
en['supportPage']['faq']['items']['q9'] = {
    "q": "Do you offer monthly support plans for businesses?",
    "a": "Yes! We offer Managed IT Service plans tailored to your needs. Plans include proactive monitoring, cybersecurity protection, and priority response times."
}

es['supportPage']['faq']['items']['q5'] = {
    "q": "¿Cuánto tiempo toma típicamente resolver un problema?",
    "a": "El tiempo de resolución depende de la complejidad. Los problemas comunes se resuelven en 1–2 horas en horario comercial. Las llamadas de emergencia se responden en 15 minutos, 24/7."
}
es['supportPage']['faq']['items']['q6'] = {
    "q": "¿Qué áreas atiende SoonTech?",
    "a": "Estamos ubicados en Surrey, BC y atendemos a clientes en todo Lower Mainland. El soporte remoto está disponible en cualquier lugar de Canadá."
}
es['supportPage']['faq']['items']['q7'] = {
    "q": "¿Están seguros mis datos cuando acceden remotamente?",
    "a": "Absolutamente. Usamos TeamViewer, que emplea cifrado AES de 256 bits. Puedes ver todo lo que hace nuestro técnico y finalizar la sesión cuando desees."
}
es['supportPage']['faq']['items']['q8'] = {
    "q": "¿Qué pasa si ocurre un problema fuera del horario comercial?",
    "a": "Nuestro horario es de Lun-Vie, 8 AM - 6 PM PST. Para urgencias, nuestra línea de emergencia 24/7 está disponible en el +1 (778) 862-4365."
}
es['supportPage']['faq']['items']['q9'] = {
    "q": "¿Ofrecen planes de soporte mensual para empresas?",
    "a": "¡Sí! Ofrecemos planes de Servicios de TI Administrados a medida. Incluyen monitoreo proactivo, protección de ciberseguridad y prioridad de respuesta."
}


# 3. Add Business Resources
en['supportPage']['resources']['itemsBiz'] = {
    "bizServer": {
        "title": "Server & Infrastructure",
        "description": "Outages, performance, hardware"
    },
    "bizM365": {
        "title": "Microsoft 365 & Cloud",
        "description": "Teams, SharePoint, OneDrive"
    },
    "bizNetwork": {
        "title": "Network & VPN",
        "description": "Business connectivity & remote access"
    },
    "bizCyber": {
        "title": "Cybersecurity & Compliance",
        "description": "Threats, audits, policies"
    },
    "bizVoip": {
        "title": "VoIP & Communications",
        "description": "Phone systems & Teams calling"
    },
    "bizManaged": {
        "title": "Managed IT Support",
        "description": "Monitoring, helpdesk, devices"
    }
}

es['supportPage']['resources']['itemsBiz'] = {
    "bizServer": {
        "title": "Servidores e Infraestructura",
        "description": "Caídas, rendimiento, hardware"
    },
    "bizM365": {
        "title": "Microsoft 365 y la Nube",
        "description": "Teams, SharePoint, OneDrive"
    },
    "bizNetwork": {
        "title": "Red y VPN",
        "description": "Conectividad empresarial y acceso remoto"
    },
    "bizCyber": {
        "title": "Ciberseguridad y Cumplimiento",
        "description": "Amenazas, auditorías, políticas"
    },
    "bizVoip": {
        "title": "VoIP y Comunicaciones",
        "description": "Sistemas telefónicos y llamadas de Teams"
    },
    "bizManaged": {
        "title": "Soporte de TI Administrado",
        "description": "Monitoreo, mesa de ayuda, dispositivos"
    }
}

# 4. Add Business FAQs
en['supportPage']['faq']['itemsBiz'] = {
    "bfaq1": {
        "q": "What does your Managed IT service include?",
        "a": "Plans include 24/7 proactive monitoring, remote/on-site helpdesk, patch management, endpoint security, monthly reporting, and MS365 administration."
    },
    "bfaq2": {
        "q": "What is your SLA response time for business clients?",
        "a": "Critical issues: 15 minutes, 24/7. High severity: 1 business hour. Medium severity: 4 hours. Low severity/requests: 1 business day."
    },
    "bfaq3": {
        "q": "How do you handle cybersecurity for business clients?",
        "a": "Standard protections include EDR, MFA enforcement, weekly security patching, email security via Defender, staff awareness training, and rapid incident response."
    },
    "bfaq4": {
        "q": "Can you migrate our business to Microsoft 365?",
        "a": "Yes. We handle the complete process including pre-migration audit, tenant setup, 100% data-loss-free email migration, Teams/SharePoint rollout, and user training."
    },
    "bfaq5": {
        "q": "Do you offer on-site support, or is it only remote?",
        "a": "Both. Over 80% of issues are resolved remotely for faster resolution. On-site support is provided for hardware, networking, and server physical tasks throughout the Lower Mainland."
    },
    "bfaq6": {
        "q": "How do you handle backups and disaster recovery for businesses?",
        "a": "We deploy automated daily backups, offsite cloud replication, and regular restore testing. We establish clear Recovery Time (RTO) and Recovery Point (RPO) objectives with your leadership."
    },
    "bfaq7": {
        "q": "Can SoonTech support a multi-location business?",
        "a": "Yes. We manage multi-site networks linking locations securely via site-to-site VPN or SD-WAN, and provide central remote device management for employees across Canada."
    },
    "bfaq8": {
        "q": "What information do you need to onboard our business?",
        "a": "During an IT discovery session, we collect an inventory of all hardware, software licenses, network diagrams, and current vendor contacts. From there, we take over everything seamlessly."
    }
}

es['supportPage']['faq']['itemsBiz'] = {
    "bfaq1": {
        "q": "¿Qué incluye su servicio de TI Administrado?",
        "a": "Los planes incluyen monitoreo proactivo 24/7, soporte remoto/local, gestión de parches, seguridad de endpoints, informes mensuales y administración de MS365."
    },
    "bfaq2": {
        "q": "¿Cuál es su tiempo de respuesta SLA para empresas?",
        "a": "Problemas críticos: 15 minutos, 24/7. Gravedad alta: 1 hora hábil. Media: 4 horas. Baja/peticiones: 1 día hábil."
    },
    "bfaq3": {
        "q": "¿Cómo manejan la ciberseguridad empresarial?",
        "a": "Las protecciones incluyen EDR, aplicación de MFA, parches de seguridad semanales, seguridad de correo electrónico, concientización del personal y respuesta rápida."
    },
    "bfaq4": {
        "q": "¿Pueden migrar nuestra empresa a Microsoft 365?",
        "a": "Sí. Manejamos todo el proceso: auditoría previa, configuración del entorno, migración de correo 100% segura, implementación de Teams/SharePoint y capacitación de usuarios."
    },
    "bfaq5": {
        "q": "¿Ofrecen soporte local, o es solo remoto?",
        "a": "Ambos. Más del 80% de los problemas se resuelven de forma remota. El soporte presencial está disponible para hardware y servidores en Lower Mainland."
    },
    "bfaq6": {
        "q": "¿Cómo manejan los respaldos y la recuperación ante desastres?",
        "a": "Implementamos respaldos diarios automáticos, replicación remota en la nube y pruebas regulares de restauración estableciendo tiempos y puntos de recuperación claros (RTO/RPO)."
    },
    "bfaq7": {
        "q": "¿Puede SoonTech asistir a una empresa con múltiples sedes?",
        "a": "Sí. Gestionamos redes multi-sitio conectándolas de forma segura a través de VPN e implementamos administración remota centralizada para empleados en todo Canadá."
    },
    "bfaq8": {
        "q": "¿Qué información necesitan para incorporar nuestro negocio?",
        "a": "En la sesión de descubrimiento, recopilamos inventario de hardware, licencias, diagramas de red y contactos de proveedores. A partir de ahí, asumimos todo el control sin problemas."
    }
}

save_json(EN_FILE, en)
save_json(ES_FILE, es)
print("Translations successfully injected.")
