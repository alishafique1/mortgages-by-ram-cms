# 🚀 Deployment Documentation

Complete guide for deploying Mortgages by Ram to cPanel.

---

## 📚 Documentation Index

This project includes comprehensive deployment documentation:

### 🎯 Start Here

**New to deployment?** Start with these files in order:

1. **[DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)** - Step-by-step checklist
   - Use this as your main guide
   - Check off each step as you complete it
   - Ensures nothing is missed

2. **[QUICK-DEPLOY.md](./QUICK-DEPLOY.md)** - Quick reference guide
   - Fast command reference
   - Perfect for repeat deployments
   - Quick lookup for common tasks

### 📖 Detailed Guides

3. **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** - Complete deployment guide
   - Comprehensive step-by-step instructions
   - Troubleshooting section
   - Best practices and security notes

4. **[GIT-DEPLOYMENT-GUIDE.md](./GIT-DEPLOYMENT-GUIDE.md)** - Deploy using Git
   - Clone repository directly to cPanel
   - SSH and Git setup instructions
   - Automated deployment with webhooks

5. **[CPANEL-CONFIGURATION.md](./CPANEL-CONFIGURATION.md)** - cPanel-specific guide
   - Detailed cPanel interface walkthrough
   - Node.js App Manager instructions
   - Common issues and solutions

6. **[ENV-TEMPLATE.md](./ENV-TEMPLATE.md)** - Environment configuration
   - Environment variable templates
   - Security key generation
   - Configuration examples

### 🛠️ Helper Scripts

7. **[generate-keys.js](./generate-keys.js)** - Generate security keys
   ```bash
   node generate-keys.js
   ```

8. **[build-for-production.sh](./build-for-production.sh)** - Build both apps
   ```bash
   ./build-for-production.sh
   ```

9. **[create-deployment-archives.sh](./create-deployment-archives.sh)** - Create zip files
   ```bash
   ./create-deployment-archives.sh
   ```

---

## 🎯 Quick Start

### For First-Time Deployment

#### Option A: Deploy via Git (Recommended)

```bash
# 1. Push your code to Git repository (GitHub, GitLab, etc.)
git push origin main

# 2. SSH into cPanel and clone
ssh username@yourdomain.com
git clone https://github.com/yourusername/MortgagesbyRam.git
cd MortgagesbyRam/mortgages-by-ram

# 3. Generate keys and create .env files
node generate-keys.js
# Create server/.env and client/.env

# 4. Build and setup
cd server && npm install && npm run build
cd ../client && npm install && npm run build

# 5. Configure in cPanel Node.js App Manager
```

**Full instructions:** See [GIT-DEPLOYMENT-GUIDE.md](./GIT-DEPLOYMENT-GUIDE.md)

#### Option B: Deploy via File Upload

```bash
# 1. Generate security keys
node generate-keys.js

# 2. Create environment files (use the output from step 1)
# Create server/.env and client/.env (see ENV-TEMPLATE.md)

# 3. Build applications
./build-for-production.sh

# 4. Create deployment archives
./create-deployment-archives.sh

# 5. Upload to cPanel and follow DEPLOYMENT-CHECKLIST.md
```

### For Updates/Redeployment

```bash
# 1. Make your changes locally

# 2. Test locally
cd server && yarn dev  # Test backend
cd client && yarn dev  # Test frontend

# 3. Build for production
cd ..
./build-for-production.sh

# 4. Upload changed files to cPanel via FTP/File Manager

# 5. Restart applications in cPanel Node.js App Manager
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                  User's Browser                  │
│              https://yourdomain.com              │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │   Frontend (React)    │
        │   React Router v7     │
        │   SSR Application     │
        │   Port: [cPanel]      │
        └───────────┬───────────┘
                    │
                    │ API Calls
                    ▼
        ┌───────────────────────┐
        │   Backend (Strapi)    │
        │   Strapi CMS v5       │
        │   Node.js API         │
        │   Port: 1337          │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │   Database            │
        │   SQLite or MySQL     │
        └───────────────────────┘
```

---

## 📋 System Requirements

### cPanel Server Requirements

- ✅ Node.js version 18.x, 20.x, or 22.x
- ✅ Node.js App Manager enabled
- ✅ Minimum 512MB RAM per Node.js app (1GB+ recommended)
- ✅ SSL certificate support (AutoSSL or Let's Encrypt)
- ✅ File Manager or FTP/SFTP access
- ⭐ SSH access (optional but helpful)

### Local Development Requirements

- Node.js 18.x, 20.x, or 22.x
- Yarn or npm
- Git (for version control)
- Text editor / IDE

---

## 🗂️ Project Structure

```
mortgages-by-ram/
├── server/                      # Strapi Backend
│   ├── config/                  # Configuration files
│   ├── src/                     # Source code
│   ├── public/                  # Static files & uploads
│   ├── dist/                    # Built code (after yarn build)
│   ├── .tmp/                    # SQLite database location
│   ├── package.json
│   └── .env                     # Environment variables (create this)
│
├── client/                      # React Router Frontend
│   ├── app/                     # Application code
│   │   ├── components/          # React components
│   │   ├── routes/              # Page routes
│   │   └── lib/                 # Utilities
│   ├── build/                   # Built code (after yarn build)
│   ├── package.json
│   └── .env                     # Environment variables (create this)
│
└── Deployment Files (created by this guide):
    ├── DEPLOYMENT-README.md     # This file
    ├── DEPLOYMENT-GUIDE.md      # Complete guide
    ├── DEPLOYMENT-CHECKLIST.md  # Step-by-step checklist
    ├── QUICK-DEPLOY.md          # Quick reference
    ├── CPANEL-CONFIGURATION.md  # cPanel details
    ├── ENV-TEMPLATE.md          # Environment templates
    ├── generate-keys.js         # Key generator script
    ├── build-for-production.sh  # Build script
    └── create-deployment-archives.sh  # Archive script
```

---

## 🔐 Security Considerations

### Before Deployment

- [ ] Generate strong random keys (use `generate-keys.js`)
- [ ] Never commit `.env` files to Git
- [ ] Use HTTPS for all domains (SSL certificates)
- [ ] Set strong admin password in Strapi
- [ ] Review file permissions (755/644)

### After Deployment

- [ ] Change default admin password
- [ ] Configure rate limiting in Strapi
- [ ] Enable proper CORS settings
- [ ] Regularly update dependencies
- [ ] Set up regular backups

**Reference:** See security sections in DEPLOYMENT-GUIDE.md

---

## 🌐 Domain Configuration Options

### Option 1: Subdomain (Recommended)

**Best for:** Most deployments, cleanest setup

- Frontend: `https://yourdomain.com`
- Backend: `https://api.yourdomain.com`

**Pros:**
- Clean separation of concerns
- Easy SSL certificate management
- Professional appearance

---

### Option 2: Same Domain with Ports

**Best for:** Testing, single domain setups

- Frontend: `https://yourdomain.com`
- Backend: `https://yourdomain.com:1337`

**Pros:**
- No subdomain needed
- Simpler DNS setup

**Cons:**
- Port number in URL
- Some firewalls may block custom ports

---

### Option 3: Same Domain with Path (Advanced)

**Best for:** Advanced users, custom configurations

- Frontend: `https://yourdomain.com`
- Backend: `https://yourdomain.com/api`

**Requires:**
- Reverse proxy configuration
- Custom .htaccess rules
- More complex setup

---

## 🧪 Testing Your Deployment

### Backend Tests

```bash
# Check backend is running
curl https://api.yourdomain.com

# Check API endpoint
curl https://api.yourdomain.com/api

# Check admin panel
# Visit: https://api.yourdomain.com/admin
```

### Frontend Tests

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Content loads from backend
- [ ] Images display correctly
- [ ] Forms submit successfully
- [ ] Chatbot functions
- [ ] Mobile responsive
- [ ] No console errors

---

## 🔧 Common Deployment Scenarios

### Scenario 1: Fresh Deployment (First Time)

**Follow this order:**
1. DEPLOYMENT-CHECKLIST.md (all steps)
2. Create first admin user in Strapi
3. Upload content through Strapi admin
4. Test thoroughly

---

### Scenario 2: Code Update (No New Dependencies)

**Quick steps:**
```bash
# 1. Build locally
./build-for-production.sh

# 2. Upload only changed files:
#    - server/dist/ folder
#    - client/build/ folder

# 3. Restart apps in cPanel
```

---

### Scenario 3: Dependency Update

**Steps:**
```bash
# 1. Update package.json locally
# 2. Test locally
# 3. Build
./build-for-production.sh

# 4. Upload:
#    - package.json
#    - All built files

# 5. In cPanel Node.js App Manager:
#    - Run "NPM Install"
#    - Restart application
```

---

### Scenario 4: Environment Variable Change

**Steps:**
1. Go to cPanel → Node.js App Manager
2. Find your application
3. Update environment variables
4. Click "Save"
5. Restart application
6. Test changes

---

### Scenario 5: Database Migration (SQLite to MySQL)

**Steps:**
1. Create MySQL database in cPanel
2. Export data from Strapi (JSON)
3. Update backend environment variables
4. Install `mysql2` package
5. Restart backend
6. Import data via Strapi admin

**Reference:** See ENV-TEMPLATE.md for MySQL configuration

---

## 📊 Monitoring & Maintenance

### Regular Tasks

**Daily:**
- Check application status in cPanel
- Monitor error logs

**Weekly:**
- Review performance metrics
- Check disk space usage
- Backup database

**Monthly:**
- Update dependencies
- Review security settings
- Test all functionality
- Backup entire application

---

## 🆘 Getting Help

### Self-Help Resources

1. **Check logs first:**
   - cPanel → Node.js App Manager → View Logs
   - Look for error messages

2. **Review documentation:**
   - Start with DEPLOYMENT-GUIDE.md troubleshooting section
   - Check CPANEL-CONFIGURATION.md for common issues

3. **Common fixes:**
   - Restart the application
   - Re-run NPM Install
   - Check environment variables
   - Verify file permissions

### Support Channels

1. **Hosting Provider:** For cPanel/server issues
2. **Strapi Community:** For Strapi-specific questions
3. **React Router Docs:** For frontend issues

---

## 📝 Deployment Checklist Summary

Essential items before going live:

- [ ] Environment files created with secure keys
- [ ] Applications built successfully
- [ ] Files uploaded to cPanel
- [ ] Node.js apps configured and running
- [ ] SSL certificates active
- [ ] Backend accessible and admin created
- [ ] Frontend loads and connects to backend
- [ ] Content added to Strapi
- [ ] All features tested
- [ ] Performance acceptable
- [ ] Backups configured

**Full checklist:** See DEPLOYMENT-CHECKLIST.md

---

## 🎉 Success Indicators

You'll know deployment was successful when:

✅ Both applications show "Running" status in cPanel  
✅ Frontend website loads at your domain  
✅ Backend admin panel accessible  
✅ Content from Strapi displays on frontend  
✅ Images load correctly  
✅ Forms work and submit data  
✅ Chatbot responds  
✅ No errors in browser console  
✅ SSL certificates active (padlock in browser)  

---

## 📞 Contact & Support

**Project:** Mortgages by Ram  
**Agency:** Social Dots - Digital Media Agency  
**Location:** Toronto, Canada

For deployment assistance, refer to the documentation files or contact your hosting provider's support team.

---

## 🔄 Document Version

**Version:** 1.0  
**Last Updated:** October 2025  
**Compatible With:**
- Strapi 5.x
- React Router 7.x
- Node.js 18.x - 22.x
- cPanel with Node.js App Manager

---

**🎊 Ready to Deploy?**

Start with [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) and follow each step carefully. Good luck! 🚀

