#!/usr/bin/env node

// Simplified Strapi API update script for landing page content
const API_BASE = 'http://localhost:1337/api';

async function updateLandingPageWithAuth(apiToken) {
  try {
    console.log('🔄 Updating Strapi landing page content with authentication...');
    
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
    
    console.log(`📄 Found landing page with ID: ${getData.data.documentId}`);
    
    // Update just the title and description first
    const updateResponse = await fetch(`${API_BASE}/landing-page`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: "Mortgages by Ram - Your Trusted Toronto Mortgage Agent",
          description: "Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service."
        }
      })
    });
    
    if (updateResponse.ok) {
      console.log('✅ Landing page title and description updated successfully!');
      
      // Publish the content to make it available via API
      console.log('🔄 Publishing content...');
      const publishResponse = await fetch(`${API_BASE}/landing-page/actions/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (publishResponse.ok) {
        console.log('✅ Content published successfully!');
        console.log('🎯 Updated content includes:');
        console.log('   - Title: "Mortgages by Ram - Your Trusted Toronto Mortgage Agent"');
        console.log('   - Description: Professional mortgage services in Toronto');
        console.log('\n🌐 Check your frontend at: http://localhost:5174');
        console.log('📱 Basic content should now be visible on the frontend!');
        console.log('\n💡 For detailed block updates, use the manual method:');
        console.log('   1. Go to: http://localhost:1337/admin');
        console.log('   2. Navigate to: Content Manager → Single Types → Landing Page');
        console.log('   3. Update individual blocks with content from quick-copy-paste-content.md');
      } else {
        console.log('⚠️  Content updated but publishing failed. Please publish manually in admin panel.');
        console.log('   Go to: http://localhost:1337/admin → Content Manager → Single Types → Landing Page');
      }
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update landing page:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating landing page:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node update-strapi-content-simple.js YOUR_TOKEN_HERE');
  process.exit(1);
}

updateLandingPageWithAuth(apiToken);
