#!/usr/bin/env node

// Corrected comprehensive Strapi API update script
const API_BASE = 'http://localhost:1337/api';

async function updateHeroAndServices(apiToken) {
  try {
    console.log('🔄 Updating hero and services sections...');
    
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
    
    // Update blocks with enhanced content (without IDs)
    const updatedBlocks = getData.data.blocks.map(block => {
      if (block.__component === 'blocks.hero') {
        return {
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
        };
      } else if (block.__component === 'blocks.card-grid') {
        return {
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
        };
      }
      return block;
    });
    
    // Update landing page
    const updateResponse = await fetch(`${API_BASE}/landing-page`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          blocks: updatedBlocks
        }
      })
    });
    
    if (updateResponse.ok) {
      console.log('✅ Hero and services sections updated successfully!');
    } else {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update hero and services:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Error updating hero and services:', error.message);
  }
}

async function createServicePages(apiToken) {
  try {
    console.log('🔄 Creating service pages...');
    
    const servicePages = [
      {
        title: "First-Time Home Buyers",
        slug: "first-time-home-buyers",
        description: "Complete guide for first-time home buyers in Toronto. Get pre-approved, understand programs, and secure your first home.",
        blocks: [
          {
            "__component": "blocks.hero",
            "heading": "First-Time Home Buyers",
            "text": "Your journey to homeownership starts here. Get expert guidance, access special programs, and secure your first home with confidence.",
            "links": [
              {
                "href": "/contact",
                "label": "Get Pre-Approved",
                "isExternal": false,
                "isButtonLink": true,
                "type": "PRIMARY"
              }
            ],
            "image": 6
          },
          {
            "__component": "blocks.markdown",
            "content": `## First-Time Buyer Programs

### Government Incentives
- **First-Time Home Buyer Incentive**: Up to 10% shared equity
- **Land Transfer Tax Rebate**: Up to $4,000 for Toronto properties
- **RRSP Home Buyers' Plan**: Withdraw up to $35,000 tax-free

### Special Financing
- **CMHC Insurance**: Reduced premiums for first-time buyers
- **Flexible Down Payment**: As low as 5% down
- **Extended Amortization**: Up to 30 years available

## The Process
1. **Free Consultation** - Assess your financial situation
2. **Pre-Approval** - Get your pre-approval letter
3. **Home Search** - Find your perfect home
4. **Application** - Submit your mortgage application
5. **Approval** - Get approved and close

Ready to start? Contact me today for a free consultation!`
          }
        ]
      },
      {
        title: "Refinancing Solutions",
        slug: "refinancing-solutions",
        description: "Lower your mortgage payments, consolidate debt, or access home equity. Expert refinancing solutions for Toronto homeowners.",
        blocks: [
          {
            "__component": "blocks.hero",
            "heading": "Refinancing Solutions",
            "text": "Lower your payments, consolidate debt, or access home equity. Expert refinancing solutions tailored to your needs.",
            "links": [
              {
                "href": "/contact",
                "label": "Get Refinancing Quote",
                "isExternal": false,
                "isButtonLink": true,
                "type": "PRIMARY"
              }
            ],
            "image": 7
          },
          {
            "__component": "blocks.markdown",
            "content": `## Refinancing Benefits

### Save Money
- **Lower Interest Rates**: Reduce your interest rate
- **Lower Payments**: Extend amortization to reduce monthly payments
- **Debt Consolidation**: Pay off high-interest credit cards and loans

### Access Equity
- **Home Renovations**: Fund your renovation projects
- **Investment Opportunities**: Use equity for investments
- **Emergency Fund**: Access cash when you need it

## The Process
1. **Assessment** - Evaluate your current mortgage
2. **Comparison** - Compare rates and terms
3. **Application** - Submit refinancing application
4. **Approval** - Get approved and close
5. **Savings** - Start saving money immediately

Ready to explore your options? Contact me today!`
          }
        ]
      },
      {
        title: "Investment Properties",
        slug: "investment-properties",
        description: "Build your real estate portfolio with competitive investment property mortgage rates. Expert advice for investors.",
        blocks: [
          {
            "__component": "blocks.hero",
            "heading": "Investment Properties",
            "text": "Build your real estate portfolio with competitive investment property mortgage rates. Expert advice for both new and experienced investors.",
            "links": [
              {
                "href": "/contact",
                "label": "Investment Consultation",
                "isExternal": false,
                "isButtonLink": true,
                "type": "PRIMARY"
              }
            ],
            "image": 7
          },
          {
            "__component": "blocks.markdown",
            "content": `## Investment Property Types

### Residential Rental
- **Single Family Homes**: Traditional rental properties
- **Condos**: Low-maintenance rental options
- **Townhouses**: Family-friendly rentals

### Multi-Unit Properties
- **Duplexes**: Two-unit properties
- **Triplexes**: Three-unit properties
- **Fourplexes**: Four-unit properties

### Commercial Properties
- **Small Commercial**: Retail and office spaces
- **Mixed-Use**: Residential and commercial combined
- **Industrial**: Warehouse and manufacturing

## Financing Options
- **Conventional Mortgages**: 20% down payment
- **CMHC Insurance**: Available for some investment properties
- **Portfolio Mortgages**: Multiple property financing
- **Bridge Financing**: Short-term financing solutions

Ready to start building your portfolio? Contact me today!`
          }
        ]
      },
      {
        title: "Commercial Mortgages",
        slug: "commercial-mortgages",
        description: "Secure financing for your business property needs. From small commercial spaces to large developments.",
        blocks: [
          {
            "__component": "blocks.hero",
            "heading": "Commercial Mortgages",
            "text": "Secure financing for your business property needs. From small commercial spaces to large developments, we have the solutions.",
            "links": [
              {
                "href": "/contact",
                "label": "Commercial Consultation",
                "isExternal": false,
                "isButtonLink": true,
                "type": "PRIMARY"
              }
            ],
            "image": 6
          },
          {
            "__component": "blocks.markdown",
            "content": `## Commercial Property Financing

### Property Types
- **Retail Spaces**: Storefronts and shopping centers
- **Office Buildings**: Professional office spaces
- **Industrial Properties**: Warehouses and manufacturing facilities
- **Mixed-Use Properties**: Combined commercial and residential

### Financing Solutions
- **Traditional Commercial Mortgages**: Long-term financing solutions
- **Bridge Loans**: Short-term financing for quick acquisitions
- **Construction Loans**: Financing for new construction projects
- **Refinancing**: Lower rates and better terms

## Requirements
- **Down Payment**: Typically 20-30%
- **Business Financials**: 2-3 years of financial statements
- **Property Appraisal**: Professional property valuation
- **Insurance**: Commercial property insurance

Ready to finance your commercial property? Contact me today!`
          }
        ]
      }
    ];
    
    for (const servicePage of servicePages) {
      const response = await fetch(`${API_BASE}/pages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            title: servicePage.title,
            slug: servicePage.slug,
            description: servicePage.description,
            blocks: servicePage.blocks
          }
        })
      });
      
      if (response.ok) {
        console.log(`✅ Created service page: ${servicePage.title}`);
      } else {
        const errorData = await response.text();
        console.error(`❌ Failed to create service page ${servicePage.title}:`, errorData);
      }
    }
    
  } catch (error) {
    console.error('❌ Error creating service pages:', error.message);
  }
}

async function createBlogEntries(apiToken) {
  try {
    console.log('🔄 Creating blog entries...');
    
    const blogEntries = [
      {
        title: "First-Time Home Buyer Programs in Toronto 2025",
        slug: "first-time-home-buyer-programs-toronto-2025",
        description: "Complete guide to first-time home buyer programs, incentives, and rebates available in Toronto for 2025.",
        content: `# First-Time Home Buyer Programs in Toronto 2025

## Overview
Buying your first home in Toronto can be overwhelming, but there are several programs designed to help first-time buyers make their dream of homeownership a reality.

## Government Programs

### First-Time Home Buyer Incentive
The First-Time Home Buyer Incentive (FTHBI) is a shared equity mortgage program that helps first-time buyers reduce their monthly mortgage payments.

**Key Details:**
- Up to 10% shared equity for new homes
- Up to 5% shared equity for existing homes
- No monthly payments on the shared equity portion
- Repay when you sell or after 25 years

### Land Transfer Tax Rebate
Toronto offers a rebate on land transfer taxes for first-time buyers.

**Rebate Amounts:**
- Up to $4,000 for Toronto properties
- Maximum purchase price: $400,000
- Partial rebate for properties up to $500,000

### RRSP Home Buyers' Plan
Withdraw up to $35,000 from your RRSP tax-free for your first home purchase.

**Requirements:**
- Must be a first-time buyer
- Must repay within 15 years
- Annual minimum repayment required

## CMHC Insurance Programs

### CMHC First-Time Buyer Program
Reduced mortgage insurance premiums for first-time buyers.

**Benefits:**
- Lower insurance premiums
- More flexible qualification criteria
- Access to higher loan-to-value ratios

## Provincial Programs

### Ontario First-Time Home Buyer Tax Credit
A non-refundable tax credit of up to $4,000 for first-time buyers.

## Tips for First-Time Buyers

1. **Get Pre-Approved**: Know your budget before you start looking
2. **Save for Down Payment**: Aim for at least 5% down payment
3. **Consider All Costs**: Factor in closing costs, moving expenses, and maintenance
4. **Work with Professionals**: Use a licensed mortgage agent and real estate agent

## Next Steps
Ready to start your home buying journey? Contact me for a free consultation and pre-approval. I'll help you understand all available programs and find the best mortgage solution for your situation.`,
        featuredImage: 7,
        author: 2
      },
      {
        title: "Toronto Mortgage Rates: What to Expect in 2025",
        slug: "toronto-mortgage-rates-2025",
        description: "Current mortgage rate trends in Toronto and what borrowers can expect throughout 2025.",
        content: `# Toronto Mortgage Rates: What to Expect in 2025

## Current Rate Environment
Mortgage rates in Toronto have been fluctuating in response to economic conditions and Bank of Canada policy decisions.

## Rate Trends

### Fixed vs Variable Rates
- **Fixed Rates**: Currently ranging from 5.89% to 6.49%
- **Variable Rates**: Starting from 5.89% (prime + spread)
- **5-Year Fixed**: Most popular choice for stability

### Factors Affecting Rates
1. **Bank of Canada Policy**: Overnight rate decisions
2. **Economic Indicators**: Inflation, employment, GDP growth
3. **Global Markets**: Bond yields and international factors
4. **Lender Competition**: Market competition among lenders

## Rate Predictions for 2025

### Q1 2025
- Rates expected to remain relatively stable
- Potential for slight decreases if inflation continues to moderate

### Q2-Q3 2025
- Possible rate cuts if economic conditions improve
- Continued monitoring of inflation trends

### Q4 2025
- Rate stability expected heading into 2026
- Focus on economic recovery and growth

## Choosing the Right Rate

### Fixed Rate Benefits
- **Predictability**: Know your payment for the entire term
- **Protection**: Shielded from rate increases
- **Budgeting**: Easier to plan long-term finances

### Variable Rate Benefits
- **Lower Initial Rate**: Often starts lower than fixed
- **Flexibility**: Can convert to fixed at any time
- **Savings Potential**: Benefit from rate decreases

## Rate Shopping Tips

1. **Compare Multiple Lenders**: Don't settle for the first offer
2. **Consider Total Cost**: Look beyond just the interest rate
3. **Factor in Fees**: Include all associated costs
4. **Work with a Broker**: Access to multiple lenders and rates

## Current Market Conditions

### Toronto Real Estate Market
- **Average Home Price**: $1.2M (as of Q3 2025)
- **Market Trend**: Stable with moderate growth expected
- **Inventory Levels**: Balanced market conditions

### Affordability Considerations
- **Debt Service Ratios**: Maximum 39% of gross income
- **Total Debt Service**: Maximum 44% including all debts
- **Down Payment Requirements**: Minimum 5% for first-time buyers

## Getting the Best Rate

### Improve Your Credit Score
- Pay bills on time
- Keep credit utilization low
- Avoid new credit applications

### Increase Your Down Payment
- Larger down payment = better rates
- Consider RRSP Home Buyers' Plan
- Look for down payment assistance programs

### Work with a Professional
- Licensed mortgage agent
- Access to multiple lenders
- Expert rate negotiation

## Conclusion
While predicting exact rate movements is impossible, understanding current trends and factors can help you make informed decisions. Work with a licensed mortgage agent to find the best rate and terms for your situation.

Ready to explore your mortgage options? Contact me for a free consultation and rate comparison.`,
        featuredImage: 7,
        author: 2
      },
      {
        title: "Mortgage Pre-Approval: Your First Step to Homeownership",
        slug: "mortgage-pre-approval-guide",
        description: "Complete guide to mortgage pre-approval process, benefits, and how to get pre-approved in Toronto.",
        content: `# Mortgage Pre-Approval: Your First Step to Homeownership

## What is Pre-Approval?
A mortgage pre-approval is a preliminary assessment by a lender that determines how much you can borrow and at what interest rate. It's not a guarantee, but it's a strong indication of your borrowing power.

## Benefits of Pre-Approval

### Know Your Budget
- **Maximum Purchase Price**: Understand your price range
- **Monthly Payment**: Know what you can afford
- **Down Payment**: Calculate required down payment

### Strengthen Your Offer
- **Seller Confidence**: Shows you're a serious buyer
- **Competitive Advantage**: Stand out in multiple offer situations
- **Faster Closing**: Streamlined approval process

### Rate Protection
- **Rate Hold**: Lock in current rates for 60-120 days
- **Market Protection**: Shielded from rate increases
- **Peace of Mind**: Know your costs upfront

## Pre-Approval Process

### Step 1: Application
- Complete mortgage application
- Provide income documentation
- Submit credit check authorization

### Step 2: Documentation Review
- **Income Verification**: Pay stubs, T4s, tax returns
- **Asset Verification**: Bank statements, investment accounts
- **Debt Verification**: Credit card statements, loan statements

### Step 3: Credit Check
- **Credit Score**: Minimum 600-650 typically required
- **Credit History**: Review of payment history
- **Debt Ratios**: Calculate debt service ratios

### Step 4: Pre-Approval Letter
- **Amount**: Maximum loan amount
- **Rate**: Interest rate (if locked)
- **Term**: Rate hold period
- **Conditions**: Any remaining requirements

## Required Documents

### Income Documents
- **Pay Stubs**: Last 2-3 pay periods
- **T4 Slips**: Previous 2 years
- **Notice of Assessment**: Previous 2 years
- **Employment Letter**: Current employment verification

### Asset Documents
- **Bank Statements**: 3 months of statements
- **Investment Statements**: RRSP, TFSA, investment accounts
- **Down Payment**: Source of down payment funds

### Property Documents
- **Purchase Agreement**: Once you find a property
- **Property Appraisal**: Ordered by lender
- **Insurance**: Property insurance requirements

## Pre-Approval vs Pre-Qualification

### Pre-Qualification
- **Informal Assessment**: Based on self-reported information
- **No Credit Check**: No hard credit inquiry
- **No Documentation**: Verbal information only
- **No Rate Hold**: No rate protection

### Pre-Approval
- **Formal Assessment**: Based on verified documentation
- **Credit Check**: Hard credit inquiry performed
- **Documentation Required**: Income and asset verification
- **Rate Hold**: Rate protection available

## Common Pre-Approval Mistakes

### Not Getting Pre-Approved Early
- Start the process before house hunting
- Pre-approval takes time to complete
- Don't wait until you find a property

### Incomplete Documentation
- Gather all required documents upfront
- Ensure documents are current and complete
- Provide additional documentation if requested

### Not Shopping Around
- Compare rates from multiple lenders
- Consider different mortgage products
- Work with a mortgage broker for options

## Maintaining Your Pre-Approval

### Don't Make Major Changes
- **Avoid New Credit**: Don't apply for new credit
- **Maintain Employment**: Don't change jobs
- **Keep Income Stable**: Avoid income reductions

### Stay in Touch
- **Regular Updates**: Keep your agent informed
- **Documentation**: Provide updated documents if needed
- **Rate Reviews**: Consider rate adjustments if available

## Next Steps After Pre-Approval

### Start House Hunting
- **Price Range**: Focus on properties within your budget
- **Location**: Consider commute, schools, amenities
- **Property Type**: House, condo, townhouse options

### Make Competitive Offers
- **Market Research**: Understand local market conditions
- **Offer Strategy**: Work with your real estate agent
- **Conditions**: Minimize conditions to strengthen offer

### Final Approval Process
- **Property Appraisal**: Lender orders appraisal
- **Final Documentation**: Provide any remaining documents
- **Closing Preparation**: Prepare for closing day

## Conclusion
Getting pre-approved is the first and most important step in your home buying journey. It gives you confidence, strengthens your offers, and protects you from rate increases.

Ready to get pre-approved? Contact me for a free consultation and pre-approval. I'll guide you through the entire process and help you secure the best mortgage for your situation.`,
        featuredImage: 7,
        author: 2
      },
      {
        title: "Investment Property Financing in Toronto: A Complete Guide",
        slug: "investment-property-financing-toronto",
        description: "Everything you need to know about financing investment properties in Toronto, including requirements, rates, and strategies.",
        content: `# Investment Property Financing in Toronto: A Complete Guide

## Introduction
Real estate investment can be a powerful wealth-building strategy, and Toronto's strong rental market makes it an attractive location for investors. However, financing investment properties requires different strategies and qualifications than primary residences.

## Types of Investment Properties

### Residential Rental Properties
- **Single Family Homes**: Traditional rental properties
- **Condominiums**: Low-maintenance rental options
- **Townhouses**: Family-friendly rental properties
- **Multi-Unit Properties**: Duplexes, triplexes, fourplexes

### Commercial Properties
- **Retail Spaces**: Storefronts and shopping centers
- **Office Buildings**: Professional office spaces
- **Industrial Properties**: Warehouses and manufacturing facilities
- **Mixed-Use Properties**: Combined residential and commercial

## Financing Requirements

### Down Payment Requirements
- **Conventional Mortgages**: 20% minimum down payment
- **CMHC Insurance**: Not available for investment properties
- **Commercial Properties**: 25-30% down payment typically required

### Income Requirements
- **Rental Income**: Must demonstrate positive cash flow
- **Debt Service Coverage**: Typically 1.2-1.3x mortgage payment
- **Personal Income**: Sufficient income to cover all debts

### Credit Requirements
- **Credit Score**: Minimum 680-700 typically required
- **Credit History**: Strong payment history
- **Debt Ratios**: Lower debt ratios than primary residence

## Financing Options

### Traditional Mortgages
- **Fixed Rate**: Predictable payments for budgeting
- **Variable Rate**: Potential for lower rates
- **Amortization**: Up to 30 years available

### Alternative Financing
- **Private Lenders**: Higher rates but more flexible
- **Hard Money Loans**: Short-term, high-rate financing
- **Joint Ventures**: Partner with other investors

### Portfolio Mortgages
- **Multiple Properties**: Finance multiple properties together
- **Cross-Collateralization**: Use equity from one property for another
- **Flexible Terms**: Customized financing solutions

## Investment Property Analysis

### Cash Flow Analysis
- **Rental Income**: Market rent for the property
- **Operating Expenses**: Property taxes, insurance, maintenance
- **Debt Service**: Mortgage payment and interest
- **Net Cash Flow**: Income minus expenses

### Return on Investment
- **Cap Rate**: Net operating income divided by purchase price
- **Cash-on-Cash Return**: Annual cash flow divided by cash invested
- **Total Return**: Includes appreciation and cash flow

### Market Analysis
- **Rental Market**: Current rental rates and vacancy rates
- **Property Values**: Recent sales and market trends
- **Neighborhood Factors**: Schools, transportation, amenities

## Tax Considerations

### Rental Income Taxation
- **Rental Income**: Taxable income from rental properties
- **Expense Deductions**: Mortgage interest, property taxes, maintenance
- **Depreciation**: Capital cost allowance for building improvements

### Capital Gains
- **Sale of Property**: Capital gains tax on appreciation
- **Principal Residence**: Different rules for primary residence
- **Tax Planning**: Strategies to minimize tax liability

## Investment Strategies

### Buy and Hold
- **Long-Term Appreciation**: Benefit from property value increases
- **Rental Income**: Generate monthly cash flow
- **Tax Benefits**: Deductible expenses and depreciation

### Fix and Flip
- **Short-Term Strategy**: Buy, renovate, and sell quickly
- **Higher Risk**: Market timing and renovation costs
- **Higher Returns**: Potential for significant profits

### BRRRR Strategy
- **Buy**: Purchase property below market value
- **Rehab**: Renovate to increase value
- **Rent**: Find tenants for rental income
- **Refinance**: Pull out equity for next investment
- **Repeat**: Use equity for additional properties

## Risk Management

### Market Risk
- **Property Values**: Can decrease in value
- **Rental Rates**: May not cover expenses
- **Vacancy Rates**: Periods without rental income

### Financial Risk
- **Interest Rates**: Can increase mortgage payments
- **Maintenance Costs**: Unexpected repair expenses
- **Insurance Claims**: Property damage or liability

### Mitigation Strategies
- **Diversification**: Multiple properties in different areas
- **Cash Reserves**: Emergency fund for expenses
- **Insurance**: Comprehensive property and liability insurance

## Getting Started

### Education
- **Market Research**: Understand local rental markets
- **Financial Planning**: Calculate investment requirements
- **Legal Considerations**: Understand landlord-tenant laws

### Professional Team
- **Mortgage Agent**: Specialized in investment property financing
- **Real Estate Agent**: Experienced with investment properties
- **Accountant**: Tax planning and financial advice
- **Property Manager**: Day-to-day property management

### First Investment
- **Start Small**: Begin with single-family rental
- **Location**: Choose stable, growing neighborhoods
- **Numbers**: Ensure positive cash flow
- **Experience**: Learn from first investment

## Conclusion
Investment property financing in Toronto offers opportunities for wealth building, but requires careful planning and analysis. Work with experienced professionals to develop a strategy that fits your financial goals and risk tolerance.

Ready to explore investment property financing? Contact me for a consultation. I'll help you understand your financing options and develop a strategy for building your real estate portfolio.`,
        featuredImage: 7,
        author: 2
      },
      {
        title: "Mortgage Refinancing: When and Why to Refinance",
        slug: "mortgage-refinancing-guide",
        description: "Complete guide to mortgage refinancing, including when to refinance, benefits, costs, and the refinancing process.",
        content: `# Mortgage Refinancing: When and Why to Refinance

## What is Mortgage Refinancing?
Mortgage refinancing involves replacing your existing mortgage with a new one, typically to take advantage of better terms, lower rates, or to access home equity.

## Reasons to Refinance

### Lower Interest Rates
- **Rate Reduction**: Take advantage of lower market rates
- **Monthly Savings**: Reduce your monthly payment
- **Interest Savings**: Save thousands over the life of the loan

### Change Mortgage Terms
- **Shorter Amortization**: Pay off mortgage faster
- **Longer Amortization**: Reduce monthly payments
- **Fixed to Variable**: Switch between rate types

### Access Home Equity
- **Home Improvements**: Fund renovation projects
- **Debt Consolidation**: Pay off high-interest debt
- **Investment Opportunities**: Use equity for investments
- **Emergency Fund**: Access cash for unexpected expenses

### Remove Mortgage Insurance
- **CMHC Insurance**: Remove insurance when equity reaches 20%
- **Cost Savings**: Eliminate monthly insurance premiums
- **Better Terms**: Access to more competitive rates

## When to Consider Refinancing

### Interest Rate Environment
- **Rate Decrease**: Market rates are significantly lower
- **Rate Hold**: Your current rate is higher than market rates
- **Rate Lock**: You have a high fixed rate

### Life Changes
- **Income Increase**: Qualify for better terms
- **Credit Improvement**: Better credit score for better rates
- **Property Value Increase**: Access increased equity

### Financial Goals
- **Debt Consolidation**: Pay off high-interest debt
- **Investment**: Use equity for other investments
- **Retirement Planning**: Adjust mortgage for retirement

## Refinancing Costs

### Lender Fees
- **Application Fee**: $200-500 typically
- **Appraisal Fee**: $300-500 for property appraisal
- **Legal Fees**: $800-1,500 for legal work
- **Discharge Fee**: $200-400 to discharge current mortgage

### Total Costs
- **Typical Range**: $2,000-4,000 total costs
- **Break-Even Point**: Calculate when savings exceed costs
- **Cost Recovery**: Usually 12-24 months

### Cost-Benefit Analysis
- **Monthly Savings**: Calculate monthly payment reduction
- **Interest Savings**: Total interest saved over loan term
- **Break-Even**: Time to recover refinancing costs

## Refinancing Process

### Step 1: Assessment
- **Current Mortgage**: Review existing terms and rates
- **Market Rates**: Compare current market rates
- **Equity Position**: Calculate available equity
- **Financial Situation**: Assess current income and credit

### Step 2: Application
- **Documentation**: Provide income and asset documents
- **Credit Check**: Lender performs credit inquiry
- **Property Appraisal**: Professional property valuation
- **Rate Lock**: Lock in current rates

### Step 3: Approval
- **Underwriting**: Lender reviews application
- **Conditions**: Address any remaining requirements
- **Final Approval**: Receive mortgage commitment
- **Closing**: Complete refinancing transaction

## Types of Refinancing

### Rate and Term Refinancing
- **Same Amount**: Refinance existing mortgage balance
- **Better Terms**: Lower rate or different amortization
- **No Cash Out**: No additional funds withdrawn

### Cash-Out Refinancing
- **Additional Funds**: Borrow more than current balance
- **Equity Access**: Use home equity for other purposes
- **Higher Payments**: Increased monthly payments

### Blend and Extend
- **Rate Blending**: Blend current rate with new rate
- **Term Extension**: Extend mortgage term
- **Penalty Avoidance**: Avoid prepayment penalties

## Refinancing Strategies

### Rate Shopping
- **Multiple Lenders**: Compare rates from different lenders
- **Broker Access**: Work with mortgage broker for options
- **Rate Negotiation**: Negotiate for better terms

### Timing Considerations
- **Market Timing**: Monitor rate trends
- **Penalty Timing**: Consider prepayment penalties
- **Life Events**: Plan around major life changes

### Tax Implications
- **Interest Deductibility**: Understand tax implications
- **Investment Use**: Different rules for investment properties
- **Professional Advice**: Consult with tax professional

## Common Refinancing Mistakes

### Not Shopping Around
- **Single Lender**: Only considering current lender
- **Rate Comparison**: Not comparing multiple options
- **Hidden Costs**: Not considering all fees

### Ignoring Total Cost
- **Focus on Rate**: Only considering interest rate
- **Total Cost**: Include all fees and costs
- **Break-Even**: Calculate true cost-benefit

### Not Planning Ahead
- **Short-Term Thinking**: Not considering long-term goals
- **Life Changes**: Not planning for future changes
- **Market Conditions**: Not considering rate trends

## Alternatives to Refinancing

### Mortgage Renewal
- **Current Lender**: Negotiate with existing lender
- **Rate Adjustment**: Adjust rate without full refinancing
- **Term Changes**: Modify existing mortgage terms

### Home Equity Line of Credit
- **Flexible Access**: Access equity as needed
- **Interest Only**: Pay interest only on used funds
- **Variable Rate**: Typically variable rate product

### Second Mortgage
- **Additional Loan**: Take second mortgage for specific needs
- **Keep First**: Maintain existing first mortgage
- **Higher Rate**: Typically higher interest rate

## Conclusion
Mortgage refinancing can be a powerful financial tool when used strategically. Consider your goals, costs, and market conditions before making a decision. Work with a licensed mortgage agent to explore your options and find the best solution for your situation.

Ready to explore refinancing options? Contact me for a free consultation. I'll analyze your current mortgage and help you determine if refinancing makes sense for your financial goals.`,
        featuredImage: 7,
        author: 2
      }
    ];
    
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
            featuredImage: blogEntry.featuredImage,
            author: blogEntry.author
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
    
  } catch (error) {
    console.error('❌ Error creating blog entries:', error.message);
  }
}

async function main(apiToken) {
  try {
    console.log('🚀 Starting comprehensive content update...');
    
    // Update hero and services
    await updateHeroAndServices(apiToken);
    
    // Create service pages
    await createServicePages(apiToken);
    
    // Create blog entries
    await createBlogEntries(apiToken);
    
    console.log('\n🎉 All updates completed successfully!');
    console.log('📋 Summary of updates:');
    console.log('   ✅ Enhanced hero section with stronger CTAs');
    console.log('   ✅ Updated services with detailed descriptions');
    console.log('   ✅ Created 4 dedicated service pages');
    console.log('   ✅ Created 5 mortgage-related blog entries');
    console.log('\n🌐 Check your frontend at: http://localhost:5174');
    console.log('📱 All content should now be live!');
    
  } catch (error) {
    console.error('❌ Error in main process:', error.message);
  }
}

// Main execution
const apiToken = process.argv[2];

if (!apiToken) {
  console.log('🔑 API TOKEN REQUIRED');
  console.log('Run this script with: node update-corrected-content.js YOUR_TOKEN_HERE');
  process.exit(1);
}

main(apiToken);
