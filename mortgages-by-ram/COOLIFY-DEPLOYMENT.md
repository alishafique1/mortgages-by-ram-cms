# 🚀 Coolify Deployment Guide - Hostinger VPS

This guide will walk you through deploying your Mortgages by Ram website to a Hostinger VPS using Coolify.

## Table of Contents

1. [What is Coolify?](#what-is-coolify)
2. [Prerequisites](#prerequisites)
3. [Setting Up Coolify on Hostinger VPS](#setting-up-coolify-on-hostinger-vps)
4. [Preparing Your Repository](#preparing-your-repository)
5. [Deploying the Backend (Strapi)](#deploying-the-backend-strapi)
6. [Deploying the Frontend (React Router)](#deploying-the-frontend-react-router)
7. [Domain Configuration](#domain-configuration)
8. [SSL Certificates](#ssl-certificates)
9. [Environment Variables](#environment-variables)
10. [Troubleshooting](#troubleshooting)
11. [Updating Your Application](#updating-your-application)

---

## What is Coolify?

Coolify is an open-source, self-hostable Heroku/Netlify/Vercel alternative. It allows you to deploy applications using Docker with a simple web interface, automatic SSL, and Git integration.

**Key Features:**
- ✅ Docker-based deployments
- ✅ Automatic SSL certificates (Let's Encrypt)
- ✅ Git integration (GitHub, GitLab, Bitbucket)
- ✅ Automatic deployments on Git push
- ✅ Built-in monitoring and logs
- ✅ Easy rollbacks
- ✅ Environment variable management

---

## Prerequisites

### Required
- ✅ Hostinger VPS with Ubuntu 20.04+ or Debian 11+
- ✅ Root or sudo access to your VPS
- ✅ Domain name pointed to your VPS IP
- ✅ Git repository (GitHub/GitLab/Bitbucket)
- ✅ At least 2GB RAM (4GB recommended)
- ✅ 20GB+ disk space

### Recommended VPS Specs
- **Minimum**: 2 vCPU, 2GB RAM, 40GB SSD
- **Recommended**: 2 vCPU, 4GB RAM, 80GB SSD
- **Optimal**: 4 vCPU, 8GB RAM, 160GB SSD

---

## Setting Up Coolify on Hostinger VPS

### Step 1: Access Your VPS

```bash
# SSH into your Hostinger VPS
ssh root@your-vps-ip

# Or if you have a sudo user
ssh your-username@your-vps-ip
```

### Step 2: Update System

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install required dependencies
sudo apt install -y curl wget git
```

### Step 3: Install Coolify

Coolify has a one-command installer that sets up everything:

```bash
# Run the Coolify installer
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

This will:
- Install Docker and Docker Compose
- Install Coolify and its dependencies
- Set up networking and SSL
- Create a Coolify admin user

**Installation takes 5-10 minutes**

### Step 4: Access Coolify Dashboard

Once installation is complete:

1. **Open your browser** and visit:
   ```
   http://your-vps-ip:8000
   ```

2. **Create your admin account:**
   - Email: your@email.com
   - Password: Choose a strong password
   - Instance Name: "Mortgages by Ram"

3. **Complete the setup wizard**

### Step 5: Configure Coolify (Optional but Recommended)

1. **Settings → General:**
   - Set your instance URL: `https://coolify.yourdomain.com`
   - Enable automatic SSL
   - Set timezone

2. **Settings → Email (Optional):**
   - Configure SMTP for notifications
   - Get alerts on deployment failures

---

## Preparing Your Repository

### Step 1: Push Your Code to Git

Make sure your code is pushed to GitHub, GitLab, or Bitbucket:

```bash
# If not already initialized
cd /Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram
git init
git add .
git commit -m "Initial commit - ready for Coolify deployment"

# Create a repository on GitHub and push
git remote add origin https://github.com/yourusername/MortgagesbyRam.git
git branch -M main
git push -u origin main
```

### Step 2: Verify Dockerfiles

Ensure both Dockerfiles exist:

```bash
# Check server Dockerfile
ls -la server/Dockerfile

# Check client Dockerfile
ls -la client/Dockerfile
```

✅ Both files have been created for you!

### Step 3: Generate Security Keys

```bash
# Generate Strapi security keys
node generate-keys.js
```

**Save the output** - you'll need these for environment variables in Coolify.

---

## Deploying the Backend (Strapi)

### Step 1: Create a New Project in Coolify

1. **Login to Coolify** → Click **"+ Add"** → **"Project"**
2. **Project Name**: `Mortgages by Ram`
3. **Click "Create"**

### Step 2: Add Backend Application

1. **In your project** → Click **"+ Add"** → **"Application"**

2. **Source Configuration:**
   - **Source Type**: Git Repository
   - **Git Provider**: GitHub (or your provider)
   - **Connect your account** (follow OAuth flow)
   - **Select Repository**: `YourUsername/MortgagesbyRam`
   - **Branch**: `main`

3. **Build Configuration:**
   - **Name**: `mortgages-backend`
   - **Build Pack**: Dockerfile
   - **Dockerfile Location**: `server/Dockerfile`
   - **Base Directory**: `mortgages-by-ram/server`
   - **Port**: `1337`

4. **Click "Continue"**

### Step 3: Configure Environment Variables

In the **Environment Variables** section, add:

```env
# Required Strapi Variables
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Security Keys (use your generated keys)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_generated_salt
ADMIN_JWT_SECRET=your_generated_secret
TRANSFER_TOKEN_SALT=your_generated_salt
JWT_SECRET=your_generated_secret

# Database Configuration
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

**Mark as "Build Time"** for any variables needed during build.
**Mark as "Secret"** for sensitive values like API keys.

### Step 4: Configure Persistent Storage

1. **Go to "Storages" tab**
2. **Add Volume:**
   - **Name**: `strapi-database`
   - **Source**: `/var/lib/docker/volumes/strapi-data`
   - **Destination**: `/app/.tmp`
   - **Click "Add"**

3. **Add another Volume:**
   - **Name**: `strapi-uploads`
   - **Source**: `/var/lib/docker/volumes/strapi-uploads`
   - **Destination**: `/app/public/uploads`
   - **Click "Add"**

### Step 5: Configure Domain

1. **Go to "Domains" tab**
2. **Add Domain:**
   - **Domain**: `api.yourdomain.com`
   - **Enable HTTPS**: ✅ (Coolify will auto-generate SSL)
   - **Click "Add"**

### Step 6: Deploy!

1. **Click "Deploy"**
2. **Watch the build logs** (takes 5-10 minutes first time)
3. **Wait for "Running" status**

### Step 7: Verify Backend

Visit `https://api.yourdomain.com/admin` - you should see Strapi admin login!

**Create your first admin user:**
1. Fill in admin details
2. Click "Let's start"

---

## Deploying the Frontend (React Router)

### Step 1: Add Frontend Application

1. **In your "Mortgages by Ram" project** → Click **"+ Add"** → **"Application"**

2. **Source Configuration:**
   - **Source Type**: Git Repository
   - **Git Provider**: GitHub (already connected)
   - **Repository**: `YourUsername/MortgagesbyRam`
   - **Branch**: `main`

3. **Build Configuration:**
   - **Name**: `mortgages-frontend`
   - **Build Pack**: Dockerfile
   - **Dockerfile Location**: `client/Dockerfile`
   - **Base Directory**: `mortgages-by-ram/client`
   - **Port**: `3000`

4. **Click "Continue"**

### Step 2: Configure Environment Variables

```env
PORT=3000
NODE_ENV=production

# Point to your backend (use the domain you set up)
VITE_STRAPI_URL=https://api.yourdomain.com

# Optional: OpenAI API Key for chatbot
# OPENAI_API_KEY=sk-your-openai-key
```

### Step 3: Configure Domain

1. **Go to "Domains" tab**
2. **Add Domain:**
   - **Domain**: `yourdomain.com` (or `www.yourdomain.com`)
   - **Enable HTTPS**: ✅
   - **Click "Add"**

### Step 4: Set Up Dependency

1. **Go to "Advanced" tab**
2. **Health Check URL**: `http://localhost:3000`
3. **Pre-deploy Command** (optional): Leave empty
4. **Depends On**: Select `mortgages-backend`
   - This ensures backend starts before frontend

### Step 5: Deploy!

1. **Click "Deploy"**
2. **Watch the build logs**
3. **Wait for "Running" status**

### Step 6: Verify Frontend

Visit `https://yourdomain.com` - your website should be live! 🎉

---

## Domain Configuration

### DNS Setup in Hostinger

1. **Login to Hostinger Dashboard**
2. **Go to Domains → Manage**
3. **Click "DNS Zone"**

4. **Add A Records:**

   ```
   Type    Name    Value               TTL
   A       @       your-vps-ip         3600
   A       www     your-vps-ip         3600
   A       api     your-vps-ip         3600
   ```

5. **Save changes** (propagation takes 5-60 minutes)

### Verify DNS Propagation

```bash
# Check if DNS is propagated
nslookup yourdomain.com
nslookup api.yourdomain.com
```

---

## SSL Certificates

Coolify automatically handles SSL certificates via Let's Encrypt!

### Automatic SSL

When you add a domain in Coolify:
1. Coolify detects the domain
2. Requests SSL certificate from Let's Encrypt
3. Automatically renews every 60 days

### Manual SSL (if needed)

If automatic SSL fails:

1. **Go to your app** → **Domains** tab
2. **Click "Generate SSL"**
3. **Wait for certificate generation**

### Verify SSL

```bash
# Check SSL certificate
curl -I https://yourdomain.com
curl -I https://api.yourdomain.com
```

---

## Environment Variables

### Managing Environment Variables in Coolify

1. **Go to your application** → **Environment Variables** tab
2. **Add/Edit variables**
3. **Mark as "Secret"** for sensitive data
4. **Mark as "Build Time"** if needed during build
5. **Click "Save"**
6. **Redeploy** for changes to take effect

### Backend Environment Variables

```env
# Core Strapi Configuration
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Security Keys (REQUIRED - Generate using: node generate-keys.js)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_generated_salt
ADMIN_JWT_SECRET=your_generated_secret
TRANSFER_TOKEN_SALT=your_generated_salt
JWT_SECRET=your_generated_secret

# Database (SQLite - Default)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Optional: MySQL Configuration
# DATABASE_CLIENT=mysql
# DATABASE_HOST=mysql
# DATABASE_PORT=3306
# DATABASE_NAME=mortgages_db
# DATABASE_USERNAME=mortgages_user
# DATABASE_PASSWORD=your_secure_password

# Optional: Cloudinary (for media storage)
# CLOUDINARY_NAME=your_cloud_name
# CLOUDINARY_KEY=your_api_key
# CLOUDINARY_SECRET=your_api_secret
```

### Frontend Environment Variables

```env
PORT=3000
NODE_ENV=production

# Backend API URL (REQUIRED)
VITE_STRAPI_URL=https://api.yourdomain.com

# Optional: OpenAI for chatbot
# OPENAI_API_KEY=sk-your-openai-key

# Optional: Analytics
# GA_TRACKING_ID=G-XXXXXXXXXX
```

---

## Troubleshooting

### Application Won't Start

**Check Build Logs:**
1. Go to your app in Coolify
2. Click "Logs" tab
3. Look for errors

**Common Issues:**

**Issue 1: Build fails with "npm install" error**
```bash
# Solution: Clear build cache
# In Coolify: Settings → Advanced → Clear Build Cache
```

**Issue 2: Port already in use**
```bash
# Solution: Change port in Coolify settings
# Each app needs a unique port
```

**Issue 3: Out of memory during build**
```bash
# Solution: Increase VPS memory or add swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Backend Can't Access Database

**Check volume mounts:**
1. Go to app → Storages
2. Verify volumes are mounted correctly:
   - `/app/.tmp` for database
   - `/app/public/uploads` for media

**Check permissions:**
```bash
# SSH into VPS
ssh root@your-vps-ip

# Check volume permissions
docker exec -it [backend-container-id] ls -la /app/.tmp
docker exec -it [backend-container-id] ls -la /app/public/uploads

# Fix permissions if needed
docker exec -it [backend-container-id] chown -R node:node /app/.tmp
docker exec -it [backend-container-id] chown -R node:node /app/public/uploads
```

### Frontend Can't Connect to Backend

**Issue: CORS errors**

Update `server/config/middlewares.ts`:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://yourdomain.com',
        'https://www.yourdomain.com',
        'https://api.yourdomain.com'
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

Then redeploy the backend.

**Issue: Wrong VITE_STRAPI_URL**

1. Go to frontend app → Environment Variables
2. Update `VITE_STRAPI_URL=https://api.yourdomain.com`
3. Redeploy frontend

### SSL Certificate Issues

**Issue: SSL certificate not generating**

Requirements for Let's Encrypt:
- Domain must point to VPS IP (check with `nslookup`)
- Port 80 and 443 must be open
- No other web server running on port 80/443

**Check firewall:**
```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8000/tcp  # Coolify UI
sudo ufw reload
```

**Manually trigger SSL:**
1. Go to app → Domains
2. Click "Regenerate SSL"
3. Wait 1-2 minutes

### Viewing Logs

**Application Logs:**
1. Go to app in Coolify
2. Click "Logs" tab
3. Select log type:
   - Build logs
   - Application logs
   - Error logs

**Docker Logs (via SSH):**
```bash
# List containers
docker ps

# View logs for specific container
docker logs [container-id]

# Follow logs in real-time
docker logs -f [container-id]
```

### Restarting Applications

**Via Coolify UI:**
1. Go to application
2. Click "Restart" button

**Via SSH:**
```bash
# Restart specific container
docker restart [container-id]

# Or redeploy from Coolify UI for full rebuild
```

---

## Updating Your Application

### Method 1: Automatic Deployments (Recommended)

**Set up Webhooks for automatic deployment on Git push:**

1. **In Coolify:**
   - Go to your app
   - Click "Webhooks" tab
   - Click "Generate Webhook URL"
   - Copy the webhook URL

2. **In GitHub:**
   - Go to your repository
   - Settings → Webhooks → Add webhook
   - **Payload URL**: Paste Coolify webhook URL
   - **Content type**: application/json
   - **Which events**: Just the push event
   - Click "Add webhook"

3. **Test it:**
   ```bash
   # Make a change and push
   git add .
   git commit -m "Update content"
   git push origin main
   
   # Coolify will automatically deploy! 🎉
   ```

### Method 2: Manual Deployment

**Via Coolify UI:**
1. Go to your application
2. Click "Deploy" button
3. Select branch (if different)
4. Click "Deploy Now"

**Via Git:**
```bash
# Update your code
git pull origin main

# If env variables changed, update in Coolify UI
# Then redeploy via Coolify
```

### Rollback to Previous Version

**In Coolify:**
1. Go to app → "Deployments" tab
2. See list of previous deployments
3. Click "Rollback" on any previous version
4. Confirm rollback

---

## Performance Optimization

### 1. Enable Docker Image Caching

In Coolify → App → Settings → Advanced:
- Enable "Docker Build Cache"
- Speeds up subsequent builds

### 2. Add Health Checks

Already configured in Dockerfiles:

**Backend:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:1337/_health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
```

**Frontend:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000
```

### 3. Resource Limits

In Coolify → App → Settings → Resources:
```yaml
CPU Limit: 1.0 (1 CPU core)
Memory Limit: 1024MB (1GB)
Memory Reservation: 512MB
```

Adjust based on your VPS capacity.

### 4. Monitor Resource Usage

```bash
# Check Docker resource usage
docker stats

# Check disk usage
df -h

# Check memory usage
free -h
```

---

## Backup Strategy

### Database Backup (SQLite)

**Manual Backup:**
```bash
# SSH into VPS
ssh root@your-vps-ip

# Find backend container
docker ps | grep backend

# Copy database from container
docker cp [backend-container]:/app/.tmp/data.db ./backups/data-$(date +%Y%m%d).db
```

**Automated Backup Script:**

Create `/root/backup-mortgages.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/root/mortgages-backups"
DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
docker cp $(docker ps -qf "name=backend"):/app/.tmp/data.db \
  $BACKUP_DIR/database-$DATE.db

# Backup uploads
docker cp $(docker ps -qf "name=backend"):/app/public/uploads \
  $BACKUP_DIR/uploads-$DATE/

# Keep only last 7 days
find $BACKUP_DIR -name "database-*.db" -mtime +7 -delete
find $BACKUP_DIR -name "uploads-*" -mtime +7 -exec rm -rf {} \;

echo "Backup completed: $DATE"
```

**Set up cron:**
```bash
chmod +x /root/backup-mortgages.sh

# Run daily at 2 AM
crontab -e
0 2 * * * /root/backup-mortgages.sh
```

### Restore from Backup

```bash
# Copy backup to container
docker cp ./backups/data-20240101.db [backend-container]:/app/.tmp/data.db

# Restart container
docker restart [backend-container]
```

---

## Security Best Practices

### 1. Firewall Configuration

```bash
# Allow only necessary ports
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 8000/tcp  # Coolify UI
sudo ufw enable
```

### 2. Secure Coolify UI

1. **Change default port** (optional):
   - Edit `/etc/coolify/.env`
   - Change `APP_PORT=8000` to another port
   - Restart Coolify

2. **Use strong password**
   - 12+ characters
   - Mix of letters, numbers, symbols

3. **Enable 2FA** (if available)

### 3. Environment Variable Security

- ❌ Never commit `.env` files
- ✅ Mark secrets as "Secret" in Coolify
- ✅ Use strong, random keys (64+ characters)
- ✅ Rotate keys periodically

### 4. Regular Updates

```bash
# Update Coolify
curl -fsSL https://cdn.coollabs.io/coolify/upgrade.sh | bash

# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images (happens automatically on redeploy)
```

---

## Monitoring & Alerts

### Built-in Coolify Monitoring

1. **Go to Dashboard**
2. **View metrics:**
   - CPU usage
   - Memory usage
   - Disk usage
   - Container status

### Set Up Email Alerts

1. **Coolify → Settings → Email**
2. **Configure SMTP:**
   - Host: smtp.gmail.com (or your provider)
   - Port: 587
   - Username: your@email.com
   - Password: your-app-password
3. **Enable notifications for:**
   - Deployment failures
   - Container crashes
   - Resource alerts

### External Monitoring (Optional)

**UptimeRobot** (Free):
- Monitor: `https://yourdomain.com`
- Monitor: `https://api.yourdomain.com/_health`
- Get email alerts on downtime

---

## Cost Breakdown (Hostinger VPS)

### VPS Plans

| Plan | vCPU | RAM | Storage | Price/mo |
|------|------|-----|---------|----------|
| KVM 1 | 1 | 2GB | 20GB | $4.99 |
| KVM 2 | 2 | 4GB | 50GB | $8.99 |
| KVM 4 | 4 | 8GB | 100GB | $15.99 |

**Recommended for this project**: KVM 2 ($8.99/mo)

### Additional Costs

- Domain: ~$10/year (Hostinger)
- SSL: Free (Let's Encrypt via Coolify)
- Backups: Included (DIY scripts)
- Coolify: Free (open source)

**Total Cost**: ~$8.99/month + domain

---

## Comparison: Coolify vs cPanel

| Feature | Coolify | cPanel |
|---------|---------|--------|
| **Cost** | Free (DIY) | Included with some hosts |
| **Docker Support** | Native | Limited |
| **Git Integration** | Built-in | Manual/Plugins |
| **Auto Deploy** | Yes | No |
| **SSL Certificates** | Auto (Let's Encrypt) | Auto (AutoSSL) |
| **Learning Curve** | Moderate | Easy |
| **Flexibility** | High | Medium |
| **Resource Usage** | Efficient | Higher |
| **Rollbacks** | Easy | Manual |
| **Multiple Apps** | Unlimited | Limited by plan |

---

## FAQ

### Q: Can I use Coolify with shared hosting?

**A:** No, Coolify requires a VPS or dedicated server with root access.

### Q: How do I add more domains to my VPS?

**A:** Just point the DNS to your VPS IP, then add the domain in Coolify when creating/editing an application.

### Q: Can I deploy other projects on the same VPS?

**A:** Yes! Coolify can manage multiple projects and applications on the same VPS.

### Q: What happens if I need to restart the VPS?

**A:** Coolify and all applications will automatically restart. Enable "Restart Policy: always" in Coolify.

### Q: How do I migrate from cPanel to Coolify?

**A:**
1. Export Strapi database (download `data.db`)
2. Export uploads folder
3. Deploy to Coolify (follow this guide)
4. Import database and uploads to Coolify volumes

### Q: Can I use MySQL instead of SQLite?

**A:** Yes! Create a MySQL database service in Coolify:
1. Add → Database → MySQL
2. Update backend env vars with MySQL connection details

---

## Additional Resources

### Documentation
- **Coolify Docs**: https://coolify.io/docs
- **Strapi Docs**: https://docs.strapi.io
- **React Router Docs**: https://reactrouter.com
- **Docker Docs**: https://docs.docker.com

### Community
- **Coolify Discord**: https://coolify.io/discord
- **Coolify GitHub**: https://github.com/coollabsio/coolify

### Videos
- Coolify Installation: Search "Coolify tutorial" on YouTube
- Docker basics: Docker official YouTube channel

---

## Support

If you encounter issues:

1. **Check Coolify logs** in the UI
2. **Check application logs** in Coolify
3. **Check Docker logs** via SSH
4. **Review this guide's troubleshooting section**
5. **Search Coolify Discord** for similar issues
6. **Contact Hostinger support** for VPS issues

---

## Summary

✅ **You've successfully:**
- Installed Coolify on your Hostinger VPS
- Deployed Strapi backend with persistent storage
- Deployed React Router frontend
- Configured domains and SSL certificates
- Set up automatic deployments from Git
- Implemented backups and monitoring

🎉 **Your Mortgages by Ram website is now live on Coolify!**

**Next steps:**
1. Log into Strapi admin: `https://api.yourdomain.com/admin`
2. Create content and upload media
3. Test all features on your website
4. Set up automated backups
5. Configure monitoring alerts

**Questions?** Check the [Troubleshooting](#troubleshooting) section or relevant documentation links above.

---

**Deployed by**: Ali Shafique @ Social Dots
**Date**: October 2025
**VPS Provider**: Hostinger
**Deployment Platform**: Coolify

**Good luck with your deployment! 🚀**

