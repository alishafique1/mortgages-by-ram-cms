#!/usr/bin/env node

// Image update script for mortgage images
import fs from 'fs';
import path from 'path';

const API_BASE = 'http://localhost:1337/api';

async function uploadImageToStrapi(apiToken, imagePath, altText) {
  try {
    const formData = new FormData();
    const fileBuffer = fs.readFileSync(imagePath);
    const fileName = path.basename(imagePath);
    
    formData.append('files', new Blob([fileBuffer]), fileName);
    formData.append('fileInfo', JSON.stringify({
      alternativeText: altText,
      caption: altText
    }));
    
    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
      body: formData
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Uploaded image: ${fileName} (ID: ${data[0].id})`);
      return data[0];
    } else {
      const errorData = await response.text();
      console.error(`❌ Failed to upload ${fileName}:`, errorData);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function updateLandingPageImages(apiToken) {
  try {
    console.log('🔄 Updating landing page with new mortgage images...');
    
    // Upload new images
    const uploadsDir = '/Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram/server/public/uploads';
    
    const heroImage = await uploadImageToStrapi(
      apiToken, 
      `${uploadsDir}/mortgage_consultation_hero.jpg`,
      'Professional mortgage consultation - Ram Singh helping clients'
    );
    
    const processImage = await uploadImageToStrapi(
      apiToken,
      `${uploadsDir}/home_buying_process.jpg`, 
      'Home buying process and mortgage application'
    );
    
    const financialImage = await uploadImageToStrapi(
      apiToken,
      `${uploadsDir}/financial_planning.jpg`,
      'Financial planning and mortgage solutions'
    );
    
    const headshotImage = await uploadImageToStrapi(
      apiToken,
      `${uploadsDir}/ram_singh_headshot.jpg`,
      'Ram Singh - Licensed Mortgage Agent'
    );
    
    if (!heroImage || !processImage || !financialImage || !headshotImage) {
      console.log('⚠️ Some images failed to upload, using existing images');
    }
    
    // Get current landing page
    const getResponse = await fetch(`${API_BASE}/landing-page`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch landing page: ${getResponse.status} ${getResponse.statusText}`);
    }
    
    const getData = await getResponse.json();
    
    if (!getData.data) {
      throw new Error('No landing page data found');
    }
    
    // Update blocks with new images
    const updatedBlocks = getData.data.blocks.map(block => {
      if (block.__component === 'blocks.hero') {
        return {
          ...block,
          image: heroImage ? heroImage.id : block.image
        };
      } else if (block.__component === 'blocks.content-with-image' && !block.reversed) {
        return {
          ...block,
          image: financialImage ? financialImage.id : block.image
        };
      } else if (block.__component === 'blocks.content-with-image' && block.reversed) {
        return {
          ...block,
          image: processImage ? processImage.id : block.image
        };
      } else if (block.__component === 'blocks.person-card') {
        return {
          ...block,
          image: headshotImage ? headshotImage.id : block.image
        };
      }
      return block;
    });
    
    // Update landing page
    const updateResponse = await fetch(`${API_BASE}/landing-page`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          blocks: updatedBlocks
        }
      })
    });
    
    if (updateResponse.ok) {
      console.log('✅ Landing page images updated successfully!');
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update landing page images:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating landing page images:', error.message);
  }
}

async function updateArticleImages(apiToken) {
  try {
    console.log('🔄 Updating article featured images...');
    
    const uploadsDir = '/Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram/server/public/uploads';
    
    const financialImage = await uploadImageToStrapi(
      apiToken,
      `${uploadsDir}/financial_planning.jpg`,
      'Financial planning and mortgage solutions'
    );
    
    // Get all articles
    const getResponse = await fetch(`${API_BASE}/articles`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch articles: ${getResponse.status} ${getResponse.statusText}`);
    }
    
    const getData = await getResponse.json();
    
    if (!getData.data) {
      console.log('No articles found to update');
      return;
    }
    
    // Update article featured images
    for (const article of getData.data) {
      const updateResponse = await fetch(`${API_BASE}/articles/${article.documentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            featuredImage: financialImage ? financialImage.id : article.featuredImage
          }
        })
      });
      
      if (updateResponse.ok) {
        console.log(`✅ Updated featured image for article: ${article.title}`);
      } else {
        console.error(`❌ Failed to update article: ${article.title}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error updating article images:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting image update process...');
    
    // Update landing page images
    await updateLandingPageImages(apiToken);
    
    // Update article images
    await updateArticleImages(apiToken);
    
    console.log('\n🎉 Image update completed successfully!');
    console.log('📋 Summary of image updates:');
    console.log('   ✅ Uploaded professional mortgage images from Unsplash');
    console.log('   ✅ Updated hero section with mortgage consultation image');
    console.log('   ✅ Updated content sections with finance/mortgage themes');
    console.log('   ✅ Updated person card with professional headshot');
    console.log('   ✅ Updated article featured images');
    console.log('\n🌐 Check your frontend at: http://localhost:5174');
    console.log('📱 All images should now be professional and mortgage-focused!');
    
  } catch (error) {
    console.error('❌ Error in image update process:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node update-images.mjs YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
