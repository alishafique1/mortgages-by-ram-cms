restart # 🔄 Restart Strapi to Load Contact Form Component

## The Issue

The contact-form component exists in your server files, but Strapi hasn't loaded it yet because the server was running when it was created.

## Solution: Restart Strapi

### Step 1: Stop Strapi Server

In the terminal where Strapi is running, press:
```
Ctrl + C
```

### Step 2: Restart Strapi

```bash
cd /Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram/server
yarn develop
```

### Step 3: Wait for Strapi to Rebuild

You'll see messages like:
```
Building admin panel...
✔ Building build context
✔ Admin built successfully in X seconds
```

### Step 4: Verify Component is Loaded

1. Go to http://localhost:1337/admin
2. Go to **Content Manager** → **Landing Page**
3. Click **Add Component** → **Select a component**
4. You should now see **Contact Form** in the list! ✅

---

## After Restart

Once Strapi restarts with the new component:

### Option 1: Add Via Admin (Easy)
1. Go to Content Manager → Landing Page
2. Click "Add a component" 
3. Select "Contact Form"
4. Fill in:
   - Heading: "Ready to Get Started?"
   - Subheading: "Book your free consultation today..."
   - Button Text: "Book Your Free Consultation"
   - Show Phone: ✓
   - Show Message: ✓
5. **Save & Publish**

### Option 2: Run the Script
```bash
node add-contact-form-interactive.js
```

---

## After Adding Contact Form

1. **Refresh your frontend** at http://localhost:5173
2. **Click "Get Pre-Approved Now"** button
3. **It will scroll smoothly** to the contact form
4. **Test the form!**

---

**Important:** Always restart Strapi after adding new component schemas!

