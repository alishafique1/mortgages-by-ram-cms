# Quick Setup Instructions - Add Missing Pages

## Option 1: Using Strapi Admin (Easiest - 10 minutes)

Since the API requires authentication, the fastest way is to create the pages manually in Strapi Admin:

### 1. Create "About" Page

1. Go to http://localhost:1337/admin
2. Navigate to **Content Manager** → **Page** → **Create new entry**
3. Fill in:
   - **Title**: `About Ram Singh`
   - **Slug**: `about`
   - **Description**: `Meet Ram Singh, your trusted Toronto mortgage agent`
4. Click **Add a component to blocks** and add:
   - **Hero** block with heading "Your Trusted Mortgage Partner in Toronto"
   - **Section Heading** block with "Why Choose Ram Singh?"
   - **Card Grid** block with 4 cards (10+ Years, Personalized Service, Best Rates, Licensed)
5. Click **Save** then **Publish**

### 2. Create "Contact" Page

1. **Create new entry** in Pages
2. Fill in:
   - **Title**: `Contact Us`
   - **Slug**: `contact`
   - **Description**: `Get in touch with Ram Singh`
3. Add blocks:
   - **Section Heading**: "Get in Touch"
   - **Card Grid**: 4 cards (Phone, Email, Office Hours, Location)
4. **Save** and **Publish**

### 3. Create "Testimonials" Page

1. **Create new entry** in Pages
2. Fill in:
   - **Title**: `Client Success Stories`
   - **Slug**: `testimonials`
   - **Description**: `Client testimonials and reviews`
3. Add blocks:
   - **Section Heading**: "What Our Clients Say"
   - **Card Grid**: 6 cards with client testimonials
4. **Save** and **Publish**

---

## Option 2: Using API Token (Automated - 5 minutes)

### Step 1: Create API Token

1. Go to http://localhost:1337/admin
2. Click **Settings** (⚙️ icon in sidebar)
3. Under "GLOBAL SETTINGS", click **API Tokens**
4. Click **Create new API Token** button
5. Fill in:
   - **Name**: `Setup Script`
   - **Description**: `Token for automated page creation`
   - **Token duration**: `Unlimited`
   - **Token type**: Select **Full access**
6. Click **Save**
7. **COPY THE TOKEN** immediately (shown only once!)

### Step 2: Run the Script

```bash
cd /Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram

# Replace YOUR_TOKEN with the token you just copied
node add-missing-pages-simple.js YOUR_TOKEN_HERE
```

Example:
```bash
node add-missing-pages-simple.js a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## Option 3: Enable Public API Access (Not Recommended for Production)

### Temporarily allow public page creation:

1. Go to http://localhost:1337/admin
2. Click **Settings** → **Users & Permissions plugin** → **Roles**
3. Click **Public**
4. Scroll to **Page** permissions
5. Check these boxes:
   - ✅ create
   - ✅ find
   - ✅ findOne
6. Click **Save**
7. Run: `node create-pages-now.js`
8. **IMPORTANT**: Go back and uncheck "create" after you're done!

---

## Verify Pages Are Created

After using any method above, visit:
- http://localhost:5174/pages/about
- http://localhost:5174/pages/contact
- http://localhost:5174/pages/testimonials

The navigation will automatically update to show these pages!

---

## Content for Manual Entry

### About Page Cards:
1. **10+ Years Experience** - "Over a decade of helping Toronto residents find perfect mortgage solutions"
2. **Personalized Service** - "Every client gets individual attention and tailored mortgage strategy"
3. **Best Rates Guaranteed** - "Access to 30+ lenders ensures most competitive rates"
4. **Licensed & Insured** - "Fully licensed mortgage agent with comprehensive insurance"

### Contact Page Cards:
1. **📞 Phone** - "(416) 555-0123 - Call or text for immediate assistance"
2. **📧 Email** - "ram@mortgagesbyram.ca - Response within 24 hours"
3. **🕐 Office Hours** - "Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM, Sun: By Appointment"
4. **📍 Location** - "Greater Toronto Area - Serving all of Toronto and surrounding regions"

### Testimonials Page Cards:
1. **Sarah & Michael T.** - "Ram made our first home purchase so easy! ⭐⭐⭐⭐⭐"
2. **Jennifer L.** - "Saved over $300/month by refinancing with Ram's help! ⭐⭐⭐⭐⭐"
3. **David T.** - "As an investor, Ram's knowledge is unmatched! ⭐⭐⭐⭐⭐"
4. **The Patel Family** - "Ram went above and beyond for our dream home! ⭐⭐⭐⭐⭐"
5. **Lisa M.** - "Made self-employed mortgage possible! ⭐⭐⭐⭐⭐"
6. **James & Emily C.** - "Stress-free from pre-approval to closing! ⭐⭐⭐⭐⭐"

---

## Next Steps After Pages Are Created

1. ✅ Verify all pages are published (not draft)
2. 🖼️ Upload images to Media Library
3. ✏️ Add images to page Hero blocks
4. 📝 Update contact information with real details
5. 🧪 Test all navigation links work

---

**Recommended**: Use Option 2 (API Token) for fastest automated setup!
