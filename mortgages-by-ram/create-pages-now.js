#!/usr/bin/env node

const STRAPI_URL = 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

const headers = {
  'Content-Type': 'application/json',
};

async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      console.error(`API Error (${response.status}):`, JSON.stringify(data, null, 2));
      return null;
    }

    return data;
  } catch (error) {
    console.error('Request error:', error.message);
    return null;
  }
}

async function createAboutPage() {
  console.log('Creating About page...');

  const result = await apiRequest('/pages', 'POST', {
    data: {
      title: 'About Ram Singh',
      slug: 'about',
      description: 'Meet Ram Singh, your trusted Toronto mortgage agent with years of experience helping families achieve their homeownership dreams.',
      publishedAt: new Date().toISOString(),
      blocks: [
        {
          __component: 'blocks.hero',
          heading: 'Your Trusted Mortgage Partner in Toronto',
          text: 'With over 10 years of experience in the mortgage industry, Ram Singh has helped hundreds of families, first-time buyers, and investors secure the best mortgage solutions tailored to their unique needs.',
          image: null,
          links: [
            {
              href: '/pages/contact',
              label: 'Get in Touch',
              isExternal: false,
              isButtonLink: true,
              type: 'PRIMARY'
            }
          ]
        },
        {
          __component: 'blocks.section-heading',
          heading: 'Why Choose Ram Singh?',
          subHeading: 'Experience & Expertise'
        },
        {
          __component: 'blocks.card-grid',
          cards: [
            {
              heading: '10+ Years Experience',
              text: 'Over a decade of helping Toronto residents find the perfect mortgage solutions for their needs.'
            },
            {
              heading: 'Personalized Service',
              text: 'Every client gets individual attention and a mortgage strategy tailored to their unique situation.'
            },
            {
              heading: 'Best Rates Guaranteed',
              text: 'Access to over 30+ lenders ensures you get the most competitive rates in the market.'
            },
            {
              heading: 'Licensed & Insured',
              text: 'Fully licensed mortgage agent with comprehensive professional insurance for your protection.'
            }
          ]
        }
      ]
    }
  });

  if (result) {
    console.log('✅ About page created!');
  }
  return result;
}

async function createContactPage() {
  console.log('Creating Contact page...');

  const result = await apiRequest('/pages', 'POST', {
    data: {
      title: 'Contact Us',
      slug: 'contact',
      description: 'Get in touch with Ram Singh for all your mortgage needs. Book a free consultation today.',
      publishedAt: new Date().toISOString(),
      blocks: [
        {
          __component: 'blocks.section-heading',
          heading: 'Get in Touch',
          subHeading: 'Contact Information'
        },
        {
          __component: 'blocks.card-grid',
          cards: [
            {
              heading: '📞 Phone',
              text: '(416) 555-0123\n\nCall or text for immediate assistance'
            },
            {
              heading: '📧 Email',
              text: 'ram@mortgagesbyram.ca\n\nGet a response within 24 hours'
            },
            {
              heading: '🕐 Office Hours',
              text: 'Monday - Friday: 9 AM - 6 PM\nSaturday: 10 AM - 4 PM\nSunday: By Appointment'
            },
            {
              heading: '📍 Location',
              text: 'Greater Toronto Area\n\nServing all of Toronto and surrounding regions'
            }
          ]
        }
      ]
    }
  });

  if (result) {
    console.log('✅ Contact page created!');
  }
  return result;
}

async function createTestimonialsPage() {
  console.log('Creating Testimonials page...');

  const result = await apiRequest('/pages', 'POST', {
    data: {
      title: 'Client Success Stories',
      slug: 'testimonials',
      description: 'Read what our satisfied clients have to say about their experience working with Ram Singh.',
      publishedAt: new Date().toISOString(),
      blocks: [
        {
          __component: 'blocks.section-heading',
          heading: 'What Our Clients Say',
          subHeading: 'Success Stories'
        },
        {
          __component: 'blocks.card-grid',
          cards: [
            {
              heading: 'Sarah & Michael T.',
              text: '"Ram made our first home purchase so easy! He explained everything clearly and found us an amazing rate. We couldn\'t have done it without him!" ⭐⭐⭐⭐⭐'
            },
            {
              heading: 'Jennifer L.',
              text: '"I saved over $300/month by refinancing with Ram\'s help. His expertise saved us thousands!" ⭐⭐⭐⭐⭐'
            },
            {
              heading: 'David T.',
              text: '"As an investor, I\'ve worked with Ram on multiple properties. His knowledge is unmatched!" ⭐⭐⭐⭐⭐'
            },
            {
              heading: 'The Patel Family',
              text: '"Ram went above and beyond to help us get into our dream home. Highly recommended!" ⭐⭐⭐⭐⭐'
            },
            {
              heading: 'Lisa M.',
              text: '"Getting a mortgage as self-employed seemed impossible until I met Ram!" ⭐⭐⭐⭐⭐'
            },
            {
              heading: 'James & Emily C.',
              text: '"From pre-approval to closing, Ram was there every step. Completely stress-free!" ⭐⭐⭐⭐⭐'
            }
          ]
        }
      ]
    }
  });

  if (result) {
    console.log('✅ Testimonials page created!');
  }
  return result;
}

async function main() {
  console.log('\n🚀 Creating Missing Pages...\n');

  await createAboutPage();
  await createContactPage();
  await createTestimonialsPage();

  console.log('\n✅ Setup complete!\n');
  console.log('Visit your new pages:');
  console.log('  • http://localhost:5174/pages/about');
  console.log('  • http://localhost:5174/pages/contact');
  console.log('  • http://localhost:5174/pages/testimonials\n');
}

main();
