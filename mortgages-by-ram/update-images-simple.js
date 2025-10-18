#!/usr/bin/env node

// Simple image update script - just update image references
const API_BASE = 'http://localhost:1337/api';

async function updateHeroImage(apiToken) {
  try {
    console.log('🔄 Updating hero image...');
    
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
    
    // Find and update hero block
    const updatedBlocks = landingPage.blocks.map(block => {
      if (block.__component === 'blocks.hero') {
        console.log('📸 Updating hero section image to ID 9...');
        return {
          ...block,
          image: 9  // mortgage_consultation_hero.jpg
        };
      }
      return block;
    });
    
    // Update only the blocks
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
      console.log('✅ Hero image updated successfully!');
      
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
      }
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update hero image:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating hero image:', error.message);
  }
}

async function updatePersonCardImage(apiToken) {
  try {
    console.log('🔄 Updating person card image...');
    
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
    
    // Find and update person card block
    const updatedBlocks = landingPage.blocks.map(block => {
      if (block.__component === 'blocks.person-card') {
        console.log('📸 Updating person card image to ID 12...');
        return {
          ...block,
          image: 12  // ram_singh_headshot.jpg
        };
      }
      return block;
    });
    
    // Update only the blocks
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
      console.log('✅ Person card image updated successfully!');
      
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
      }
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update person card image:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating person card image:', error.message);
  }
}

async function verifyUpdates(apiToken) {
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
    }
    
  } catch (error) {
    console.error('❌ Error verifying updates:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting simple image update...');
    console.log('📸 Updating to professional mortgage images:');
    console.log('   🏠 Hero: ID 9 (mortgage consultation)');
    console.log('   👤 Person Card: ID 12 (Ram Singh headshot)');
    
    // Update images one by one
    await updateHeroImage(apiToken);
    await updatePersonCardImage(apiToken);
    
    // Verify updates
    await verifyUpdates(apiToken);
    
    console.log('\n🎉 Image update completed!');
    console.log('📱 Check your website at: http://localhost:5174');
    console.log('🎯 Your mortgage website now has professional images!');
    
  } catch (error) {
    console.error('❌ Error in image update:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node update-images-simple.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
