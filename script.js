/* =========================================
   FILENAME: script.js
   DESCRIPTION: Main JavaScript file for Personal Portfolio
   AUTHOR: Shahroz
   ========================================= */

// 1. Initialize EmailJS immediately
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("8wXzwDlV_Hod8GUJC"); 
    }
})();

/* =========================================
   PRELOADER HIDING LOGIC (Safely Handled)
   ========================================= */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
    }
});

// 2. Main Execution (Waits for HTML to load)
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. THEME TOGGLE LOGIC
       ========================================= */
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeBtn) {
        const themeIcon = themeBtn.querySelector('i');

        if (localStorage.getItem('selected-theme') === 'light') {
            body.classList.add('light-mode');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }

        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
                localStorage.setItem('selected-theme', 'light');
            } else {
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
                localStorage.setItem('selected-theme', 'dark');
            }
        });
    }

    /* =========================================
       2. MOBILE NAVBAR TOGGLE
       ========================================= */
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            if (icon) {
                if (navbar.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-x');
                } else {
                    icon.classList.remove('fa-x');
                    icon.classList.add('fa-bars');
                }
            }
        });

        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-x');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* =========================================
       3. STICKY HEADER, SCROLL SPY & PROGRESS BAR
       ========================================= */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const progressBar = document.getElementById("scroll-progress");

    window.addEventListener('scroll', () => {
        if(header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }

        if (progressBar) {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        }

        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (id && top >= offset && top < offset + height) {
                document.querySelectorAll('.navbar a').forEach(links => {
                    links.classList.remove('active');
                    let activeLink = document.querySelector('.navbar a[href*=' + id + ']');
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                });
            }
        });
    });

    /* =========================================
       4. SCROLL ANIMATION (Scroll Reveal)
       ========================================= */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(sec => {
        observer.observe(sec);
    });

    /* =========================================
       5. CONTACT FORM (With Confetti)
       ========================================= */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            const originalText = btn ? btn.innerText : 'Send';
            if(btn) btn.innerText = 'Sending...';

            emailjs.sendForm("service_02yzynv", "template_5z93bff", this)
            .then(() => {
                if (typeof confetti !== 'undefined') {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#38bdf8', '#818cf8', '#ffffff']
                    });
                }
                alert("Message sent successfully!");
                contactForm.reset();
                if(btn) btn.innerText = originalText;
            }, (error) => {
                console.error("EmailJS Error:", error);
                alert("Failed to send message.");
                if(btn) btn.innerText = originalText;
            });
        });
    }

    /* =========================================
       6. NUMBER COUNTER
       ========================================= */
    let valueDisplays = document.querySelectorAll(".stat-item h2");

    if (valueDisplays.length > 0) {
        let counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let valueDisplay = entry.target;
                    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
                    let startValue = 0;
                    if(!isNaN(endValue)) {
                        let duration = Math.floor(2000 / endValue);
                        let counter = setInterval(() => {
                            startValue += 1;
                            valueDisplay.textContent = startValue + "+";
                            if (startValue == endValue) clearInterval(counter);
                        }, duration);
                    }
                    observer.unobserve(valueDisplay);
                }
            });
        }, { threshold: 0.5 }); 

        valueDisplays.forEach(display => counterObserver.observe(display));
    }

    /* =========================================
       7. TYPEWRITER EFFECT
       ========================================= */
    const textElement = document.querySelector(".typing-text");
    if (textElement) {
        const texts = ["Digital Empires", "High-End Solutions", "Custom Web Apps", "SEO Strategies"];
        let count = 0, index = 0;

        (function type() {
            if (count === texts.length) count = 0;
            let currentText = texts[count];
            let letter = currentText.slice(0, ++index);
            textElement.textContent = letter;

            if (letter.length === currentText.length) {
                count++; index = 0;
                setTimeout(type, 2000); 
            } else {
                setTimeout(type, 100); 
            }
        })();
    }

    /* =========================================
       8. BACK TO TOP BUTTON
       ========================================= */
    const toTopBtn = document.querySelector(".to-top");
    if(toTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) toTopBtn.classList.add("active");
            else toTopBtn.classList.remove("active");
        });
    }

    /* =========================================
       9. SKILL BARS ANIMATION
       ========================================= */
    const skillSection = document.querySelector('.tech-section');
    const skillBars = document.querySelectorAll('.skill-line span');

    if (skillSection && skillBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const width = bar.parentElement.getAttribute('data-width');
                        if(width) bar.style.width = width;
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        skillObserver.observe(skillSection);
    }

    /* =========================================
       10. DYNAMIC GLASS-GLOW (MOUSE TRACKING)
       ========================================= */
    const glowCards = document.querySelectorAll('.service-card, .process-box, .blog-card, .review-card');

    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

/* =========================================
   11. PARTICLES.JS CONFIGURATION
   ========================================= */
const particlesContainer = document.getElementById('particles-js');
if (particlesContainer && typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#38bdf8" },
            "shape": { "type": ["circle", "edge"] },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 1 } } }
        },
        "retina_detect": true
    });
}