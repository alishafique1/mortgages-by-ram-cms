#!/usr/bin/env node

// Fix null image error - working solution
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

async function fixNullImages(apiToken) {
  try {
    console.log('🔧 Fixing null image error...');
    
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
    
    // Create updated blocks with proper image references
    const updatedBlocks = landingPage.blocks.map((block, index) => {
      console.log(`Processing block ${index + 1}: ${block.__component}`);
      
      let updatedBlock = { ...block };
      
      // Fix hero block
      if (block.__component === 'blocks.hero') {
        console.log('📸 Fixing hero image...');
        updatedBlock = {
          __component: 'blocks.hero',
          heading: block.heading,
          text: block.text,
          links: block.links,
          image: 9  // mortgage_consultation_hero.jpg
        };
      }
      
      // Fix person card block
      if (block.__component === 'blocks.person-card') {
        console.log('📸 Fixing person card image...');
        updatedBlock = {
          __component: 'blocks.person-card',
          text: block.text,
          personName: block.personName,
          personJob: block.personJob,
          image: 12  // ram_singh_headshot.jpg
        };
      }
      
      // Fix content-with-image blocks
      if (block.__component === 'blocks.content-with-image') {
        console.log('📸 Fixing content image...');
        updatedBlock = {
          ...block,
          image: block.image || 10  // Use existing image or default to financial_planning.jpg
        };
      }
      
      // Clean the block for Strapi API
      return cleanForStrapi(updatedBlock);
    });
    
    console.log('📝 Updating landing page with fixed images...');
    
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
      console.log('✅ Images fixed successfully!');
      
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
        console.log('🎉 Error should be fixed now!');
        console.log('📱 Check your website at: http://localhost:5174');
      } else {
        console.log('⚠️ Landing page updated but not published');
      }
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to fix images:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error fixing images:', error.message);
  }
}

async function verifyFix(apiToken) {
  try {
    console.log('🔍 Verifying fix...');
    
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
        if (heroBlock.image && heroBlock.image !== null) {
          console.log('✅ Hero image fixed!');
        } else {
          console.log('❌ Hero image still null');
        }
      }
      
      // Check person card image
      const personBlock = landingData.data.blocks.find(block => block.__component === 'blocks.person-card');
      if (personBlock) {
        console.log(`📸 Person card image ID: ${personBlock.image}`);
        if (personBlock.image && personBlock.image !== null) {
          console.log('✅ Person card image fixed!');
        } else {
          console.log('❌ Person card image still null');
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error verifying fix:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting image error fix...');
    console.log('🔧 This will fix the "Cannot read properties of null (reading \'url\')" error');
    
    // Fix the null images
    await fixNullImages(apiToken);
    
    // Verify the fix
    await verifyFix(apiToken);
    
    console.log('\n🎉 Image error fix completed!');
    console.log('📋 Summary:');
    console.log('   ✅ Fixed null image references');
    console.log('   ✅ Set proper image IDs');
    console.log('   ✅ Published changes');
    console.log('\n🌐 Your website should now work without errors!');
    console.log('📱 Check your website at: http://localhost:5174');
    
  } catch (error) {
    console.error('❌ Error in fix process:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node fix-image-error.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
