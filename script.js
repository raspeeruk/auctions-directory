// Auction Radar Landing Page JavaScript

// Sitemap management functions
const sitemapManager = {
    // Base URL for the website
    baseUrl: 'https://auctionradar.com/',
    
    // Function to generate sitemap XML content
    generateSitemapXml: function() {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        
        // Start XML content
        let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        // Add main pages
        xmlContent += this.createUrlEntry(this.baseUrl + 'index.html', today, 'weekly', '1.0');
        xmlContent += this.createUrlEntry(this.baseUrl + 'blog.html', today, 'weekly', '0.8');
        
        // Get all blog posts
        const blogPosts = this.findAllBlogPosts();
        
        // Add blog posts to sitemap
        blogPosts.forEach(post => {
            xmlContent += this.createUrlEntry(
                this.baseUrl + post,
                today,
                'monthly',
                '0.7'
            );
        });
        
        // Close XML
        xmlContent += '</urlset>';
        
        return xmlContent;
    },
    
    // Helper function to create a URL entry
    createUrlEntry: function(loc, lastmod, changefreq, priority) {
        return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    },
    
    // Function to find all HTML files in the blog directory
    findAllBlogPosts: function() {
        const blogPosts = [];
        
        // This would typically use server-side code or an API
        // For client-side only, we'll use a fetch to a directory listing or API endpoint
        
        // For now, we'll manually scan for blog posts by checking known patterns
        // In a real implementation, this would be replaced with server-side code
        
        // Get all anchor tags that link to blog posts
        const blogLinks = document.querySelectorAll('a[href^="blog/"]');
        
        // Extract unique blog post URLs
        blogLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.endsWith('.html') && !blogPosts.includes(href)) {
                blogPosts.push(href);
            }
        });
        
        return blogPosts;
    },
    
    // Function to update the sitemap.xml file
    updateSitemap: function() {
        const xmlContent = this.generateSitemapXml();
        
        // In a real implementation, this would use a server-side API endpoint
        // to write the XML content to the sitemap.xml file
        
        // For demonstration, we'll log the content and use a fetch to a hypothetical API
        console.log('Updating sitemap.xml with:', xmlContent);
        
        // Example of how this might work with a server-side endpoint
        fetch('/api/update-sitemap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: xmlContent })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sitemap updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating sitemap:', error);
        });
    }
};

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
    
    // Update sitemap when the page loads
    // This would typically be done on the server side or when new content is published
    // For demonstration purposes, we're doing it on page load
    sitemapManager.updateSitemap();
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

// Email collection and download functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('email-modal');
    const downloadBtn = document.querySelector('a[href="#demo"]');
    const closeBtn = document.querySelector('.close-modal');
    const emailForm = document.getElementById('email-form');
    
    // Show modal when download button is clicked
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    
    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Handle form submission
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get email value
        const email = document.getElementById('email').value;
        
        // Disable form inputs
        document.getElementById('email').disabled = true;
        document.querySelector('#email-form button').disabled = true;
        
        // Create a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.display = 'block';
        successMessage.textContent = 'Thank you! Your download will begin shortly.';
        
        // Add success message to form
        emailForm.appendChild(successMessage);
        
        // Save the email to the server
        const formData = new FormData();
        formData.append('email', email);
        
        // Add a parameter to indicate if we want the server to send the file directly
        formData.append('send_file', 'false');
        
        fetch('save-email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Email saved:', data);
            
            // Trigger download after email is saved
            setTimeout(function() {
                // Create a form for the download request
                const downloadForm = document.createElement('form');
                downloadForm.method = 'POST';
                downloadForm.action = 'save-email.php';
                downloadForm.style.display = 'none';
                
                // Add the email to the form
                const emailInput = document.createElement('input');
                emailInput.type = 'hidden';
                emailInput.name = 'email';
                emailInput.value = email;
                downloadForm.appendChild(emailInput);
                
                // Add the send_file parameter
                const sendFileInput = document.createElement('input');
                sendFileInput.type = 'hidden';
                sendFileInput.name = 'send_file';
                sendFileInput.value = 'true';
                downloadForm.appendChild(sendFileInput);
                
                // Add the form to the document and submit it
                document.body.appendChild(downloadForm);
                downloadForm.submit();
                
                // Remove the form after submission
                setTimeout(() => {
                    document.body.removeChild(downloadForm);
                }, 100);
                
                // Close modal after a short delay
                setTimeout(function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                    
                    // Reset form for future use
                    emailForm.reset();
                    document.getElementById('email').disabled = false;
                    document.querySelector('#email-form button').disabled = false;
                    successMessage.remove();
                }, 2000);
            }, 1000);
        })
        .catch(error => {
            console.error('Error saving email:', error);
            successMessage.textContent = 'Thank you! Your download will begin shortly. (Note: Email storage is currently unavailable)';
            
            // Still trigger download even if email saving fails
            setTimeout(function() {
                // Create a form for the download request
                const downloadForm = document.createElement('form');
                downloadForm.method = 'POST';
                downloadForm.action = 'save-email.php';
                downloadForm.style.display = 'none';
                
                // Add the email to the form
                const emailInput = document.createElement('input');
                emailInput.type = 'hidden';
                emailInput.name = 'email';
                emailInput.value = email;
                downloadForm.appendChild(emailInput);
                
                // Add the send_file parameter
                const sendFileInput = document.createElement('input');
                sendFileInput.type = 'hidden';
                sendFileInput.name = 'send_file';
                sendFileInput.value = 'true';
                downloadForm.appendChild(sendFileInput);
                
                // Add the form to the document and submit it
                document.body.appendChild(downloadForm);
                downloadForm.submit();
                
                // Remove the form after submission
                setTimeout(() => {
                    document.body.removeChild(downloadForm);
                }, 100);
                
                // Close modal after a short delay
                setTimeout(function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                    
                    // Reset form for future use
                    emailForm.reset();
                    document.getElementById('email').disabled = false;
                    document.querySelector('#email-form button').disabled = false;
                    successMessage.remove();
                }, 2000);
            }, 1000);
        });
    });
});