# 🚀 Content Update Guide - Mortgages by Ram

## Quick Start

This guide will help you update your website content to match the Grow With Nav style and create all missing pages.

---

## Step 1: Get Your API Token

1. **Start your Strapi server** (if not running):
   ```bash
   cd /Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram/server
   yarn develop
   ```

2. **Open Strapi Admin**: http://localhost:1337/admin

3. **Create API Token**:
   - Go to **Settings** → **API Tokens** → **Create New API Token**
   - Name: `Content Update Script`
   - Token duration: `Unlimited`
   - Token type: `Full access`
   - Click **Save**
   - **Copy the token** (you won't see it again!)

---

## Step 2: Update the Script

1. Open the file: `update-mortgage-content.js`

2. Find this line near the top:
   ```javascript
   const API_TOKEN = 'YOUR_API_TOKEN_HERE';
   ```

3. Replace `YOUR_API_TOKEN_HERE` with your actual token:
   ```javascript
   const API_TOKEN = 'abcd1234...your-actual-token';
   ```

4. Save the file

---

## Step 3: Run the Update Script

```bash
cd /Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram
node update-mortgage-content.js
```

This script will:
- ✅ Update global settings (site title, description, branding)
- ✅ Update landing page with Grow With Nav inspired content
- ✅ Create 9 new pages (About, Contact, Services, Legal pages, etc.)

---

## Step 4: Publish Content in Strapi

After running the script:

1. Go to **Content Manager** in Strapi admin
2. Check **Landing Page** → Click **Publish**
3. Check **Pages** → Publish each new page individually

---

## Step 5: View Your Website

1. **Start the client** (if not running):
   ```bash
   cd /Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram/client
   yarn dev
   ```

2. **Open**: http://localhost:5173

You should now see:
- ✨ Bold hero section with "I WANT TO RETIRE YOU WITH $200,000+ / YEAR"
- ✨ Grow Nation services
- ✨ First-time buyer focus
- ✨ All navigation links working
- ✨ Professional footer with license info

---

## What Gets Created

### Pages Created:
1. **About** (`/pages/about`) - Team info and mission
2. **Contact** (`/pages/contact`) - Contact form and info
3. **First-Time Buyers** (`/pages/first-time-buyers`) - Main service page
4. **Refinancing** (`/pages/refinancing`) - Refinancing services
5. **Investment Properties** (`/pages/investment-properties`) - Investment info
6. **Commercial Mortgages** (`/pages/commercial-mortgages`) - Business mortgages
7. **Privacy Policy** (`/pages/privacy-policy`) - Privacy information
8. **Terms of Service** (`/pages/terms-of-service`) - Terms and conditions
9. **Disclaimer** (`/pages/disclaimer`) - Legal disclaimer

### Content Updated:
- **Landing Page** - Hero, services, FAQs, newsletter
- **Global Settings** - Site title, description, branding
- **Navigation** - All links now work
- **Footer** - License info, social links

---

## Customization

After the initial setup, you can customize content in Strapi:

### To Edit Landing Page:
1. Go to **Content Manager** → **Landing Page**
2. Edit any block
3. Click **Save** → **Publish**

### To Edit Pages:
1. Go to **Content Manager** → **Pages**
2. Select the page you want to edit
3. Modify content blocks
4. Click **Save** → **Publish**

### To Add Images:
1. Go to **Media Library**
2. Upload your images
3. Edit content blocks and select images

---

## Design Features

The new design includes:

✨ **Bold Hero Section**
- Large, impactful headlines
- Dark gradient backgrounds (slate-900)
- Prominent CTAs with hover effects

✨ **Modern Colors**
- Primary: Blue (#2563EB)
- Background: Slate (#0F172A, #1E293B)
- Text: White on dark, Slate on light

✨ **Professional Layout**
- Clean spacing
- Clear hierarchy
- Mobile responsive
- Modern animations

---

## Troubleshooting

### Script Fails with "API call failed: 401"
- Your API token is invalid or expired
- Create a new token in Strapi admin
- Update the script with the new token

### Script Fails with "API call failed: 404"
- Make sure Strapi server is running
- Check the STRAPI_URL is correct (http://localhost:1337)

### Pages Not Showing Up
- Check if content is published in Strapi admin
- Refresh your browser
- Clear browser cache

### Images Not Loading
- Upload images to Media Library in Strapi
- Edit content blocks to reference the images
- Make sure image URLs are correct

---

## Next Steps

1. **Add Real Images**: Upload professional photos to Media Library
2. **Customize Copy**: Edit content in Strapi to match your brand voice
3. **Add Team Photos**: Upload team member photos for Person Card
4. **Configure Forms**: Set up contact forms and newsletter integration
5. **SEO Optimization**: Add meta descriptions and keywords
6. **Analytics**: Set up Google Analytics tracking

---

## Support

If you run into issues:

1. Check Strapi logs in the terminal
2. Check browser console for errors
3. Verify all services are running
4. Review the error messages

---

**Created by**: Ali Shafique @ Social Dots  
**Date**: October 2025  
**Project**: Mortgages by Ram

