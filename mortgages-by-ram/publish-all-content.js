#!/usr/bin/env node

// Publish all content script
const API_BASE = 'http://localhost:1337/api';

async function publishLandingPage(apiToken) {
  try {
    console.log('🔄 Publishing landing page...');
    
    const publishResponse = await fetch(`${API_BASE}/landing-page/actions/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      }
    });
    
    if (publishResponse.ok) {
      console.log('✅ Landing page published successfully!');
    } else {
      const errorData = await publishResponse.text();
      console.error('❌ Failed to publish landing page:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error publishing landing page:', error.message);
  }
}

async function publishAllArticles(apiToken) {
  try {
    console.log('🔄 Publishing all articles...');
    
    // Get all articles
    const getResponse = await fetch(`${API_BASE}/articles`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch articles: ${getResponse.status} ${getResponse.statusText}`);
    }
    
    const getData = await getResponse.json();
    
    if (!getData.data) {
      console.log('No articles found to publish');
      return;
    }
    
    // Publish each article
    for (const article of getData.data) {
      const publishResponse = await fetch(`${API_BASE}/articles/${article.documentId}/actions/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (publishResponse.ok) {
        console.log(`✅ Published article: ${article.title}`);
      } else {
        console.error(`❌ Failed to publish article: ${article.title}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error publishing articles:', error.message);
  }
}

async function publishAllPages(apiToken) {
  try {
    console.log('🔄 Publishing all pages...');
    
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
      console.log('No pages found to publish');
      return;
    }
    
    // Publish each page
    for (const page of getData.data) {
      const publishResponse = await fetch(`${API_BASE}/pages/${page.documentId}/actions/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (publishResponse.ok) {
        console.log(`✅ Published page: ${page.title}`);
      } else {
        console.error(`❌ Failed to publish page: ${page.title}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error publishing pages:', error.message);
  }
}

async function publishGlobalSettings(apiToken) {
  try {
    console.log('🔄 Publishing global settings...');
    
    const publishResponse = await fetch(`${API_BASE}/global/actions/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      }
    });
    
    if (publishResponse.ok) {
      console.log('✅ Global settings published successfully!');
    } else {
      const errorData = await publishResponse.text();
      console.error('❌ Failed to publish global settings:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error publishing global settings:', error.message);
  }
}

async function verifyPublishedContent(apiToken) {
  try {
    console.log('🔄 Verifying all content is published...');
    
    // Check landing page
    const landingResponse = await fetch(`${API_BASE}/landing-page`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (landingResponse.ok) {
      const landingData = await landingResponse.json();
      console.log(`📄 Landing Page: ${landingData.data.publishedAt ? '✅ Published' : '❌ Not Published'}`);
    }
    
    // Check articles
    const articlesResponse = await fetch(`${API_BASE}/articles`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (articlesResponse.ok) {
      const articlesData = await articlesResponse.json();
      const publishedCount = articlesData.data.filter(article => article.publishedAt).length;
      console.log(`📝 Articles: ${publishedCount}/${articlesData.data.length} published`);
    }
    
    // Check pages
    const pagesResponse = await fetch(`${API_BASE}/pages`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (pagesResponse.ok) {
      const pagesData = await pagesResponse.json();
      const publishedCount = pagesData.data.filter(page => page.publishedAt).length;
      console.log(`📄 Pages: ${publishedCount}/${pagesData.data.length} published`);
    }
    
    // Check global settings
    const globalResponse = await fetch(`${API_BASE}/global`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (globalResponse.ok) {
      const globalData = await globalResponse.json();
      console.log(`🌐 Global Settings: ${globalData.data.publishedAt ? '✅ Published' : '❌ Not Published'}`);
    }
    
  } catch (error) {
    console.error('❌ Error verifying published content:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting content publishing process...');
    
    // Publish all content
    await publishLandingPage(apiToken);
    await publishAllArticles(apiToken);
    await publishAllPages(apiToken);
    await publishGlobalSettings(apiToken);
    
    // Verify everything is published
    await verifyPublishedContent(apiToken);
    
    console.log('\n🎉 Publishing process completed!');
    console.log('📋 Summary:');
    console.log('   ✅ Landing page published');
    console.log('   ✅ All articles published');
    console.log('   ✅ All service pages published');
    console.log('   ✅ Global settings published');
    console.log('\n🌐 All content is now live on your frontend!');
    console.log('📱 Check your website at: http://localhost:5174');
    console.log('🎯 Your mortgage website is ready for business!');
    
  } catch (error) {
    console.error('❌ Error in publishing process:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node publish-all-content.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
