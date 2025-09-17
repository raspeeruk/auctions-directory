// Auction Insights Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle (for future implementation)
    // This is a placeholder for when you want to add a mobile menu
    const setupMobileNav = () => {
        // Code for mobile navigation will go here
        // This would typically include a hamburger menu toggle
    };
    
    // Testimonial carousel (for future implementation)
    // This is a placeholder for when you want to add a testimonial carousel
    const setupTestimonialCarousel = () => {
        // Code for testimonial carousel will go here
    };
    
    // Form validation for signup/contact forms (for future implementation)
    // This is a placeholder for when you add forms to the page
    const setupFormValidation = () => {
        // Code for form validation will go here
    };
    
    // Intersection Observer for scroll animations
    const setupScrollAnimations = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Add the 'animate' class to these elements when they come into view
        const animatedElements = document.querySelectorAll('.feature-card, .benefit, .process-step, .testimonial');
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Initialize animations
    setupScrollAnimations();
    
    // Add CSS class for elements that should animate when they come into view
    document.querySelectorAll('.feature-card, .benefit, .process-step, .testimonial').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Track CTAs for analytics (placeholder)
    const trackCTAClicks = () => {
        const ctaButtons = document.querySelectorAll('.btn-primary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // This would typically send analytics data
                console.log('CTA clicked:', this.textContent);
                
                // For demo purposes only - would be replaced with actual analytics
                if (this.getAttribute('href') === '#signup') {
                    console.log('Sign up button clicked');
                    // Here you would track conversion events
                }
            });
        });
    };
    
    // Initialize CTA tracking
    trackCTAClicks();
});

// Add some CSS animations via JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-on-scroll.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card.animate, .benefit.animate, .process-step.animate, .testimonial.animate {
            transition-delay: calc(var(--animation-order, 0) * 0.1s);
        }
    `;
    document.head.appendChild(style);
    
    // Set animation order for staggered animations
    document.querySelectorAll('.feature-card').forEach((el, index) => {
        el.style.setProperty('--animation-order', index);
    });
    
    document.querySelectorAll('.process-step').forEach((el, index) => {
        el.style.setProperty('--animation-order', index);
    });
    
    document.querySelectorAll('.testimonial').forEach((el, index) => {
        el.style.setProperty('--animation-order', index);
    });
});