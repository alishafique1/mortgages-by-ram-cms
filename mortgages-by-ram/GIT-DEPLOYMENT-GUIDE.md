# Git Deployment to cPanel Guide

Complete guide for deploying Mortgages by Ram using Git on cPanel.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Method 1: Using cPanel Git Version Control](#method-1-using-cpanel-git-version-control)
3. [Method 2: Using SSH and Git Clone](#method-2-using-ssh-and-git-clone)
4. [Post-Clone Setup](#post-clone-setup)
5. [Updating Your Deployment](#updating-your-deployment)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- [ ] Git repository (GitHub, GitLab, Bitbucket, etc.)
- [ ] Repository is pushed to remote
- [ ] cPanel login credentials
- [ ] SSH access to cPanel (recommended but not always required)
- [ ] Node.js App Manager available in cPanel

---

## Method 1: Using cPanel Git Version Control

This method uses cPanel's built-in Git interface (no SSH required).

### Step 1: Create Git Deployment in cPanel

1. **Log into cPanel**
2. **Find "Git Version Control"** (under Files section)
3. **Click "Create"**

### Step 2: Configure Repository

Fill in the form:

**Clone a Repository:**
```
Repository URL: https://github.com/yourusername/MortgagesbyRam.git
# Or use SSH: git@github.com:yourusername/MortgagesbyRam.git
```

**Repository Path:**
```
/home/username/mortgages-by-ram
```

**Repository Name:**
```
mortgages-by-ram
```

**Branch:** (optional, defaults to main/master)
```
main
```

**Click "Create"**

### Step 3: Manage Authentication

**For HTTPS (Public Repos):**
- No additional setup needed for public repositories

**For HTTPS (Private Repos):**
- You'll need to enter username and password
- Or use Personal Access Token as password

**For SSH:**
1. Generate SSH key in cPanel (Terminal or SSH Access section)
2. Add public key to your Git provider (GitHub/GitLab)
3. Use SSH URL format

### Step 4: Pull the Repository

1. After creating, you'll see your repository listed
2. Click "Manage"
3. Click "Pull or Deploy" tab
4. Click "Update from Remote" to pull latest code

### Step 5: Navigate to Project Directories

Your code is now at:
```
/home/username/mortgages-by-ram/mortgages-by-ram/
```

The structure will be:
```
/home/username/mortgages-by-ram/
└── mortgages-by-ram/
    ├── server/      # Backend
    ├── client/      # Frontend
    └── (other files)
```

---

## Method 2: Using SSH and Git Clone

This method uses SSH terminal access (more flexible).

### Step 1: Enable SSH Access

1. **Check if SSH is available:**
   - cPanel → SSH Access
   - If not available, contact hosting provider

2. **Get SSH credentials:**
   - Username: Your cPanel username
   - Host: Usually shown in cPanel (e.g., `yourdomain.com` or IP)
   - Port: Usually 22

### Step 2: Connect via SSH

**Using Terminal (Mac/Linux):**
```bash
ssh username@yourdomain.com
# Enter password when prompted
```

**Using PuTTY (Windows):**
- Download PuTTY
- Enter host and port
- Click "Open"
- Enter credentials

### Step 3: Clone Repository

Once connected to SSH:

```bash
# Navigate to home directory
cd ~

# Clone your repository
git clone https://github.com/yourusername/MortgagesbyRam.git

# Or using SSH (if you set up SSH keys):
git clone git@github.com:yourusername/MortgagesbyRam.git

# Navigate into project
cd MortgagesbyRam/mortgages-by-ram
```

### Step 4: Verify Clone

```bash
# Check directory structure
ls -la

# You should see:
# - server/
# - client/
# - README.md
# - etc.
```

---

## Post-Clone Setup

After cloning via either method, follow these steps:

### Step 1: Create Environment Files

**Create server/.env:**

```bash
cd ~/mortgages-by-ram/mortgages-by-ram/server

# Create .env file
cat > .env << 'EOF'
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Generate these keys using: node -e "for(let i=0;i<5;i++) console.log(require('crypto').randomBytes(32).toString('base64'))"
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=key5
ADMIN_JWT_SECRET=key1
TRANSFER_TOKEN_SALT=key2
JWT_SECRET=key3

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
EOF
```

**IMPORTANT:** Replace the placeholder keys with actual generated keys:

```bash
# Generate secure keys
node -e "for(let i=0;i<5;i++) console.log(require('crypto').randomBytes(32).toString('base64'))"

# Then edit the file
nano .env
# (or use vi, vim, etc.)
```

**Create client/.env:**

```bash
cd ~/mortgages-by-ram/mortgages-by-ram/client

cat > .env << 'EOF'
NODE_ENV=production
VITE_STRAPI_URL=https://api.yourdomain.com
EOF

# Update with your actual domain
nano .env
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd ~/mortgages-by-ram/mortgages-by-ram/server

# Install dependencies
npm install --production=false

# Build the application
npm run build

# Verify build
ls -la dist/
# Should see dist/src/index.js
```

**Frontend:**
```bash
cd ~/mortgages-by-ram/mortgages-by-ram/client

# Install dependencies
npm install --production=false

# Build the application
npm run build

# Verify build
ls -la build/
# Should see build/server/index.js
```

### Step 3: Set File Permissions

```bash
cd ~/mortgages-by-ram/mortgages-by-ram

# Set directory permissions
find server -type d -exec chmod 755 {} \;
find client -type d -exec chmod 755 {} \;

# Set file permissions
find server -type f -exec chmod 644 {} \;
find client -type f -exec chmod 644 {} \;

# Ensure writable directories
chmod -R 755 server/.tmp
chmod -R 755 server/public/uploads

# Create .tmp if it doesn't exist
mkdir -p server/.tmp
mkdir -p server/public/uploads
```

### Step 4: Setup Node.js Applications in cPanel

Now configure the Node.js apps in cPanel (same as other deployment methods).

#### Backend Setup:

1. Go to cPanel → Setup Node.js App
2. Click "Create Application"

**Configuration:**
- **Node.js Version:** 18.x or 20.x
- **Application Mode:** Production
- **Application Root:** `/home/username/mortgages-by-ram/mortgages-by-ram/server`
- **Application URL:** `api.yourdomain.com` (or your subdomain)
- **Application Startup File:** `dist/src/index.js`

**Environment Variables** (add all these):
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

3. Click "Create"
4. Click "Run NPM Install" (if not already done)
5. Click "Start Application"

#### Frontend Setup:

1. Click "Create Application" again

**Configuration:**
- **Node.js Version:** Same as backend (18.x or 20.x)
- **Application Mode:** Production
- **Application Root:** `/home/username/mortgages-by-ram/mortgages-by-ram/client`
- **Application URL:** `yourdomain.com` (your main domain)
- **Application Startup File:** `build/server/index.js`

**Environment Variables:**
```
PORT=3000
NODE_ENV=production
VITE_STRAPI_URL=https://api.yourdomain.com
```

3. Click "Create"
4. Click "Run NPM Install" (if not already done)
5. Click "Start Application"

### Step 5: Verify Deployment

```bash
# Check if applications are running
ps aux | grep node

# Check backend
curl http://localhost:1337

# Check logs
tail -f ~/logs/nodejs-app-backend.log
```

Or via browser:
- Backend: `https://api.yourdomain.com/admin`
- Frontend: `https://yourdomain.com`

---

## Updating Your Deployment

When you make changes and want to update the live site:

### Method 1: Via cPanel Git Interface

1. Log into cPanel
2. Go to "Git Version Control"
3. Find your repository
4. Click "Manage"
5. Click "Pull or Deploy"
6. Click "Update from Remote"

Then rebuild if needed:

```bash
# SSH into server
ssh username@yourdomain.com

# Rebuild backend (if code changed)
cd ~/mortgages-by-ram/mortgages-by-ram/server
npm run build

# Rebuild frontend (if code changed)
cd ~/mortgages-by-ram/mortgages-by-ram/client
npm run build
```

Finally, restart apps in cPanel Node.js App Manager.

### Method 2: Via SSH

```bash
# SSH into server
ssh username@yourdomain.com

# Navigate to project
cd ~/mortgages-by-ram/mortgages-by-ram

# Pull latest changes
git pull origin main

# If dependencies changed, reinstall
cd server
npm install
npm run build

cd ../client
npm install
npm run build
```

Then restart applications in cPanel Node.js App Manager.

---

## Setting Up SSH Keys for Git (Recommended)

To avoid entering password every time:

### Step 1: Generate SSH Key on Server

```bash
# SSH into cPanel
ssh username@yourdomain.com

# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter to accept default location
# Press Enter twice for no passphrase (or set one)

# Display public key
cat ~/.ssh/id_ed25519.pub
```

### Step 2: Add Key to Git Provider

**GitHub:**
1. Go to Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste the public key
4. Click "Add SSH key"

**GitLab:**
1. Go to Preferences → SSH Keys
2. Paste the public key
3. Click "Add key"

**Bitbucket:**
1. Go to Personal settings → SSH keys
2. Click "Add key"
3. Paste the public key

### Step 3: Test Connection

```bash
# Test GitHub
ssh -T git@github.com

# Test GitLab
ssh -T git@gitlab.com

# Test Bitbucket
ssh -T git@bitbucket.org
```

### Step 4: Clone with SSH

```bash
# Now you can clone without password
git clone git@github.com:yourusername/MortgagesbyRam.git
```

---

## Automated Deployment with Webhooks (Advanced)

Set up automatic deployment when you push to Git:

### Step 1: Create Deployment Script

```bash
cd ~/mortgages-by-ram/mortgages-by-ram

# Create deploy script
cat > deploy.sh << 'EOF'
#!/bin/bash

# Navigate to project
cd ~/mortgages-by-ram/mortgages-by-ram

# Pull latest changes
git pull origin main

# Update backend
cd server
npm install --production
npm run build

# Update frontend
cd ../client
npm install --production
npm run build

echo "Deployment completed at $(date)"
EOF

# Make executable
chmod +x deploy.sh
```

### Step 2: Setup Webhook in cPanel

1. Go to cPanel → Git Version Control
2. Find your repository
3. Click "Manage"
4. Go to "Pull or Deploy" tab
5. Enable "Deploy HEAD commit"
6. Add post-pull command: `/home/username/mortgages-by-ram/mortgages-by-ram/deploy.sh`

### Step 3: Configure Webhook in Git Provider

**GitHub:**
1. Go to repository Settings → Webhooks
2. Click "Add webhook"
3. Paste webhook URL from cPanel
4. Select "Just the push event"
5. Click "Add webhook"

Now every time you push to main branch, it will auto-deploy!

---

## Troubleshooting

### Issue: Clone Failed - Permission Denied

**Solution:**
- Check if you have correct permissions
- Verify SSH keys are set up correctly
- Try HTTPS instead of SSH

### Issue: Can't Pull Updates - Dirty Working Directory

```bash
# Stash local changes
git stash

# Pull updates
git pull origin main

# Apply stashed changes (if needed)
git stash pop
```

### Issue: Node Modules Not Found After Clone

```bash
# Reinstall dependencies
cd server
rm -rf node_modules
npm install

cd ../client
rm -rf node_modules
npm install
```

### Issue: Build Fails After Clone

```bash
# Check Node.js version
node --version

# Should be 18.x, 20.x, or 22.x
# If wrong version, use nvm or contact hosting

# Clean and rebuild
cd server
rm -rf dist
npm run build

cd ../client
rm -rf build
npm run build
```

### Issue: Can't Write to .tmp Directory

```bash
# Create and set permissions
cd ~/mortgages-by-ram/mortgages-by-ram/server
mkdir -p .tmp
chmod 755 .tmp

# Check ownership
ls -la | grep .tmp
```

### Issue: Git Not Installed

Contact your hosting provider to install Git on the server.

---

## Security Best Practices

1. **Never commit .env files:**
   ```bash
   # Verify .gitignore includes .env
   cat .gitignore | grep .env
   ```

2. **Use SSH keys instead of passwords**

3. **Use private repositories for production code**

4. **Regularly update dependencies:**
   ```bash
   npm audit fix
   ```

5. **Don't commit node_modules** (already in .gitignore)

---

## Quick Reference

### Initial Deployment via Git:

```bash
# 1. Clone repository
git clone https://github.com/yourusername/MortgagesbyRam.git
cd MortgagesbyRam/mortgages-by-ram

# 2. Create environment files
cd server && nano .env    # Add your config
cd ../client && nano .env # Add your config

# 3. Build applications
cd server && npm install && npm run build
cd ../client && npm install && npm run build

# 4. Setup in cPanel Node.js App Manager (via web interface)

# 5. Start applications
```

### Update Deployment:

```bash
# 1. Pull changes
cd ~/mortgages-by-ram/mortgages-by-ram
git pull origin main

# 2. Rebuild
cd server && npm install && npm run build
cd ../client && npm install && npm run build

# 3. Restart apps in cPanel
```

---

## Summary Checklist

- [ ] Clone repository to cPanel (via Git UI or SSH)
- [ ] Create `.env` files for server and client
- [ ] Generate secure keys for Strapi
- [ ] Install dependencies (`npm install`)
- [ ] Build applications (`npm run build`)
- [ ] Set correct file permissions (755/644)
- [ ] Create Node.js apps in cPanel
- [ ] Set environment variables in cPanel
- [ ] Start both applications
- [ ] Test backend and frontend
- [ ] Setup SSL certificates
- [ ] Configure DNS/domains

---

## Additional Resources

- [GitHub SSH Keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [GitLab SSH Keys](https://docs.gitlab.com/ee/user/ssh.html)
- [cPanel Git Documentation](https://docs.cpanel.net/cpanel/files/git-version-control/)

---

**Need more help?** Refer to:
- [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) - Complete deployment guide
- [CPANEL-CONFIGURATION.md](./CPANEL-CONFIGURATION.md) - cPanel setup details
- [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) - Step-by-step checklist

---

**Ready to deploy via Git?** Follow the steps above and you'll have your site running in no time! 🚀

