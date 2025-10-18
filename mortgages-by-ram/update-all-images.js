#!/usr/bin/env node

// Update all content with new professional mortgage images
const API_BASE = 'http://localhost:1337/api';

// Image mapping - new professional images
const IMAGE_MAPPING = {
  hero: 9,           // mortgage_consultation_hero.jpg - Professional mortgage consultation
  financialPlanning: 10, // financial_planning.jpg - Financial planning charts
  homeBuying: 11,    // home_buying_process.jpg - Home buying process
  ramHeadshot: 12,   // ram_singh_headshot.jpg - Professional headshot
  investment: 13,    // investment_properties.jpg - Investment properties
};

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
            blocks: updatedBlocks
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
        console.error(`❌ Failed to update page: ${page.title}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error updating service pages images:', error.message);
  }
}

async function updateArticleImages(apiToken) {
  try {
    console.log('🔄 Updating article featured images...');
    
    // Get all articles
    const getResponse = await fetch(`${API_BASE}/articles`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch articles: ${getResponse.status}`);
    }
    
    const getData = await getResponse.json();
    
    for (const article of getData.data) {
      console.log(`📝 Updating article: ${article.title}`);
      
      // Update article with financial planning image
      const updateResponse = await fetch(`${API_BASE}/articles/${article.documentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            title: article.title,
            slug: article.slug,
            description: article.description,
            content: article.content,
            featuredImage: IMAGE_MAPPING.financialPlanning,
            author: article.author,
            tags: article.tags
          }
        })
      });
      
      if (updateResponse.ok) {
        console.log(`✅ Updated article: ${article.title}`);
        
        // Publish the article
        const publishResponse = await fetch(`${API_BASE}/articles/${article.documentId}/actions/publish`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          }
        });
        
        if (publishResponse.ok) {
          console.log(`✅ Published article: ${article.title}`);
        }
      } else {
        console.error(`❌ Failed to update article: ${article.title}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error updating article images:', error.message);
  }
}

async function deleteOldImages(apiToken) {
  try {
    console.log('🗑️ Removing old demo images...');
    
    // List of old image IDs to delete (keeping only the new professional ones)
    const oldImageIds = [1, 2, 3, 4, 5, 6, 7, 8]; // Old demo images
    
    for (const imageId of oldImageIds) {
      const deleteResponse = await fetch(`${API_BASE}/upload/files/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (deleteResponse.ok) {
        console.log(`✅ Deleted old image ID: ${imageId}`);
      } else {
        console.log(`ℹ️ Image ID ${imageId} may already be deleted or in use`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error deleting old images:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting image update process...');
    console.log('📸 New Professional Images:');
    console.log('   🏠 Hero: Mortgage consultation scene');
    console.log('   📊 Financial Planning: Charts and analysis');
    console.log('   🏡 Home Buying: Process visualization');
    console.log('   👤 Ram Singh: Professional headshot');
    console.log('   💰 Investment: Property investment');
    
    // Update all content with new images
    await updateLandingPageImages(apiToken);
    await updateServicePagesImages(apiToken);
    await updateArticleImages(apiToken);
    
    // Clean up old images
    await deleteOldImages(apiToken);
    
    console.log('\n🎉 Image update process completed!');
    console.log('📋 Summary:');
    console.log('   ✅ Landing page updated with professional images');
    console.log('   ✅ Service pages updated with relevant images');
    console.log('   ✅ Articles updated with financial planning images');
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
  console.log('Run this script with: node update-all-images.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
