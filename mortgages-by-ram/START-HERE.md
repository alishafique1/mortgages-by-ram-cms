# 🚀 START HERE - Deploy to cPanel

## Welcome!

This guide will get your Mortgages by Ram website deployed to cPanel in the simplest way possible.

---

## 🎯 Choose Your Deployment Method

### Option 1: Using Git (Easiest for Updates) ⭐ RECOMMENDED

**If you have SSH access to your cPanel:**

```bash
# 1. SSH into your cPanel
ssh your-cpanel-username@yourdomain.com

# 2. Clone your repository
git clone https://github.com/yourusername/MortgagesbyRam.git
cd MortgagesbyRam/mortgages-by-ram

# 3. Generate security keys
node generate-keys.js

# 4. Create environment files (copy the output from step 3)
nano server/.env    # Paste configuration here
nano client/.env    # Add your domain here

# 5. Install and build
cd server
npm install
npm run build

cd ../client
npm install
npm run build

# 6. Setup Node.js apps in cPanel (see guide below)
```

**➡️ Full guide:** [GIT-DEPLOYMENT-GUIDE.md](./GIT-DEPLOYMENT-GUIDE.md)

---

### Option 2: Upload Files (Works Without SSH)

**If you don't have SSH or prefer using File Manager:**

```bash
# 1. On your local computer, generate keys
node generate-keys.js

# 2. Create .env files (see ENV-TEMPLATE.md)
# Create server/.env with generated keys
# Create client/.env with your domain

# 3. Build everything
./build-for-production.sh

# 4. Create upload archives
./create-deployment-archives.sh

# 5. Login to cPanel → File Manager
# Upload the .zip files from deployment-files/ folder
# Extract both files

# 6. Setup Node.js apps in cPanel (see guide below)
```

**➡️ Full guide:** [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

---

## ⚙️ Setting Up Node.js Apps in cPanel

After you have your files on the server (via Git or upload):

### Backend Application (Strapi)

1. **cPanel → Setup Node.js App → Create Application**

2. **Fill in:**
   - Node.js Version: **20.x**
   - Application Root: `/home/username/mortgages-by-ram/mortgages-by-ram/server`
   - Application URL: **api.yourdomain.com** (your subdomain)
   - Startup File: **dist/src/index.js**

3. **Add Environment Variables** (click "Add Variable" for each):
   ```
   HOST=0.0.0.0
   PORT=1337
   NODE_ENV=production
   APP_KEYS=<your-generated-keys>
   API_TOKEN_SALT=<your-generated-key>
   ADMIN_JWT_SECRET=<your-generated-key>
   TRANSFER_TOKEN_SALT=<your-generated-key>
   JWT_SECRET=<your-generated-key>
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   ```

4. **Click "Create"** then **"Start Application"**

---

### Frontend Application (React Router)

1. **Setup Node.js App → Create Application**

2. **Fill in:**
   - Node.js Version: **20.x**
   - Application Root: `/home/username/mortgages-by-ram/mortgages-by-ram/client`
   - Application URL: **yourdomain.com** (your main domain)
   - Startup File: **build/server/index.js**

3. **Add Environment Variables:**
   ```
   PORT=3000
   NODE_ENV=production
   VITE_STRAPI_URL=https://api.yourdomain.com
   ```

4. **Click "Create"** then **"Start Application"**

---

## ✅ Verify Deployment

### Test Backend:
Visit: `https://api.yourdomain.com/admin`
- Should see Strapi admin login
- Create your first admin user

### Test Frontend:
Visit: `https://yourdomain.com`
- Should see your website
- Content should load from Strapi

---

## 🆘 Need Help?

### If something doesn't work:

1. **Check the logs:**
   - cPanel → Node.js App Manager → View Logs

2. **Common fixes:**
   - Restart the application
   - Check environment variables match your .env files
   - Verify file paths are correct
   - Run "NPM Install" again

3. **Detailed guides:**
   - [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) - Step-by-step checklist
   - [CPANEL-CONFIGURATION.md](./CPANEL-CONFIGURATION.md) - cPanel troubleshooting
   - [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) - Complete guide

---

## 📚 All Documentation

| File | Purpose |
|------|---------|
| **[START-HERE.md](./START-HERE.md)** | Quick start (this file) |
| **[DEPLOYMENT-README.md](./DEPLOYMENT-README.md)** | Documentation index |
| **[DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)** | Interactive checklist |
| **[GIT-DEPLOYMENT-GUIDE.md](./GIT-DEPLOYMENT-GUIDE.md)** | Deploy via Git |
| **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** | Complete guide |
| **[QUICK-DEPLOY.md](./QUICK-DEPLOY.md)** | Quick reference |
| **[CPANEL-CONFIGURATION.md](./CPANEL-CONFIGURATION.md)** | cPanel details |
| **[ENV-TEMPLATE.md](./ENV-TEMPLATE.md)** | Environment setup |
| **[DEPLOYMENT-SUMMARY.md](./DEPLOYMENT-SUMMARY.md)** | What was created |

---

## 🎉 That's It!

You're ready to deploy. Pick your method above and follow the steps.

**Total time:** About 45-75 minutes for first deployment

**Questions?** Check the detailed guides linked above.

**Good luck! 🚀**

