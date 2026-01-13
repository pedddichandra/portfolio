// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    // Wait for animation to finish (2.5s) plus a small buffer
    setTimeout(() => {
        preloader.classList.add('fade-out');
        // Remove it from DOM after transition
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800); // Matches CSS transition time
    }, 3000);
});

document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add some lag to the outline for a fluid effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects for cursor
    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            cursorOutline.style.borderColor = 'transparent';
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple animation for hamburger can be added in CSS, 
        // essentially toggling a class that changes the spans
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .project-card, .skill-category, .about-content, .contact-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });

    // Add 'visible' class styles dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.95);
            padding: 2rem;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
    `;
    document.head.appendChild(styleSheet);
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    function updateThemeIcon() {
        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        updateThemeIcon();
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        // Save preference
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
        updateThemeIcon();
    });

    // Translation Logic
    const translations = {
        en: {
            nav_about: "About",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_achievements: "Achievements",
            nav_contact: "Contact",
            hero_welcome: "Welcome to my",
            hero_welcome_suffix: "",
            hero_portfolio: "Portfolio",
            hero_intro_1: "Hi, I'm",
            hero_name: "S R Deepak",
            hero_intro_2: "A Full-Stack Developer & Machine Learning Practitioner building functional, data-driven applications for the real world.",
            btn_projects: "View Projects",
            btn_resume: "View Resume",
            btn_contact: "Let's Talk",
            about_title: "About",
            about_me: "Me",
            about_desc_1: "I am currently pursuing a <strong>B.Tech in Computer Science (AIML)</strong> at Malla Reddy University. I thrive at the intersection of machine learning, web technologies, and real-world problem solving.",
            about_desc_2: "My work spans from building intelligent chatbots and financial AI systems to healthcare prediction models. I enjoy creating products end-to-end—handling concept, architecture, UI, backend, and ML integration. Currently, I'm focused on developing production-grade digital products with intelligent workflows.",
            projects_title: "Featured",
            projects_accent: "Projects",
            proj_plc_title: "Personalized Learning Companion",
            proj_plc_desc: "An intelligent web app integrating React + AI (Gemini LLM) for chatbot support, quiz generation, performance analytics, and user-specific improvement insights.",
            proj_heart_title: "Heart Disease Prediction",
            proj_heart_desc: "Zenith Hackathon Winner. A machine learning application using Random Forest to classify heart disease risks, featuring a full preprocessing pipeline and interactive UI.",
            contact_title: "Let's",
            contact_accent: "Connect",
            contact_desc: "I'm always open to discussing AI-driven systems, FinTech innovations, or new creative opportunities. Feel free to reach out!",
            form_name: "Your Name",
            form_email: "Your Email",
            form_message: "Message",
            form_send: "Send Message",
            form_send: "Send Message",
            nav_achievements: "Achievements",
            nav_resume: "Resume"
        },
        te: {
            nav_about: "గురించి",
            nav_skills: "నైపుణ్యాలు",
            nav_projects: "ప్రాజెక్టులు",
            nav_achievements: "విజయాలు",
            nav_contact: "సంప్రదించండి",
            hero_welcome: "నా",
            hero_welcome_suffix: "కు స్వాగతం",
            hero_portfolio: "Portfolio", 
            hero_intro_1: "నమస్తే, నేను",
            hero_name: "ఎస్ ఆర్ దీపక్",
            hero_intro_2: "నేను ఒక ఫుల్ స్టాక్ డెవలపర్ & మెషిన్ లెర్నింగ్ ప్రాక్టీషనర్‌ని. వాస్తవ ప్రపంచ సమస్యలకు డాటా-ఆధారిత అప్లికేషన్లను నిర్మిస్తాను.",
            btn_projects: "ప్రాజెక్టులు చూడండి",
            btn_resume: "రెజ్యూమ్ చూడండి",
            btn_contact: "మాట్లాడుకుందాం",
            about_title: "నా",
            about_me: "గురించి",
            about_desc_1: "నేను ప్రస్తుతం మల్లారెడ్డి విశ్వవిద్యాలయంలో <strong>బి.టెక్ కంప్యూటర్ సైన్స్ (AIML)</strong> చదువుతున్నాను. మెషిన్ లెర్నింగ్ మరియు వెబ్ టెక్నాలజీల ద్వారా సమస్యలను పరిష్కరించడం నాకు ఇష్టం.",
            about_desc_2: "చాట్‌బాట్‌లు మరియు ఫైనాన్షియల్ ఏఐ సిస్టమ్స్ నుండి హెల్త్‌కేర్ మోడల్స్ వరకు నేను పని చేస్తాను. కాన్సెప్ట్ నుండి UI, బ్యాకెండ్ మరియు ML ఇంటిగ్రేషన్ వరకు మొత్తం ప్రొడక్ట్ డెవలప్‌మెంట్ చేయడం నాకు ఆనందం.",
            projects_title: "ప్రముఖ",
            projects_accent: "ప్రాజెక్టులు",
            proj_plc_title: "వ్యక్తిగత అభ్యాస సహచరుడు",
            proj_plc_desc: "చాట్‌బాట్ మద్దతు, క్విజ్ జనరేషన్ మరియు పనితీరు విశ్లేషణ కోసం రియాక్ట్ + ఏఐ (జెమిని) ఉపయోగించే ఒక తెలివైన వెబ్ యాప్.",
            proj_heart_title: "గుండె జబ్బు అంచనా",
            proj_heart_desc: "జెనిత్ హ్యాకథాన్ విన్నర్. రాండమ్ ఫారెస్ట్ ఉపయోగించి గుండె జబ్బులను గుర్తించే మెషిన్ లెర్నింగ్ అప్లికేషన్.",
            contact_title: "కలిసి",
            contact_accent: "పనిచేద్దాం",
            contact_desc: "ఏఐ సిస్టమ్స్, ఫిన్‌టెక్ లేదా కొత్త అవకాశాల గురించి చర్చించడానికి నేను ఎప్పుడూ సిద్ధంగా ఉంటాను. నన్ను సంప్రదించండి!",
            form_name: "మీ పేరు",
            form_email: "మీ ఈమెయిల్",
            form_message: "సందేశం",
            form_send: "సందేశం పంపండి",
            nav_achievements: "విజయాలు",
            nav_resume: "రెజ్యూమ్"
        },
        hi: {
            nav_about: "मेरे बारे में",
            nav_skills: "कौशल",
            nav_projects: "प्रोजेक्ट्स",
            nav_achievements: "उपलब्धियां",
            nav_contact: "संपर्क करें",
            hero_welcome: "मेरे",
            hero_welcome_suffix: " में आपका स्वागत है",
            hero_portfolio: "Portfolio",
            hero_intro_1: "नमस्ते, मैं हूँ",
            hero_name: "एस आर दीपक",
            hero_intro_2: "मैं एक फुल स्टैक डेवलपर और मशीन लर्निंग प्रैक्टिशनर हूँ जो वास्तविक दुनिया के लिए डेटा-आधारित एप्लिकेशन बनाता हूँ।",
            btn_projects: "प्रोजेक्ट्स देखें",
            btn_resume: "रिज़्यूम देखें",
            btn_contact: "बात करते हैं",
            about_title: "मेरे",
            about_me: "बारे में",
            about_desc_1: "मैं वर्तमान में मल्ला रेड्डी विश्वविद्यालय में <strong>B.Tech कंप्यूटर विज्ञान (AIML)</strong> कर रहा हूँ। मुझे मशीन लर्निंग और वेब तकनीकों के माध्यम से समस्याओं को हल करना पसंद है।",
            about_desc_2: "मैं चैटबॉट और वित्तीय एआई सिस्टम से लेकर हेल्थकेयर मॉडल तक बनाता हूँ। मुझे कॉन्सेप्ट से लेकर यूआई, बैकएंड और एमएल इंटीग्रेशन तक पूरा प्रोडक्ट तैयार करना पसंद है।",
            projects_title: "प्रमुख",
            projects_accent: "प्रोजेक्ट्स",
            proj_plc_title: "पर्सनलाइज्ड लर्निंग कंपेनियन",
            proj_plc_desc: "चैटबॉट सपोर्ट, क्विज जनरेशन और परफॉर्मेंस एनालिटिक्स के लिए रिएक्ट + एआई (जेमिनी) का उपयोग करने वाला एक स्मार्ट वेब ऐप।",
            proj_heart_title: "हृदय रोग की भविष्यवाणी",
            proj_heart_desc: "जेनिथ हैकथॉन विजेता। रैंडम फॉरेस्ट का उपयोग करके हृदय रोग के जोखिमों को वर्गीकृत करने वाला मशीन लर्निंग एप्लिकेशन।",
            contact_title: "आओ",
            contact_accent: "जुड़ें",
            contact_desc: "मैं एआई सिस्टम, फिनटेक या नए अवसरों पर चर्चा करने के लिए हमेशा तैयार हूँ। बेझिझक संपर्क करें!",
            form_name: "आपका नाम",
            form_email: "आपका ईमेल",
            form_message: "संदेश",
            form_send: "संदेश भेजें",
            nav_achievements: "उपलब्धियां",
            nav_resume: "रिज़्यूम"
        }
    };

    const langBtns = document.querySelectorAll('.lang-content a');
    const currentLangSpan = document.querySelector('.current-lang');

    function updateLanguage(lang) {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key] !== undefined) {
                // If the element has internal HTML tags (like bold), use innerHTML
                if (translations[lang][key].includes('<')) {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Update button text
        currentLangSpan.textContent = lang.toUpperCase();
        
        // Save preference
        localStorage.setItem('language', lang);
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });

    // Load saved language
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        updateLanguage(savedLang);
    }

});