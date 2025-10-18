#!/usr/bin/env node

/**
 * Simple image upload script for Strapi
 * Uploads all images from temp-images folder to Strapi Media Library
 * Run: node upload-images-simple.js
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const STRAPI_URL = 'http://localhost:1337';
const TEMP_IMAGES_DIR = path.join(__dirname, 'temp-images');

// Image descriptions for better organization
const IMAGE_DESCRIPTIONS = {
  'hero-modern-home.jpg': 'Modern luxury home exterior - perfect for hero section',
  'mortgage-consultation.jpg': 'Professional mortgage consultation meeting',
  'toronto-skyline.jpg': 'Beautiful Toronto skyline at sunset',
  'happy-family-home.jpg': 'Happy family in front of their new home',
  'business-handshake.jpg': 'Business handshake closing a mortgage deal',
  'house-keys.jpg': 'House keys for new homeowners'
};

async function uploadImage(filePath, filename) {
  try {
    console.log(`📤 Uploading: ${filename}`);
    
    const formData = new FormData();
    formData.append('files', fs.createReadStream(filePath));
    formData.append('fileInfo', JSON.stringify({
      alternativeText: IMAGE_DESCRIPTIONS[filename] || filename,
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
    console.log(`   URL: ${STRAPI_URL}${data[0].url}`);
    return data[0];
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  try {
    console.log('🚀 Starting image upload process...\n');
    
    // Check if temp-images directory exists
    if (!fs.existsSync(TEMP_IMAGES_DIR)) {
      console.error('❌ temp-images directory not found!');
      console.log('💡 Make sure the temp-images folder exists with your images');
      return;
    }
    
    // Get list of image files
    const imageFiles = fs.readdirSync(TEMP_IMAGES_DIR)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    
    if (imageFiles.length === 0) {
      console.log('⚠️ No image files found in temp-images directory');
      return;
    }
    
    console.log(`📸 Found ${imageFiles.length} images to upload:`);
    imageFiles.forEach(file => console.log(`   • ${file}`));
    console.log('');
    
    // Upload each image
    const uploadedImages = [];
    for (const filename of imageFiles) {
      const filePath = path.join(TEMP_IMAGES_DIR, filename);
      const uploadedImage = await uploadImage(filePath, filename);
      
      if (uploadedImage) {
        uploadedImages.push({
          filename,
          id: uploadedImage.id,
          url: uploadedImage.url
        });
      }
    }
    
    console.log(`\n✅ Successfully uploaded ${uploadedImages.length} images!`);
    console.log('\n📋 Uploaded images:');
    uploadedImages.forEach(img => {
      console.log(`   • ${img.filename} (ID: ${img.id})`);
      console.log(`     URL: ${STRAPI_URL}${img.url}`);
    });
    
    console.log('\n🎉 Image upload completed!');
    console.log('📱 View images in Strapi admin: http://localhost:1337/admin/content-manager/upload');
    console.log('🌐 Images are now available for use in your content!');
    
  } catch (error) {
    console.error('❌ Error in image upload process:', error.message);
  }
}

// Run the script
main();



