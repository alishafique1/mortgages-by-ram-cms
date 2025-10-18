const STRAPI_URL = 'http://localhost:1337';
const ADMIN_EMAIL = 'admin@example.com'; // Default from seed
const ADMIN_PASSWORD = 'Welcome123'; // Default from seed

async function addContactFormWithAuth() {
  try {
    // Step 1: Login to get JWT token
    console.log('🔐 Logging in to Strapi admin...');
    const loginResponse = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });
    
    if (!loginResponse.ok) {
      console.error('❌ Login failed. Please check your admin credentials.');
      console.log('💡 You can add the contact form manually in Strapi admin instead.');
      return;
    }
    
    const loginData = await loginResponse.json();
    const token = loginData.jwt;
    console.log('✅ Logged in successfully');
    
    // Step 2: Get current landing page data
    console.log('📄 Fetching landing page data...');
    const getResponse = await fetch(`${STRAPI_URL}/api/landing-page?populate=deep`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const currentData = await getResponse.json();
    
    if (!currentData.data) {
      console.error('❌ Landing page not found');
      return;
    }
    
    // Get existing blocks
    const existingBlocks = currentData.data.blocks || [];
    
    // Check if contact form already exists
    const hasContactForm = existingBlocks.some(block => block.__component === 'blocks.contact-form');
    
    if (hasContactForm) {
      console.log('✅ Contact form already exists on landing page!');
      return;
    }
    
    // Find the best position (after content blocks, before FAQ)
    let insertPosition = existingBlocks.length;
    const faqIndex = existingBlocks.findIndex(block => block.__component === 'blocks.faqs');
    
    if (faqIndex > -1) {
      insertPosition = faqIndex;
    }
    
    // Create the contact form block
    const contactFormBlock = {
      __component: 'blocks.contact-form',
      heading: 'Ready to Get Started?',
      subheading: 'Book your free consultation today. We\'ll discuss your goals, review your options, and create a personalized mortgage plan. No cost, no obligation.',
      buttonText: 'Book Your Free Consultation',
      showPhone: true,
      showMessage: true
    };
    
    // Insert the contact form
    const updatedBlocks = [
      ...existingBlocks.slice(0, insertPosition),
      contactFormBlock,
      ...existingBlocks.slice(insertPosition)
    ];
    
    console.log(`📝 Adding contact form at position ${insertPosition + 1} of ${updatedBlocks.length} blocks`);
    
    // Step 3: Update the landing page
    const updateResponse = await fetch(`${STRAPI_URL}/api/landing-page`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        data: {
          blocks: updatedBlocks
        }
      })
    });
    
    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('❌ Failed to update landing page:', errorText);
      return;
    }
    
    console.log('\n✅ SUCCESS! Contact form added to landing page!');
    console.log(`📍 Position: Block ${insertPosition + 1} of ${updatedBlocks.length}`);
    console.log('\n🎯 What happens now:');
    console.log('   1. Your hero section has "Get Pre-Approved Now" button');
    console.log('   2. Clicking it will smooth scroll to the contact form');
    console.log('   3. User can immediately fill out and submit');
    console.log('\n🌐 Refresh your browser at http://localhost:5173 to see it!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addContactFormWithAuth();
