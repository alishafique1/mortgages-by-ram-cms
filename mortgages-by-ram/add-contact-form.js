const STRAPI_URL = 'http://localhost:1337';

async function addContactForm() {
  try {
    // First, get the current landing page data
    const getResponse = await fetch(`${STRAPI_URL}/api/landing-page?populate=deep`);
    const currentData = await getResponse.json();
    
    if (!currentData.data) {
      console.error('❌ Landing page not found');
      return;
    }

    console.log('📄 Current landing page found');
    
    // Get existing blocks
    const existingBlocks = currentData.data.blocks || [];
    
    // Check if contact form already exists
    const hasContactForm = existingBlocks.some(block => block.__component === 'blocks.contact-form');
    
    if (hasContactForm) {
      console.log('✅ Contact form already exists on landing page!');
      return;
    }
    
    // Find the best position (after "Why First-Time Buyers" section or before FAQ)
    let insertPosition = existingBlocks.length;
    const faqIndex = existingBlocks.findIndex(block => block.__component === 'blocks.faqs');
    const personCardIndex = existingBlocks.findIndex(block => block.__component === 'blocks.person-card');
    
    if (faqIndex > -1) {
      insertPosition = faqIndex;
    } else if (personCardIndex > -1) {
      insertPosition = personCardIndex;
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
    
    // Insert the contact form at the calculated position
    const updatedBlocks = [
      ...existingBlocks.slice(0, insertPosition),
      contactFormBlock,
      ...existingBlocks.slice(insertPosition)
    ];
    
    console.log(`📝 Adding contact form at position ${insertPosition + 1} of ${updatedBlocks.length} blocks`);
    
    // Update the landing page
    const updateResponse = await fetch(`${STRAPI_URL}/api/landing-page`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
    
    const result = await updateResponse.json();
    console.log('✅ Contact form added successfully!');
    console.log(`📍 Position: Block ${insertPosition + 1} of ${updatedBlocks.length}`);
    console.log('\n🎉 Your hero CTA buttons will now scroll to the contact form!');
    console.log('🌐 Refresh your browser at http://localhost:5173 to see it');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addContactForm();
