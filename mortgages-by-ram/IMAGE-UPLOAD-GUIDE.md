# Image Upload Guide

This guide will help you upload the images from the `temp-images` folder to your Strapi CMS and assign them to the appropriate sections of your website.

## Available Images

The following images are ready to be uploaded:

- **hero-modern-home.jpg** - Modern luxury home exterior (perfect for hero section)
- **mortgage-consultation.jpg** - Professional mortgage consultation meeting
- **toronto-skyline.jpg** - Beautiful Toronto skyline at sunset
- **happy-family-home.jpg** - Happy family in front of their new home
- **business-handshake.jpg** - Business handshake closing a mortgage deal
- **house-keys.jpg** - House keys for new homeowners

## Upload Options

### Option 1: Simple Upload (Recommended)

This option uploads all images to Strapi Media Library without authentication:

```bash
node upload-images-simple.js
```

**What this does:**
- Uploads all images from `temp-images` folder
- Assigns proper alt text and descriptions
- Makes images available in Strapi Media Library
- Shows you the image IDs and URLs

### Option 2: Upload and Auto-Assign

This option uploads images AND automatically assigns them to the landing page:

```bash
node upload-and-assign-images.js
```

**What this does:**
- Uploads all images to Strapi Media Library
- Automatically updates the landing page content
- Assigns images to appropriate sections:
  - Hero section: `hero-modern-home.jpg`
  - Content blocks: Other images in rotation
  - Person card: `business-handshake.jpg`
- Publishes the updated content

**Note:** This option requires Strapi authentication. Set these environment variables:
```bash
export STRAPI_EMAIL="your-admin-email@example.com"
export STRAPI_PASSWORD="your-admin-password"
```

## Manual Assignment (After Simple Upload)

If you used Option 1, you can manually assign images in Strapi admin:

1. Go to http://localhost:1337/admin
2. Navigate to Content Manager → Landing Page
3. Edit the landing page
4. For each block that has an image field:
   - Click on the image field
   - Select the appropriate image from the Media Library
   - Save and publish

## Image Assignment Strategy

Here's how the images should be assigned:

### Hero Section
- **Image:** `hero-modern-home.jpg`
- **Purpose:** Eye-catching hero image for the main landing section

### Content Blocks
- **Images:** `mortgage-consultation.jpg`, `toronto-skyline.jpg`, `happy-family-home.jpg`, `business-handshake.jpg`, `house-keys.jpg`
- **Purpose:** Illustrate different aspects of mortgage services

### Person Card
- **Image:** `business-handshake.jpg`
- **Purpose:** Professional image for the team member section

## Troubleshooting

### Strapi Not Running
Make sure Strapi is running on http://localhost:1337:
```bash
cd server
npm run develop
```

### Authentication Issues
If you get authentication errors with Option 2:
1. Check your Strapi admin credentials
2. Make sure the admin user exists
3. Try using Option 1 instead

### Upload Failures
If images fail to upload:
1. Check file permissions
2. Ensure images are in the `temp-images` folder
3. Verify Strapi is running and accessible
4. Check Strapi logs for errors

## After Upload

Once images are uploaded:

1. **Verify in Strapi Admin:**
   - Go to http://localhost:1337/admin/content-manager/upload
   - Check that all images are visible

2. **Check Your Website:**
   - Visit http://localhost:5173
   - Verify images appear correctly
   - Test on different screen sizes

3. **Optimize if Needed:**
   - Images are automatically optimized by Strapi
   - You can further optimize in the Media Library if needed

## Next Steps

After uploading images:

1. **Update Content:** Modify text content to match the new images
2. **Test Responsiveness:** Ensure images look good on all devices
3. **SEO Optimization:** Add proper alt text for accessibility
4. **Performance:** Monitor page load times with new images

## Support

If you encounter any issues:

1. Check the console output for error messages
2. Verify Strapi is running and accessible
3. Check file permissions and paths
4. Review Strapi logs for detailed error information

---

**Ready to upload?** Run `node upload-images-simple.js` to get started!



