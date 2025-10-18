#!/usr/bin/env node

// Direct Strapi API update script for landing page content
const API_BASE = 'http://localhost:1337/api';

// Mortgage-specific content
const mortgageContent = {
  title: "Mortgages by Ram - Your Trusted Toronto Mortgage Agent",
  description: "Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service.",
  
  blocks: [
    {
      __component: "blocks.hero",
      heading: "Your Dream Home Starts Here",
      text: "As your trusted Toronto mortgage agent, I help first-time buyers, families, and investors secure the best mortgage rates. With personalized service and expert guidance, we'll find the perfect mortgage solution for your unique situation.",
      links: [
        {
          href: "/contact",
          label: "Get Pre-Approved",
          isExternal: false,
          isButtonLink: true,
          type: "PRIMARY"
        },
        {
          href: "/services",
          label: "View Services",
          isExternal: false,
          isButtonLink: true,
          type: "SECONDARY"
        }
      ],
      image: {
        id: 6,
        documentId: "pxuhf5ukwzafkmb8ue8biagy",
        alternativeText: "Professional mortgage consultation",
        url: "/uploads/tables_921e2e7dac.avif"
      }
    },
    {
      __component: "blocks.section-heading",
      subHeading: "Professional Mortgage Services",
      heading: "Your Toronto Mortgage Expert",
      anchorLink: "services"
    },
    {
      __component: "blocks.card-grid",
      cards: [
        {
          heading: "First-Time Home Buyers",
          text: "Navigate the home buying process with confidence. Get pre-approved, understand your budget, and secure your first home with expert guidance."
        },
        {
          heading: "Refinancing Solutions",
          text: "Lower your monthly payments, consolidate debt, or access home equity. Find the best refinancing options tailored to your financial goals."
        },
        {
          heading: "Investment Properties",
          text: "Build your real estate portfolio with competitive investment property mortgage rates. Expert advice for both new and experienced investors."
        },
        {
          heading: "Commercial Mortgages",
          text: "Secure financing for your business property needs. From small commercial spaces to large developments, we have the solutions."
        }
      ]
    },
    {
      __component: "blocks.content-with-image",
      reversed: false,
      heading: "Why Choose Mortgages by Ram?",
      content: "With years of experience in Toronto's competitive real estate market, I provide personalized mortgage solutions that fit your unique needs. My commitment to transparency, competitive rates, and exceptional service has helped hundreds of clients achieve their homeownership dreams.\n\n**What sets me apart:**\n- Licensed and certified mortgage agent\n- Access to 50+ lenders and competitive rates\n- Personalized service from application to closing\n- Deep knowledge of Toronto market conditions\n- Bilingual service (English/Hindi)",
      link: {
        href: "/about",
        label: "Learn More About Ram",
        isExternal: false,
        isButtonLink: true,
        type: "PRIMARY"
      },
      image: {
        id: 7,
        documentId: "m6k376b2oa58vg2dnu5lsv0i",
        alternativeText: "Mortgage consultation",
        url: "/uploads/forest_562bafce29.avif"
      }
    },
    {
      __component: "blocks.content-with-image",
      reversed: true,
      heading: "The Mortgage Process Made Simple",
      content: "Getting a mortgage doesn't have to be complicated. My streamlined process ensures you understand every step and feel confident throughout your journey.\n\n**Step 1:** Free consultation and pre-approval\n**Step 2:** Find your perfect home\n**Step 3:** Submit your application\n**Step 4:** Get approved and close\n\nI'll guide you through each step, handle the paperwork, and keep you informed every step of the way.",
      link: {
        href: "/process",
        label: "View Our Process",
        isExternal: false,
        isButtonLink: true,
        type: "PRIMARY"
      },
      image: {
        id: 7,
        documentId: "m6k376b2oa58vg2dnu5lsv0i",
        alternativeText: "Mortgage process",
        url: "/uploads/forest_562bafce29.avif"
      }
    },
    {
      __component: "blocks.markdown",
      content: "## Toronto Market Insights\n\nStay informed about the latest trends in Toronto's real estate market. Our monthly reports provide valuable insights for both buyers and investors.\n\n### Current Market Conditions\n- **Average Home Price:** $1.2M (as of Q3 2025)\n- **Interest Rates:** Starting from 5.89% (subject to change)\n- **Market Trend:** Stable with moderate growth expected\n\n### First-Time Buyer Programs\n- **First-Time Home Buyer Incentive:** Up to 10% shared equity\n- **Land Transfer Tax Rebate:** Up to $4,000 for Toronto properties\n- **RRSP Home Buyers' Plan:** Withdraw up to $35,000 tax-free\n\n[View our complete market report](/market-insights)"
    },
    {
      __component: "blocks.person-card",
      text: "With over 8 years of experience in Toronto's mortgage industry, I've helped hundreds of families and investors secure their dream homes. My approach combines market expertise with personalized service to deliver the best possible outcomes for my clients.",
      personName: "Ram Singh",
      personJob: "Licensed Mortgage Agent",
      image: {
        id: 8,
        documentId: "uka7pcf3dw7yczakvaj6dv3o",
        alternativeText: "Ram Singh - Licensed Mortgage Agent",
        url: "/uploads/image_of_women_fa698d5653.avif"
      }
    },
    {
      __component: "blocks.faqs",
      faq: [
        {
          heading: "How much can I afford to borrow?",
          text: "Your borrowing capacity depends on your income, debts, and credit score. During our free consultation, I'll analyze your financial situation and provide a pre-approval amount that fits your budget."
        },
        {
          heading: "What documents do I need for a mortgage application?",
          text: "Typically, you'll need pay stubs, tax returns, bank statements, and employment letters. I'll provide you with a complete checklist during our consultation to ensure a smooth application process."
        },
        {
          heading: "How long does the mortgage approval process take?",
          text: "Pre-approval can be completed in 1-2 days. Full approval typically takes 5-10 business days, depending on the lender and complexity of your application."
        },
        {
          heading: "Do you work with first-time home buyers?",
          text: "Absolutely! First-time buyers are a specialty of mine. I'll guide you through every step, explain all available programs and incentives, and ensure you understand your options."
        },
        {
          heading: "What areas do you serve?",
          text: "I primarily serve the Greater Toronto Area (GTA), including Toronto, Mississauga, Brampton, Markham, and surrounding communities."
        }
      ]
    },
    {
      __component: "blocks.newsletter",
      heading: "Stay Updated with Toronto Market Insights",
      text: "Get monthly mortgage rate updates, market insights, and first-time buyer tips delivered to your inbox. Stay informed about opportunities that could save you thousands on your mortgage.",
      placeholder: "your@email.com",
      label: "Subscribe Now",
      formId: "newsletter-signup"
    }
  ]
};

async function updateLandingPage() {
  try {
    console.log('🔄 Updating Strapi landing page content...');
    
    // Get current landing page
    const getResponse = await fetch(`${API_BASE}/landing-page`);
    const getData = await getResponse.json();
    
    if (!getData.data) {
      throw new Error('No landing page data found');
    }
    
    const documentId = getData.data.documentId;
    console.log(`📄 Found landing page with ID: ${documentId}`);
    
    // For Single Types, we need to use PUT method with the document ID
    const updateResponse = await fetch(`${API_BASE}/landing-page`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: mortgageContent.title,
          description: mortgageContent.description,
          blocks: mortgageContent.blocks
        }
      })
    });
    
    if (updateResponse.ok) {
      console.log('✅ Landing page updated successfully!');
      
      // Publish the content to make it available via API
      console.log('🔄 Publishing content...');
      const publishResponse = await fetch(`${API_BASE}/landing-page/actions/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (publishResponse.ok) {
        console.log('✅ Content published successfully!');
        console.log('🎯 Updated content includes:');
        console.log('   - Hero: "Your Dream Home Starts Here"');
        console.log('   - Services: First-time buyers, Refinancing, Investment, Commercial');
        console.log('   - About: Ram Singh - Licensed Mortgage Agent');
        console.log('   - Process: 4-step mortgage process');
        console.log('   - FAQ: 5 common mortgage questions');
        console.log('   - Newsletter: Market insights signup');
        console.log('\n🌐 Check your frontend at: http://localhost:5174');
      } else {
        console.log('⚠️  Content updated but publishing failed. Please publish manually in admin panel.');
        console.log('   Go to: http://localhost:1337/admin → Content Manager → Single Types → Landing Page');
      }
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update landing page:', errorData);
      
      // Try alternative method
      console.log('🔄 Trying alternative update method...');
      await tryAlternativeUpdate(documentId);
    }
    
  } catch (error) {
    console.error('❌ Error updating landing page:', error.message);
  }
}

async function tryAlternativeUpdate(documentId) {
  try {
    // Try using the document ID in the URL
    const updateResponse = await fetch(`${API_BASE}/landing-page/${documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: mortgageContent.title,
          description: mortgageContent.description,
          blocks: mortgageContent.blocks
        }
      })
    });
    
    if (updateResponse.ok) {
      console.log('✅ Landing page updated successfully using alternative method!');
    } else {
      console.error('❌ Alternative method also failed');
      console.log('💡 Please update the content manually through the Strapi admin panel:');
      console.log('   1. Go to http://localhost:1337/admin');
      console.log('   2. Navigate to Content Manager → Single Types → Landing Page');
      console.log('   3. Update the content using the guide in strapi-content-update-guide.md');
    }
  } catch (error) {
    console.error('❌ Alternative update failed:', error.message);
  }
}

// Run the update
updateLandingPage();
