#!/usr/bin/env node

/**
 * Complete Mortgage Website Content Update Script
 * Updates: Global settings, Landing page, and creates all missing pages
 * Inspired by: Grow With Nav website
 */

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'YOUR_API_TOKEN_HERE'; // Will be generated from Strapi admin

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    }
  };

  if (data) {
    options.body = JSON.stringify({ data });
  }

  const response = await fetch(`${STRAPI_URL}/api${endpoint}`, options);
  const result = await response.json();
  
  if (!response.ok) {
    console.error(`Error on ${endpoint}:`, result);
    throw new Error(`API call failed: ${response.status}`);
  }
  
  return result;
}

// 1. Update Global Settings
async function updateGlobalSettings() {
  console.log('📝 Updating Global Settings...');
  
  const globalData = {
    title: 'Mortgages by Ram',
    description: 'Your trusted Toronto mortgage agent helping first-time buyers, families, and investors secure the best mortgage rates with personalized service.',
    header: {
      logo: 'Mortgages by Ram',
      links: [
        { label: 'Home', href: '/', isExternal: false },
        { label: 'About', href: '/pages/about', isExternal: false },
        { label: 'Services', href: '/pages/services', isExternal: false },
        { label: 'Articles', href: '/articles', isExternal: false },
        { label: 'Contact', href: '/pages/contact', isExternal: false }
      ]
    },
    footer: {
      companyName: 'Mortgages by Ram',
      license: 'License #M21004312 | FSRA #12403',
      description: 'Your trusted Toronto mortgage agent helping first-time buyers, families, and investors secure the best mortgage rates with personalized service.',
      socialLinks: [
        { platform: 'Instagram', url: 'https://instagram.com/mortgagesbyram' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/mortgagesbyram' },
        { platform: 'YouTube', url: 'https://youtube.com/@mortgagesbyram' }
      ]
    }
  };

  try {
    const result = await apiCall('/global', 'PUT', globalData);
    console.log('✅ Global settings updated successfully');
    return result;
  } catch (error) {
    console.error('❌ Error updating global settings:', error.message);
  }
}

// 2. Update Landing Page
async function updateLandingPage() {
  console.log('📝 Updating Landing Page...');
  
  const landingPageData = {
    title: 'Mortgages by Ram - Your Trusted Toronto Mortgage Agent',
    description: 'Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service.',
    blocks: [
      // Hero Block
      {
        __component: 'blocks.hero',
        heading: 'I WANT TO RETIRE YOU WITH $200,000+ / YEAR',
        text: 'As your trusted Toronto mortgage agent, I help first-time buyers build wealth through smart real estate decisions. Get personalized service, expert guidance, and access to exclusive opportunities that set you up for financial freedom.',
        links: [
          { label: 'Book a Call', href: '/pages/contact', isExternal: false },
          { label: 'Free Class', href: '/pages/free-class', isExternal: false }
        ]
      },
      
      // Section Heading
      {
        __component: 'blocks.section-heading',
        subHeading: 'Professional Mortgage Services',
        heading: 'Your Toronto First-Time Home Buyer Expert'
      },
      
      // Services Card Grid
      {
        __component: 'blocks.card-grid',
        cards: [
          {
            heading: 'First-Time Home Buyers',
            text: 'The bank provides you with a rate, and that\'s it. We guide you through the entire process end-to-end, connect you to the best people in our network, and shop the BEST rate for you across all lenders.',
            link: { label: 'Learn More', href: '/pages/first-time-buyers' }
          },
          {
            heading: 'Grow Nation Membership',
            text: 'Once you close your mortgage with us, you become part of our exclusive inner circle "Grow Nation" - an invite-only platform designed to retire you well & early. I will make that plan with you 1 on 1.',
            link: { label: 'Join Now', href: '/pages/grow-nation' }
          },
          {
            heading: 'Investment Properties',
            text: 'Build your real estate portfolio with competitive investment property mortgage rates. I spend thousands in educating myself on real-estate matters, so that I can make more money for my clients over the next 3 decades.',
            link: { label: 'Start Investing', href: '/pages/investment-properties' }
          },
          {
            heading: '1% Newsletter',
            text: 'Get exclusive mortgage insights, Toronto market updates, and wealth-building strategies delivered to your inbox. Join hundreds of successful homeowners and investors.',
            link: { label: 'Subscribe', href: '/pages/newsletter' }
          }
        ]
      },
      
      // Why First-Time Buyers Section
      {
        __component: 'blocks.content-with-image',
        heading: 'WHY DO I WORK WITH FIRST TIME HOME BUYERS',
        content: 'I spend thousands of $$$ in educating myself on real-estate matters, so that I can make more money for my clients over the next 3 decades. However, I only work with First time home buyers and First time Investors, because I believe that they require the most amount of guidance in what is the most EXPENSIVE life decision.\n\nI have a WIN-WIN job now! Let me be your inside guy ;-)',
        link: { label: 'Book a Call', href: '/pages/contact' },
        imagePosition: 'right'
      },
      
      // Contact Form CTA
      {
        __component: 'blocks.contact-form',
        heading: 'Ready to Get Started?',
        subheading: 'Book your free consultation today. We\'ll discuss your goals, review your options, and create a personalized mortgage plan. No cost, no obligation.',
        buttonText: 'Book Your Free Consultation',
        showPhone: true,
        showMessage: true
      },
      
      // About Section
      {
        __component: 'blocks.person-card',
        text: 'Each member of our team has been handpicked because they share my values - doing the right thing 100% of the time, even if it means you choose NOT to work with us. Our goal is to help you succeed over the next 30 years, rather than make a quick buck at your expense.',
        personName: 'Ram Singh',
        personJob: 'Founder & Licensed Mortgage Agent',
        personBio: 'Mortgage Lic #M21004312'
      },
      
      // FAQ Section
      {
        __component: 'blocks.faqs',
        heading: 'Frequently Asked Questions',
        faqs: [
          {
            heading: 'How much does it cost to work with you?',
            text: 'All this for $0 to you. Lenders pay us directly, so you get expert guidance at no cost.'
          },
          {
            heading: 'What makes you different from going directly to my bank?',
            text: 'The bank provides you with a rate, and that\'s it. We guide you through the entire process end-to-end, connect you to the best people in our network (realtors, lawyers, inspectors) and shop the BEST rate for you across all lenders.'
          },
          {
            heading: 'What is Grow Nation?',
            text: 'Once you close the mortgage with us, you will be part of my inner circle "Grow Nation" - it\'s an exclusive invite-only platform for clients to retire them well & early. I will make that plan with you 1 on 1.'
          },
          {
            heading: 'Do you only work in Toronto?',
            text: 'I primarily serve the Greater Toronto Area (GTA), including Toronto, Mississauga, Brampton, Markham, Vaughan, and surrounding communities.'
          },
          {
            heading: 'How long does the mortgage process take?',
            text: 'Pre-approval can be completed in 1-2 days. Full approval typically takes 5-10 business days, depending on the lender and your situation.'
          }
        ]
      },
      
      // Newsletter Block
      {
        __component: 'blocks.newsletter',
        heading: 'Join the 1% Newsletter',
        text: 'Get exclusive mortgage insights, market updates, and wealth-building strategies delivered to your inbox. Join hundreds of successful homeowners and investors.',
        placeholder: 'your@email.com',
        label: 'Subscribe Now'
      }
    ]
  };

  try {
    const result = await apiCall('/landing-page', 'PUT', landingPageData);
    console.log('✅ Landing page updated successfully');
    return result;
  } catch (error) {
    console.error('❌ Error updating landing page:', error.message);
  }
}

// 3. Create Pages
async function createPages() {
  console.log('📝 Creating Pages...');
  
  const pages = [
    // About Page
    {
      title: 'About Mortgages by Ram',
      slug: 'about',
      description: 'Learn about Ram Singh and the Mortgages by Ram team. Your trusted Toronto mortgage experts.',
      blocks: [
        {
          __component: 'blocks.hero',
          heading: 'About Mortgages by Ram',
          text: 'Your trusted partner in Toronto real estate and mortgage solutions',
          links: []
        },
        {
          __component: 'blocks.content-with-image',
          heading: 'Our Story',
          content: 'With over 8 years of experience in Toronto\'s mortgage industry, I\'ve helped hundreds of families and investors secure their dream homes. My approach combines market expertise with personalized service to deliver the best possible outcomes for my clients.\n\nI believe in building long-term relationships and helping clients succeed over the next 30 years, not just making a quick transaction.',
          imagePosition: 'right'
        },
        {
          __component: 'blocks.section-heading',
          subHeading: 'Our Mission',
          heading: 'Helping First-Time Buyers Build Wealth'
        },
        {
          __component: 'blocks.markdown',
          content: '## Why Choose Us?\n\n- **Licensed & Certified** - Mortgage Lic #M21004312, FSRA #12403\n- **Access to 50+ Lenders** - We shop the best rate for you\n- **Personalized Service** - From application to closing\n- **Toronto Market Expertise** - Deep local knowledge\n- **Exclusive Grow Nation** - Wealth-building community for clients'
        }
      ]
    },
    
    // Contact Page
    {
      title: 'Contact Us',
      slug: 'contact',
      description: 'Get in touch with Mortgages by Ram. Book your free consultation today.',
      blocks: [
        {
          __component: 'blocks.hero',
          heading: 'Book Your Free Consultation',
          text: 'Ready to start your homeownership journey? Let\'s talk about your goals and create a personalized mortgage plan.',
          links: []
        },
        {
          __component: 'blocks.markdown',
          content: '## Get In Touch\n\n### Office Hours\nMonday - Friday: 9:00 AM - 7:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: By Appointment\n\n### Contact Information\n📧 Email: ram@mortgagesbyram.com\n📱 Phone: (416) 555-0123\n📍 Location: Toronto, ON\n\n### Book a Call\nSchedule your free consultation using our online booking system. We\'ll discuss your situation, answer your questions, and create a personalized plan.\n\n[Book Appointment →](/book-appointment)'
        }
      ]
    },
    
    // First-Time Buyers Page
    {
      title: 'First-Time Home Buyers',
      slug: 'first-time-buyers',
      description: 'Expert mortgage guidance for first-time home buyers in Toronto. Get pre-approved and start your homeownership journey.',
      blocks: [
        {
          __component: 'blocks.hero',
          heading: 'First-Time Home Buyer Experts',
          text: 'Navigate the home buying process with confidence. Get pre-approved, understand your budget, and secure your first home with expert guidance.',
          links: [
            { label: 'Book Consultation', href: '/pages/contact', isExternal: false }
          ]
        },
        {
          __component: 'blocks.section-heading',
          subHeading: 'How We Help',
          heading: 'Your Step-by-Step Journey to Homeownership'
        },
        {
          __component: 'blocks.markdown',
          content: '## The Process\n\n### Step 1: Free Consultation\nWe\'ll discuss your goals, budget, and timeline.\n\n### Step 2: Pre-Approval\nGet pre-approved to know exactly what you can afford.\n\n### Step 3: House Hunting\nWork with our network of trusted realtors.\n\n### Step 4: Mortgage Application\nWe handle all the paperwork and shop 50+ lenders.\n\n### Step 5: Close Your Home\nMove into your dream home with confidence.\n\n### Step 6: Join Grow Nation\nAccess exclusive wealth-building resources.'
        }
      ]
    },
    
    // Refinancing Page
    {
      title: 'Refinancing Solutions',
      slug: 'refinancing',
      description: 'Lower your payments, consolidate debt, or access home equity with refinancing solutions from Mortgages by Ram.',
      blocks: [
        {
          __component: 'blocks.hero',
          heading: 'Refinancing Solutions',
          text: 'Lower your monthly payments, consolidate debt, or access home equity. Find the best refinancing options tailored to your financial goals.',
          links: [
            { label: 'Check Your Options', href: '/pages/contact', isExternal: false }
          ]
        },
        {
          __component: 'blocks.markdown',
          content: '## Why Refinance?\n\n- **Lower Interest Rates** - Save thousands over the life of your mortgage\n- **Debt Consolidation** - Combine high-interest debts into one lower payment\n- **Access Equity** - Use your home equity for renovations or investments\n- **Change Terms** - Adjust your mortgage term to fit your current situation'
        }
      ]
    },
    
    // Investment Properties Page
    {
      title: 'Investment Properties',
      slug: 'investment-properties',
      description: 'Build your real estate portfolio with competitive investment property mortgage rates and expert guidance.',
      blocks: [
        {
          __component: 'blocks.hero',
          heading: 'Investment Property Mortgages',
          text: 'Build your real estate portfolio with competitive investment property mortgage rates. Expert advice for both new and experienced investors.',
          links: [
            { label: 'Start Investing', href: '/pages/contact', isExternal: false }
          ]
        },
        {
          __component: 'blocks.markdown',
          content: '## Building Wealth Through Real Estate\n\nI spend thousands of dollars educating myself on real estate investing so I can make more money for my clients over the next 3 decades.\n\n### Investment Strategies\n- **Single-Family Rentals** - Start small and scale up\n- **Multi-Unit Properties** - Maximize cash flow\n- **Pre-Construction** - Get in early on appreciation\n- **Fix and Flip** - Short-term profit opportunities'
        }
      ]
    },
    
    // Commercial Mortgages Page
    {
      title: 'Commercial Mortgages',
      slug: 'commercial-mortgages',
      description: 'Secure financing for your business property needs with expert commercial mortgage solutions.',
      blocks: [
        {
          __component: 'blocks.hero',
          heading: 'Commercial Mortgages',
          text: 'Secure financing for your business property needs. From small commercial spaces to large developments, we have the solutions.',
          links: [
            { label: 'Get Started', href: '/pages/contact', isExternal: false }
          ]
        }
      ]
    },
    
    // Privacy Policy Page
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      description: 'Privacy policy for Mortgages by Ram',
      blocks: [
        {
          __component: 'blocks.markdown',
          content: '# Privacy Policy\n\nLast updated: October 2025\n\n## Information We Collect\n\nWe collect information that you provide directly to us, including name, email address, phone number, and financial information necessary for mortgage applications.\n\n## How We Use Your Information\n\nWe use the information we collect to process your mortgage application, provide customer service, and send you updates about your application.\n\n## Information Security\n\nWe implement appropriate security measures to protect your personal information.'
        }
      ]
    },
    
    // Terms of Service Page
    {
      title: 'Terms of Service',
      slug: 'terms-of-service',
      description: 'Terms of service for Mortgages by Ram',
      blocks: [
        {
          __component: 'blocks.markdown',
          content: '# Terms of Service\n\nLast updated: October 2025\n\n## Agreement to Terms\n\nBy accessing our website, you agree to be bound by these terms of service.\n\n## Use License\n\nPermission is granted to temporarily access the materials on this website for personal, non-commercial use only.'
        }
      ]
    },
    
    // Disclaimer Page
    {
      title: 'Disclaimer',
      slug: 'disclaimer',
      description: 'Legal disclaimer for Mortgages by Ram',
      blocks: [
        {
          __component: 'blocks.markdown',
          content: '# Disclaimer\n\nLast updated: October 2025\n\n## Mortgage Rates\n\nMortgage rates are subject to change without notice. Rates shown are for informational purposes only.\n\n## Licensed Agent\n\nRam Singh is a licensed mortgage agent. License #M21004312. FSRA #12403.\n\n## Professional Advice\n\nThe information provided on this website is for general informational purposes only and should not be considered as professional financial advice.'
        }
      ]
    }
  ];

  for (const page of pages) {
    try {
      // Check if page exists
      const existing = await apiCall(`/pages?filters[slug][$eq]=${page.slug}`);
      
      if (existing.data && existing.data.length > 0) {
        // Update existing page
        await apiCall(`/pages/${existing.data[0].id}`, 'PUT', page);
        console.log(`✅ Updated page: ${page.title}`);
      } else {
        // Create new page
        await apiCall('/pages', 'POST', page);
        console.log(`✅ Created page: ${page.title}`);
      }
    } catch (error) {
      console.error(`❌ Error with page ${page.title}:`, error.message);
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting Mortgage Website Content Update...\n');
  
  if (API_TOKEN === 'YOUR_API_TOKEN_HERE') {
    console.error('❌ Please set your API_TOKEN in the script first!');
    console.log('\nTo get your API token:');
    console.log('1. Go to http://localhost:1337/admin');
    console.log('2. Settings → API Tokens');
    console.log('3. Create New API Token with "Full access"');
    console.log('4. Copy the token and paste it in this script\n');
    process.exit(1);
  }
  
  try {
    await updateGlobalSettings();
    await updateLandingPage();
    await createPages();
    
    console.log('\n✅ All content updated successfully!');
    console.log('\n📱 Next steps:');
    console.log('1. Visit http://localhost:5173 to see your updated website');
    console.log('2. Go to http://localhost:1337/admin to manage content');
    console.log('3. Publish any draft content in Strapi');
  } catch (error) {
    console.error('\n❌ Error during update:', error);
    process.exit(1);
  }
}

main();

