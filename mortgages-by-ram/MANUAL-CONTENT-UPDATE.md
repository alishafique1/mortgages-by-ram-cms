# 📝 Manual Content Update Guide

If you prefer to update content manually through the Strapi admin interface instead of using the script, follow this guide.

---

## 🎯 Landing Page Content

### Access:
1. Open http://localhost:1337/admin
2. Go to **Content Manager** → **Single Types** → **Landing Page**

### Hero Block

**Heading:**
```
I WANT TO RETIRE YOU WITH $200,000+ / YEAR
```

**Text:**
```
As your trusted Toronto mortgage agent, I help first-time buyers build wealth through smart real estate decisions. Get personalized service, expert guidance, and access to exclusive opportunities that set you up for financial freedom.
```

**Links:**
- Button 1: "Book a Call" → `/pages/contact`
- Button 2: "Free Class" → `/pages/free-class`

---

### Section Heading Block

**Sub Heading:**
```
Professional Mortgage Services
```

**Heading:**
```
Your Toronto First-Time Home Buyer Expert
```

---

### Card Grid Block (4 Cards)

**Card 1: First-Time Home Buyers**
```
Heading: First-Time Home Buyers

Text: The bank provides you with a rate, and that's it. We guide you through the entire process end-to-end, connect you to the best people in our network, and shop the BEST rate for you across all lenders.

Link: Learn More → /pages/first-time-buyers
```

**Card 2: Grow Nation Membership**
```
Heading: Grow Nation Membership

Text: Once you close your mortgage with us, you become part of our exclusive inner circle "Grow Nation" - an invite-only platform designed to retire you well & early. I will make that plan with you 1 on 1.

Link: Join Now → /pages/grow-nation
```

**Card 3: Investment Properties**
```
Heading: Investment Properties

Text: Build your real estate portfolio with competitive investment property mortgage rates. I spend thousands in educating myself on real-estate matters, so that I can make more money for my clients over the next 3 decades.

Link: Start Investing → /pages/investment-properties
```

**Card 4: 1% Newsletter**
```
Heading: 1% Newsletter

Text: Get exclusive mortgage insights, Toronto market updates, and wealth-building strategies delivered to your inbox. Join hundreds of successful homeowners and investors.

Link: Subscribe → /pages/newsletter
```

---

### Content With Image Block

**Heading:**
```
WHY DO I WORK WITH FIRST TIME HOME BUYERS
```

**Content:**
```
I spend thousands of $$$ in educating myself on real-estate matters, so that I can make more money for my clients over the next 3 decades. However, I only work with First time home buyers and First time Investors, because I believe that they require the most amount of guidance in what is the most EXPENSIVE life decision.

I have a WIN-WIN job now! Let me be your inside guy ;-)
```

**Link:** Book a Call → `/pages/contact`
**Image Position:** Right

---

### Person Card Block

**Text:**
```
Each member of our team has been handpicked because they share my values - doing the right thing 100% of the time, even if it means you choose NOT to work with us. Our goal is to help you succeed over the next 30 years, rather than make a quick buck at your expense.
```

**Person Name:** Ram Singh
**Person Job:** Founder & Licensed Mortgage Agent
**Person Bio:** Mortgage Lic #M21004312

---

### FAQ Block

**Heading:** Frequently Asked Questions

**FAQ 1:**
```
Q: How much does it cost to work with you?
A: All this for $0 to you. Lenders pay us directly, so you get expert guidance at no cost.
```

**FAQ 2:**
```
Q: What makes you different from going directly to my bank?
A: The bank provides you with a rate, and that's it. We guide you through the entire process end-to-end, connect you to the best people in our network (realtors, lawyers, inspectors) and shop the BEST rate for you across all lenders.
```

**FAQ 3:**
```
Q: What is Grow Nation?
A: Once you close the mortgage with us, you will be part of my inner circle "Grow Nation" - it's an exclusive invite-only platform for clients to retire them well & early. I will make that plan with you 1 on 1.
```

**FAQ 4:**
```
Q: Do you only work in Toronto?
A: I primarily serve the Greater Toronto Area (GTA), including Toronto, Mississauga, Brampton, Markham, Vaughan, and surrounding communities.
```

**FAQ 5:**
```
Q: How long does the mortgage process take?
A: Pre-approval can be completed in 1-2 days. Full approval typically takes 5-10 business days, depending on the lender and your situation.
```

---

### Newsletter Block

**Heading:**
```
Join the 1% Newsletter
```

**Text:**
```
Get exclusive mortgage insights, market updates, and wealth-building strategies delivered to your inbox. Join hundreds of successful homeowners and investors.
```

**Placeholder:** your@email.com
**Label:** Subscribe Now

---

## 📄 Create New Pages

Go to **Content Manager** → **Collection Types** → **Pages** → **Create New Entry**

### Page 1: About

**Title:** About Mortgages by Ram
**Slug:** about
**Description:** Learn about Ram Singh and the Mortgages by Ram team. Your trusted Toronto mortgage experts.

**Add Blocks:**

1. **Hero Block**
   - Heading: About Mortgages by Ram
   - Text: Your trusted partner in Toronto real estate and mortgage solutions

2. **Content with Image Block**
   - Heading: Our Story
   - Content: With over 8 years of experience in Toronto's mortgage industry, I've helped hundreds of families and investors secure their dream homes. My approach combines market expertise with personalized service to deliver the best possible outcomes for my clients.

3. **Markdown Block**
   ```
   ## Why Choose Us?

   - **Licensed & Certified** - Mortgage Lic #M21004312, FSRA #12403
   - **Access to 50+ Lenders** - We shop the best rate for you
   - **Personalized Service** - From application to closing
   - **Toronto Market Expertise** - Deep local knowledge
   - **Exclusive Grow Nation** - Wealth-building community for clients
   ```

---

### Page 2: Contact

**Title:** Contact Us
**Slug:** contact
**Description:** Get in touch with Mortgages by Ram. Book your free consultation today.

**Add Blocks:**

1. **Hero Block**
   - Heading: Book Your Free Consultation
   - Text: Ready to start your homeownership journey? Let's talk about your goals and create a personalized mortgage plan.

2. **Markdown Block**
   ```
   ## Get In Touch

   ### Office Hours
   Monday - Friday: 9:00 AM - 7:00 PM
   Saturday: 10:00 AM - 4:00 PM
   Sunday: By Appointment

   ### Contact Information
   📧 Email: ram@mortgagesbyram.com
   📱 Phone: (416) 555-0123
   📍 Location: Toronto, ON
   ```

---

### Page 3: First-Time Buyers

**Title:** First-Time Home Buyers
**Slug:** first-time-buyers
**Description:** Expert mortgage guidance for first-time home buyers in Toronto.

**Add Blocks:**

1. **Hero Block**
   - Heading: First-Time Home Buyer Experts
   - Text: Navigate the home buying process with confidence. Get pre-approved, understand your budget, and secure your first home with expert guidance.
   - Link: Book Consultation → /pages/contact

2. **Markdown Block**
   ```
   ## The Process

   ### Step 1: Free Consultation
   We'll discuss your goals, budget, and timeline.

   ### Step 2: Pre-Approval
   Get pre-approved to know exactly what you can afford.

   ### Step 3: House Hunting
   Work with our network of trusted realtors.

   ### Step 4: Mortgage Application
   We handle all the paperwork and shop 50+ lenders.

   ### Step 5: Close Your Home
   Move into your dream home with confidence.

   ### Step 6: Join Grow Nation
   Access exclusive wealth-building resources.
   ```

---

### Page 4: Refinancing

**Title:** Refinancing Solutions
**Slug:** refinancing
**Description:** Lower your payments, consolidate debt, or access home equity.

**Add Blocks:**

1. **Hero Block**
   - Heading: Refinancing Solutions
   - Text: Lower your monthly payments, consolidate debt, or access home equity. Find the best refinancing options tailored to your financial goals.
   - Link: Check Your Options → /pages/contact

---

### Page 5: Investment Properties

**Title:** Investment Properties
**Slug:** investment-properties
**Description:** Build your real estate portfolio with competitive rates.

**Add Blocks:**

1. **Hero Block**
   - Heading: Investment Property Mortgages
   - Text: Build your real estate portfolio with competitive investment property mortgage rates. Expert advice for both new and experienced investors.
   - Link: Start Investing → /pages/contact

---

### Page 6: Commercial Mortgages

**Title:** Commercial Mortgages
**Slug:** commercial-mortgages
**Description:** Secure financing for your business property needs.

**Add Blocks:**

1. **Hero Block**
   - Heading: Commercial Mortgages
   - Text: Secure financing for your business property needs. From small commercial spaces to large developments, we have the solutions.
   - Link: Get Started → /pages/contact

---

### Page 7-9: Legal Pages

Create similar simple pages for:
- **Privacy Policy** (slug: `privacy-policy`)
- **Terms of Service** (slug: `terms-of-service`)
- **Disclaimer** (slug: `disclaimer`)

Use Markdown blocks with basic legal text.

---

## 🎨 Global Settings

Go to **Content Manager** → **Single Types** → **Global**

**Title:**
```
Mortgages by Ram
```

**Description:**
```
Your trusted Toronto mortgage agent helping first-time buyers, families, and investors secure the best mortgage rates with personalized service.
```

---

## ✅ After Updating

1. **Save** each page
2. **Publish** each page
3. View your site at http://localhost:5173
4. Check all navigation links work
5. Test on mobile and desktop

---

## 📸 Add Images

1. Go to **Media Library**
2. Upload professional photos
3. Go back to content and add images to blocks
4. Recommended images:
   - Professional headshot for Person Card
   - Home/property images for Hero blocks
   - Team photos for About page
   - Toronto skyline for backgrounds

---

**Pro Tip:** Update content gradually. Start with the landing page hero, then services, then create additional pages as needed.

