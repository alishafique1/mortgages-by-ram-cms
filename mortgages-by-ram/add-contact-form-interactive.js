#!/usr/bin/env node

/**
 * Interactive script to add contact form to landing page
 * Run: node add-contact-form-interactive.js
 */

const readline = require('readline');

const STRAPI_URL = 'http://localhost:1337';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function addContactFormWithAuth() {
  try {
    console.log('\n🎯 Add Contact Form to Landing Page\n');
    console.log('This script will add the contact form block to your landing page.');
    console.log('Your hero CTA button will then scroll to it.\n');
    
    const email = await question('Enter your Strapi admin email: ');
    const password = await question('Enter your Strapi admin password: ');
    
    // Step 1: Login
    console.log('\n🔐 Logging in...');
    const loginResponse = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email.trim(),
        password: password.trim()
      })
    });
    
    if (!loginResponse.ok) {
      console.error('\n❌ Login failed. Please check your credentials.');
      console.log('💡 Tip: Use the same credentials you use at http://localhost:1337/admin\n');
      rl.close();
      return;
    }
    
    const loginData = await loginResponse.json();
    const token = loginData.jwt;
    console.log('✅ Logged in successfully\n');
    
    // Step 2: Get landing page
    console.log('📄 Fetching landing page...');
    const getResponse = await fetch(`${STRAPI_URL}/api/landing-page?populate=deep`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const currentData = await getResponse.json();
    
    if (!currentData.data) {
      console.error('❌ Landing page not found');
      rl.close();
      return;
    }
    
    const existingBlocks = currentData.data.blocks || [];
    
    // Check if already exists
    const hasContactForm = existingBlocks.some(block => block.__component === 'blocks.contact-form');
    
    if (hasContactForm) {
      console.log('✅ Contact form already exists on your landing page!');
      console.log('🌐 Refresh http://localhost:5173 and try clicking the hero button\n');
      rl.close();
      return;
    }
    
    // Find position
    const faqIndex = existingBlocks.findIndex(block => block.__component === 'blocks.faqs');
    const insertPosition = faqIndex > -1 ? faqIndex : existingBlocks.length;
    
    // Create contact form block
    const contactFormBlock = {
      __component: 'blocks.contact-form',
      heading: 'Ready to Get Started?',
      subheading: 'Book your free consultation today. We\'ll discuss your goals, review your options, and create a personalized mortgage plan. No cost, no obligation.',
      buttonText: 'Book Your Free Consultation',
      showPhone: true,
      showMessage: true
    };
    
    // Insert it
    const updatedBlocks = [
      ...existingBlocks.slice(0, insertPosition),
      contactFormBlock,
      ...existingBlocks.slice(insertPosition)
    ];
    
    console.log(`📝 Adding contact form at position ${insertPosition + 1} of ${updatedBlocks.length} blocks\n`);
    
    // Step 3: Update
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
      const errorData = await updateResponse.json();
      console.error('❌ Failed to update:', errorData);
      rl.close();
      return;
    }
    
    console.log('✅ SUCCESS! Contact form added to landing page!\n');
    console.log('🎯 What happens now:');
    console.log('   ✓ Hero button "Get Pre-Approved Now" is visible');
    console.log('   ✓ Clicking it smooth scrolls to contact form');
    console.log('   ✓ User can fill out and submit immediately\n');
    console.log('🌐 Refresh http://localhost:5173 to see it in action!\n');
    
    rl.close();
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
  }
}

addContactFormWithAuth();

