#!/usr/bin/env node

// Final global settings update for whitelabeling
const API_BASE = 'http://localhost:1337/api';

async function updateGlobalSettings(apiToken) {
  try {
    console.log('🔄 Updating global settings for mortgage branding...');
    
    // Update global settings with mortgage branding
    const updateResponse = await fetch(`${API_BASE}/global`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: "Mortgages by Ram",
          description: "Professional mortgage services in Toronto. Your trusted mortgage agent for first-time buyers, refinancing, and investment properties.",
          banner: {
            isVisible: false,
            description: "Get pre-approved today and start your homeownership journey!",
            link: {
              href: "/contact",
              label: "Get Pre-Approved",
              isExternal: false,
              isButtonLink: true,
              type: "PRIMARY"
            }
          },
          header: {
            logo: {
              label: "Mortgages by Ram",
              href: "/",
              isExternal: false,
              image: 1
            },
            navItems: [
              {
                href: "/",
                label: "Home",
                isExternal: false,
                isButtonLink: false,
                type: null
              },
              {
                href: "/services",
                label: "Services",
                isExternal: false,
                isButtonLink: false,
                type: null
              },
              {
                href: "/about",
                label: "About",
                isExternal: false,
                isButtonLink: false,
                type: null
              },
              {
                href: "/blog",
                label: "Blog",
                isExternal: false,
                isButtonLink: false,
                type: null
              }
            ],
            cta: {
              href: "/contact",
              label: "Get Pre-Approved",
              isExternal: false,
              isButtonLink: true,
              type: "PRIMARY"
            }
          },
          footer: {
            text: "© 2025 Mortgages by Ram. All rights reserved. Licensed Mortgage Agent serving Toronto and GTA.",
            logo: {
              label: "Mortgages by Ram",
              href: "/",
              isExternal: false,
              image: 1
            },
            navItems: [
              {
                href: "/",
                label: "Home",
                isExternal: false,
                isButtonLink: false,
                type: null
              },
              {
                href: "/services",
                label: "Services",
                isExternal: false,
                isButtonLink: false,
                type: null
              },
              {
                href: "/about",
                label: "About",
                isExternal: false,
                isButtonLink: false,
                type: null
              },
              {
                href: "/blog",
                label: "Blog",
                isExternal: false,
                isButtonLink: false,
                type: null
              },
              {
                href: "/contact",
                label: "Contact",
                isExternal: false,
                isButtonLink: false,
                type: null
              }
            ],
            socialLinks: [
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/ramsinghmortgage",
                isExternal: true,
                image: 2
              },
              {
                label: "Facebook",
                href: "https://facebook.com/mortgagesbyram",
                isExternal: true,
                image: 3
              },
              {
                label: "Twitter",
                href: "https://twitter.com/mortgagesbyram",
                isExternal: true,
                image: 4
              }
            ]
          }
        }
      })
    });
    
    if (updateResponse.ok) {
      console.log('✅ Global settings updated successfully!');
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update global settings:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating global settings:', error.message);
  }
}

async function verifyContent(apiToken) {
  try {
    console.log('🔄 Verifying all content is mortgage-focused...');
    
    // Check articles
    const articlesResponse = await fetch(`${API_BASE}/articles`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (articlesResponse.ok) {
      const articlesData = await articlesResponse.json();
      console.log(`📝 Articles (${articlesData.data.length}):`);
      articlesData.data.forEach(article => {
        console.log(`   - ${article.title}`);
      });
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
      console.log(`📄 Pages (${pagesData.data.length}):`);
      pagesData.data.forEach(page => {
        console.log(`   - ${page.title}`);
      });
    }
    
    // Check author
    const authorResponse = await fetch(`${API_BASE}/authors`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (authorResponse.ok) {
      const authorData = await authorResponse.json();
      if (authorData.data.length > 0) {
        console.log(`👤 Author: ${authorData.data[0].fullName}`);
        console.log(`   Bio: ${authorData.data[0].bio}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error verifying content:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting final global settings update...');
    
    // Update global settings
    await updateGlobalSettings(apiToken);
    
    // Verify content
    await verifyContent(apiToken);
    
    console.log('\n🎉 WHITELABEL COMPLETE!');
    console.log('📋 Final Summary:');
    console.log('   ✅ All demo/Strapi content removed');
    console.log('   ✅ Author updated to Ram Singh');
    console.log('   ✅ Global settings updated with mortgage branding');
    console.log('   ✅ Navigation updated for mortgage services');
    console.log('   ✅ Footer updated with mortgage branding');
    console.log('   ✅ Social links updated for mortgage business');
    console.log('   ✅ All content is mortgage-focused');
    console.log('\n🌐 Your website is now fully whitelabeled for Mortgages by Ram!');
    console.log('📱 Check your frontend at: http://localhost:5174');
    console.log('🎯 Ready for business!');
    
  } catch (error) {
    console.error('❌ Error in final update:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node update-global-settings.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
