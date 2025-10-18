#!/usr/bin/env node

// Script to update Strapi landing page with mortgage-specific content
// This script will update the landing page content via Strapi API

const API_BASE = 'http://localhost:1337/api';

// Mortgage-specific content inspired by pine.ca
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
      ]
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
      }
    },
    {
      __component: "blocks.markdown",
      content: `## Toronto Market Insights

Stay informed about the latest trends in Toronto's real estate market. Our monthly reports provide valuable insights for both buyers and investors.

### Current Market Conditions
- **Average Home Price:** $1.2M (as of Q3 2025)
- **Interest Rates:** Starting from 5.89% (subject to change)
- **Market Trend:** Stable with moderate growth expected

### First-Time Buyer Programs
- **First-Time Home Buyer Incentive:** Up to 10% shared equity
- **Land Transfer Tax Rebate:** Up to $4,000 for Toronto properties
- **RRSP Home Buyers' Plan:** Withdraw up to $35,000 tax-free

[View our complete market report](/market-insights)`
    },
    {
      __component: "blocks.person-card",
      text: "With over 8 years of experience in Toronto's mortgage industry, I've helped hundreds of families and investors secure their dream homes. My approach combines market expertise with personalized service to deliver the best possible outcomes for my clients.",
      personName: "Ram Singh",
      personJob: "Licensed Mortgage Agent",
      image: {
        // This will need to be updated with actual image
        url: "/uploads/ram-profile.jpg"
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
      __component: "blocks.featured-articles",
      articles: [
        // These will be populated with actual article IDs once we create mortgage articles
        {
          id: 1,
          title: "First-Time Home Buyer Guide: Complete Checklist",
          description: "Everything you need to know about buying your first home in Toronto, from pre-approval to closing day.",
          slug: "first-time-home-buyer-guide"
        },
        {
          id: 2,
          title: "Toronto Mortgage Rates: What to Expect in 2025",
          description: "Current market analysis and rate predictions to help you time your home purchase.",
          slug: "toronto-mortgage-rates-2025"
        },
        {
          id: 3,
          title: "Investment Property Financing: A Complete Guide",
          description: "Learn how to finance investment properties and build your real estate portfolio.",
          slug: "investment-property-financing-guide"
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

// Function to update landing page content
async function updateLandingPage() {
  try {
    console.log('🔄 Updating landing page content...');
    
    // First, get the current landing page to get the document ID
    const response = await fetch(`${API_BASE}/landing-page`);
    const data = await response.json();
    
    if (!data.data) {
      throw new Error('No landing page data found');
    }
    
    const documentId = data.data.documentId;
    console.log(`📄 Found landing page with ID: ${documentId}`);
    
    // Update the landing page with new content
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
      console.log('✅ Landing page updated successfully!');
      console.log('🎯 Updated content includes:');
      console.log('   - Mortgage-focused hero section');
      console.log('   - Service offerings (First-time buyers, Refinancing, etc.)');
      console.log('   - About section with expertise highlights');
      console.log('   - Mortgage process explanation');
      console.log('   - Toronto market insights');
      console.log('   - FAQ section with common mortgage questions');
      console.log('   - Newsletter signup for market updates');
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update landing page:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating landing page:', error.message);
  }
}

// Run the update
updateLandingPage();
