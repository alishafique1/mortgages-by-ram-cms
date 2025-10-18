#!/usr/bin/env node

// Quick fix: Set placeholder images to prevent null errors
const API_BASE = 'http://localhost:1337/api';

async function setPlaceholderImages(apiToken) {
  try {
    console.log('🔧 Setting placeholder images to fix null error...');
    
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
    
    // Update blocks to set any available image (even if not perfect)
    const updatedBlocks = landingPage.blocks.map(block => {
      if (block.__component === 'blocks.hero' && block.image === null) {
        console.log('📸 Setting hero image to prevent null error...');
        return {
          ...block,
          image: 9  // Use any available image
        };
      }
      
      if (block.__component === 'blocks.person-card' && block.image === null) {
        console.log('📸 Setting person card image to prevent null error...');
        return {
          ...block,
          image: 12  // Use any available image
        };
      }
      
      if (block.__component === 'blocks.content-with-image' && block.image === null) {
        console.log('📸 Setting content image to prevent null error...');
        return {
          ...block,
          image: 10  // Use any available image
        };
      }
      
      return block;
    });
    
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
      console.log('✅ Placeholder images set successfully!');
      
      // Publish
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
      }
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to set placeholder images:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error setting placeholder images:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node fix-null-images.js YOUR_TOKEN_HERE');
  process.exit(1);
}

setPlaceholderImages(apiToken);
