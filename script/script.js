
        document.addEventListener('DOMContentLoaded', () => {
            const preloader = document.getElementById('preloader');

            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.classList.add('hidden');
                }, 800);
            });

            const cursorDot = document.querySelector('.cursor-dot');
            const cursorOutline = document.querySelector('.cursor-outline');

            if (window.matchMedia('(pointer: fine)').matches) {
                let mouseX = 0, mouseY = 0;
                let outlineX = 0, outlineY = 0;

                document.addEventListener('mousemove', (e) => {
                    mouseX = e.clientX;
                    mouseY = e.clientY;

                    cursorDot.style.left = `${mouseX}px`;
                    cursorDot.style.top = `${mouseY}px`;
                });

                function animateCursor() {
                    outlineX += (mouseX - outlineX) * 0.15;
                    outlineY += (mouseY - outlineY) * 0.15;

                    cursorOutline.style.left = `${outlineX}px`;
                    cursorOutline.style.top = `${outlineY}px`;

                    requestAnimationFrame(animateCursor);
                }
                animateCursor();

                const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .skill-card, input, textarea');
                interactiveElements.forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        cursorOutline.style.width = '60px';
                        cursorOutline.style.height = '60px';
                        cursorOutline.style.borderColor = '#22d3ee';
                        cursorOutline.style.background = 'rgba(34, 211, 238, 0.1)';
                    });

                    el.addEventListener('mouseleave', () => {
                        cursorOutline.style.width = '40px';
                        cursorOutline.style.height = '40px';
                        cursorOutline.style.borderColor = '#3b82f6';
                        cursorOutline.style.background = 'transparent';
                    });
                });
            }

            const scrollProgress = document.querySelector('.scroll-progress');

            window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                scrollProgress.style.width = `${scrollPercent}%`;
            });

            const navbar = document.getElementById('navbar');
            const header = document.getElementById('header');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            const navLinks = document.querySelectorAll('.nav-link');

            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            const sections = document.querySelectorAll('section[id]');

            window.addEventListener('scroll', () => {
                let current = '';

                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.offsetHeight;

                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });

            const typingText = document.getElementById('typing-text');
            const texts = ['Web Developer', 'HTML Developer', 'PHP Developer', 'Full Stack Learner'];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;

            function typeEffect() {
                const currentText = texts[textIndex];

                if (isDeleting) {
                    typingText.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    typingSpeed = 50;
                } else {
                    typingText.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    typingSpeed = 100;
                }

                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    typingSpeed = 2000;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    typingSpeed = 500;
                }

                setTimeout(typeEffect, typingSpeed);
            }

            setTimeout(typeEffect, 1500);

            const canvas = document.getElementById('particles-canvas');
            const ctx = canvas.getContext('2d');
            let particles = [];
            let animationId;

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 3 + 1;
                    this.speedX = (Math.random() - 0.5) * 0.5;
                    this.speedY = (Math.random() - 0.5) * 0.5;
                    this.opacity = Math.random() * 0.5 + 0.1;
                    this.color = Math.random() > 0.5 ? '#3b82f6' : '#22d3ee';
                }

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    if (this.x > canvas.width) this.x = 0;
                    if (this.x < 0) this.x = canvas.width;
                    if (this.y > canvas.height) this.y = 0;
                    if (this.y < 0) this.y = canvas.height;
                }

                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = this.opacity;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }

            function initParticles() {
                particles = [];
                const particleCount = window.innerWidth < 768 ? 30 : 60;
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }

            function connectParticles() {
                const maxDistance = 150;

                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < maxDistance) {
                            const opacity = (1 - distance / maxDistance) * 0.2;
                            ctx.beginPath();
                            ctx.strokeStyle = '#3b82f6';
                            ctx.globalAlpha = opacity;
                            ctx.lineWidth = 1;
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                        }
                    }
                }
            }

            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });

                connectParticles();
                animationId = requestAnimationFrame(animateParticles);
            }

            initParticles();
            animateParticles();

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    cancelAnimationFrame(animationId);
                } else {
                    animateParticles();
                }
            });

            const revealElements = document.querySelectorAll(
                '.about-card, .info-card, .skill-card, .service-card, .project-card, ' +
                '.timeline-item, .stat-item, .testimonial-card, .contact-item, .map-container'
            );

            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach((el, index) => {
                el.classList.add('reveal');
                el.classList.add(`reveal-delay-${(index % 8) + 1}`);
                revealObserver.observe(el);
            });

            const skillBars = document.querySelectorAll('.skill-progress');

            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progress = entry.target.getAttribute('data-progress');
                        entry.target.style.width = `${progress}%`;
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, {threshold: 0.5});

            skillBars.forEach(bar => skillsObserver.observe(bar));

            const statNumbers = document.querySelectorAll('.stat-number');

            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.getAttribute('data-target'));
                        animateCounter(entry.target, target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, {threshold: 0.5});

            statNumbers.forEach(num => counterObserver.observe(num));

            function animateCounter(element, target) {
                let current = 0;
                const increment = target / 60;
                const duration = 2000;
                const stepTime = duration / 60;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    element.textContent = Math.floor(current);
                }, stepTime);
            }

            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filter = btn.getAttribute('data-filter');

                    projectCards.forEach(card => {
                        const categories = card.getAttribute('data-category');

                        if (filter === 'all' || categories.includes(filter)) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeInUp 0.5s ease forwards';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxClose = document.getElementById('lightbox-close');
            const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

            lightboxTriggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const img = trigger.closest('.project-card').querySelector('img');
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });

            lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
            });

            const track = document.getElementById('testimonials-track');
            const prevBtn = document.getElementById('testimonial-prev');
            const nextBtn = document.getElementById('testimonial-next');
            const dotsContainer = document.getElementById('testimonials-dots');

            const testimonialCards = document.querySelectorAll('.testimonial-card');
            let currentSlide = 0;
            let autoSlideInterval;

            testimonialCards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('testimonial-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            const dots = document.querySelectorAll('.testimonial-dot');

            function getSlidesPerView() {
                return window.innerWidth >= 1024 ? 2 : 1;
            }

            function goToSlide(index) {
                const slidesPerView = getSlidesPerView();
                const maxSlide = testimonialCards.length - slidesPerView;

                currentSlide = Math.max(0, Math.min(index, maxSlide));

                const cardWidth = testimonialCards[0].offsetWidth + 30;
                track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentSlide);
                });
            }

            prevBtn.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
                resetAutoSlide();
            });

            nextBtn.addEventListener('click', () => {
                const slidesPerView = getSlidesPerView();
                const maxSlide = testimonialCards.length - slidesPerView;
                goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
                resetAutoSlide();
            });

            function autoSlide() {
                const slidesPerView = getSlidesPerView();
                const maxSlide = testimonialCards.length - slidesPerView;
                goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
            }

            function startAutoSlide() {
                autoSlideInterval = setInterval(autoSlide, 5000);
            }

            function resetAutoSlide() {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }

            startAutoSlide();

            track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            track.addEventListener('mouseleave', startAutoSlide);

            window.addEventListener('resize', () => goToSlide(currentSlide));

            const contactForm = document.getElementById('contactForm');
            const submitBtn = contactForm.querySelector('.btn-submit');
            const formSuccess = document.getElementById('form-success');

            const formFields = {
                name: {required: true, minLength: 2},
                email: {required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
                message: {required: true, minLength: 10}
            };

            function validateField(fieldName, value) {
                const rules = formFields[fieldName];
                if (!rules) return '';

                if (rules.required && !value.trim()) {
                    return 'Ce champ est requis';
                }

                if (value.trim() && rules.minLength && value.trim().length < rules.minLength) {
                    return `Minimum ${rules.minLength} caractères requis`;
                }

                return '';
            }

            Object.keys(formFields).forEach(fieldName => {
                const input = document.getElementById(fieldName);
                const errorEl = document.getElementById(`error-${fieldName}`);

                if (input) {
                    input.addEventListener('blur', () => {
                        const error = validateField(fieldName, input.value);
                        errorEl.textContent = error;
                        input.parentElement.classList.toggle('error', !!error);
                    });

                    input.addEventListener('input', () => {
                        const error = validateField(fieldName, input.value);
                        if (!error) {
                            errorEl.textContent = '';
                            input.parentElement.classList.remove('error');
                        }
                    });
                }
            });

            contactForm.addEventListener("submit", async function (e) {
                e.preventDefault();

                const notificationArea = document.getElementById('notification-area');
                const submitBtn = contactForm.querySelector('.btn-submit');

                let isValid = true;
                const formFields = {
                    name: {required: true, minLength: 2},
                    email: {required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
                    message: {required: true, minLength: 10}
                };

                function validateField(fieldName, value) {
                    const rules = formFields[fieldName];
                    if (!rules) return '';
                    if (rules.required && !value.trim()) return 'Ce champ est requis';
                    if (value.trim() && rules.minLength && value.trim().length < rules.minLength)
                        return `Minimum ${rules.minLength} caractères requis`;
                    if (value.trim() && rules.pattern && !rules.pattern.test(value))
                        return 'Email invalide';
                    return '';
                }

                Object.keys(formFields).forEach(fieldName => {
                    const input = document.getElementById(fieldName);
                    const errorEl = document.getElementById(`error-${fieldName}`);
                    if (input) {
                        const error = validateField(fieldName, input.value);
                        errorEl.textContent = error;
                        input.parentElement.classList.toggle('error', !!error);
                        if (error) isValid = false;
                    }
                });

                if (!isValid) {
                    showNotification('error', 'Veuillez corriger les erreurs dans le formulaire.');
                    return;
                }

                submitBtn.classList.add('MM');

                try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        body: new FormData(contactForm)
                    });

                    const result = await response.json();

                    if (result.success) {
                        showNotification('success', 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
                        contactForm.reset();
                        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
                        document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
                    } else {
                        showNotification('error', result.message || "Le message n'est pas envoyé. Veuillez réessayer plus tard.");
                    }

                } catch (error) {
                    console.error(error);
                    showNotification('error', "Le message n'est pas envoyé. Une erreur s'est produite. Veuillez réessayer.");
                } finally {
                    submitBtn.classList.remove('MM');
                }
            });

            function showNotification(type, message) {
                const notificationArea = document.getElementById('notification-area');
                const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
                const className = type === 'success' ? 'notification-success' : 'notification-error';

                notificationArea.innerHTML = `
        <div class="notification ${className}">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

                setTimeout(() => {
                    const notif = notificationArea.querySelector('.notification');
                    if (notif) {
                        notif.style.animation = 'fadeIn 0.5s ease reverse forwards';
                        setTimeout(() => notif.remove(), 500);
                    }
                }, 6000);
            }
            const backToTop = document.getElementById('back-to-top');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({top: 0, behavior: 'smooth'});
            });

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offset = 80;
                        const targetPosition = target.offsetTop - offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            const heroShapes = document.querySelectorAll('.shape');

            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;

                heroShapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.1;
                    shape.style.transform = `translateY(${scrollY * speed}px)`;
                });
            });

            const hero = document.querySelector('.hero');

            if (window.matchMedia('(pointer: fine)').matches) {
                hero.addEventListener('mousemove', (e) => {
                    const {clientX, clientY} = e;
                    const {innerWidth, innerHeight} = window;

                    const x = (clientX / innerWidth - 0.5) * 20;
                    const y = (clientY / innerHeight - 0.5) * 20;

                    heroShapes.forEach((shape, index) => {
                        const factor = (index + 1) * 2;
                        shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
                    });
                });
            }

            const tiltCards = document.querySelectorAll('.skill-card, .service-card');

            if (window.matchMedia('(pointer: fine)').matches) {
                tiltCards.forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;

                        const rotateX = (y - centerY) / 10;
                        const rotateY = (centerX - x) / 10;

                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                    });

                    card.addEventListener('mouseleave', () => {
                        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                    });
                });
            }

            const lazyImages = document.querySelectorAll('img[MM="lazy"]');

            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                lazyImages.forEach(img => imageObserver.observe(img));
            }

            const magneticBtns = document.querySelectorAll('.btn, .project-link, .social-link');

            if (window.matchMedia('(pointer: fine)').matches) {
                magneticBtns.forEach(btn => {
                    btn.addEventListener('mousemove', (e) => {
                        const rect = btn.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;

                        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                    });

                    btn.addEventListener('mouseleave', () => {
                        btn.style.transform = '';
                    });
                });
            }

            const heroName = document.querySelector('.hero-name');
            const originalText = heroName.textContent;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

            function scrambleText(element, finalText, duration = 1000) {
                let iteration = 0;
                const interval = setInterval(() => {
                    element.textContent = finalText
                        .split('')
                        .map((char, index) => {
                            if (index < iteration) {
                                return finalText[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');

                    if (iteration >= finalText.length) {
                        clearInterval(interval);
                    }

                    iteration += 1 / 3;
                }, duration / (finalText.length * 3));
            }

            setTimeout(() => {
                scrambleText(heroName, originalText, 1500);
            }, 2000);

            const logo = document.querySelector('.logo');

            logo.addEventListener('mouseenter', () => {
                logo.style.animation = 'glitch 0.3s ease';
                setTimeout(() => {
                    logo.style.animation = '';
                }, 300);
            });

            const sectionHeaders = document.querySelectorAll('.section-header');

            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, {threshold: 0.3});

            sectionHeaders.forEach(header => {
                header.classList.add('reveal');
                headerObserver.observe(header);
            });

            const footerWaves = document.querySelectorAll('.footer-waves path');

            footerWaves.forEach((wave, index) => {
                wave.style.animation = `wave ${3 + index}s ease-in-out infinite alternate`;
            });

            console.log('%c Mostafa Mellouki Portfolio ', 'background: linear-gradient(135deg, #3b82f6, #22d3ee); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
            console.log('%c Built with passion and clean code ', 'color: #38bdf8; font-size: 14px;');
        });

        const glitchStyle = document.createElement('style');
        glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    @keyframes wave {
        0% { d: path('M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'); }
        100% { d: path('M0,0V56.29c47.79,12.2,103.59,22.17,158,18,70.36-5.37,136.33-23.31,206.8-27.5C438.64,42.43,512.34,63.67,583,82.05c69.27,18,138.3,14.88,209.4,3.08,36.15-6,69.85-7.84,104.45-19.34C989.49,35,1113-4.29,1200,62.47V0Z'); }
    }
`;
        document.head.appendChild(glitchStyle);