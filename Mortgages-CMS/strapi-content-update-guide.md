# Strapi Content Update Guide - Mortgages by Ram

## 🎯 Content Update Instructions

### Access Strapi Admin Panel
1. **Open your browser** and go to: http://localhost:1337/admin
2. **Login** with your admin credentials
3. **Navigate to Content Manager** in the left sidebar

### Single Landing Page Content Updates
**Note:** This website uses a single comprehensive landing page approach. All main content sections (Hero, About, Services, Tools, Resources, Testimonials, Contact) are consolidated into one page for better user experience and easier management.

#### 1. Update Landing Page Title & Description
- **Go to:** Content Manager → Single Types → Landing Page
- **Update Title:** "Mortgages by Ram - Your Trusted Toronto Mortgage Agent"
- **Update Description:** "Professional mortgage services in Toronto. First-time buyer, refinancing, investment properties. Get the best rates with personalized service."

#### 2. Hero Block Content
**Current:** "Build & Launch without problems"  
**Update to:**
- **Heading:** "Your Dream Home Starts Here"
- **Text:** "As your trusted Toronto mortgage agent, I help first-time buyers, families, and investors secure the best mortgage rates. With personalized service and expert guidance, we'll find the perfect mortgage solution for your unique situation."
- **Links:**
  - Primary: "Get Pre-Approved" → Link to "/contact"
  - Secondary: "View Services" → Link to "/services"

#### 3. Section Heading Block
**Current:** "Dolor sit amet consectutar"  
**Update to:**
- **Sub Heading:** "Professional Mortgage Services"
- **Heading:** "Your Toronto Mortgage Expert"

#### 4. Card Grid Block - Services
**Replace the 4 cards with:**

**Card 1:**
- **Heading:** "First-Time Home Buyers"
- **Text:** "Navigate the home buying process with confidence. Get pre-approved, understand your budget, and secure your first home with expert guidance."

**Card 2:**
- **Heading:** "Refinancing Solutions"
- **Text:** "Lower your monthly payments, consolidate debt, or access home equity. Find the best refinancing options tailored to your financial goals."

**Card 3:**
- **Heading:** "Investment Properties"
- **Text:** "Build your real estate portfolio with competitive investment property mortgage rates. Expert advice for both new and experienced investors."

**Card 4:**
- **Heading:** "Commercial Mortgages"
- **Text:** "Secure financing for your business property needs. From small commercial spaces to large developments, we have the solutions."

#### 5. Content with Image Blocks

**First Content Block:**
- **Heading:** "Why Choose Mortgages by Ram?"
- **Content:** "With years of experience in Toronto's competitive real estate market, I provide personalized mortgage solutions that fit your unique needs. My commitment to transparency, competitive rates, and exceptional service has helped hundreds of clients achieve their homeownership dreams.

**What sets me apart:**
- Licensed and certified mortgage agent
- Access to 50+ lenders and competitive rates
- Personalized service from application to closing
- Deep knowledge of Toronto market conditions
- Bilingual service (English/Hindi)"
- **Link:** "Learn More About Ram" → "/about"

**Second Content Block:**
- **Heading:** "The Mortgage Process Made Simple"
- **Content:** "Getting a mortgage doesn't have to be complicated. My streamlined process ensures you understand every step and feel confident throughout your journey.

**Step 1:** Free consultation and pre-approval
**Step 2:** Find your perfect home
**Step 3:** Submit your application
**Step 4:** Get approved and close

I'll guide you through each step, handle the paperwork, and keep you informed every step of the way."
- **Link:** "View Our Process" → "/process"

#### 6. Markdown Block
**Replace with:**
```markdown
## Toronto Market Insights

Stay informed about the latest trends in Toronto's real estate market. Our monthly reports provide valuable insights for both buyers and investors.

### Current Market Conditions
- **Average Home Price:** $1.2M (as of Q3 2025)
- **Interest Rates:** Starting from 5.89% (subject to change)
- **Market Trend:** Stable with moderate growth expected

### First-Time Buyer Programs
- **First-Time Home Buyer Incentive:** Up to 10% shared equity
- **Land Transfer Tax Rebate:** Up to $4,000 for Toronto properties
- **RRSP Home Buyers' Plan:** Withdraw up to $35,000 tax-free

[View our complete market report](/market-insights)
```

#### 7. Person Card Block
**Update to:**
- **Text:** "With over 8 years of experience in Toronto's mortgage industry, I've helped hundreds of families and investors secure their dream homes. My approach combines market expertise with personalized service to deliver the best possible outcomes for my clients."
- **Person Name:** "Ram Singh"
- **Person Job:** "Licensed Mortgage Agent"
- **Image:** Upload a professional headshot

#### 8. FAQ Block
**Replace with these mortgage-specific FAQs:**

**FAQ 1:**
- **Heading:** "How much can I afford to borrow?"
- **Text:** "Your borrowing capacity depends on your income, debts, and credit score. During our free consultation, I'll analyze your financial situation and provide a pre-approval amount that fits your budget."

**FAQ 2:**
- **Heading:** "What documents do I need for a mortgage application?"
- **Text:** "Typically, you'll need pay stubs, tax returns, bank statements, and employment letters. I'll provide you with a complete checklist during our consultation to ensure a smooth application process."

**FAQ 3:**
- **Heading:** "How long does the mortgage approval process take?"
- **Text:** "Pre-approval can be completed in 1-2 days. Full approval typically takes 5-10 business days, depending on the lender and complexity of your application."

**FAQ 4:**
- **Heading:** "Do you work with first-time home buyers?"
- **Text:** "Absolutely! First-time buyers are a specialty of mine. I'll guide you through every step, explain all available programs and incentives, and ensure you understand your options."

**FAQ 5:**
- **Heading:** "What areas do you serve?"
- **Text:** "I primarily serve the Greater Toronto Area (GTA), including Toronto, Mississauga, Brampton, Markham, and surrounding communities."

#### 9. Newsletter Block
**Update to:**
- **Heading:** "Stay Updated with Toronto Market Insights"
- **Text:** "Get monthly mortgage rate updates, market insights, and first-time buyer tips delivered to your inbox. Stay informed about opportunities that could save you thousands on your mortgage."
- **Placeholder:** "your@email.com"
- **Label:** "Subscribe Now"

### Global Settings Updates

#### 1. Update Site Information
- **Go to:** Content Manager → Single Types → Global
- **Title:** "Mortgages by Ram"
- **Description:** "Professional mortgage services in Toronto. Licensed mortgage agent helping first-time buyers, families, and investors secure the best mortgage rates."

#### 2. Header Navigation
- **Update navigation links to:**
  - Home
  - Services
  - About
  - Resources
  - Contact

#### 3. Footer Information
- **Add contact information:**
  - Phone: (416) XXX-XXXX
  - Email: ram@mortgagesbyram.com
  - Address: Toronto, ON
  - License Number: [Your License Number]

### Article Creation

#### Create New Mortgage Articles
1. **Go to:** Content Manager → Collection Types → Articles
2. **Create new articles with these topics:**

**Article 1:**
- **Title:** "First-Time Home Buyer Guide: Complete Checklist"
- **Description:** "Everything you need to know about buying your first home in Toronto, from pre-approval to closing day."
- **Content:** [Detailed guide content]
- **Tags:** "first-time-buyer", "guide", "toronto"

**Article 2:**
- **Title:** "Toronto Mortgage Rates: What to Expect in 2025"
- **Description:** "Current market analysis and rate predictions to help you time your home purchase."
- **Content:** [Market analysis content]
- **Tags:** "rates", "market", "toronto"

**Article 3:**
- **Title:** "Investment Property Financing: A Complete Guide"
- **Description:** "Learn how to finance investment properties and build your real estate portfolio."
- **Content:** [Investment guide content]
- **Tags:** "investment", "financing", "guide"

### Tags Creation

#### Create Mortgage-Specific Tags
1. **Go to:** Content Manager → Collection Types → Tags
2. **Create these tags:**
   - first-time-buyer
   - refinancing
   - investment-property
   - toronto-market
   - mortgage-rates
   - home-buying-guide
   - commercial-mortgage

### Author Profile Update

#### Update Author Information
1. **Go to:** Content Manager → Collection Types → Authors
2. **Update author profile:**
   - **Full Name:** "Ram Singh"
   - **Bio:** "Licensed mortgage agent with over 8 years of experience helping Toronto families and investors secure their dream homes. Specializing in first-time buyers, refinancing, and investment properties."

## 🎨 Design Guidelines (Inspired by Pine.ca)

### Visual Elements
- **Professional imagery** - Use high-quality photos of homes, Toronto landmarks, professional headshots
- **Clean layout** - Maintain the existing clean design with proper spacing
- **Trust indicators** - Include certifications, testimonials, and professional credentials
- **Local focus** - Emphasize Toronto/GTA market knowledge

### Content Tone
- **Professional yet approachable**
- **Educational and informative**
- **Trust-building and credible**
- **Local market focused**

### Key Messaging
- **Expertise:** Years of mortgage experience in Toronto
- **Trust:** Licensed and certified professional
- **Service:** Personalized mortgage solutions
- **Results:** Client success stories and testimonials

## ✅ Completion Checklist

- [ ] Landing page title and description updated
- [ ] Hero section with mortgage messaging
- [ ] Services cards updated with mortgage offerings
- [ ] About section highlighting expertise
- [ ] Process explanation added
- [ ] Toronto market insights included
- [ ] FAQ section with mortgage questions
- [ ] Newsletter signup for market updates
- [ ] Global settings updated
- [ ] Author profile updated
- [ ] Mortgage-specific articles created
- [ ] Relevant tags created
- [ ] Professional imagery uploaded
- [ ] All content reviewed for accuracy
- [ ] Mobile responsiveness tested

## 🚀 Next Steps

After completing the content updates:
1. **Preview the frontend** at http://localhost:5174
2. **Test all links and forms**
3. **Review content for accuracy**
4. **Optimize images for web**
5. **Set up analytics tracking**
6. **Plan content calendar for blog posts**

## 🔧 Development Rules & Guidelines

### Strapi Documentation Reference
**CRITICAL RULE:** Always refer to the official Strapi documentation (https://docs.strapi.io/) when implementing features, fixing issues, or making changes to the CMS. The Strapi documentation is the authoritative source for:
- Content type configurations
- API endpoints and parameters
- Plugin configurations
- Custom field types
- Authentication and permissions
- Deployment and hosting
- Migration strategies

### Single Page Architecture
- **Consolidated Content:** All main sections (Hero, About, Services, Tools, Resources, Testimonials, Contact) are on one landing page
- **Articles Section:** Maintained separately for blog posts and mortgage insights
- **Dynamic Blocks:** Content can be reordered through Strapi admin without code changes
- **Mobile-First:** All content optimized for mobile devices

---

**Note:** This guide provides step-by-step instructions for updating Strapi content manually through the admin panel. All content is optimized for SEO and follows pine.ca's professional design principles. Always consult the official Strapi documentation for technical implementation details.
