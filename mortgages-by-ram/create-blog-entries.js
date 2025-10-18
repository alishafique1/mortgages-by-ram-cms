const API_BASE = 'http://localhost:1337/api';

// 10 Mortgage-focused blog entries
const blogEntries = [
  {
    title: "First-Time Home Buyer Guide: Everything You Need to Know",
    slug: "first-time-home-buyer-guide",
    description: "Complete guide for first-time home buyers in Toronto. Learn about pre-approval, down payments, and government programs.",
    content: "Buying your first home is exciting but can feel overwhelming. This comprehensive guide covers everything from pre-approval to closing day. Learn about down payment options, government incentives, and how to navigate Toronto's competitive market.",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Toronto Mortgage Rates: What to Expect in 2025",
    slug: "toronto-mortgage-rates-2025",
    description: "Current mortgage rate trends in Toronto and predictions for 2025. Get insights on when to lock in your rate.",
    content: "Mortgage rates in Toronto have been fluctuating. We break down current trends, factors affecting rates, and provide expert predictions for 2025. Learn when it's the right time to lock in your rate.",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Refinancing Your Mortgage: When and Why",
    slug: "refinancing-mortgage-guide",
    description: "Learn when refinancing makes sense, how to calculate savings, and what to consider before making the switch.",
    content: "Refinancing can save you thousands, but timing is everything. Discover the signs that indicate it's time to refinance and how to calculate your potential savings.",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Investment Property Mortgages: Building Your Portfolio",
    slug: "investment-property-mortgages",
    description: "Everything about financing investment properties in Toronto. Down payments, rental income calculations, and portfolio building strategies.",
    content: "Building a real estate portfolio requires smart financing strategies. Learn about investment property mortgage requirements, rental income calculations, and portfolio optimization.",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Understanding Mortgage Pre-Approval vs Pre-Qualification",
    slug: "mortgage-preapproval-vs-prequalification",
    description: "The difference between pre-approval and pre-qualification, and why pre-approval is crucial in Toronto's competitive market.",
    content: "Many buyers confuse pre-approval with pre-qualification. Learn the key differences and why pre-approval is essential for success in Toronto's fast-moving real estate market.",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Down Payment Strategies: Maximizing Your Options",
    slug: "down-payment-strategies",
    description: "Creative ways to save for your down payment, including RRSP withdrawals, gift funds, and government programs.",
    content: "Saving for a down payment can be challenging. Explore various strategies including RRSP Home Buyers' Plan, gift funds, and government assistance programs available in Ontario.",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Mortgage Insurance: CMHC vs Private Lenders",
    slug: "mortgage-insurance-comparison",
    description: "Compare CMHC insurance with private mortgage insurance options. Understand costs, benefits, and requirements.",
    content: "Mortgage insurance is required for down payments under 20%. Compare CMHC insurance with private options to find the best coverage and rates for your situation.",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Toronto Real Estate Market: Q1 2025 Analysis",
    slug: "toronto-real-estate-market-q1-2025",
    description: "Comprehensive analysis of Toronto's real estate market trends, price movements, and investment opportunities.",
    content: "Stay informed about Toronto's real estate market with our quarterly analysis. Learn about price trends, inventory levels, and emerging opportunities for buyers and investors.",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Mortgage Stress Test: How It Affects Your Buying Power",
    slug: "mortgage-stress-test-guide",
    description: "Understanding the mortgage stress test, how it's calculated, and strategies to improve your qualification amount.",
    content: "The mortgage stress test can significantly impact your buying power. Learn how it's calculated and discover strategies to maximize your qualification amount.",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Closing Costs: What First-Time Buyers Need to Know",
    slug: "closing-costs-first-time-buyers",
    description: "Complete breakdown of closing costs for first-time home buyers in Ontario, including legal fees, land transfer tax, and more.",
    content: "Closing costs can add up quickly. Get a complete breakdown of all fees and costs associated with buying a home in Ontario, plus tips to minimize expenses.",
    publishedAt: new Date().toISOString()
  }
];

async function createBlogEntries(apiToken) {
  try {
    console.log('🔄 Creating 10 blog entries...');
    
    for (const blogEntry of blogEntries) {
      const response = await fetch(`${API_BASE}/articles`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            title: blogEntry.title,
            slug: blogEntry.slug,
            description: blogEntry.description,
            content: blogEntry.content,
            publishedAt: blogEntry.publishedAt
          }
        })
      });
      
      if (response.ok) {
        console.log(`✅ Created blog entry: ${blogEntry.title}`);
      } else {
        const errorData = await response.text();
        console.error(`❌ Failed to create blog entry ${blogEntry.title}:`, errorData);
      }
    }
    
    console.log('🎉 All blog entries created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating blog entries:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];
if (!apiToken) {
  console.log('❌ Please provide an API token:');
  console.log('Usage: node create-blog-entries.js YOUR_API_TOKEN');
  console.log('');
  console.log('To get an API token:');
  console.log('1. Go to: http://localhost:1337/admin');
  console.log('2. Navigate to: Settings → API Tokens');
  console.log('3. Create new token with "Full access"');
  process.exit(1);
}

createBlogEntries(apiToken);
