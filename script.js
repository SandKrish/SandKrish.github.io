// Add background on navbar scroll
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Trigger animations for elements already in view on load
document.addEventListener('DOMContentLoaded', () => {
    // 3D Tilt Effect for Book
    const bookCover = document.querySelector('.book-cover');
    const bookContainer = document.querySelector('.book-container');

    if (bookContainer && bookCover) {
        bookContainer.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; 

            // If the book is opening/open, stop updating the tilt to prevent jitters
            if (bookContainer.matches(':hover')) return;

            const rect = bookContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            // Ensure we remove any inline transform that might have been set previously
            if (bookCover.style.transform) {
                bookCover.style.transform = '';
            }

            bookCover.style.setProperty('--tiltX', `${rotateX}deg`);
            bookCover.style.setProperty('--tiltY', `${rotateY}deg`);
        });

        bookContainer.addEventListener('mouseleave', () => {
            bookCover.style.setProperty('--tiltX', `0deg`);
            bookCover.style.setProperty('--tiltY', `0deg`);
            // Also ensure transform is cleared here
            bookCover.style.transform = '';
        });
    }

    // Immediate check for elements in view
    setTimeout(() => {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }, 100);
});

// Theme Toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const icon = themeToggleBtn.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    icon.classList.replace('fa-sun', 'fa-moon');
}

themeToggleBtn.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'light') {
        document.body.removeAttribute('data-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Translations
const translations = {
    en: {
        nav_about: "About",
        nav_projects: "Projects",
        nav_publications: "Publications",
        nav_contact: "Contact",
        nav_theme: "Theme",
        hero_hi: "Hi, I'm <span class=\"highlight\">Sandhya Krishnan</span>",
        hero_title: "Senior Python Developer | AI & LLM Systems (Agents, Automation) | Data Engineering | ML | Author",
        hero_desc: "Building scalable data pipelines, advanced analytics systems, and high-fidelity machine learning models.",
        btn_work: "View My Work",
        btn_contact: "Get In Touch",
        about_title: "About Me",
        about_p1: "I have over <strong>14+ years</strong> of experience in software engineering, with the last <strong>4+ years</strong> specializing entirely in building scalable Python data pipelines, distributed systems, and advanced analytics architectures.",
        about_p2: "I'm also the author of <em>\"Python Coding for Kids (Ages 8-10)\"</em>, combining my technical expertise with a passion for teaching and communication.",
        tech_stack: "Tech Stack",
        projects_title: "Featured Projects",
        proj1_type: "AI Engineering",
        proj1_desc: "An AI-powered agent dashboard designed as a unified command center to manage workflows, automate repetitive tasks, and reduce context switching across tools. Integrates LLMs (Ollama) and WhatsApp (Twilio).",
        proj_ai_recept_type: "AI Engineering",
        proj_ai_recept_title: "German AI Receptionist",
        proj_ai_recept_desc: "An AI Voice Receptionist built with FastAPI and Vapi to handle outbound calls, manage patient information, and automate appointment bookings using GPT-4o.",
        proj2_type: "Data Visualization",
        proj2_title: "Tableau Public Portfolio",
        proj2_desc: "A collection of high-fidelity, interactive dashboards including the viral \"AI Evolution\" visualization. Features advanced calculated fields, complex statistical modeling, and premium aesthetic design.",
        proj3_type: "Data Engineering",
        proj3_title: "Python Excel Automation Engine",
        proj3_desc: "Enterprise-grade, professional automation framework for multi-sheet Excel ingestion, Pydantic-based data validation, and high-fidelity scientific visualizations using Seaborn and Matplotlib.",
        proj4_type: "Machine Learning",
        proj4_title: "Time Series Forecasting System",
        proj4_desc: "Robust forecasting models for temporal data leveraging both classical statistical and modern Machine Learning approaches.",
        btn_repo: "<i class=\"fab fa-github\"></i> View Repository",
        btn_demo: "<i class=\"fab fa-youtube\"></i> Watch Demo",
        btn_profile: "<i class=\"fas fa-chart-pie\"></i> View Profile",
        pub_title: "Publications & Writing",
        pub1_sub: "Ages 8-10 | A Visual Step-by-Step Guide",
        pub1_desc: "I wrote this book to make programming accessible and visual for younger audiences, teaching foundational concepts in a fun, engaging way.",
        btn_amazon: "<i class=\"fab fa-amazon\"></i> View on Amazon",
        btn_anim: "<i class=\"fab fa-youtube\"></i> Watch Animation",
        pub2_title: "Medium Articles",
        pub2_desc: "I frequently write about Python engineering, Data pipelines, Data quality systems, and Practical Machine Learning concepts.",
        btn_articles: "<i class=\"fas fa-external-link-alt\"></i> Read My Articles",
        contact_title: "Let's Connect",
        contact_desc: "I'm always open to discussing data engineering, machine learning, or potential collaborations.",
        footer: "&copy; 2026 Sandhya Krishnan. All rights reserved."
    },
    de: {
        nav_about: "Über mich",
        nav_projects: "Projekte",
        nav_publications: "Publikationen",
        nav_contact: "Kontakt",
        nav_theme: "Design",
        hero_hi: "Hallo, ich bin <span class=\"highlight\">Sandhya Krishnan</span>",
        hero_title: "Senior Python Entwickler | KI & LLM Systeme (Agenten, Automatisierung) | Data Engineering | ML | Autorin",
        hero_desc: "Entwicklung skalierbarer Datenpipelines, fortschrittlicher Analysesysteme und hochpräziser Machine-Learning-Modelle.",
        btn_work: "Meine Arbeit ansehen",
        btn_contact: "Kontakt aufnehmen",
        about_title: "Über mich",
        about_p1: "Ich habe über <strong>14+ Jahre</strong> Erfahrung in der Softwareentwicklung, wobei ich mich in den letzten <strong>4+ Jahren</strong> vollständig auf den Aufbau skalierbarer Python-Datenpipelines, verteilter Systeme und fortschrittlicher Analysearchitekturen spezialisiert habe.",
        about_p2: "Ich bin auch die Autorin von <em>„Python Coding for Kids (Ages 8-10)“</em> und verbinde mein technisches Fachwissen mit einer Leidenschaft für das Unterrichten und die Kommunikation.",
        tech_stack: "Technologien",
        projects_title: "Ausgewählte Projekte",
        proj1_type: "KI-Entwicklung",
        proj1_desc: "Ein KI-gestütztes Agenten-Dashboard, das als zentrales Kontrollzentrum entwickelt wurde, um Workflows zu verwalten, wiederkehrende Aufgaben zu automatisieren und Kontextwechsel zwischen Tools zu reduzieren. Integriert LLMs (Ollama) und WhatsApp (Twilio).",
        proj_ai_recept_type: "KI-Entwicklung",
        proj_ai_recept_title: "Deutscher KI-Empfang",
        proj_ai_recept_desc: "Ein KI-Sprachempfang, der mit FastAPI und Vapi entwickelt wurde, um ausgehende Anrufe zu bearbeiten, Patienteninformationen zu verwalten und Terminbuchungen mit GPT-4o zu automatisieren.",
        proj2_type: "Datenvisualisierung",
        proj2_title: "Tableau Public Portfolio",
        proj2_desc: "Eine Sammlung hochpräziser, interaktiver Dashboards, einschließlich der viralen „AI Evolution“-Visualisierung. Bietet erweiterte berechnete Felder, komplexe statistische Modellierung und erstklassiges ästhetisches Design.",
        proj3_type: "Data Engineering",
        proj3_title: "Python Excel Automatisierungs-Engine",
        proj3_desc: "Professionelles Automatisierungs-Framework auf Enterprise-Niveau für die Aufnahme von Multi-Sheet-Excel-Dateien, Pydantic-basierte Datenvalidierung und hochpräzise wissenschaftliche Visualisierungen mit Seaborn und Matplotlib.",
        proj4_type: "Machine Learning",
        proj4_title: "Zeitreihen-Prognosesystem",
        proj4_desc: "Robuste Prognosemodelle für temporale Daten unter Nutzung sowohl klassischer statistischer als auch moderner Machine-Learning-Ansätze.",
        btn_repo: "<i class=\"fab fa-github\"></i> Repository ansehen",
        btn_demo: "<i class=\"fab fa-youtube\"></i> Demo ansehen",
        btn_profile: "<i class=\"fas fa-chart-pie\"></i> Profil ansehen",
        pub_title: "Publikationen & Schreiben",
        pub1_sub: "Alter 8-10 | Eine visuelle Anleitung",
        pub1_desc: "Ich habe dieses Buch geschrieben, um das Programmieren für ein jüngeres Publikum zugänglich und visuell zu gestalten und grundlegende Konzepte auf unterhaltsame und ansprechende Weise zu vermitteln.",
        btn_amazon: "<i class=\"fab fa-amazon\"></i> Auf Amazon ansehen",
        btn_anim: "<i class=\"fab fa-youtube\"></i> Animation ansehen",
        pub2_title: "Medium-Artikel",
        pub2_desc: "Ich schreibe regelmäßig über Python-Engineering, Datenpipelines, Datenqualitätssysteme und praktische Machine-Learning-Konzepte.",
        btn_articles: "<i class=\"fas fa-external-link-alt\"></i> Meine Artikel lesen",
        contact_title: "Lassen Sie uns vernetzen",
        contact_desc: "Ich bin immer offen für Diskussionen über Data Engineering, Machine Learning oder mögliche Kooperationen.",
        footer: "&copy; 2026 Sandhya Krishnan. Alle Rechte vorbehalten."
    }
};

// Language Toggling
const langEnBtn = document.getElementById('lang-en');
const langDeBtn = document.getElementById('lang-de');
const elementsToTranslate = document.querySelectorAll('[data-i18n]');

function setLanguage(lang) {
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    if (lang === 'en') {
        langEnBtn.classList.add('active');
        langDeBtn.classList.remove('active');
    } else {
        langDeBtn.classList.add('active');
        langEnBtn.classList.remove('active');
    }
}

langEnBtn.addEventListener('click', () => setLanguage('en'));
langDeBtn.addEventListener('click', () => setLanguage('de'));

// Check for saved language
const appSavedLang = localStorage.getItem('lang') || 'en';
setLanguage(appSavedLang);
