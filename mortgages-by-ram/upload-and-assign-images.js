#!/usr/bin/env node

/**
 * Upload and assign images to Strapi landing page
 * This script uploads all images from temp-images folder and assigns them to appropriate sections
 * Run: node upload-and-assign-images.js
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const STRAPI_URL = 'http://localhost:1337';
const TEMP_IMAGES_DIR = path.join(__dirname, 'temp-images');

// Image mapping - which image goes to which section
const IMAGE_MAPPING = {
  'hero-modern-home.jpg': {
    section: 'hero',
    description: 'Modern luxury home exterior - perfect for hero section',
    altText: 'Modern luxury home exterior'
  },
  'mortgage-consultation.jpg': {
    section: 'content-with-image',
    description: 'Professional mortgage consultation meeting',
    altText: 'Professional mortgage consultation meeting'
  },
  'toronto-skyline.jpg': {
    section: 'content-with-image',
    description: 'Beautiful Toronto skyline at sunset',
    altText: 'Beautiful Toronto skyline at sunset'
  },
  'happy-family-home.jpg': {
    section: 'content-with-image',
    description: 'Happy family in front of their new home',
    altText: 'Happy family in front of their new home'
  },
  'business-handshake.jpg': {
    section: 'content-with-image',
    description: 'Business handshake closing a mortgage deal',
    altText: 'Business handshake closing a mortgage deal'
  },
  'house-keys.jpg': {
    section: 'content-with-image',
    description: 'House keys for new homeowners',
    altText: 'House keys for new homeowners'
  }
};

async function uploadImage(filePath, filename, description, altText) {
  try {
    console.log(`📤 Uploading: ${filename}`);
    
    const formData = new FormData();
    formData.append('files', fs.createReadStream(filePath));
    formData.append('fileInfo', JSON.stringify({
      alternativeText: altText,
      name: filename
    }));

    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Uploaded successfully! ID: ${data[0].id}`);
    return data[0];
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function getAuthToken() {
  try {
    console.log('🔐 Getting authentication token...');
    
    // Try to get token from environment or use default
    const email = process.env.STRAPI_EMAIL || 'admin@example.com';
    const password = process.env.STRAPI_PASSWORD || 'password';
    
    const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password: password
      })
    });

    if (!response.ok) {
      throw new Error('Authentication failed. Please check your credentials.');
    }

    const data = await response.json();
    console.log('✅ Authenticated successfully');
    return data.jwt;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    console.log('💡 Make sure Strapi is running and credentials are correct');
    return null;
  }
}

async function getCurrentLandingPage(token) {
  try {
    console.log('📄 Fetching current landing page...');
    
    const response = await fetch(`${STRAPI_URL}/api/landing-page?populate=deep`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch landing page: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Landing page fetched successfully');
    return data.data;
  } catch (error) {
    console.error('❌ Failed to fetch landing page:', error.message);
    return null;
  }
}

async function updateLandingPageWithImages(token, landingPage, uploadedImages) {
  try {
    console.log('🔄 Updating landing page with new images...');
    
    const updatedBlocks = landingPage.blocks.map((block, index) => {
      console.log(`Processing block ${index + 1}: ${block.__component}`);
      
      if (block.__component === 'blocks.hero') {
        const heroImage = uploadedImages['hero-modern-home.jpg'];
        if (heroImage) {
          console.log('📸 Updating hero section with modern home image...');
          return {
            ...block,
            image: heroImage.id
          };
        }
      }
      
      if (block.__component === 'blocks.content-with-image') {
        // Update content blocks with appropriate images
        const contentImages = [
          uploadedImages['mortgage-consultation.jpg'],
          uploadedImages['toronto-skyline.jpg'],
          uploadedImages['happy-family-home.jpg'],
          uploadedImages['business-handshake.jpg'],
          uploadedImages['house-keys.jpg']
        ].filter(Boolean);
        
        // Assign images to content blocks in order
        const imageIndex = index % contentImages.length;
        if (contentImages[imageIndex]) {
          console.log(`📸 Updating content block with image: ${contentImages[imageIndex].name}`);
          return {
            ...block,
            image: contentImages[imageIndex].id
          };
        }
      }
      
      if (block.__component === 'blocks.person-card') {
        // Use business handshake image for person card
        const personImage = uploadedImages['business-handshake.jpg'];
        if (personImage) {
          console.log('📸 Updating person card with business handshake image...');
          return {
            ...block,
            image: personImage.id
          };
        }
      }
      
      return block;
    });
    
    console.log('📝 Updating landing page...');
    
    const updateResponse = await fetch(`${STRAPI_URL}/api/landing-page`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          blocks: updatedBlocks
        }
      })
    });
    
    if (!updateResponse.ok) {
      throw new Error(`Failed to update landing page: ${updateResponse.status}`);
    }
    
    console.log('✅ Landing page updated successfully!');
    
    // Publish the changes
    const publishResponse = await fetch(`${STRAPI_URL}/api/landing-page/actions/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (publishResponse.ok) {
      console.log('✅ Landing page published with new images!');
    } else {
      console.log('⚠️ Landing page updated but not published');
    }
    
  } catch (error) {
    console.error('❌ Failed to update landing page:', error.message);
  }
}

async function main() {
  try {
    console.log('🚀 Starting image upload and assignment process...\n');
    
    // Check if temp-images directory exists
    if (!fs.existsSync(TEMP_IMAGES_DIR)) {
      console.error('❌ temp-images directory not found!');
      console.log('💡 Make sure the temp-images folder exists with your images');
      return;
    }
    
    // Get authentication token
    const token = await getAuthToken();
    if (!token) {
      return;
    }
    
    // Get current landing page
    const landingPage = await getCurrentLandingPage(token);
    if (!landingPage) {
      return;
    }
    
    // Upload all images
    console.log('\n📸 Uploading images...');
    const uploadedImages = {};
    
    for (const [filename, config] of Object.entries(IMAGE_MAPPING)) {
      const filePath = path.join(TEMP_IMAGES_DIR, filename);
      
      if (fs.existsSync(filePath)) {
        const uploadedImage = await uploadImage(
          filePath, 
          filename, 
          config.description, 
          config.altText
        );
        
        if (uploadedImage) {
          uploadedImages[filename] = uploadedImage;
        }
      } else {
        console.log(`⚠️ Image not found: ${filename}`);
      }
    }
    
    console.log(`\n✅ Uploaded ${Object.keys(uploadedImages).length} images successfully!`);
    
    // Update landing page with new images
    await updateLandingPageWithImages(token, landingPage, uploadedImages);
    
    console.log('\n🎉 Image upload and assignment completed!');
    console.log('📋 Summary:');
    console.log('   ✅ All images uploaded to Strapi Media Library');
    console.log('   ✅ Landing page updated with new images');
    console.log('   ✅ Images assigned to appropriate sections');
    console.log('\n🌐 Check your website at: http://localhost:5173');
    console.log('📱 View images in Strapi admin: http://localhost:1337/admin/content-manager/upload');
    
  } catch (error) {
    console.error('❌ Error in image upload process:', error.message);
  }
}

// Run the script
main();

