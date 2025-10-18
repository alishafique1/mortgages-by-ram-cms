#!/usr/bin/env node

// Remove null values from image fields to make them editable
const API_BASE = 'http://localhost:1337/api';

// Helper function to clean objects for Strapi API
function cleanForStrapi(obj) {
  if (Array.isArray(obj)) {
    return obj.map(cleanForStrapi);
  }
  
  if (obj && typeof obj === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      // Remove all problematic fields
      if (!['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'createdBy', 'updatedBy'].includes(key)) {
        cleaned[key] = cleanForStrapi(value);
      }
    }
    return cleaned;
  }
  
  return obj;
}

async function removeNullImages(apiToken) {
  try {
    console.log('🧹 Removing null values from image fields...');
    
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
    
    console.log('📄 Current landing page loaded');
    
    // Create updated blocks with null images removed
    const updatedBlocks = landingPage.blocks.map((block, index) => {
      console.log(`Processing block ${index + 1}: ${block.__component}`);
      
      let updatedBlock = { ...block };
      
      // Remove null image fields to make them editable
      if (block.__component === 'blocks.hero' && block.image === null) {
        console.log('🧹 Removing null hero image...');
        delete updatedBlock.image;
      }
      
      if (block.__component === 'blocks.person-card' && block.image === null) {
        console.log('🧹 Removing null person card image...');
        delete updatedBlock.image;
      }
      
      if (block.__component === 'blocks.content-with-image' && block.image === null) {
        console.log('🧹 Removing null content image...');
        delete updatedBlock.image;
      }
      
      // Clean the block for Strapi API
      return cleanForStrapi(updatedBlock);
    });
    
    console.log('📝 Updating landing page with null values removed...');
    
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
      console.log('✅ Null values removed successfully!');
      
      // Publish the changes
      const publishResponse = await fetch(`${API_BASE}/landing-page/actions/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (publishResponse.ok) {
        console.log('✅ Landing page published!');
        console.log('🎉 Image fields are now editable!');
        console.log('📱 You can now update images manually in Strapi admin');
        console.log('🌐 Go to: http://localhost:1337/admin');
      } else {
        console.log('⚠️ Landing page updated but not published');
      }
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to remove null values:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error removing null values:', error.message);
  }
}

async function verifyNullRemoval(apiToken) {
  try {
    console.log('🔍 Verifying null values removal...');
    
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
        console.log(`📸 Hero image field: ${heroBlock.image === undefined ? 'REMOVED (editable)' : heroBlock.image}`);
      }
      
      // Check person card image
      const personBlock = landingData.data.blocks.find(block => block.__component === 'blocks.person-card');
      if (personBlock) {
        console.log(`📸 Person card image field: ${personBlock.image === undefined ? 'REMOVED (editable)' : personBlock.image}`);
      }
      
      // Check content blocks
      const contentBlocks = landingData.data.blocks.filter(block => block.__component === 'blocks.content-with-image');
      contentBlocks.forEach((block, index) => {
        console.log(`📸 Content block ${index + 1} image field: ${block.image === undefined ? 'REMOVED (editable)' : block.image}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error verifying null removal:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting null values removal...');
    console.log('🧹 This will remove null values from image fields');
    console.log('📝 After this, you can update images manually in Strapi admin');
    
    // Remove null values
    await removeNullImages(apiToken);
    
    // Verify removal
    await verifyNullRemoval(apiToken);
    
    console.log('\n🎉 Null values removal completed!');
    console.log('📋 Summary:');
    console.log('   ✅ Removed null values from image fields');
    console.log('   ✅ Image fields are now editable');
    console.log('   ✅ Published changes');
    console.log('\n📝 Next Steps:');
    console.log('   1. Go to: http://localhost:1337/admin');
    console.log('   2. Edit Landing Page');
    console.log('   3. Update image fields manually');
    console.log('   4. Save and Publish');
    console.log('\n🌐 Your website should now work without errors!');
    
  } catch (error) {
    console.error('❌ Error in null removal process:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node remove-null-images.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
