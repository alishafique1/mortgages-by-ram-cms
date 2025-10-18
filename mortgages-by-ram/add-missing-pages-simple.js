#!/usr/bin/env node

/**
 * Simple Page Creation Script (Unauthenticated)
 * Creates missing pages: About, Contact, Testimonials
 *
 * Note: This uses the public API. Make sure your Strapi permissions
 * allow public creation of pages, or run this script with an API token.
 */

const STRAPI_URL = 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

// Get API token from command line or environment variable
const API_TOKEN = process.env.STRAPI_API_TOKEN || process.argv[2];

const headers = {
  'Content-Type': 'application/json',
};

if (API_TOKEN && API_TOKEN !== '') {
  headers['Authorization'] = `Bearer ${API_TOKEN}`;
  console.log('✓ Using API token for authentication\n');
} else {
  console.log('⚠️  No API token provided. Attempting without authentication...\n');
  console.log('If this fails, provide token as: node add-missing-pages-simple.js YOUR_TOKEN\n');
}

async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    console.error(`API Error (${response.status}):`, JSON.stringify(data, null, 2));
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return data;
}

async function createAboutPage() {
  console.log('Creating About page...');

  const aboutData = {
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
              text: 'Over a decade of helping Toronto residents find the perfect mortgage solutions for their needs.',
              link: null
            },
            {
              heading: 'Personalized Service',
              text: 'Every client gets individual attention and a mortgage strategy tailored to their unique situation.',
              link: null
            },
            {
              heading: 'Best Rates Guaranteed',
              text: 'Access to over 30+ lenders ensures you get the most competitive rates in the market.',
              link: null
            },
            {
              heading: 'Licensed & Insured',
              text: 'Fully licensed mortgage agent with comprehensive professional insurance for your protection.',
              link: null
            }
          ]
        },
        {
          __component: 'blocks.markdown',
          body: `## My Commitment to You

As your mortgage agent, I'm committed to making your home buying journey as smooth and stress-free as possible. Whether you're a first-time buyer, looking to refinance, or investing in property, I'll be with you every step of the way.

### What Sets Me Apart

- **Transparent Process**: No hidden fees, no surprises. I explain everything in clear, simple terms.
- **Quick Response Times**: Your questions don't wait, and neither do I. Expect prompt responses to all inquiries.
- **Ongoing Support**: My relationship with clients doesn't end at closing. I'm here for all your future mortgage needs.

### Professional Credentials

- Licensed Mortgage Agent (ON)
- Member of the Canadian Mortgage Brokers Association
- Over $100M in mortgage approvals
- 500+ satisfied clients

### Let's Work Together

Ready to start your homeownership journey? Contact me today for a free consultation and let's discuss how I can help you achieve your goals.`
        }
      ]
    }
  };

  try {
    const result = await apiRequest('/pages', 'POST', aboutData);
    console.log('✅ About page created successfully');
    return result;
  } catch (error) {
    console.error('❌ Error creating About page:', error.message);
    return null;
  }
}

async function createContactPage() {
  console.log('Creating Contact page...');

  const contactData = {
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
              text: '(416) 555-0123\n\nCall or text for immediate assistance during business hours',
              link: null
            },
            {
              heading: '📧 Email',
              text: 'ram@mortgagesbyram.ca\n\nGet a response within 24 hours',
              link: null
            },
            {
              heading: '🕐 Office Hours',
              text: 'Monday - Friday: 9 AM - 6 PM\nSaturday: 10 AM - 4 PM\nSunday: By Appointment',
              link: null
            },
            {
              heading: '📍 Location',
              text: 'Greater Toronto Area\n\nServing all of Toronto and surrounding regions',
              link: null
            }
          ]
        },
        {
          __component: 'blocks.markdown',
          body: `## Ready to Get Started?

Schedule a free, no-obligation consultation to discuss your mortgage needs. Whether you're buying your first home, refinancing, or investing in property, I'm here to help.

### What to Expect

1. **Initial Consultation** (30 min): We'll discuss your financial situation and homeownership goals
2. **Pre-Approval** (2-3 days): Get pre-approved to know exactly what you can afford
3. **Finding the Best Rate** (1-2 days): I'll shop around with 30+ lenders to find you the best deal
4. **Application & Approval** (2-4 weeks): I'll handle all the paperwork and guide you through the process
5. **Closing**: Celebrate your success as a homeowner!

### Book Your Free Consultation

Contact me today using any of the methods above. I look forward to helping you achieve your homeownership dreams!

### Service Area

Proudly serving:
- Toronto & GTA
- North York
- Scarborough
- Mississauga
- Brampton
- Markham
- Vaughan
- And surrounding areas`
        }
      ]
    }
  };

  try {
    const result = await apiRequest('/pages', 'POST', contactData);
    console.log('✅ Contact page created successfully');
    return result;
  } catch (error) {
    console.error('❌ Error creating Contact page:', error.message);
    return null;
  }
}

async function createTestimonialsPage() {
  console.log('Creating Testimonials page...');

  const testimonialsData = {
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
              text: '"Ram made our first home purchase so easy! He explained everything clearly, answered all our questions, and found us an amazing rate. We couldn\'t have done it without him. Highly recommended!" ⭐⭐⭐⭐⭐',
              link: null
            },
            {
              heading: 'Jennifer L.',
              text: '"I saved over $300/month by refinancing with Ram\'s help. His expertise and dedication to finding the best rate saved us thousands over the life of our mortgage!" ⭐⭐⭐⭐⭐',
              link: null
            },
            {
              heading: 'David T.',
              text: '"As an investor, I\'ve worked with Ram on multiple properties. His knowledge of investment financing is unmatched. Professional, responsive, and results-driven!" ⭐⭐⭐⭐⭐',
              link: null
            },
            {
              heading: 'The Patel Family',
              text: '"Ram went above and beyond to help us get into our dream home. His personalized service and attention to detail made all the difference. We felt supported throughout!" ⭐⭐⭐⭐⭐',
              link: null
            },
            {
              heading: 'Lisa M.',
              text: '"Getting a mortgage as a self-employed person seemed impossible until I met Ram. He found a solution that worked for my unique situation. Forever grateful!" ⭐⭐⭐⭐⭐',
              link: null
            },
            {
              heading: 'James & Emily C.',
              text: '"From pre-approval to closing, Ram was there every step of the way. His professionalism and expertise made the process completely stress-free!" ⭐⭐⭐⭐⭐',
              link: null
            }
          ]
        },
        {
          __component: 'blocks.markdown',
          body: `## Join Our Growing List of Happy Homeowners

These are just a few of the many success stories from clients who trusted Ram Singh with their mortgage needs. Every client's situation is unique, and I'm committed to finding the perfect solution for you.

### By the Numbers

- **500+** Happy Clients
- **$100M+** in Mortgages Approved
- **4.9/5** Average Client Rating
- **95%** Client Retention Rate

### Your Success is My Priority

Whether you're a first-time buyer, looking to refinance, or investing in property, I bring the same level of dedication and expertise to every client relationship.

**Ready to write your own success story?** [Contact me today](/pages/contact) for a free consultation!

---

*"Working with Ram was the best decision we made in our home buying journey. Professional, knowledgeable, and truly cares about his clients."* - Anonymous Client`
        }
      ]
    }
  };

  try {
    const result = await apiRequest('/pages', 'POST', testimonialsData);
    console.log('✅ Testimonials page created successfully');
    return result;
  } catch (error) {
    console.error('❌ Error creating Testimonials page:', error.message);
    return null;
  }
}

async function checkExistingPages() {
  console.log('Checking for existing pages...\n');

  try {
    const pages = await apiRequest('/pages');
    const existingSlugs = pages.data.map(p => p.slug);

    console.log('Existing pages:', existingSlugs);
    return existingSlugs;
  } catch (error) {
    console.error('❌ Error fetching pages:', error.message);
    return [];
  }
}

async function main() {
  console.log('🚀 Creating Missing Pages for Mortgages by Ram\n');
  console.log('='.repeat(50));
  console.log('\n');

  try {
    const existingSlugs = await checkExistingPages();

    console.log('\n');

    // Create pages that don't exist
    if (!existingSlugs.includes('about')) {
      await createAboutPage();
    } else {
      console.log('⏭️  About page already exists, skipping...');
    }

    if (!existingSlugs.includes('contact')) {
      await createContactPage();
    } else {
      console.log('⏭️  Contact page already exists, skipping...');
    }

    if (!existingSlugs.includes('testimonials')) {
      await createTestimonialsPage();
    } else {
      console.log('⏭️  Testimonials page already exists, skipping...');
    }

    console.log('\n' + '='.repeat(50));
    console.log('\n✅ Page creation completed!\n');
    console.log('📄 New pages available at:');
    console.log('   - About: http://localhost:5174/pages/about');
    console.log('   - Contact: http://localhost:5174/pages/contact');
    console.log('   - Testimonials: http://localhost:5174/pages/testimonials');
    console.log('\n💡 Next steps:');
    console.log('   1. Visit Strapi admin: http://localhost:1337/admin');
    console.log('   2. Go to Content Manager → Pages');
    console.log('   3. Make sure all pages are published');
    console.log('   4. Add images to pages via the Strapi admin');
    console.log('   5. Review pages at http://localhost:5174\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\n💡 Try running with an API token:');
    console.log('   node add-missing-pages-simple.js YOUR_API_TOKEN\n');
    process.exit(1);
  }
}

main();
