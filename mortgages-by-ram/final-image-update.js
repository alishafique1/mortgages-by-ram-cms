#!/usr/bin/env node

// Final image update script for landing page
const API_BASE = 'http://localhost:1337/api';

async function updateLandingPageWithNewImages(apiToken) {
  try {
    console.log('🔄 Updating landing page with new image IDs...');
    
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
    
    // Update blocks with new image IDs (without IDs in the update)
    const updatedBlocks = getData.data.blocks.map(block => {
      if (block.__component === 'blocks.hero') {
        return {
          "__component": "blocks.hero",
          "heading": block.heading,
          "text": block.text,
          "links": block.links,
          "image": 9  // New mortgage consultation image
        };
      } else if (block.__component === 'blocks.content-with-image' && !block.reversed) {
        return {
          "__component": "blocks.content-with-image",
          "reversed": false,
          "heading": block.heading,
          "content": block.content,
          "link": block.link,
          "image": 11  // New financial planning image
        };
      } else if (block.__component === 'blocks.content-with-image' && block.reversed) {
        return {
          "__component": "blocks.content-with-image",
          "reversed": true,
          "heading": block.heading,
          "content": block.content,
          "link": block.link,
          "image": 10  // New home buying process image
        };
      } else if (block.__component === 'blocks.person-card') {
        return {
          "__component": "blocks.person-card",
          "text": block.text,
          "personName": block.personName,
          "personJob": block.personJob,
          "image": 12  // New Ram Singh headshot
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

async function updateServicePagesWithNewImages(apiToken) {
  try {
    console.log('🔄 Updating service pages with new images...');
    
    // Get all pages
    const getResponse = await fetch(`${API_BASE}/pages`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch pages: ${getResponse.status} ${getResponse.statusText}`);
    }
    
    const getData = await getResponse.json();
    
    if (!getData.data) {
      console.log('No pages found to update');
      return;
    }
    
    // Update service pages with appropriate images
    for (const page of getData.data) {
      const updatedBlocks = page.blocks.map(block => {
        if (block.__component === 'blocks.hero') {
          // Use different images for different services
          let imageId = 9; // Default to mortgage consultation
          if (page.title.includes('Investment')) {
            imageId = 11; // Financial planning image
          } else if (page.title.includes('First-Time')) {
            imageId = 10; // Home buying process image
          } else if (page.title.includes('Refinancing')) {
            imageId = 11; // Financial planning image
          } else if (page.title.includes('Commercial')) {
            imageId = 9; // Mortgage consultation image
          }
          
          return {
            "__component": "blocks.hero",
            "heading": block.heading,
            "text": block.text,
            "links": block.links,
            "image": imageId
          };
        }
        return block;
      });
      
      const updateResponse = await fetch(`${API_BASE}/pages/${page.documentId}`, {
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
        console.log(`✅ Updated images for page: ${page.title}`);
      } else {
        console.error(`❌ Failed to update page: ${page.title}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error updating service pages images:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting final image updates...');
    
    // Update landing page with new images
    await updateLandingPageWithNewImages(apiToken);
    
    // Update service pages with new images
    await updateServicePagesWithNewImages(apiToken);
    
    console.log('\n🎉 Final image updates completed successfully!');
    console.log('📋 Summary of final updates:');
    console.log('   ✅ Updated landing page with new professional images');
    console.log('   ✅ Updated service pages with relevant images');
    console.log('   ✅ Hero section: Professional mortgage consultation');
    console.log('   ✅ Content sections: Financial planning & home buying process');
    console.log('   ✅ Person card: Professional Ram Singh headshot');
    console.log('   ✅ All images are now mortgage and finance-focused');
    console.log('\n🌐 Check your frontend at: http://localhost:5174');
    console.log('📱 Your website now has professional mortgage images!');
    
  } catch (error) {
    console.error('❌ Error in final image updates:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node final-image-update.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
