/* ===================================
   ZULFIQAR ALI - PORTFOLIO SCRIPTS
   Custom Cursor & Animations
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initSmoothScroll();
    initHeroTypewriter();
    initResumeDownload();
});

/* ===================================
   CUSTOM CURSOR
   =================================== */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Only enable on non-touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor with smooth following effect
    function animateCursor() {
        // Main cursor - fast follow
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower - slower follow for trail effect
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Interactive elements - cursor effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .stat-card, .tech-tag');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';
    });
}

/* ===================================
   NAVIGATION
   =================================== */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu on link click
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/* ===================================
   SCROLL ANIMATIONS
   =================================== */
function initScrollAnimations() {
    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.section-header, .about-text, .stat-card, .skill-card, .project-card, .contact-content'
    );
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add stagger delay for grid items
                if (entry.target.classList.contains('skill-card') || 
                    entry.target.classList.contains('stat-card') ||
                    entry.target.classList.contains('project-card')) {
                    const parent = entry.target.parentElement;
                    const index = Array.from(parent.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/* ===================================
   SKILL BARS ANIMATION
   =================================== */
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillCards.forEach(card => {
        skillObserver.observe(card);
    });
}

/* ===================================
   SMOOTH SCROLL
   =================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   HERO TYPEWRITER ANIMATION
   =================================== */
function initHeroTypewriter() {
    const greetingEl  = document.getElementById('typewriter-greeting');
    const nameEl      = document.getElementById('typewriter-name');
    const titleEl     = document.getElementById('typewriter-title');

    if (!greetingEl || !nameEl || !titleEl) return;

    const nameCursor   = nameEl.querySelector('.typewriter-cursor');
    const titleCursor  = titleEl.querySelector('.typewriter-cursor');
    const nameText     = nameEl.querySelector('.typewriter-text');
    const titleText    = titleEl.querySelector('.typewriter-text');

    const GREETING = "Hello, I'm";
    const NAME     = "Zulfiqar Ali";
    const TITLE    = "Frontend Developer";

    // Helper: type characters one by one into a span
    function typeInto(targetSpan, text, speed, onDone) {
        let i = 0;
        function tick() {
            if (i < text.length) {
                targetSpan.textContent += text.charAt(i);
                i++;
                setTimeout(tick, speed);
            } else if (onDone) {
                onDone();
            }
        }
        tick();
    }

    // Phase 1 — fade-slide greeting in
    function phase1() {
        greetingEl.textContent = GREETING;
        greetingEl.classList.add('visible');
        setTimeout(phase2, 600);
    }

    // Phase 2 — type "Zulfiqar Ali" with cursor
    function phase2() {
        nameCursor.classList.add('active');
        typeInto(nameText, NAME, 85, () => {
            // Immediately hide name cursor and move to title
            nameCursor.classList.remove('active');
            nameCursor.classList.add('done');
            setTimeout(phase3, 200);
        });
    }

    // Phase 3 — type "Frontend Developer" with cursor
    function phase3() {
        titleCursor.classList.add('active');
        typeInto(titleText, TITLE, 70, () => {
            // Hide title cursor when done
            setTimeout(() => {
                titleCursor.classList.remove('active');
                titleCursor.classList.add('done');
            }, 600);
        });
    }

    // Kick off after a brief page-load pause
    setTimeout(phase1, 400);
}

/* ===================================
   PARALLAX EFFECT (Optional Enhancement)
   =================================== */
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });
}

/* ===================================
   CONTACT FORM (If needed later)
   =================================== */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add form submission logic here
        console.log('Form submitted');
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    });
}

/* ===================================
   RESUME DOWNLOAD
   =================================== */
function initResumeDownload() {
    const resumeBtn = document.getElementById('download-resume');
    if (!resumeBtn) return;

    resumeBtn.addEventListener('click', generateAndDownloadResume);
}

function generateAndDownloadResume() {
    const resumeBtn = document.getElementById('download-resume');
    const originalText = resumeBtn.querySelector('.btn-text').textContent;

    // Show loading state
    resumeBtn.disabled = true;
    resumeBtn.querySelector('.btn-text').textContent = 'Generating...';

    // Simulate generating PDF and download
    setTimeout(() => {
        try {
            // Create HTML content for the resume
            const resumeHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
                        .resume-container { max-width: 800px; margin: 0 auto; padding: 40px; }
                        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #14b8a6; padding-bottom: 20px; }
                        .name { font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 5px; }
                        .title { font-size: 18px; color: #14b8a6; margin-bottom: 15px; }
                        .contact-info { font-size: 13px; color: #666; }
                        .contact-info a { color: #14b8a6; text-decoration: none; }
                        .section { margin-bottom: 30px; }
                        .section-title { font-size: 16px; font-weight: 700; color: #14b8a6; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
                        .entry { margin-bottom: 20px; }
                        .entry-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
                        .entry-title { font-weight: 600; font-size: 14px; color: #1a1a1a; }
                        .entry-meta { font-size: 12px; color: #14b8a6; }
                        .entry-subtitle { font-size: 13px; color: #666; margin-bottom: 5px; }
                        .entry-description { font-size: 13px; color: #555; line-height: 1.5; }
                        ul { margin-left: 20px; font-size: 13px; color: #555; }
                        li { margin-bottom: 5px; }
                        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
                        .skill-item { font-size: 13px; padding: 8px; background: #f5f5f5; border-radius: 4px; }
                        .highlight { color: #14b8a6; font-weight: 600; }
                    </style>
                </head>
                <body>
                    <div class="resume-container">
                        <div class="header">
                            <div class="name">ZULFIQAR ALI</div>
                            <div class="title">Frontend Developer</div>
                            <div class="contact-info">
                                <a href="tel:+923123477418">+92 312 347 7418</a> | 
                                <a href="mailto:zulfiqar@example.com">zulfiqar@example.com</a> | 
                                <a href="https://portfolio.com">portfolio.com</a>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Professional Summary</div>
                            <div class="entry-description">
                                Passionate and creative Frontend Developer with expertise in building accessible, pixel-perfect digital experiences using modern web technologies. Specialized in HTML5, CSS3, JavaScript, and responsive design. Known for the unique approach of "vibe coding" - writing code that not only performs flawlessly but also creates delightful user interactions. Strong problem-solving skills with attention to detail and user-centric design principles.
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Technical Skills</div>
                            <div class="skills-grid">
                                <div class="skill-item"><span class="highlight">Frontend:</span> HTML5, CSS3, JavaScript ES6+</div>
                                <div class="skill-item"><span class="highlight">Frameworks:</span> React, Vue.js, Next.js</div>
                                <div class="skill-item"><span class="highlight">Tools:</span> Git, Webpack, Vite, NPM</div>
                                <div class="skill-item"><span class="highlight">Design:</span> Figma, Adobe XD, Responsive Design</div>
                                <div class="skill-item"><span class="highlight">Languages:</span> JavaScript, HTML, CSS, TypeScript</div>
                                <div class="skill-item"><span class="highlight">Other:</span> Accessibility (A11y), SEO, Performance</div>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Professional Experience</div>
                            <div class="entry">
                                <div class="entry-header">
                                    <div class="entry-title">Senior Frontend Developer</div>
                                    <div class="entry-meta">2023 - Present</div>
                                </div>
                                <div class="entry-subtitle">Tech Innovations Inc.</div>
                                <ul>
                                    <li>Led development of responsive web applications using React and modern JavaScript</li>
                                    <li>Improved website performance by 40% through optimization techniques</li>
                                    <li>Collaborated with UX/UI designers to implement pixel-perfect designs</li>
                                    <li>Mentored junior developers on best practices and code standards</li>
                                </ul>
                            </div>

                            <div class="entry">
                                <div class="entry-header">
                                    <div class="entry-title">Frontend Developer</div>
                                    <div class="entry-meta">2021 - 2023</div>
                                </div>
                                <div class="entry-subtitle">Digital Solutions Agency</div>
                                <ul>
                                    <li>Developed and maintained multiple client websites and web applications</li>
                                    <li>Implemented responsive designs across all devices and browsers</li>
                                    <li>Optimized web pages for search engines and mobile performance</li>
                                    <li>Created reusable component libraries for faster development</li>
                                </ul>
                            </div>

                            <div class="entry">
                                <div class="entry-header">
                                    <div class="entry-title">Junior Frontend Developer</div>
                                    <div class="entry-meta">2020 - 2021</div>
                                </div>
                                <div class="entry-subtitle">Creative Web Studio</div>
                                <ul>
                                    <li>Built responsive website layouts using HTML5 and CSS3</li>
                                    <li>Implemented interactive features using vanilla JavaScript</li>
                                    <li>Fixed bugs and improved existing codebase</li>
                                    <li>Participated in code reviews and team development practices</li>
                                </ul>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Education</div>
                            <div class="entry">
                                <div class="entry-header">
                                    <div class="entry-title">Bachelor of Science in Computer Science</div>
                                    <div class="entry-meta">2020</div>
                                </div>
                                <div class="entry-subtitle">University of Technology</div>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Notable Projects</div>
                            <div class="entry">
                                <div class="entry-title">E-Commerce Platform Redesign</div>
                                <div class="entry-description">
                                    Led the complete frontend redesign of a major e-commerce platform, resulting in 35% improvement in conversion rates. Implemented modern UI/UX patterns and improved site performance.
                                </div>
                            </div>
                            <div class="entry">
                                <div class="entry-title">Real-time Dashboard Application</div>
                                <div class="entry-description">
                                    Developed a real-time data visualization dashboard using React and WebSockets, handling 1000+ concurrent users with smooth performance.
                                </div>
                            </div>
                        </div>

                        <div class="section">
                            <div class="section-title">Certifications & Achievements</div>
                            <ul>
                                <li>Google Analytics Certified Professional</li>
                                <li>Web Accessibility (WCAG 2.1) Specialist</li>
                                <li>JavaScript Advanced Developer Certification</li>
                            </ul>
                        </div>
                    </div>
                </body>
                </html>
            `;

            // Create blob from HTML
            const blob = new Blob([resumeHTML], { type: 'text/html' });
            
            // Simple approach: Convert HTML to canvas using html2canvas, then to PDF using jsPDF
            // But since we want a simpler approach that works reliably, we'll use print-to-PDF
            
            // Create an iframe to load and print the HTML
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            iframe.onload = () => {
                // Wait a moment for rendering
                setTimeout(() => {
                    iframe.contentWindow.print();
                    
                    // Clean up
                    setTimeout(() => {
                        document.body.removeChild(iframe);
                        
                        // Reset button
                        resumeBtn.disabled = false;
                        resumeBtn.querySelector('.btn-text').textContent = 'Download Resume';
                    }, 500);
                }, 200);
            };

            // Write HTML to iframe
            iframe.contentDocument.open();
            iframe.contentDocument.write(resumeHTML);
            iframe.contentDocument.close();

        } catch (error) {
            console.error('Error generating resume:', error);
            resumeBtn.disabled = false;
            resumeBtn.querySelector('.btn-text').textContent = 'Download Resume';
            alert('Error generating resume. Please try again.');
        }
    }, 300);
}

/* ===================================
   CONSOLE MESSAGE
   =================================== */
console.log('%c Hey there! 👋', 'color: #14b8a6; font-size: 24px; font-weight: bold;');
console.log('%c Thanks for checking out my portfolio!', 'color: #94a3b8; font-size: 14px;');
console.log('%c Built with ❤️ by Zulfiqar Ali', 'color: #64748b; font-size: 12px;');
