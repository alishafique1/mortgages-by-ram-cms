# cPanel Deployment Checklist

Use this checklist to ensure you complete all steps for a successful deployment.

---

## 🎯 Pre-Deployment Checklist

### Local Setup

- [ ] Node.js 18.x, 20.x, or 22.x installed locally
- [ ] Yarn or npm installed
- [ ] All code changes committed to Git
- [ ] Application tested locally
- [ ] All dependencies up to date

### cPanel Account Ready

- [ ] cPanel login credentials available
- [ ] Node.js App Manager available in cPanel
- [ ] Domain/subdomain configured in cPanel
- [ ] FTP/SFTP credentials or File Manager access
- [ ] SSH access (optional, but helpful)

---

## 🔑 Step 1: Generate Security Keys

- [ ] Run `node generate-keys.js` to generate secure keys
- [ ] Save generated keys in a secure location
- [ ] **DO NOT** commit keys to Git

---

## 📝 Step 2: Create Environment Files

### Server Environment

- [ ] Create `server/.env` file
- [ ] Add `HOST=0.0.0.0`
- [ ] Add `PORT=1337`
- [ ] Add `NODE_ENV=production`
- [ ] Add all generated security keys (APP_KEYS, JWT_SECRET, etc.)
- [ ] Configure database settings (SQLite or MySQL)
- [ ] Verify all required variables are present

### Client Environment

- [ ] Create `client/.env` file
- [ ] Add `NODE_ENV=production`
- [ ] Add `VITE_STRAPI_URL` with your actual domain
- [ ] Verify URL is correct (https://)

**Reference:** See [ENV-TEMPLATE.md](./ENV-TEMPLATE.md) for templates

---

## 🏗️ Step 3: Build Applications

### Backend Build

- [ ] Navigate to `server/` directory
- [ ] Run `yarn install --production=false`
- [ ] Run `yarn build`
- [ ] Verify `dist/` folder was created
- [ ] Check for build errors

### Frontend Build

- [ ] Navigate to `client/` directory
- [ ] Run `yarn install --production=false`
- [ ] Run `yarn build`
- [ ] Verify `build/` folder was created
- [ ] Check for build errors

**Quick command:** Run `./build-for-production.sh` to build both

---

## 📦 Step 4: Prepare Upload

### Option A: Create Archives

- [ ] Run `./create-deployment-archives.sh`
- [ ] Verify `deployment-files/mortgages-backend.zip` exists
- [ ] Verify `deployment-files/mortgages-frontend.zip` exists

### Option B: Direct Upload

- [ ] Prepare to upload `server/` folder
- [ ] Prepare to upload `client/` folder

---

## ⬆️ Step 5: Upload to cPanel

- [ ] Log into cPanel
- [ ] Open File Manager
- [ ] Navigate to home directory (`/home/username/`)
- [ ] Upload backend archive or folder
- [ ] Upload frontend archive or folder
- [ ] Extract archives (if using zip files)
- [ ] Verify all files uploaded correctly

**Recommended folder names:**
- [ ] Rename `server/` to `mortgages-backend/`
- [ ] Rename `client/` to `mortgages-frontend/`

---

## ⚙️ Step 6: Setup Backend Node.js App

- [ ] Open cPanel → Setup Node.js App
- [ ] Click "Create Application"

### Backend Configuration

- [ ] Select Node.js version (18.x, 20.x, or 22.x)
- [ ] Set Application Mode: Production
- [ ] Set Application Root: `/home/username/mortgages-backend/server`
- [ ] Set Application URL: subdomain (e.g., `api.yourdomain.com`)
- [ ] Set Startup File: `dist/src/index.js`
- [ ] Click "Create"

### Backend Environment Variables

Add each variable in Node.js App Manager:

- [ ] `HOST` = `0.0.0.0`
- [ ] `PORT` = (port assigned by cPanel)
- [ ] `NODE_ENV` = `production`
- [ ] `APP_KEYS` = (your generated keys)
- [ ] `API_TOKEN_SALT` = (your generated key)
- [ ] `ADMIN_JWT_SECRET` = (your generated key)
- [ ] `TRANSFER_TOKEN_SALT` = (your generated key)
- [ ] `JWT_SECRET` = (your generated key)
- [ ] `DATABASE_CLIENT` = `sqlite`
- [ ] `DATABASE_FILENAME` = `.tmp/data.db`

### Backend Dependencies & Start

- [ ] Click "Run NPM Install" button
- [ ] Wait for installation to complete
- [ ] Click "Start Application"
- [ ] Verify application status shows "Running"
- [ ] Check logs for any errors

---

## ⚙️ Step 7: Setup Frontend Node.js App

- [ ] Return to Setup Node.js App
- [ ] Click "Create Application"

### Frontend Configuration

- [ ] Select Node.js version (same as backend)
- [ ] Set Application Mode: Production
- [ ] Set Application Root: `/home/username/mortgages-frontend/client`
- [ ] Set Application URL: main domain (e.g., `yourdomain.com`)
- [ ] Set Startup File: `build/server/index.js`
- [ ] Click "Create"

### Frontend Environment Variables

- [ ] `PORT` = (port assigned by cPanel)
- [ ] `NODE_ENV` = `production`
- [ ] `VITE_STRAPI_URL` = `https://api.yourdomain.com` (your backend URL)

### Frontend Dependencies & Start

- [ ] Click "Run NPM Install" button
- [ ] Wait for installation to complete
- [ ] Click "Start Application"
- [ ] Verify application status shows "Running"
- [ ] Check logs for any errors

---

## 🌐 Step 8: Configure DNS (If Using Subdomain)

- [ ] Go to cPanel → Domains
- [ ] Add subdomain (e.g., `api`)
- [ ] Point subdomain to backend application
- [ ] Wait for DNS propagation (can take a few minutes)

---

## 🔐 Step 9: Enable SSL Certificates

- [ ] Go to cPanel → SSL/TLS Status
- [ ] Enable AutoSSL for main domain
- [ ] Enable AutoSSL for subdomain (if used)
- [ ] Wait for certificate issuance (usually 5-10 minutes)
- [ ] Verify both domains show "Active" SSL status

---

## 🔧 Step 10: Configure File Permissions

Via cPanel File Manager or SSH:

- [ ] Set directory permissions to 755
- [ ] Set file permissions to 644
- [ ] Ensure `.tmp/` directory is writable: `chmod 755`
- [ ] Ensure `public/uploads/` is writable: `chmod 755`

**SSH Commands:**
```bash
find /home/username/mortgages-backend -type d -exec chmod 755 {} \;
find /home/username/mortgages-backend -type f -exec chmod 644 {} \;
chmod -R 755 /home/username/mortgages-backend/server/.tmp
chmod -R 755 /home/username/mortgages-backend/server/public/uploads
```

---

## ✅ Step 11: Test Backend

- [ ] Visit `https://api.yourdomain.com` (or your backend URL)
- [ ] Should see Strapi welcome message or API response
- [ ] Visit `https://api.yourdomain.com/admin`
- [ ] Create first admin user (if fresh database)
- [ ] Log into Strapi admin panel
- [ ] Verify all content types are visible
- [ ] Upload test image to verify media upload works

---

## ✅ Step 12: Test Frontend

- [ ] Visit `https://yourdomain.com` (your main domain)
- [ ] Verify homepage loads correctly
- [ ] Check that content loads from Strapi
- [ ] Test navigation between pages
- [ ] Test articles page and individual article pages
- [ ] Test contact form submission
- [ ] Test chatbot functionality
- [ ] Check console for any errors
- [ ] Test on mobile device/responsive view

---

## 🔍 Step 13: Verify Integration

- [ ] Confirm frontend fetches data from backend
- [ ] Check that images load correctly
- [ ] Verify API calls succeed (check Network tab)
- [ ] No CORS errors in browser console
- [ ] All navigation links work
- [ ] Forms submit successfully

---

## 📊 Step 14: Configure Strapi Content (If Needed)

- [ ] Upload existing media files to Strapi
- [ ] Create/update content in Strapi admin
- [ ] Set correct permissions for public API access
- [ ] Configure any Strapi plugins
- [ ] Test content changes reflect on frontend

---

## 🛡️ Step 15: Security Review

- [ ] SSL certificates active on all domains
- [ ] All environment variables set correctly
- [ ] `.env` files not accessible via web
- [ ] Strong admin password set for Strapi
- [ ] Database credentials secure (if using MySQL)
- [ ] File permissions correct (755/644)
- [ ] No sensitive data in logs
- [ ] Rate limiting configured (optional but recommended)

---

## 📝 Step 16: Documentation

- [ ] Document your domain configuration
- [ ] Save database credentials securely
- [ ] Note any custom configurations made
- [ ] Document backup procedures
- [ ] Save cPanel login information securely

---

## 🎉 Step 17: Post-Deployment

- [ ] Test website with real users
- [ ] Monitor application logs for errors
- [ ] Set up monitoring/uptime checks (optional)
- [ ] Plan regular backups (database + uploads)
- [ ] Schedule regular updates for dependencies

---

## 📞 Support & Troubleshooting

If something isn't working:

1. Check application logs in Node.js App Manager
2. Verify all environment variables are correct
3. Restart applications and try again
4. Review [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) troubleshooting section
5. Contact hosting provider support

---

## 🔄 Future Updates

When you need to update the site:

- [ ] Make changes locally
- [ ] Test changes locally
- [ ] Build applications: `./build-for-production.sh`
- [ ] Upload changed files only
- [ ] Restart applications in Node.js App Manager
- [ ] Test in production

---

**🎊 Congratulations!** Once all items are checked, your website is live!

---

**Date Deployed:** ________________  
**Deployed By:** ________________  
**Backend URL:** ________________  
**Frontend URL:** ________________  
**Notes:** ________________________________________________

