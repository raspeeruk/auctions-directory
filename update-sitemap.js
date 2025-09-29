// Node.js script to update sitemap.xml
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    baseUrl: 'https://auctionradar.co.uk/',
    sitemapPath: './sitemap.xml',
    mainPages: [
        { url: '', changefreq: 'weekly', priority: '1.0' },
        { url: 'blog', changefreq: 'weekly', priority: '0.8' }
    ],
    blogDir: './blog',
    blogChangefreq: 'monthly',
    blogPriority: '0.7'
};

// Function to generate sitemap XML
function generateSitemap() {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    // Start XML content
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add main pages
    config.mainPages.forEach(page => {
        xmlContent += createUrlEntry(
            config.baseUrl + page.url,
            today,
            page.changefreq,
            page.priority
        );
    });
    
    // Get all blog posts
    const blogPosts = findAllBlogPosts();
    
    // Add blog posts to sitemap
    blogPosts.forEach(post => {
        xmlContent += createUrlEntry(
            config.baseUrl + post,
            today,
            config.blogChangefreq,
            config.blogPriority
        );
    });
    
    // Close XML
    xmlContent += '</urlset>';
    
    return xmlContent;
}

// Helper function to create a URL entry
function createUrlEntry(loc, lastmod, changefreq, priority) {
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
}

// Function to find all HTML files in the blog directory
function findAllBlogPosts() {
    const blogPosts = [];
    
    try {
        // Read all files in the blog directory
        const files = fs.readdirSync(config.blogDir);
        
        // Filter for HTML files and remove .html extension for URLs
        files.forEach(file => {
            if (file.endsWith('.html')) {
                // Remove .html extension for the URL
                const urlPath = `blog/${file.replace('.html', '')}`;
                blogPosts.push(urlPath);
            }
        });
    } catch (error) {
        console.error('Error reading blog directory:', error);
    }
    
    return blogPosts;
}

// Function to write sitemap to file
function writeSitemap(content) {
    try {
        fs.writeFileSync(config.sitemapPath, content);
        console.log(`Sitemap successfully written to ${config.sitemapPath}`);
        return true;
    } catch (error) {
        console.error('Error writing sitemap:', error);
        return false;
    }
}

// Main function to update the sitemap
function updateSitemap() {
    console.log('Updating sitemap.xml...');
    const xmlContent = generateSitemap();
    return writeSitemap(xmlContent);
}

// Run the update
if (updateSitemap()) {
    console.log('Sitemap update completed successfully.');
} else {
    console.error('Sitemap update failed.');
    process.exit(1);
}

// Export functions for potential use in other scripts
module.exports = {
    updateSitemap,
    generateSitemap,
    findAllBlogPosts
};