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

});
