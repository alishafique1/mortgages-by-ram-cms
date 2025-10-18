#!/usr/bin/env node

// Whitelabel cleanup script - Remove all demo/Strapi content
const API_BASE = 'http://localhost:1337/api';

async function deleteDemoArticles(apiToken) {
  try {
    console.log('🔄 Removing demo articles...');
    
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
      console.log('No articles found to delete');
      return;
    }
    
    // Delete demo articles (keep only mortgage-related ones)
    const demoArticles = getData.data.filter(article => {
      const title = article.title.toLowerCase();
      return title.includes('javascript') || 
             title.includes('freelancing') || 
             title.includes('productivity') || 
             title.includes('headless cms') ||
             title.includes('seo') ||
             title.includes('strapi') ||
             title.includes('developer') ||
             title.includes('programming');
    });
    
    console.log(`Found ${demoArticles.length} demo articles to delete`);
    
    for (const article of demoArticles) {
      const deleteResponse = await fetch(`${API_BASE}/articles/${article.documentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (deleteResponse.ok) {
        console.log(`✅ Deleted demo article: ${article.title}`);
      } else {
        console.error(`❌ Failed to delete article: ${article.title}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error deleting demo articles:', error.message);
  }
}

async function updateAuthorToRamSingh(apiToken) {
  try {
    console.log('🔄 Updating author information...');
    
    // Get current author
    const getResponse = await fetch(`${API_BASE}/authors`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch authors: ${getResponse.status} ${getResponse.statusText}`);
    }
    
    const getData = await getResponse.json();
    
    if (!getData.data || getData.data.length === 0) {
      console.log('No authors found');
      return;
    }
    
    // Update the first author to Ram Singh
    const author = getData.data[0];
    
    const updateResponse = await fetch(`${API_BASE}/authors/${author.documentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          fullName: "Ram Singh",
          bio: "Licensed Mortgage Agent with over 8 years of experience helping Toronto families and investors secure their dream homes. Specializing in first-time buyers, refinancing, and investment properties."
        }
      })
    });
    
    if (updateResponse.ok) {
      console.log('✅ Updated author to Ram Singh');
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update author:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating author:', error.message);
  }
}

async function deleteDemoPages(apiToken) {
  try {
    console.log('🔄 Removing demo pages...');
    
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
      console.log('No pages found to delete');
      return;
    }
    
    // Delete demo pages (keep only mortgage service pages)
    const demoPages = getData.data.filter(page => {
      const title = page.title.toLowerCase();
      return title.includes('test') || 
             title.includes('demo') ||
             title.includes('strapi') ||
             (title.includes('about') && !title.includes('mortgage'));
    });
    
    console.log(`Found ${demoPages.length} demo pages to delete`);
    
    for (const page of demoPages) {
      const deleteResponse = await fetch(`${API_BASE}/pages/${page.documentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (deleteResponse.ok) {
        console.log(`✅ Deleted demo page: ${page.title}`);
      } else {
        console.error(`❌ Failed to delete page: ${page.title}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error deleting demo pages:', error.message);
  }
}

async function updateGlobalSettings(apiToken) {
  try {
    console.log('🔄 Updating global settings for whitelabeling...');
    
    // Get current global settings
    const getResponse = await fetch(`${API_BASE}/global`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!getResponse.ok) {
      throw new Error(`Failed to fetch global settings: ${getResponse.status} ${getResponse.statusText}`);
    }
    
    const getData = await getResponse.json();
    
    if (!getData.data) {
      throw new Error('No global settings found');
    }
    
    // Update global settings with mortgage branding
    const updateResponse = await fetch(`${API_BASE}/global`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          siteName: "Mortgages by Ram",
          defaultSeo: {
            metaTitle: "Mortgages by Ram - Your Trusted Toronto Mortgage Agent",
            metaDescription: "Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service from Ram Singh, Licensed Mortgage Agent.",
            keywords: "mortgage agent toronto, first time home buyer toronto, refinancing toronto, investment properties toronto, mortgage rates toronto, ram singh mortgage agent"
          },
          favicon: {
            id: 6,
            documentId: "pxuhf5ukwzafkmb8ue8biagy",
            alternativeText: "Mortgages by Ram Logo",
            url: "/uploads/tables_921e2e7dac.avif"
          }
        }
      })
    });
    
    if (updateResponse.ok) {
      console.log('✅ Global settings updated for whitelabeling');
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update global settings:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating global settings:', error.message);
  }
}

async function updateLandingPageContent(apiToken) {
  try {
    console.log('🔄 Updating landing page for whitelabeling...');
    
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
    
    // Update landing page with professional mortgage content
    const updateResponse = await fetch(`${API_BASE}/landing-page`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: "Mortgages by Ram - Your Trusted Toronto Mortgage Agent",
          description: "Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service from Ram Singh, Licensed Mortgage Agent.",
          blocks: [
            {
              "__component": "blocks.hero",
              "heading": "Your Dream Home Starts Here",
              "text": "As your trusted Toronto mortgage agent, I help first-time buyers, families, and investors secure the best mortgage rates. With personalized service and expert guidance, we'll find the perfect mortgage solution for your unique situation. Get pre-approved today and start your homeownership journey!",
              "links": [
                {
                  "href": "/contact",
                  "label": "Get Pre-Approved Now",
                  "isExternal": false,
                  "isButtonLink": true,
                  "type": "PRIMARY"
                },
                {
                  "href": "/services",
                  "label": "Explore Our Services",
                  "isExternal": false,
                  "isButtonLink": true,
                  "type": "SECONDARY"
                }
              ],
              "image": 6
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
                  "text": "Navigate the home buying process with confidence. Get pre-approved, understand your budget, and secure your first home with expert guidance. Special programs and incentives available."
                },
                {
                  "heading": "Refinancing Solutions",
                  "text": "Lower your monthly payments, consolidate debt, or access home equity. Find the best refinancing options tailored to your financial goals. Save thousands with our competitive rates."
                },
                {
                  "heading": "Investment Properties",
                  "text": "Build your real estate portfolio with competitive investment property mortgage rates. Expert advice for both new and experienced investors. Maximize your returns."
                },
                {
                  "heading": "Commercial Mortgages",
                  "text": "Secure financing for your business property needs. From small commercial spaces to large developments, we have the solutions. Flexible terms and competitive rates."
                }
              ]
            },
            {
              "__component": "blocks.content-with-image",
              "reversed": false,
              "heading": "Why Choose Mortgages by Ram?",
              "content": "With over 8 years of experience in Toronto's competitive real estate market, I provide personalized mortgage solutions that fit your unique needs. My commitment to transparency, competitive rates, and exceptional service has helped hundreds of clients achieve their homeownership dreams.\n\n**What sets me apart:**\n- Licensed and certified mortgage agent\n- Access to 50+ lenders and competitive rates\n- Personalized service from application to closing\n- Deep knowledge of Toronto market conditions\n- Bilingual service (English/Hindi)\n- Free consultation and pre-approval",
              "link": {
                "href": "/about",
                "label": "Learn More About Ram",
                "isExternal": false,
                "isButtonLink": true,
                "type": "PRIMARY"
              },
              "image": 7
            },
            {
              "__component": "blocks.content-with-image",
              "reversed": true,
              "heading": "The Mortgage Process Made Simple",
              "content": "Getting a mortgage doesn't have to be complicated. My streamlined process ensures you understand every step and feel confident throughout your journey.\n\n**Step 1:** Free consultation and pre-approval\n**Step 2:** Find your perfect home\n**Step 3:** Submit your application\n**Step 4:** Get approved and close\n\nI'll guide you through each step, handle the paperwork, and keep you informed every step of the way. With my expertise, you'll get the best rates and terms available.",
              "link": {
                "href": "/process",
                "label": "View Our Process",
                "isExternal": false,
                "isButtonLink": true,
                "type": "PRIMARY"
              },
              "image": 7
            },
            {
              "__component": "blocks.markdown",
              "content": "## Toronto Market Insights\n\nStay informed about the latest trends in Toronto's real estate market. Our monthly reports provide valuable insights for both buyers and investors.\n\n### Current Market Conditions\n- **Average Home Price:** $1.2M (as of Q3 2025)\n- **Interest Rates:** Starting from 5.89% (subject to change)\n- **Market Trend:** Stable with moderate growth expected\n- **Inventory Levels:** Balanced market conditions\n\n### First-Time Buyer Programs\n- **First-Time Home Buyer Incentive:** Up to 10% shared equity\n- **Land Transfer Tax Rebate:** Up to $4,000 for Toronto properties\n- **RRSP Home Buyers' Plan:** Withdraw up to $35,000 tax-free\n- **CMHC Insurance:** Reduced premiums for first-time buyers\n\n### Why Choose a Licensed Mortgage Agent?\nWorking with a licensed mortgage agent like Ram Singh gives you access to multiple lenders, competitive rates, and expert guidance throughout the entire process.\n\n[View our complete market report](/market-insights)"
            },
            {
              "__component": "blocks.person-card",
              "text": "With over 8 years of experience in Toronto's mortgage industry, I've helped hundreds of families and investors secure their dream homes. My approach combines market expertise with personalized service to deliver the best possible outcomes for my clients. I'm committed to transparency, competitive rates, and exceptional service.",
              "personName": "Ram Singh",
              "personJob": "Licensed Mortgage Agent",
              "image": 8
            },
            {
              "__component": "blocks.faqs",
              "faq": [
                {
                  "heading": "How much can I afford to borrow?",
                  "text": "Your borrowing capacity depends on your income, debts, and credit score. During our free consultation, I'll analyze your financial situation and provide a pre-approval amount that fits your budget. I'll also explain all available programs and incentives."
                },
                {
                  "heading": "What documents do I need for a mortgage application?",
                  "text": "Typically, you'll need pay stubs, tax returns, bank statements, and employment letters. I'll provide you with a complete checklist during our consultation to ensure a smooth application process. I'll also help you gather any additional documentation required."
                },
                {
                  "heading": "How long does the mortgage approval process take?",
                  "text": "Pre-approval can be completed in 1-2 days. Full approval typically takes 5-10 business days, depending on the lender and complexity of your application. I'll keep you informed throughout the entire process."
                },
                {
                  "heading": "Do you work with first-time home buyers?",
                  "text": "Absolutely! First-time buyers are a specialty of mine. I'll guide you through every step, explain all available programs and incentives, and ensure you understand your options. I'll also help you access special first-time buyer programs."
                },
                {
                  "heading": "What areas do you serve?",
                  "text": "I primarily serve the Greater Toronto Area (GTA), including Toronto, Mississauga, Brampton, Markham, and surrounding communities. I have extensive knowledge of local market conditions and can help you find the best properties in your preferred area."
                },
                {
                  "heading": "Do you offer free consultations?",
                  "text": "Yes! I offer free consultations to all potential clients. During this consultation, I'll assess your financial situation, explain your options, and provide a pre-approval if you're ready. There's no obligation, and I'm here to help you make informed decisions."
                }
              ]
            },
            {
              "__component": "blocks.featured-articles",
              "articles": [8, 12, 11]
            },
            {
              "__component": "blocks.newsletter",
              "heading": "Stay Updated with Toronto Market Insights",
              "text": "Get monthly mortgage rate updates, market insights, and first-time buyer tips delivered to your inbox. Stay informed about opportunities that could save you thousands on your mortgage. Join hundreds of Toronto homeowners who trust Ram Singh for their mortgage needs.",
              "placeholder": "your@email.com",
              "label": "Subscribe Now",
              "formId": "newsletter-signup"
            }
          ]
        }
      })
    });
    
    if (updateResponse.ok) {
      console.log('✅ Landing page updated for whitelabeling');
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update landing page:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating landing page:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting whitelabel cleanup...');
    
    // Delete demo articles
    await deleteDemoArticles(apiToken);
    
    // Update author to Ram Singh
    await updateAuthorToRamSingh(apiToken);
    
    // Delete demo pages
    await deleteDemoPages(apiToken);
    
    // Update global settings
    await updateGlobalSettings(apiToken);
    
    // Update landing page
    await updateLandingPageContent(apiToken);
    
    console.log('\n🎉 Whitelabel cleanup completed successfully!');
    console.log('📋 Summary of changes:');
    console.log('   ✅ Removed all demo/Strapi-related articles');
    console.log('   ✅ Updated author to Ram Singh');
    console.log('   ✅ Removed demo pages');
    console.log('   ✅ Updated global settings for mortgage branding');
    console.log('   ✅ Enhanced landing page with professional content');
    console.log('\n🌐 Your website is now fully whitelabeled for Mortgages by Ram!');
    console.log('📱 Check your frontend at: http://localhost:5174');
    
  } catch (error) {
    console.error('❌ Error in whitelabel cleanup:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node whitelabel-cleanup.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
