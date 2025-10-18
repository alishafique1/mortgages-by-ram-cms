# Website Setup Guide - Adding Missing Pages & Images

This guide will help you complete the Mortgages by Ram website by adding missing pages and improving the landing page with modern imagery.

---

## Quick Start (Automated Setup)

### Step 1: Create API Token in Strapi

1. Open Strapi Admin: http://localhost:1337/admin
2. Navigate to **Settings** (gear icon) → **API Tokens**
3. Click **"Create new API Token"**
4. Fill in the details:
   - **Name**: `Website Setup Script`
   - **Description**: `Token for automated page creation`
   - **Token duration**: `Unlimited` (or set expiration as needed)
   - **Token type**: Select **Full access**
5. Click **Save**
6. **Copy the token** immediately (it won't be shown again!)

### Step 2: Run the Automated Setup Script

```bash
cd /Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram

# Run with your API token
node add-missing-pages-simple.js YOUR_API_TOKEN_HERE
```

This will create:
- ✅ About page
- ✅ Contact page
- ✅ Testimonials page

---

## What Pages Are Created?

### 1. About Page (`/pages/about`)

**Content includes:**
- Hero section with Ram Singh's introduction
- "Why Choose Ram Singh?" section with 4 key benefits
- Professional credentials and experience
- Call-to-action to contact

**URL**: http://localhost:5174/pages/about

---

### 2. Contact Page (`/pages/contact`)

**Content includes:**
- Contact information (phone, email, hours, location)
- 5-step process overview
- Service area information
- Clear call-to-action

**URL**: http://localhost:5174/pages/contact

---

### 3. Testimonials Page (`/pages/testimonials`)

**Content includes:**
- 6 client testimonials with 5-star ratings
- Statistics (500+ clients, $100M+ approved, etc.)
- Social proof and success metrics

**URL**: http://localhost:5174/pages/testimonials

---

## Manual Setup (If Script Fails)

If the automated script doesn't work, you can create pages manually:

### Create Pages in Strapi Admin:

1. Go to **Content Manager** → **Pages** → **Create new entry**
2. Fill in the page details
3. Use the content from the script files as reference
4. Click **Publish** when done

---

## Adding Images to Your Website

### Recommended Images to Upload

The website needs these types of images:

1. **Hero Image** (Landing Page)
   - Modern Toronto home exterior
   - Dimensions: 1920x1080px or similar
   - File format: JPG or WebP

2. **About Page Image**
   - Professional headshot of Ram Singh
   - Or mortgage consultation image
   - Dimensions: 1200x800px

3. **Service Images** (Optional)
   - Home buying process
   - Refinancing concept
   - Investment property

### Where to Find Free Stock Images:

- **Unsplash**: https://unsplash.com
  - Search: "modern home", "Toronto skyline", "business handshake"
- **Pexels**: https://pexels.com
  - Search: "mortgage", "home keys", "family home"
- **Pixabay**: https://pixabay.com

### How to Upload Images to Strapi:

1. Go to **Content Manager** → **Media Library**
2. Click **Upload assets**
3. Select your images
4. For each image, add:
   - **Alternative text** (for SEO and accessibility)
   - **Caption** (optional)
5. Click **Upload to the library**

### How to Add Images to Pages:

1. Go to **Content Manager** → **Pages**
2. Click on the page you want to edit
3. Find the **Hero** block or **Image** field
4. Click **Add media**
5. Select the image from your library
6. Click **Save** and **Publish**

---

## Updating the Landing Page

### Make the Landing Page More Modern:

1. Go to **Content Manager** → **Landing Page**
2. Edit the **Hero** block:
   - Update the **heading** to be more compelling
   - Add a professional **hero image**
   - Ensure CTAs are clear and actionable

3. Add additional blocks:
   - Section headings for services
   - Card grids for service offerings
   - Testimonial section
   - Featured articles

4. Click **Save** and **Publish**

---

## Navigation Structure

After creating the pages, your navigation will automatically include:

**Main Navigation:**
- Home
- About (NEW!)
- Services
  - First-Time Home Buyers
  - Refinancing Solutions
  - Investment Properties
  - Commercial Mortgages
- Contact (NEW!)
- Testimonials (NEW!)
- Articles

---

## Checklist: Complete Website Setup

### Content ✅
- [ ] About page created and published
- [ ] Contact page created and published
- [ ] Testimonials page created and published
- [ ] Landing page hero updated with modern content
- [ ] All service pages published

### Images 📸
- [ ] Hero image uploaded for landing page
- [ ] Professional headshot/about image uploaded
- [ ] Service-related images uploaded (optional)
- [ ] All images have proper alternative text

### Configuration ⚙️
- [ ] All pages are **published** (not draft)
- [ ] Navigation links are working
- [ ] Global settings configured
- [ ] Footer information updated

### Testing 🧪
- [ ] Visit http://localhost:5174 and check homepage
- [ ] Test all navigation links
- [ ] Check all pages render correctly
- [ ] Test on mobile (resize browser)
- [ ] Verify images load properly

---

## Current Website Status

### Existing Content ✅
- Landing page with hero and service cards
- 4 Service pages (First-Time Buyers, Refinancing, Investment, Commercial)
- 5 Blog articles
- Global navigation and footer

### What's Been Added 🆕
- About page with professional bio
- Contact page with contact information
- Testimonials page with client reviews

### What's Missing (Optional) 📝
- Professional images (use stock photos or real photos)
- Real contact information (update in Strapi)
- Real client testimonials (update in Strapi)
- Mortgage calculator (future feature)
- Contact form (future feature)

---

## Next Steps

1. **Run the setup script** to create missing pages
2. **Upload professional images** via Strapi Media Library
3. **Update contact information** with real details
4. **Review all content** and make it personal to Ram's brand
5. **Test the website** thoroughly
6. **Deploy to production** when ready

---

## Troubleshooting

### "API request failed" error
- Make sure Strapi server is running (http://localhost:1337)
- Check that your API token is valid
- Verify the token has "Full access" permissions

### "Page already exists" message
- This is normal if you've run the script before
- Pages will be skipped if they already exist
- You can manually delete pages in Strapi admin if needed

### Images not showing
- Make sure images are uploaded to Media Library
- Verify images are linked to the correct page/block
- Check that pages are **published**, not draft

### Navigation not updating
- Clear your browser cache
- Restart the dev server: `yarn dev`
- Check that pages are published in Strapi

---

## Support

For any issues:
1. Check the Strapi logs in terminal
2. Check browser console for errors
3. Review the IMPLEMENTATION-SUMMARY.md file
4. Check Strapi documentation: https://docs.strapi.io

---

**Last Updated**: October 6, 2025
**Status**: Ready to deploy with professional images
