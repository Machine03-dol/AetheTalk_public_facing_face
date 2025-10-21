// AetherTalk Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initTranslationDemo();
    initFloatingElements();
    initSmoothScrolling();
    // initTypingAnimation(); // Disabled
    initParallaxEffects();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
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
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for specific elements
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('animate-in');
                }
                
                if (entry.target.classList.contains('security-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.2;
                    entry.target.style.animationDelay = `${delay}s`;
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .security-item, .demo-message, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Translation demo animation
function initTranslationDemo() {
    const demoMessages = document.querySelectorAll('.demo-message');
    
    function animateMessages() {
        demoMessages.forEach((message, index) => {
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    message.style.opacity = '1';
                    message.style.transform = 'translateY(0)';
                    
                    // Animate translation effect
                    const translated = message.querySelector('.translated');
                    if (translated) {
                        translated.style.opacity = '0';
                        setTimeout(() => {
                            translated.style.opacity = '0.8';
                            translated.style.animation = 'fadeIn 0.5s ease';
                        }, 500);
                    }
                }, 200);
            }, index * 1000);
        });
    }
    
    // Start animation when section is visible
    const translationSection = document.querySelector('.translation-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateMessages, 500);
                observer.unobserve(entry.target);
            }
        });
    });
    
    if (translationSection) {
        observer.observe(translationSection);
    }
}

// Floating elements animation
function initFloatingElements() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Random floating animation
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        
        card.style.animationDelay = `${randomDelay}s`;
        card.style.animationDuration = `${randomDuration}s`;
        
        // Mouse interaction
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing animation for hero title (disabled for better UX)
function initTypingAnimation() {
    // Animation disabled - title shows immediately
    return;
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.phone-mockup, .floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (element.classList.contains('phone-mockup')) {
                element.style.transform = `translateY(${rate * 0.3}px)`;
            } else if (element.classList.contains('floating-card')) {
                element.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
    });
}

// Chat interface simulation
function initChatSimulation() {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;
    
    const messages = [
        {
            type: 'received',
            original: '¡Hola! ¿Cómo estás?',
            translated: 'Hello! How are you?',
            time: '2:30 PM'
        },
        {
            type: 'sent',
            original: 'I\'m doing great! Thanks for asking.',
            translated: '¡Estoy muy bien! Gracias por preguntar.',
            time: '2:31 PM'
        },
        {
            type: 'received',
            original: '¿Quieres almorzar juntos?',
            translated: 'Want to have lunch together?',
            time: '2:32 PM'
        }
    ];
    
    function addMessage(message, delay = 0) {
        setTimeout(() => {
            const messageEl = document.createElement('div');
            messageEl.className = `message ${message.type}`;
            messageEl.innerHTML = `
                <div class="message-content">
                    <div class="original-text">${message.original}</div>
                    <div class="translated-text">${message.translated}</div>
                </div>
                <span class="message-time">${message.time}</span>
            `;
            
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(20px)';
            chatMessages.appendChild(messageEl);
            
            setTimeout(() => {
                messageEl.style.opacity = '1';
                messageEl.style.transform = 'translateY(0)';
            }, 100);
        }, delay);
    }
    
    // Simulate conversation
    messages.forEach((message, index) => {
        addMessage(message, index * 2000);
    });
}

// Button interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary, .btn-hero-primary, .btn-cta')) {
        // Add ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-hero-primary, .btn-cta {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: var(--primary-blue);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Implement your analytics tracking here
    console.log('Event tracked:', eventName, properties);
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary, .btn-hero-primary, .btn-cta')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_type: e.target.className
        });
    }
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('section_view', {
                section: entry.target.id || entry.target.className
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation for custom elements
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.matches('.download-btn, .feature-card')) {
                e.target.click();
            }
        }
    });
    
    // Add focus indicators
    document.addEventListener('focusin', (e) => {
        if (e.target.matches('.download-btn, .feature-card')) {
            e.target.style.outline = '2px solid var(--primary-blue)';
            e.target.style.outlineOffset = '2px';
        }
    });
    
    document.addEventListener('focusout', (e) => {
        if (e.target.matches('.download-btn, .feature-card')) {
            e.target.style.outline = 'none';
        }
    });
}

initAccessibility();

// Dark mode toggle (optional feature)
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (!darkModeToggle) return;
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        trackEvent('dark_mode_toggle', { enabled: isDark });
    });
}

initDarkMode();

// Initialize chat simulation
setTimeout(initChatSimulation, 2000);

// Demo video functionality
function playDemo() {
    // In a real implementation, this would open a video modal or redirect to a video
    alert('Demo video would play here! In a real implementation, this would show a video demonstrating AetherTalk\'s real-time translation features.');
    
    // Track demo play event
    trackEvent('demo_play', {
        section: 'demo_section',
        action: 'play_button_click'
    });
}