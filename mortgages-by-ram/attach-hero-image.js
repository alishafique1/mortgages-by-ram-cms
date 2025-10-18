#!/usr/bin/env node

// Attach hero image to landing page

const STRAPI_URL = 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

async function updateLandingPageWithImage() {
  console.log('Attaching hero image to landing page...\n');

  try {
    // Get current landing page
    const response = await fetch(`${API_URL}/landing-page`);
    const landingPage = await response.json();

    if (!landingPage.data) {
      console.error('Landing page not found');
      return;
    }

    const currentBlocks = landingPage.data.blocks;

    // Update the first block (hero) with image ID 14
    const updatedBlocks = currentBlocks.map((block, index) => {
      if (index === 0 && block.__component === 'blocks.hero') {
        return {
          ...block,
          image: 14 // ID of hero-modern-home.jpg
        };
      }
      return block;
    });

    // Update landing page
    const updateResponse = await fetch(`${API_URL}/landing-page`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          blocks: updatedBlocks
        }
      })
    });

    const result = await updateResponse.json();

    if (updateResponse.ok) {
      console.log('✅ Hero image attached to landing page!');
      console.log('\nView at: http://localhost:5174\n');
    } else {
      console.error('❌ Failed to update:', result);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

updateLandingPageWithImage();
