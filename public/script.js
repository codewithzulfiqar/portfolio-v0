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
   REVIEW INTERACTION
   =================================== */
function toggleReplyForm(button) {
    const reviewCard = button.closest('.review-card');
    const replyForm = reviewCard.querySelector('.reply-form');
    
    // Close other open forms
    document.querySelectorAll('.reply-form').forEach(form => {
        if (form !== replyForm && form.style.display !== 'none') {
            form.style.display = 'none';
        }
    });
    
    // Toggle current form
    if (replyForm.style.display === 'none' || replyForm.style.display === '') {
        replyForm.style.display = 'block';
        replyForm.querySelector('.reply-textarea').focus();
        button.textContent = 'Close Reply';
        button.style.color = '#14b8a6';
    } else {
        replyForm.style.display = 'none';
        button.textContent = 'Reply';
        button.style.color = '';
    }
}

function submitReply(button) {
    const replyForm = button.closest('.reply-form');
    const textarea = replyForm.querySelector('.reply-textarea');
    const replyDisplay = replyForm.closest('.review-card').querySelector('.reply-display');
    const replyText = textarea.value.trim();
    
    if (!replyText) {
        alert('Please write a reply before submitting.');
        return;
    }
    
    // Display the reply
    const timestamp = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    replyDisplay.innerHTML = `
        <strong style="color: #14b8a6;">My Reply (${timestamp}):</strong><br>
        <div style="margin-top: 8px;">${replyText.replace(/\n/g, '<br>')}</div>
    `;
    replyDisplay.classList.add('active');
    
    // Reset form
    textarea.value = '';
    replyForm.style.display = 'none';
    
    // Update button
    const replyBtn = replyForm.closest('.review-card').querySelector('.reply-btn');
    replyBtn.textContent = 'Reply Again';
    replyBtn.style.color = '';
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        padding: 12px 16px;
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 6px;
        color: #22c55e;
        font-size: 13px;
        margin-top: 8px;
        animation: fadeInUp 0.3s ease-out;
    `;
    successMsg.textContent = '✓ Reply posted successfully!';
    replyForm.parentElement.appendChild(successMsg);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
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
   CONSOLE MESSAGE
   =================================== */
console.log('%c Hey there! 👋', 'color: #14b8a6; font-size: 24px; font-weight: bold;');
console.log('%c Thanks for checking out my portfolio!', 'color: #94a3b8; font-size: 14px;');
console.log('%c Built with ❤️ by Zulfiqar Ali', 'color: #64748b; font-size: 12px;');
