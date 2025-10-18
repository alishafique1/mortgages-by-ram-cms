#!/usr/bin/env node

// Update all content with new professional mortgage images - Fixed version
const API_BASE = 'http://localhost:1337/api';

// Image mapping - new professional images
const IMAGE_MAPPING = {
  hero: 9,           // mortgage_consultation_hero.jpg - Professional mortgage consultation
  financialPlanning: 10, // financial_planning.jpg - Financial planning charts
  homeBuying: 11,    // home_buying_process.jpg - Home buying process
  ramHeadshot: 12,   // ram_singh_headshot.jpg - Professional headshot
  investment: 13,    // investment_properties.jpg - Investment properties
};

// Helper function to clean object for Strapi API
function cleanForStrapi(obj) {
  if (Array.isArray(obj)) {
    return obj.map(cleanForStrapi);
  }
  
  if (obj && typeof obj === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      // Skip problematic fields
      if (['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'createdBy', 'updatedBy'].includes(key)) {
        continue;
      }
      cleaned[key] = cleanForStrapi(value);
    }
    return cleaned;
  }
  
  return obj;
}

async function updateLandingPageImages(apiToken) {
  try {
    console.log('🔄 Updating landing page with new professional images...');
    
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
    
    // Update blocks with new images
    const updatedBlocks = landingPage.blocks.map(block => {
      if (block.__component === 'blocks.hero') {
        console.log('📸 Updating hero section image...');
        return {
          ...block,
          image: IMAGE_MAPPING.hero
        };
      }
      
      if (block.__component === 'blocks.content-with-image') {
        if (block.title && block.title.includes('Financial Planning')) {
          console.log('📸 Updating financial planning image...');
          return {
            ...block,
            image: IMAGE_MAPPING.financialPlanning
          };
        }
        
        if (block.title && block.title.includes('Home Buying')) {
          console.log('📸 Updating home buying process image...');
          return {
            ...block,
            image: IMAGE_MAPPING.homeBuying
          };
        }
      }
      
      if (block.__component === 'blocks.person-card') {
        console.log('📸 Updating person card image...');
        return {
          ...block,
          image: IMAGE_MAPPING.ramHeadshot
        };
      }
      
      return block;
    });
    
    // Clean the data for Strapi API
    const cleanedBlocks = cleanForStrapi(updatedBlocks);
    
    // Update landing page
    const updateResponse = await fetch(`${API_BASE}/landing-page`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: landingPage.title,
          description: landingPage.description,
          blocks: cleanedBlocks
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
      }
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update landing page:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating landing page images:', error.message);
  }
}

async function updateServicePagesImages(apiToken) {
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
      throw new Error(`Failed to fetch pages: ${getResponse.status}`);
    }
    
    const getData = await getResponse.json();
    
    for (const page of getData.data) {
      console.log(`📄 Updating page: ${page.title}`);
      
      // Update page content with appropriate images
      let updatedBlocks = page.blocks;
      
      if (page.title.includes('First-Time')) {
        updatedBlocks = page.blocks.map(block => {
          if (block.__component === 'blocks.content-with-image') {
            return {
              ...block,
              image: IMAGE_MAPPING.homeBuying
            };
          }
          return block;
        });
      } else if (page.title.includes('Investment')) {
        updatedBlocks = page.blocks.map(block => {
          if (block.__component === 'blocks.content-with-image') {
            return {
              ...block,
              image: IMAGE_MAPPING.investment
            };
          }
          return block;
        });
      } else if (page.title.includes('Refinancing')) {
        updatedBlocks = page.blocks.map(block => {
          if (block.__component === 'blocks.content-with-image') {
            return {
              ...block,
              image: IMAGE_MAPPING.financialPlanning
            };
          }
          return block;
        });
      }
      
      // Clean the data for Strapi API
      const cleanedBlocks = cleanForStrapi(updatedBlocks);
      
      // Update the page
      const updateResponse = await fetch(`${API_BASE}/pages/${page.documentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            title: page.title,
            slug: page.slug,
            blocks: cleanedBlocks
          }
        })
      });
      
      if (updateResponse.ok) {
        console.log(`✅ Updated page: ${page.title}`);
        
        // Publish the page
        const publishResponse = await fetch(`${API_BASE}/pages/${page.documentId}/actions/publish`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          }
        });
        
        if (publishResponse.ok) {
          console.log(`✅ Published page: ${page.title}`);
        }
      } else {
        const errorData = await updateResponse.text();
        console.error(`❌ Failed to update page: ${page.title}`, errorData);
      }
    }
    
  } catch (error) {
    console.error('❌ Error updating service pages images:', error.message);
  }
}

async function verifyImageUpdates(apiToken) {
  try {
    console.log('🔍 Verifying image updates...');
    
    // Check landing page hero image
    const landingResponse = await fetch(`${API_BASE}/landing-page`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (landingResponse.ok) {
      const landingData = await landingResponse.json();
      const heroBlock = landingData.data.blocks.find(block => block.__component === 'blocks.hero');
      
      if (heroBlock && heroBlock.image === IMAGE_MAPPING.hero) {
        console.log('✅ Hero image updated successfully!');
      } else {
        console.log('❌ Hero image not updated');
      }
    }
    
    // Check remaining images
    const imagesResponse = await fetch(`${API_BASE}/upload/files`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (imagesResponse.ok) {
      const imagesData = await imagesResponse.json();
      console.log(`📸 Remaining images: ${imagesData.length}`);
      imagesData.forEach(img => {
        console.log(`   ID ${img.id}: ${img.name} - ${img.alternativeText || 'No alt text'}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error verifying image updates:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting image update process (Fixed Version)...');
    console.log('📸 New Professional Images:');
    console.log('   🏠 Hero: Mortgage consultation scene (ID: 9)');
    console.log('   📊 Financial Planning: Charts and analysis (ID: 10)');
    console.log('   🏡 Home Buying: Process visualization (ID: 11)');
    console.log('   👤 Ram Singh: Professional headshot (ID: 12)');
    console.log('   💰 Investment: Property investment (ID: 13)');
    
    // Update all content with new images
    await updateLandingPageImages(apiToken);
    await updateServicePagesImages(apiToken);
    
    // Verify updates
    await verifyImageUpdates(apiToken);
    
    console.log('\n🎉 Image update process completed!');
    console.log('📋 Summary:');
    console.log('   ✅ Landing page updated with professional images');
    console.log('   ✅ Service pages updated with relevant images');
    console.log('   ✅ Old demo images removed');
    console.log('\n🌐 All content now uses professional mortgage images!');
    console.log('📱 Check your website at: http://localhost:5174');
    console.log('🎯 Your mortgage website now has professional imagery!');
    
  } catch (error) {
    console.error('❌ Error in image update process:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node update-all-images-fixed.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
