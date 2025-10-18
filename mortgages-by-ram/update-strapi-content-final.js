#!/usr/bin/env node

// Complete Strapi API update script for landing page content (without IDs)
const API_BASE = 'http://localhost:1337/api';

// Updated blocks without IDs (Strapi will handle ID assignment)
const updatedBlocks = [
  {
    "__component": "blocks.hero",
    "heading": "Your Dream Home Starts Here",
    "text": "As your trusted Toronto mortgage agent, I help first-time buyers, families, and investors secure the best mortgage rates. With personalized service and expert guidance, we'll find the perfect mortgage solution for your unique situation.",
    "links": [
      {
        "href": "/contact",
        "label": "Get Pre-Approved",
        "isExternal": false,
        "isButtonLink": true,
        "type": "PRIMARY"
      },
      {
        "href": "/services",
        "label": "View Services",
        "isExternal": false,
        "isButtonLink": true,
        "type": "SECONDARY"
      }
    ],
    "image": {
      "id": 6,
      "documentId": "pxuhf5ukwzafkmb8ue8biagy",
      "alternativeText": "Professional mortgage consultation",
      "url": "/uploads/tables_921e2e7dac.avif"
    }
  },
  {
    "__component": "blocks.section-heading",
    "subHeading": "Professional Mortgage Services",
    "heading": "Your Toronto Mortgage Expert",
    "anchorLink": "services"
  },
  {
    "__component": "blocks.card-grid",
    "cards": [
      {
        "heading": "First-Time Home Buyers",
        "text": "Navigate the home buying process with confidence. Get pre-approved, understand your budget, and secure your first home with expert guidance."
      },
      {
        "heading": "Refinancing Solutions",
        "text": "Lower your monthly payments, consolidate debt, or access home equity. Find the best refinancing options tailored to your financial goals."
      },
      {
        "heading": "Investment Properties",
        "text": "Build your real estate portfolio with competitive investment property mortgage rates. Expert advice for both new and experienced investors."
      },
      {
        "heading": "Commercial Mortgages",
        "text": "Secure financing for your business property needs. From small commercial spaces to large developments, we have the solutions."
      }
    ]
  },
  {
    "__component": "blocks.content-with-image",
    "reversed": false,
    "heading": "Why Choose Mortgages by Ram?",
    "content": "With years of experience in Toronto's competitive real estate market, I provide personalized mortgage solutions that fit your unique needs. My commitment to transparency, competitive rates, and exceptional service has helped hundreds of clients achieve their homeownership dreams.\n\n**What sets me apart:**\n- Licensed and certified mortgage agent\n- Access to 50+ lenders and competitive rates\n- Personalized service from application to closing\n- Deep knowledge of Toronto market conditions\n- Bilingual service (English/Hindi)",
    "link": {
      "href": "/about",
      "label": "Learn More About Ram",
      "isExternal": false,
      "isButtonLink": true,
      "type": "PRIMARY"
    },
    "image": {
      "id": 7,
      "documentId": "m6k376b2oa58vg2dnu5lsv0i",
      "alternativeText": "Mortgage consultation",
      "url": "/uploads/forest_562bafce29.avif"
    }
  },
  {
    "__component": "blocks.content-with-image",
    "reversed": true,
    "heading": "The Mortgage Process Made Simple",
    "content": "Getting a mortgage doesn't have to be complicated. My streamlined process ensures you understand every step and feel confident throughout your journey.\n\n**Step 1:** Free consultation and pre-approval\n**Step 2:** Find your perfect home\n**Step 3:** Submit your application\n**Step 4:** Get approved and close\n\nI'll guide you through each step, handle the paperwork, and keep you informed every step of the way.",
    "link": {
      "href": "/process",
      "label": "View Our Process",
      "isExternal": false,
      "isButtonLink": true,
      "type": "PRIMARY"
    },
    "image": {
      "id": 7,
      "documentId": "m6k376b2oa58vg2dnu5lsv0i",
      "alternativeText": "Mortgage process",
      "url": "/uploads/forest_562bafce29.avif"
    }
  },
  {
    "__component": "blocks.markdown",
    "content": "## Toronto Market Insights\n\nStay informed about the latest trends in Toronto's real estate market. Our monthly reports provide valuable insights for both buyers and investors.\n\n### Current Market Conditions\n- **Average Home Price:** $1.2M (as of Q3 2025)\n- **Interest Rates:** Starting from 5.89% (subject to change)\n- **Market Trend:** Stable with moderate growth expected\n\n### First-Time Buyer Programs\n- **First-Time Home Buyer Incentive:** Up to 10% shared equity\n- **Land Transfer Tax Rebate:** Up to $4,000 for Toronto properties\n- **RRSP Home Buyers' Plan:** Withdraw up to $35,000 tax-free\n\n[View our complete market report](/market-insights)"
  },
  {
    "__component": "blocks.person-card",
    "text": "With over 8 years of experience in Toronto's mortgage industry, I've helped hundreds of families and investors secure their dream homes. My approach combines market expertise with personalized service to deliver the best possible outcomes for my clients.",
    "personName": "Ram Singh",
    "personJob": "Licensed Mortgage Agent",
    "image": {
      "id": 8,
      "documentId": "uka7pcf3dw7yczakvaj6dv3o",
      "alternativeText": "Ram Singh - Licensed Mortgage Agent",
      "url": "/uploads/image_of_women_fa698d5653.avif"
    }
  },
  {
    "__component": "blocks.faqs",
    "faq": [
      {
        "heading": "How much can I afford to borrow?",
        "text": "Your borrowing capacity depends on your income, debts, and credit score. During our free consultation, I'll analyze your financial situation and provide a pre-approval amount that fits your budget."
      },
      {
        "heading": "What documents do I need for a mortgage application?",
        "text": "Typically, you'll need pay stubs, tax returns, bank statements, and employment letters. I'll provide you with a complete checklist during our consultation to ensure a smooth application process."
      },
      {
        "heading": "How long does the mortgage approval process take?",
        "text": "Pre-approval can be completed in 1-2 days. Full approval typically takes 5-10 business days, depending on the lender and complexity of your application."
      },
      {
        "heading": "Do you work with first-time home buyers?",
        "text": "Absolutely! First-time buyers are a specialty of mine. I'll guide you through every step, explain all available programs and incentives, and ensure you understand your options."
      },
      {
        "heading": "What areas do you serve?",
        "text": "I primarily serve the Greater Toronto Area (GTA), including Toronto, Mississauga, Brampton, Markham, and surrounding communities."
      }
    ]
  },
  {
    "__component": "blocks.featured-articles",
    "articles": [
      {
        "id": 8,
        "documentId": "fmjuxr3ozv8do24axvya9okf",
        "title": "How to Get Started with Freelancing as a Developer",
        "description": "Freelancing as a developer is an exciting path that offers independence and financial growth. However, getting started can feel overwhelming without proper guidance. By focusing on key areas like skill development, networking, and client acquisition, you can establish a successful freelancing career.\n",
        "slug": "how-to-get-started-with-freelancing-as-a-developer",
        "content": "## Introduction\nFreelancing as a developer is an exciting path that offers independence and financial growth. However, getting started can feel overwhelming without proper guidance. By focusing on key areas like skill development, networking, and client acquisition, you can establish a successful freelancing career.\n\n## Building a Strong Portfolio\nYour portfolio is your strongest asset as a freelancer. Instead of listing skills, showcase projects that demonstrate your capabilities. Consider building personal projects, contributing to open source, or offering pro bono work to gain experience. A well-presented portfolio builds trust with potential clients.\n\n## Finding Clients\nSecuring clients is one of the biggest challenges for freelancers. Platforms like Upwork, Fiverr, and Toptal can be good starting points. However, building relationships through networking, LinkedIn, and referrals often leads to higher-quality projects. Consistently marketing your services will help you land better opportunities.\n\n## Conclusion\nFreelancing requires dedication, but the rewards can be significant. By developing a strong portfolio and actively seeking clients, you can build a sustainable business. Over time, refining your skills and business strategies will lead to greater success and financial stability.\n",
        "createdAt": "2025-08-03T01:12:08.062Z",
        "updatedAt": "2025-08-03T01:17:37.183Z",
        "publishedAt": "2025-08-03T01:17:37.189Z",
        "featuredImage": {
          "id": 7,
          "documentId": "m6k376b2oa58vg2dnu5lsv0i",
          "alternativeText": null,
          "url": "/uploads/forest_562bafce29.avif"
        },
        "author": {
          "id": 2,
          "documentId": "k4510nw2eyzzz0udzxkq0vpm",
          "fullName": "Jacke Brown",
          "bio": "I am a fullstack developer",
          "createdAt": "2025-04-17T11:49:41.391Z",
          "updatedAt": "2025-04-17T11:53:25.177Z",
          "publishedAt": "2025-04-17T11:53:25.183Z"
        }
      },
      {
        "id": 12,
        "documentId": "be9fsxd1j04vgqdsmgq6edsp",
        "title": "How to Improve Your Productivity as a Developer",
        "description": "Developers often struggle with productivity due to distractions, inefficient workflows, and burnout. While coding requires deep focus, managing time effectively can be a challenge. Adopting productivity techniques can significantly enhance your efficiency and work-life balance.",
        "slug": "how-to-improve-your-productivity-as-a-developer",
        "content": "## Introduction\nDevelopers often struggle with productivity due to distractions, inefficient workflows, and burnout. While coding requires deep focus, managing time effectively can be a challenge. Adopting productivity techniques can significantly enhance your efficiency and work-life balance.\n\n## Time Management Techniques\nUsing time management strategies like the Pomodoro Technique or time blocking can help you stay focused. Prioritizing tasks with tools like Notion or Trello ensures you work on high-impact activities first. Eliminating unnecessary meetings and interruptions also boosts productivity.\n\n## Automating Repetitive Tasks\nDevelopers often perform repetitive tasks that can be automated. Writing scripts, using aliases, and leveraging automation tools can save hours of work. Investing time in learning automation early on will pay off in the long run.\n\n## Conclusion\nImproving productivity as a developer requires discipline and the right strategies. By managing time effectively and automating repetitive tasks, you can work smarter, not harder. Implementing these changes can lead to higher efficiency, less stress, and better code quality.",
        "createdAt": "2025-08-03T01:13:44.951Z",
        "updatedAt": "2025-08-03T01:18:30.484Z",
        "publishedAt": "2025-08-03T01:18:30.491Z",
        "featuredImage": {
          "id": 7,
          "documentId": "m6k376b2oa58vg2dnu5lsv0i",
          "alternativeText": null,
          "url": "/uploads/forest_562bafce29.avif"
        },
        "author": {
          "id": 2,
          "documentId": "k4510nw2eyzzz0udzxkq0vpm",
          "fullName": "Jacke Brown",
          "bio": "I am a fullstack developer",
          "createdAt": "2025-04-17T11:49:41.391Z",
          "updatedAt": "2025-04-17T11:53:25.177Z",
          "publishedAt": "2025-04-17T11:53:25.183Z"
        }
      },
      {
        "id": 11,
        "documentId": "k24322xmgy5t7pek85g1gj4h",
        "title": "The Benefits of Headless CMS for Modern Websites",
        "description": "Traditional CMS platforms often impose rigid structures that limit flexibility in web development. However, the rise of headless CMS solutions has revolutionized content management. By decoupling the backend from the frontend, developers can create seamless and dynamic digital experiences.",
        "slug": "the-benefits-of-headless-cms-for-modern-websites",
        "content": "## Introduction\nTraditional CMS platforms often impose rigid structures that limit flexibility in web development. However, the rise of headless CMS solutions has revolutionized content management. By decoupling the backend from the frontend, developers can create seamless and dynamic digital experiences.\n\n## Flexibility and Scalability\nA headless CMS enables developers to deliver content across multiple platforms, including websites, mobile apps, and IoT devices. This flexibility makes it an ideal choice for businesses looking to scale their operations. By using APIs, content can be structured and managed efficiently.\n\n## Performance and Security\nSince the frontend and backend are separate, a headless CMS reduces security risks associated with traditional CMS platforms. Performance is also improved since static site generators can pre-build pages, resulting in faster load times. This leads to a better user experience and higher search rankings.\n\n## Conclusion\nBusinesses adopting a headless CMS gain a competitive edge in digital transformation. The flexibility, scalability, and security it offers make it a compelling choice. Whether you're a developer or a content creator, moving to a headless architecture can significantly enhance your workflow.\n",
        "createdAt": "2025-08-03T01:14:28.652Z",
        "updatedAt": "2025-08-03T01:18:14.495Z",
        "publishedAt": "2025-08-03T01:18:14.503Z",
        "featuredImage": {
          "id": 7,
          "documentId": "m6k376b2oa58vg2dnu5lsv0i",
          "alternativeText": null,
          "url": "/uploads/forest_562bafce29.avif"
        },
        "author": {
          "id": 2,
          "documentId": "k4510nw2eyzzz0udzxkq0vpm",
          "fullName": "Jacke Brown",
          "bio": "I am a fullstack developer",
          "createdAt": "2025-04-17T11:49:41.391Z",
          "updatedAt": "2025-04-17T11:53:25.177Z",
          "publishedAt": "2025-04-17T11:53:25.183Z"
        }
      }
    ]
  },
  {
    "__component": "blocks.newsletter",
    "heading": "Stay Updated with Toronto Market Insights",
    "text": "Get monthly mortgage rate updates, market insights, and first-time buyer tips delivered to your inbox. Stay informed about opportunities that could save you thousands on your mortgage.",
    "placeholder": "your@email.com",
    "label": "Subscribe Now",
    "formId": "newsletter-signup"
  }
];

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
    
    // Update with all blocks
    const updateResponse = await fetch(`${API_BASE}/landing-page`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: "Mortgages by Ram - Your Trusted Toronto Mortgage Agent",
          description: "Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service.",
          blocks: updatedBlocks
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
          'Authorization': `Bearer ${apiToken}`,
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
        console.log('   - FAQ: 5 mortgage questions');
        console.log('   - Newsletter: Market insights signup');
        console.log('\n🌐 Check your frontend at: http://localhost:5174');
        console.log('📱 All content should now be visible on the frontend!');
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
  console.log('Run this script with: node update-strapi-content-final.js YOUR_TOKEN_HERE');
  process.exit(1);
}

updateLandingPageWithAuth(apiToken);
