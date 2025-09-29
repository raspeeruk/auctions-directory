# Auction Radar Website

## Sitemap Management

This website includes automatic sitemap generation to ensure search engines can properly index all pages.

### How It Works

1. The `sitemap.xml` file is automatically generated and updated when:
   - The build process runs (`npm run build`)
   - The sitemap update script is manually executed (`npm run update-sitemap`)

2. The sitemap includes:
   - Main pages (index.html, blog.html)
   - All blog posts in the `/blog` directory

### Adding New Pages

When adding new pages to the website:

1. For blog posts:
   - Simply add new HTML files to the `/blog` directory
   - Run `npm run update-sitemap` to update the sitemap
   - The sitemap will automatically include the new blog post

2. For main pages:
   - Add the new page to the `mainPages` array in `update-sitemap.js`
   - Run `npm run update-sitemap` to update the sitemap

### Automated Updates

For automated updates, you can:

1. Set up a CI/CD pipeline that runs `npm run build` on each deployment
2. Configure a cron job to periodically run `npm run update-sitemap`

### Client-Side Detection

The website also includes client-side detection of blog posts via the `sitemapManager` in `script.js`. This is primarily for demonstration purposes, as sitemap generation should ideally be handled server-side.

### Manual Update

To manually update the sitemap:

```bash
# Install dependencies (first time only)
npm install

# Update the sitemap
npm run update-sitemap