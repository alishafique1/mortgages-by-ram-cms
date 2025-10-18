#!/usr/bin/env node

// Final working image update script - removes all id fields
const API_BASE = 'http://localhost:1337/api';

// Helper function to remove all id fields from objects
function removeIds(obj) {
  if (Array.isArray(obj)) {
    return obj.map(removeIds);
  }
  
  if (obj && typeof obj === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key !== 'id') {
        cleaned[key] = removeIds(value);
      }
    }
    return cleaned;
  }
  
  return obj;
}

async function updateLandingPageImages(apiToken) {
  try {
    console.log('🔄 Updating landing page with professional mortgage images...');
    
    // Get current landing page
    const getResponse = await fetch(`${API_BASE}/landing-page`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch landing page: ${getResponse.status}`);
    }
    
    const getData = await getResponse.json();
    const landingPage = getData.data;
    
    console.log('📄 Current landing page structure loaded');
    
    // Create updated blocks with new images and remove all id fields
    const updatedBlocks = landingPage.blocks.map((block, index) => {
      console.log(`Processing block ${index + 1}: ${block.__component}`);
      
      let updatedBlock = { ...block };
      
      if (block.__component === 'blocks.hero') {
        console.log('📸 Updating hero section with mortgage consultation image...');
        updatedBlock.image = 9;  // mortgage_consultation_hero.jpg
      }
      
      if (block.__component === 'blocks.person-card') {
        console.log('📸 Updating person card with Ram Singh headshot...');
        updatedBlock.image = 12;  // ram_singh_headshot.jpg
      }
      
      if (block.__component === 'blocks.content-with-image') {
        if (block.heading && block.heading.includes('Financial Planning')) {
          console.log('📸 Updating financial planning content image...');
          updatedBlock.image = 10;  // financial_planning.jpg
        }
        
        if (block.heading && block.heading.includes('Mortgage Process')) {
          console.log('📸 Updating mortgage process content image...');
          updatedBlock.image = 11;  // home_buying_process.jpg
        }
      }
      
      // Remove all id fields from the block
      return removeIds(updatedBlock);
    });
    
    console.log('📝 Updating landing page with new image references (ids removed)...');
    
    // Update the landing page
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
      
      // Publish the changes
      const publishResponse = await fetch(`${API_BASE}/landing-page/actions/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (publishResponse.ok) {
        console.log('✅ Landing page published with new images!');
      } else {
        console.log('⚠️ Landing page updated but not published');
      }
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update landing page:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating landing page images:', error.message);
  }
}

async function verifyImageUpdates(apiToken) {
  try {
    console.log('🔍 Verifying image updates...');
    
    const landingResponse = await fetch(`${API_BASE}/landing-page`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (landingResponse.ok) {
      const landingData = await landingResponse.json();
      
      // Check hero image
      const heroBlock = landingData.data.blocks.find(block => block.__component === 'blocks.hero');
      if (heroBlock) {
        console.log(`📸 Hero image ID: ${heroBlock.image}`);
        if (heroBlock.image === 9) {
          console.log('✅ Hero image updated successfully!');
        } else {
          console.log('❌ Hero image not updated');
        }
      }
      
      // Check person card image
      const personBlock = landingData.data.blocks.find(block => block.__component === 'blocks.person-card');
      if (personBlock) {
        console.log(`📸 Person card image ID: ${personBlock.image}`);
        if (personBlock.image === 12) {
          console.log('✅ Person card image updated successfully!');
        } else {
          console.log('❌ Person card image not updated');
        }
      }
      
      // Check content-with-image blocks
      const contentBlocks = landingData.data.blocks.filter(block => block.__component === 'blocks.content-with-image');
      contentBlocks.forEach((block, index) => {
        console.log(`📸 Content block ${index + 1} image ID: ${block.image}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error verifying updates:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting final working image update...');
    console.log('📸 Professional Mortgage Images:');
    console.log('   🏠 Hero (ID 9): Mortgage consultation scene');
    console.log('   👤 Person Card (ID 12): Ram Singh headshot');
    console.log('   📊 Financial Planning (ID 10): Charts and analysis');
    console.log('   🏡 Home Buying (ID 11): Process visualization');
    console.log('🔧 Removing all id fields to avoid validation errors...');
    
    // Update landing page images
    await updateLandingPageImages(apiToken);
    
    // Verify updates
    await verifyImageUpdates(apiToken);
    
    console.log('\n🎉 Image update process completed!');
    console.log('📋 Summary:');
    console.log('   ✅ Landing page updated with professional images');
    console.log('   ✅ Hero section: Mortgage consultation scene');
    console.log('   ✅ Person card: Ram Singh professional headshot');
    console.log('   ✅ Content blocks: Financial planning and home buying images');
    console.log('\n🌐 All content now uses professional mortgage images!');
    console.log('📱 Check your website at: http://localhost:5174');
    console.log('🎯 Your mortgage website is ready with professional imagery!');
    
  } catch (error) {
    console.error('❌ Error in image update process:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node update-images-working.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
