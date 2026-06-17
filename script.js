// ========================================
// Voranex.ai — Script
// ========================================

// ========================================
// ANTI-REDIRECT PROTECTION
// Prevents malicious redirects and monitors suspicious activity
// ========================================
(function() {
    'use strict';

    // Whitelist of allowed domains for any future external links
    const ALLOWED_DOMAINS = [
        'www.voranex.ai',
        'voranex.ai'
    ];

    // Block unauthorized window.open
    const originalWindowOpen = window.open;
    window.open = function(...args) {
        console.warn('Blocked window.open attempt:', args);
        return null;
    };

    // Block unauthorized location changes
    let isInternalNavigation = false;
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
        if (!isInternalNavigation) {
            console.warn('Blocked unauthorized history.pushState');
            return;
        }
        return originalPushState.apply(this, args);
    };

    history.replaceState = function(...args) {
        if (!isInternalNavigation) {
            console.warn('Blocked unauthorized history.replaceState');
            return;
        }
        return originalReplaceState.apply(this, args);
    };

    // Monitor and validate all link clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href) {
            const url = new URL(link.href, window.location.origin);

            // Allow anchor links on same page
            if (url.hash && url.pathname === window.location.pathname) {
                return; // Internal navigation is OK
            }

            // Block external redirects
            if (url.hostname !== window.location.hostname) {
                if (!ALLOWED_DOMAINS.includes(url.hostname)) {
                    e.preventDefault();
                    console.error('Blocked unauthorized external redirect to:', url.href);
                    alert('Security: External navigation blocked');
                    return false;
                }
            }
        }
    }, true);

    // Block meta refresh attempts
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeName === 'META' && node.httpEquiv === 'refresh') {
                    node.remove();
                    console.error('Blocked malicious meta refresh redirect');
                }
            });
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Monitor for suspicious iframe injections
    setInterval(function() {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(function(iframe) {
            // Remove any iframes not from allowed sources
            const src = iframe.src || '';
            if (src && !ALLOWED_DOMAINS.some(domain => src.includes(domain))) {
                iframe.remove();
                console.error('Removed suspicious iframe:', src);
            }
        });
    }, 2000);

    console.log('🔒 Anti-redirect protection active');
})();

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        navbar.classList.toggle('scrolled', currentScroll > 50);

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > 300) {
            if (currentScroll > lastScroll) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // ---- Mobile menu toggle ----
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    mobileToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        navLinks.classList.toggle('mobile-open', menuOpen);
        mobileToggle.classList.toggle('active', menuOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) {
                menuOpen = false;
                navLinks.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (menuOpen && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            menuOpen = false;
            navLinks.classList.remove('mobile-open');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ---- Scroll-based fade-in animations ----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll(
        '.service-card, .step, .highlight, .about-content, .about-visual, .contact-info, .contact-form-wrapper, .hero-logo, .hero-badge, .hero-stats, .section-header'
    ).forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });

    // Stagger service card animations
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // Stagger step animations
    document.querySelectorAll('.step').forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.2}s`;
    });

    // ---- Animated stat counters ----
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsCounted) {
                statsCounted = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) statsObserver.observe(statsSection);

    function animateStats() {
        statNumbers.forEach(stat => {
            const text = stat.textContent.trim();
            const match = text.match(/^(\d+)/);
            if (match) {
                const target = parseInt(match[1]);
                const suffix = text.replace(match[1], '');
                let current = 0;
                const duration = 1500;
                const step = target / (duration / 16);

                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    stat.textContent = Math.floor(current) + suffix;
                }, 16);
            }
        });
    }

    // ---- Typing effect for hero heading ----
    const heroH1 = document.querySelector('.hero h1');
    if (heroH1) {
        heroH1.style.opacity = '0';
        heroH1.style.transform = 'translateY(20px)';

        setTimeout(() => {
            heroH1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroH1.style.opacity = '1';
            heroH1.style.transform = 'translateY(0)';
        }, 300);
    }

    // ---- Parallax glow effect on mouse move ----
    const heroSection = document.querySelector('.hero');
    const glows = document.querySelectorAll('.glow');

    if (heroSection && glows.length) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            glows.forEach((glow, i) => {
                const speed = (i + 1) * 20;
                glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            glows.forEach(glow => {
                glow.style.transition = 'transform 0.5s ease';
                glow.style.transform = 'translate(0, 0)';
                setTimeout(() => { glow.style.transition = ''; }, 500);
            });
        });
    }

    // ---- Service card tilt on hover ----
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (y - 0.5) * -8;
            const rotateY = (x - 0.5) * 8;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ---- Form validation & submission ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, select, textarea');

        // Real-time validation styling
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.required && !input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '';
                }
            });

            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate email
            const emailInput = contactForm.querySelector('input[type="email"]');
            if (emailInput && !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = '#ef4444';
                emailInput.focus();
                return;
            }

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="btn-spinner"></span> Sending...';
            btn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    // Success message
                    btn.innerHTML = '✓ Message Sent Successfully!';
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    contactForm.reset();

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 4000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error message
                btn.innerHTML = '✗ Failed to send. Please try again or email us directly.';
                btn.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            }
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ---- Back to top (keyboard shortcut) ----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // ========================================
    // Demo Chat Functionality
    // ========================================

    // Mock clinical responses database
    const mockResponses = {
        "what are the symptoms of diabetes": {
            answer: "According to the retrieved clinical documents, common symptoms of diabetes include:\n\n• **Increased thirst and frequent urination** - The body tries to eliminate excess glucose through urine\n• **Extreme fatigue** - Cells aren't getting enough glucose for energy\n• **Blurred vision** - High blood sugar levels can affect the lens of the eye\n• **Slow-healing wounds** - High glucose levels impair circulation and immune response\n• **Unexplained weight loss** - Especially in Type 1 diabetes\n• **Tingling or numbness** - In hands and feet, indicating nerve damage\n\nThese symptoms may develop gradually in Type 2 diabetes but can appear suddenly in Type 1 diabetes. Early detection and management are crucial for preventing complications.",
            sources: ["PMID:34521245", "PMID:33891047", "PMC-Patients-127"]
        },
        "how is hypertension diagnosed": {
            answer: "Based on the clinical literature, hypertension is diagnosed through the following process:\n\n**Blood Pressure Measurement:**\n• Multiple readings taken on separate occasions\n• Both systolic (top number) and diastolic (bottom number) pressures recorded\n• Readings consistently ≥130/80 mmHg indicate hypertension (ACC/AHA guidelines)\n\n**Diagnostic Steps:**\n1. **Initial Screening** - Blood pressure checked during routine visits\n2. **Confirmation** - At least 2-3 elevated readings on different days\n3. **Ambulatory Monitoring** - 24-hour BP monitoring may be used for confirmation\n4. **Physical Examination** - Check for signs of end-organ damage\n5. **Laboratory Tests** - Assess kidney function, blood sugar, cholesterol\n\n**Classification:**\n• Elevated: 120-129/<80 mmHg\n• Stage 1: 130-139/80-89 mmHg\n• Stage 2: ≥140/≥90 mmHg\n\nEarly diagnosis allows for lifestyle modifications and treatment to prevent cardiovascular complications.",
            sources: ["PMID:29146535", "PMID:31843071", "PMC-Patients-89"]
        },
        "what treatments are available for heart failure": {
            answer: "The clinical evidence supports a multi-faceted treatment approach for heart failure:\n\n**Pharmacological Treatments:**\n• **ACE Inhibitors/ARBs** - Reduce workload on the heart, improve survival\n• **Beta-blockers** - Slow heart rate, reduce blood pressure\n• **Diuretics** - Remove excess fluid, reduce symptoms\n• **Aldosterone antagonists** - Improve outcomes in advanced heart failure\n• **SGLT2 Inhibitors** - Newer class showing significant benefit\n\n**Device Therapy:**\n• **Implantable cardioverter-defibrillator (ICD)** - For arrhythmia risk\n• **Cardiac resynchronization therapy (CRT)** - For certain heart failure patterns\n• **Ventricular assist devices (VADs)** - For advanced cases\n\n**Lifestyle Modifications:**\n• Sodium restriction (<2g/day)\n• Fluid management\n• Regular exercise (as tolerated)\n• Weight monitoring\n• Smoking cessation\n\n**Advanced Options:**\n• Heart transplantation for end-stage disease\n\nTreatment is individualized based on ejection fraction, symptoms, and comorbidities. Regular monitoring and medication adherence are essential for optimal outcomes.",
            sources: ["PMID:35363499", "PMID:34449189", "PMC-Patients-203"]
        },
        "summarize diabetes management strategies": {
            answer: "**Comprehensive Diabetes Management Summary:**\n\n**Glycemic Control:**\n• Target HbA1c <7% for most adults (individualized targets)\n• Regular blood glucose monitoring\n• Medication titration based on response\n\n**Pharmacotherapy:**\n• Metformin as first-line for Type 2 diabetes\n• Additional agents: SGLT2 inhibitors, GLP-1 agonists, DPP-4 inhibitors\n• Insulin therapy when oral agents insufficient\n• Newer agents show cardiovascular and renal benefits\n\n**Lifestyle Interventions:**\n• Medical nutrition therapy with carbohydrate management\n• Regular physical activity (150 min/week moderate exercise)\n• Weight management (5-10% loss improves outcomes)\n• Smoking cessation\n\n**Complication Prevention:**\n• Annual eye exams for retinopathy screening\n• Regular foot examinations\n• Blood pressure control (<130/80 mmHg)\n• Lipid management with statins\n• Kidney function monitoring\n\n**Patient Education:**\n• Self-management training\n• Recognition of hypo/hyperglycemia\n• Sick day management\n\nA team-based approach involving physicians, diabetes educators, dietitians, and pharmacists optimizes outcomes. Regular monitoring and treatment adjustments are key to preventing long-term complications.",
            sources: ["PMID:34399612", "PMID:33510071", "PMC-Patients-156", "PMC-Patients-178"]
        },
        "what are the signs of pneumonia": {
            answer: "Clinical documentation indicates that pneumonia presents with the following signs and symptoms:\n\n**Respiratory Symptoms:**\n• **Cough** - Often productive with yellow, green, or bloody sputum\n• **Shortness of breath** - May worsen with activity\n• **Chest pain** - Sharp, worse with breathing or coughing (pleuritic)\n• **Rapid, shallow breathing**\n\n**Systemic Symptoms:**\n• **Fever** - Often high grade (>100.4°F/38°C)\n• **Chills and sweating**\n• **Fatigue and weakness**\n• **Loss of appetite**\n• **Confusion** - Especially in elderly patients\n\n**Physical Examination Findings:**\n• Crackles or rales on lung auscultation\n• Decreased breath sounds\n• Dullness to percussion\n• Increased tactile fremitus\n\n**Diagnostic Confirmation:**\n• Chest X-ray showing infiltrates\n• Elevated white blood cell count\n• Sputum culture if bacterial pneumonia suspected\n• Pulse oximetry may show low oxygen saturation\n\n**Risk Factors:**\n• Age >65 or <2 years\n• Chronic diseases (COPD, diabetes, heart disease)\n• Weakened immune system\n• Smoking\n\nEarly recognition and treatment with appropriate antibiotics (for bacterial pneumonia) or supportive care (for viral pneumonia) is important for preventing complications.",
            sources: ["PMID:32004513", "PMID:33891156", "PMC-Patients-241"]
        },
        "chest pain": {
            answer: "Based on the clinical literature, chest pain can have multiple causes:\n\n**Cardiac Causes:**\n• **Acute Coronary Syndrome** - Crushing, pressure-like pain, may radiate to arm/jaw\n• **Angina** - Exertional chest discomfort, relieved by rest\n• **Myocardial Infarction** - Severe, persistent pain with associated symptoms\n• **Pericarditis** - Sharp pain, worse with breathing, relieved by leaning forward\n\n**Pulmonary Causes:**\n• **Pulmonary Embolism** - Sudden onset, associated with dyspnea\n• **Pneumonia** - Pain with breathing, fever, productive cough\n• **Pneumothorax** - Sudden sharp pain, shortness of breath\n• **Pleurisy** - Sharp, localized pain worse with deep breathing\n\n**Gastrointestinal Causes:**\n• **GERD** - Burning sensation, worse after meals or lying down\n• **Esophageal spasm** - Sudden severe pain mimicking cardiac pain\n• **Peptic ulcer disease** - Burning epigastric pain\n\n**Musculoskeletal Causes:**\n• **Costochondritis** - Tenderness at costochondral junctions\n• **Muscle strain** - Pain with movement, history of exertion\n\n**Diagnostic Approach:**\n• ECG to rule out cardiac causes\n• Cardiac biomarkers (troponin)\n• Chest X-ray\n• Clinical history and physical examination\n\nImmediate evaluation is essential for chest pain, especially with red flags: radiation to arm/jaw, diaphoresis, shortness of breath, or hemodynamic instability.",
            sources: ["PMID:33245234", "PMID:31567091", "PMC-Patients-312"]
        },
        "asthma": {
            answer: "Clinical evidence on asthma management and presentation:\n\n**Clinical Presentation:**\n• **Wheezing** - High-pitched whistling sound during breathing\n• **Shortness of breath** - Especially with exertion or at night\n• **Chest tightness** - Feeling of constriction\n• **Cough** - Often worse at night or early morning, may be dry or productive\n• **Variable symptoms** - Symptoms fluctuate over time and in intensity\n\n**Diagnosis:**\n• **Spirometry** - Shows reversible airflow obstruction (FEV1 improvement ≥12% after bronchodilator)\n• **Peak flow monitoring** - Daily variability >20%\n• **Clinical history** - Recurrent respiratory symptoms, triggers\n• **Physical examination** - May be normal between exacerbations\n\n**Management Approach:**\n• **Quick-relief medications** - Short-acting beta-agonists (albuterol) for acute symptoms\n• **Controller medications** - Inhaled corticosteroids as first-line for persistent asthma\n• **Add-on therapy** - LABAs, leukotriene modifiers, or biologics for severe cases\n• **Trigger avoidance** - Allergens, irritants, cold air\n• **Action plan** - Written plan for symptom monitoring and medication adjustment\n\n**Severity Classification:**\n• Intermittent: Symptoms ≤2 days/week\n• Mild persistent: Symptoms >2 days/week but not daily\n• Moderate persistent: Daily symptoms\n• Severe persistent: Symptoms throughout the day\n\nRegular follow-up and adherence to controller therapy are essential for optimal asthma control and prevention of exacerbations.",
            sources: ["PMID:32654592", "PMID:31891456", "PMC-Patients-267"]
        },
        "stroke": {
            answer: "According to clinical documentation, stroke recognition and management:\n\n**Warning Signs (FAST):**\n• **F**ace drooping - Unilateral facial weakness\n• **A**rm weakness - One arm drifts downward\n• **S**peech difficulty - Slurred speech or inability to speak\n• **T**ime to call emergency services - Time is critical\n\n**Additional Symptoms:**\n• Sudden severe headache\n• Vision changes (one or both eyes)\n• Difficulty walking, dizziness, loss of balance\n• Confusion or trouble understanding speech\n• Numbness or weakness, especially on one side\n\n**Types of Stroke:**\n• **Ischemic (87%)** - Blood clot blocks artery\n• **Hemorrhagic (13%)** - Blood vessel ruptures\n• **TIA (transient ischemic attack)** - Temporary blockage, \"warning stroke\"\n\n**Immediate Management:**\n• **Time-critical intervention** - \"Time is brain\"\n• **CT scan** - Differentiate ischemic from hemorrhagic\n• **Thrombolysis (tPA)** - Within 4.5 hours for eligible ischemic stroke patients\n• **Thrombectomy** - Mechanical clot removal for large vessel occlusions\n• **Blood pressure management**\n• **Supportive care** - Airway, breathing, circulation\n\n**Prevention:**\n• Control hypertension, diabetes, high cholesterol\n• Antiplatelet therapy (aspirin, clopidogrel)\n• Anticoagulation for atrial fibrillation\n• Lifestyle: smoking cessation, exercise, healthy diet\n• Carotid endarterectomy for significant stenosis\n\nRapid recognition and treatment within the therapeutic window significantly improves outcomes and reduces disability.",
            sources: ["PMID:34990148", "PMID:33891234", "PMC-Patients-189"]
        },
        "copd": {
            answer: "Clinical evidence on chronic obstructive pulmonary disease (COPD):\n\n**Clinical Features:**\n• **Dyspnea** - Progressive shortness of breath, worse with exertion\n• **Chronic cough** - Often productive\n• **Sputum production** - Daily, especially in chronic bronchitis\n• **Wheezing and chest tightness**\n• **Risk factors** - Smoking (primary), occupational exposures, biomass fuel\n\n**Diagnosis:**\n• **Spirometry** - FEV1/FVC ratio <0.70 confirms airflow limitation\n• **Severity grading** - Based on FEV1 percentage predicted (GOLD criteria)\n• **Chest X-ray** - Hyperinflation, flattened diaphragm\n• **Clinical history** - Smoking history, symptom assessment\n\n**Pharmacological Management:**\n• **Bronchodilators** - Long-acting beta-agonists (LABA) and/or long-acting muscarinic antagonists (LAMA)\n• **Inhaled corticosteroids** - Added for patients with frequent exacerbations\n• **Combination therapy** - LABA + LAMA or triple therapy (LABA + LAMA + ICS)\n• **Oxygen therapy** - For chronic hypoxemia\n• **Antibiotics/steroids** - For acute exacerbations\n\n**Non-Pharmacological Management:**\n• **Smoking cessation** - Most important intervention\n• **Pulmonary rehabilitation** - Improves quality of life and exercise capacity\n• **Vaccinations** - Influenza annually, pneumococcal vaccine\n• **Nutritional support** - Maintain healthy weight\n\n**Exacerbation Management:**\n• Increased bronchodilator use\n• Systemic corticosteroids\n• Antibiotics if signs of bacterial infection\n• Supplemental oxygen if needed\n\nEarly diagnosis and comprehensive management can slow disease progression and improve quality of life.",
            sources: ["PMID:35123789", "PMID:32890145", "PMC-Patients-298"]
        },
        "lab tests diagnose anemia": {
            answer: "Laboratory testing for anemia diagnosis includes:\n\n**Initial Screening Tests:**\n• **Complete Blood Count (CBC)** - Primary screening test\n  - Hemoglobin (Hb) - Low in anemia (M: <13.5 g/dL, F: <12 g/dL)\n  - Hematocrit (Hct) - Percentage of blood that is RBCs\n  - Mean Corpuscular Volume (MCV) - Classifies anemia type\n  - Red Blood Cell (RBC) count - Number of red blood cells\n\n**Classification by MCV:**\n• **Microcytic (MCV <80 fL)** - Iron deficiency, thalassemia, chronic disease\n• **Normocytic (MCV 80-100 fL)** - Acute blood loss, hemolysis, chronic disease\n• **Macrocytic (MCV >100 fL)** - B12/folate deficiency, liver disease, hypothyroidism\n\n**Additional Diagnostic Tests:**\n• **Reticulocyte count** - Assesses bone marrow response\n• **Peripheral blood smear** - Examines RBC morphology\n• **Iron studies** - Serum iron, TIBC, ferritin, transferrin saturation\n• **Vitamin B12 and folate levels**\n• **Hemoglobin electrophoresis** - For hemoglobinopathies\n• **Serum bilirubin and LDH** - Elevated in hemolysis\n• **Coombs test** - For autoimmune hemolytic anemia\n\n**Specific Patterns:**\n• **Iron deficiency** - Low ferritin (<30 ng/mL), low serum iron, high TIBC\n• **B12 deficiency** - Low B12, elevated MCV, hypersegmented neutrophils\n• **Hemolysis** - Elevated reticulocytes, LDH, indirect bilirubin; low haptoglobin\n• **Chronic disease** - Normal/low TIBC, normal/high ferritin\n\n**Clinical Correlation:**\nInterpret lab results in context of clinical presentation, history (bleeding, diet, medications), and physical findings (pallor, jaundice, splenomegaly). Further testing guided by initial results.",
            sources: ["PMID:33456789", "PMID:34123567", "PMC-Patients-401"]
        },
        "prevent cardiovascular disease": {
            answer: "Evidence-based strategies for cardiovascular disease prevention:\n\n**Risk Factor Modification:**\n• **Blood Pressure Control** - Target <130/80 mmHg for most adults\n• **Lipid Management** - LDL <100 mg/dL (lower for high-risk patients)\n• **Diabetes Control** - HbA1c <7% reduces microvascular and macrovascular complications\n• **Smoking Cessation** - Single most important modifiable risk factor\n• **Weight Management** - BMI 18.5-24.9 kg/m², waist circumference control\n\n**Lifestyle Interventions:**\n• **Physical Activity** - ≥150 min/week moderate-intensity or 75 min/week vigorous exercise\n• **Dietary Modifications**\n  - Mediterranean or DASH diet patterns\n  - Increase fruits, vegetables, whole grains, fish, nuts\n  - Limit saturated fat, trans fat, sodium, added sugars\n  - Moderate alcohol consumption if any\n• **Stress Management** - Meditation, yoga, adequate sleep\n\n**Pharmacological Prevention:**\n• **Antiplatelet Therapy** - Aspirin for secondary prevention, select high-risk primary prevention\n• **Statins** - For elevated LDL or high cardiovascular risk (ASCVD risk ≥7.5%)\n• **Antihypertensives** - ACE inhibitors, ARBs, thiazides, calcium channel blockers\n• **Diabetes Medications** - Metformin, SGLT2 inhibitors, GLP-1 agonists with CV benefits\n\n**Screening and Monitoring:**\n• **Risk Assessment** - Calculate 10-year ASCVD risk (Pooled Cohort Equations)\n• **Blood Pressure** - Regular monitoring, home BP measurements\n• **Lipid Panel** - Screening starting age 20, frequency based on risk\n• **Diabetes Screening** - Overweight/obese with risk factors, all adults ≥45 years\n• **Family History** - Premature CVD increases risk\n\n**High-Risk Populations:**\n• More aggressive targets and interventions\n• Consider advanced lipid testing, coronary calcium scoring\n• Early intervention crucial\n\nCombined lifestyle and pharmacological approaches provide greatest benefit. Regular follow-up and adherence essential for long-term prevention.",
            sources: ["PMID:35678901", "PMID:33234567", "PMC-Patients-367", "PMC-Patients-389"]
        }
    };

    // Get a mock response based on query
    function getMockResponse(query) {
        const normalizedQuery = query.toLowerCase().trim();

        // Check for exact or partial matches
        for (const [key, response] of Object.entries(mockResponses)) {
            if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
                return response;
            }
        }

        // Check for summary keywords
        if (normalizedQuery.includes('summarize') || normalizedQuery.includes('summary') || normalizedQuery.includes('overview')) {
            return {
                answer: "I can help summarize clinical information from medical documents. The system uses retrieval-augmented generation (RAG) to find relevant clinical cases and synthesize key information.\n\nFor this demo, try one of the example questions on the left, or ask about:\n• Symptoms of specific conditions\n• Diagnostic approaches\n• Treatment options\n• Management strategies",
                sources: ["Demo Response"]
            };
        }

        // Default response for unknown queries
        return {
            answer: "Thank you for your question! In a production environment, I would search through thousands of clinical documents to find relevant information and provide a comprehensive answer with source citations.\n\nFor this demo, please try one of the example questions on the left to see how the system works with real clinical data.",
            sources: ["Demo Response"]
        };
    }

    // Add message to chat
    function addMessage(content, isUser = false, sources = null) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${isUser ? 'user' : 'assistant'}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = isUser
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Format content with line breaks
        const paragraphs = content.split('\n\n');
        paragraphs.forEach(para => {
            const p = document.createElement('p');
            p.innerHTML = para.replace(/\n/g, '<br>');
            contentDiv.appendChild(p);
        });

        // Add sources if provided
        if (sources && sources.length > 0) {
            const sourcesDiv = document.createElement('div');
            sourcesDiv.className = 'message-sources';

            const sourcesTitle = document.createElement('div');
            sourcesTitle.className = 'message-sources-title';
            sourcesTitle.textContent = 'Sources';
            sourcesDiv.appendChild(sourcesTitle);

            const sourcesContainer = document.createElement('div');
            sources.forEach(source => {
                const sourceTag = document.createElement('span');
                sourceTag.className = 'source-tag';
                sourceTag.textContent = source;
                sourcesContainer.appendChild(sourceTag);
            });
            sourcesDiv.appendChild(sourcesContainer);
            contentDiv.appendChild(sourcesDiv);
        }

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message message-assistant';
        typingDiv.id = 'typingIndicator';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const typingAnimation = document.createElement('div');
        typingAnimation.className = 'message-typing';
        typingAnimation.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        contentDiv.appendChild(typingAnimation);

        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);
        messagesContainer.appendChild(typingDiv);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Clear previous Q&A pairs (keep only initial greeting)
    function clearPreviousMessages() {
        const messagesContainer = document.getElementById('chatMessages');
        const messages = messagesContainer.querySelectorAll('.message');

        // Remove all messages except the first one (initial greeting)
        messages.forEach((message, index) => {
            if (index > 0) {
                message.remove();
            }
        });
    }

    // Handle sending message
    async function sendMessage(query) {
        if (!query.trim()) return;

        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('chatSendBtn');

        // Clear previous Q&A pairs
        clearPreviousMessages();

        // Disable input
        chatInput.disabled = true;
        sendBtn.disabled = true;

        // Add user message
        addMessage(query, true);

        // Clear input
        chatInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

        // Remove typing indicator
        removeTypingIndicator();

        // Get mock response
        const response = getMockResponse(query);

        // Add assistant message
        addMessage(response.answer, false, response.sources);

        // Re-enable input
        chatInput.disabled = false;
        sendBtn.disabled = false;
        chatInput.focus();
    }

    // Initialize demo chat
    function initDemoChat() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('chatSendBtn');
        const exampleBtns = document.querySelectorAll('.example-btn');

        // Handle send button click
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                const query = chatInput.value;
                sendMessage(query);
            });
        }

        // Handle enter key
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const query = chatInput.value;
                    sendMessage(query);
                }
            });
        }

        // Handle example buttons
        exampleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                sendMessage(question);
            });
        });
    }

    // Initialize demo when ready
    initDemoChat();

});
