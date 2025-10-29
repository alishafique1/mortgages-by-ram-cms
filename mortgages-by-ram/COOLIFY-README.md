# 🚀 Coolify Deployment - Documentation Index

Welcome! This guide will help you deploy **Mortgages by Ram** to your Hostinger VPS using Coolify.

---

## 📚 Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| **[COOLIFY-QUICK-START.md](./COOLIFY-QUICK-START.md)** | 15-minute deployment guide | Start here! Quick reference |
| **[COOLIFY-DEPLOYMENT.md](./COOLIFY-DEPLOYMENT.md)** | Complete deployment guide | Full details & troubleshooting |
| **[ENV-COOLIFY-TEMPLATE.md](./ENV-COOLIFY-TEMPLATE.md)** | Environment variables | Copy these into Coolify |
| **docker-compose.yml** | Local testing | Test before deploying |
| **server/Dockerfile** | Backend container | Used by Coolify |
| **client/Dockerfile** | Frontend container | Used by Coolify |

---

## 🎯 Quick Navigation

### Getting Started
1. **First Time?** → Read [COOLIFY-QUICK-START.md](./COOLIFY-QUICK-START.md)
2. **Need Details?** → See [COOLIFY-DEPLOYMENT.md](./COOLIFY-DEPLOYMENT.md)
3. **Environment Setup?** → Check [ENV-COOLIFY-TEMPLATE.md](./ENV-COOLIFY-TEMPLATE.md)

### Common Tasks
- **Install Coolify** → [Installation Guide](#installation-guide)
- **Deploy Backend** → [Backend Deployment](#backend-deployment)
- **Deploy Frontend** → [Frontend Deployment](#frontend-deployment)
- **Fix Issues** → [Troubleshooting](#troubleshooting)
- **Update App** → [Updating Guide](#updating)

---

## ⚡ Quick Start

### Prerequisites
```bash
# 1. Install Coolify on VPS (one time)
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash

# 2. Generate security keys
node generate-keys.js

# 3. Push code to GitHub
git push origin main
```

### Deploy in 3 Steps

**Step 1: Deploy Backend**
- Coolify → Add Application
- Connect GitHub → Select repo
- Dockerfile: `server/Dockerfile`
- Add environment variables from [ENV-COOLIFY-TEMPLATE.md](./ENV-COOLIFY-TEMPLATE.md)
- Domain: `api.yourdomain.com`
- Deploy!

**Step 2: Deploy Frontend**
- Coolify → Add Application
- Same repo
- Dockerfile: `client/Dockerfile`
- Add environment variable: `VITE_STRAPI_URL=https://api.yourdomain.com`
- Domain: `yourdomain.com`
- Deploy!

**Step 3: Verify**
- Visit: `https://api.yourdomain.com/admin` (Strapi)
- Visit: `https://yourdomain.com` (Website)

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] VPS with Ubuntu/Debian (2GB+ RAM)
- [ ] Coolify installed
- [ ] Domain DNS pointed to VPS IP
- [ ] Code pushed to Git repository
- [ ] Security keys generated (`node generate-keys.js`)

### Backend Deployment
- [ ] Application created in Coolify
- [ ] Git repository connected
- [ ] Dockerfile path: `server/Dockerfile`
- [ ] Base directory: `mortgages-by-ram/server`
- [ ] Environment variables added
- [ ] Storage volumes mounted:
  - `/app/.tmp` for database
  - `/app/public/uploads` for media
- [ ] Domain configured: `api.yourdomain.com`
- [ ] SSL enabled
- [ ] Deployed successfully
- [ ] Admin panel accessible

### Frontend Deployment
- [ ] Application created in Coolify
- [ ] Git repository connected
- [ ] Dockerfile path: `client/Dockerfile`
- [ ] Base directory: `mortgages-by-ram/client`
- [ ] Environment variables added
- [ ] Domain configured: `yourdomain.com`
- [ ] SSL enabled
- [ ] Dependency set to backend
- [ ] Deployed successfully
- [ ] Website accessible

### Post-Deployment
- [ ] Create Strapi admin user
- [ ] Test all pages load correctly
- [ ] Test forms submission
- [ ] Test chatbot (if enabled)
- [ ] Upload content and media
- [ ] Set up automatic deployments (webhooks)
- [ ] Configure backups
- [ ] Set up monitoring/alerts

---

## 🏗️ Architecture

```
┌─────────────────┐
│   User Browser   │
└────────┬─────────┘
         │ HTTPS
         ↓
┌──────────────────────────────────┐
│      Coolify (VPS)               │
│  ┌──────────────────────────┐   │
│  │  Frontend (Port 3000)    │   │
│  │  yourdomain.com          │   │
│  │  React Router + SSR       │   │
│  └──────────┬───────────────┘   │
│             │ API Calls          │
│             ↓                     │
│  ┌──────────────────────────┐   │
│  │  Backend (Port 1337)     │   │
│  │  api.yourdomain.com      │   │
│  │  Strapi CMS              │   │
│  └──────────┬───────────────┘   │
│             │                     │
│             ↓                     │
│  ┌──────────────────────────┐   │
│  │  SQLite Database         │   │
│  │  /app/.tmp/data.db       │   │
│  └──────────────────────────┘   │
│                                   │
│  ┌──────────────────────────┐   │
│  │  Media Storage           │   │
│  │  /app/public/uploads     │   │
│  └──────────────────────────┘   │
└──────────────────────────────────┘
```

---

## 🔐 Security

### Environment Variables

**Never commit these to Git:**
- `.env` files
- Security keys
- API tokens
- Passwords

**Generate secure keys:**
```bash
node generate-keys.js
```

**Mark as "Secret" in Coolify:**
- All API keys
- Database passwords
- JWT secrets
- Token salts

### SSL Certificates

Coolify automatically handles SSL via Let's Encrypt:
- ✅ Automatic generation
- ✅ Automatic renewal
- ✅ Free forever

---

## 🐳 Docker Files

### Backend (Strapi)
- **File**: `server/Dockerfile`
- **Base Image**: `node:20-alpine`
- **Stages**: Multi-stage build (dev deps → prod deps → build → runtime)
- **User**: Non-root (`node`)
- **Health Check**: Included
- **Volumes**: 
  - Database: `/app/.tmp`
  - Uploads: `/app/public/uploads`

### Frontend (React Router)
- **File**: `client/Dockerfile`
- **Base Image**: `node:20-alpine`
- **Stages**: Multi-stage build
- **Port**: 3000
- **Build**: React Router SSR build

---

## 📊 Resource Requirements

### Minimum (Testing)
- 1 vCPU
- 2GB RAM
- 20GB SSD
- Estimated load: 100-500 visitors/day

### Recommended (Production)
- 2 vCPU
- 4GB RAM
- 50GB SSD
- Estimated load: 1,000-5,000 visitors/day

### Optimal (High Traffic)
- 4 vCPU
- 8GB RAM
- 100GB SSD
- Estimated load: 10,000+ visitors/day

---

## 💰 Cost Estimate

### Hostinger VPS Plans

| Plan | Specs | Price/mo | Best For |
|------|-------|----------|----------|
| KVM 1 | 1 vCPU, 2GB RAM, 20GB | $4.99 | Testing |
| KVM 2 | 2 vCPU, 4GB RAM, 50GB | $8.99 | Production (recommended) |
| KVM 4 | 4 vCPU, 8GB RAM, 100GB | $15.99 | High traffic |

### Additional Costs
- Domain: ~$10/year
- SSL: Free (Let's Encrypt)
- Coolify: Free (open source)
- Backups: DIY (free)

**Total**: Starting at $8.99/month + domain

---

## 🆚 Coolify vs Other Platforms

| Feature | Coolify | cPanel | Vercel | Heroku |
|---------|---------|--------|--------|--------|
| **Cost** | $8.99/mo (VPS) | Varies | $20/mo+ | $25/mo+ |
| **Docker** | ✅ Native | ❌ Limited | ❌ No | ✅ Yes |
| **Git Deploy** | ✅ Auto | ❌ Manual | ✅ Auto | ✅ Auto |
| **SSL** | ✅ Free | ✅ Free | ✅ Free | ✅ Free |
| **Control** | ✅ Full | 🟡 Medium | ❌ Limited | ❌ Limited |
| **Strapi** | ✅ Perfect | 🟡 Manual | ❌ Complex | 🟡 Works |
| **Flexibility** | ✅ High | 🟡 Medium | ❌ Low | 🟡 Medium |

---

## 🔄 Updating Your App

### Automatic (Recommended)

Set up webhooks once, then every `git push` auto-deploys:

```bash
git add .
git commit -m "Update content"
git push origin main
# Coolify automatically deploys! 🎉
```

### Manual

Via Coolify UI:
1. Go to your app
2. Click "Deploy"
3. Wait for completion

---

## 📈 Monitoring

### Built-in Coolify Dashboard
- CPU usage
- Memory usage
- Disk usage
- Container status
- Deployment history

### Application Logs
- Build logs
- Runtime logs
- Error logs
- Access logs

### External Monitoring (Optional)
- UptimeRobot (free)
- Pingdom
- New Relic
- Datadog

---

## 🔧 Troubleshooting

### Common Issues

**1. Build Fails**
- Check Dockerfile path
- Verify environment variables
- Clear build cache
- Check logs in Coolify

**2. Can't Connect to Backend**
- Verify CORS configuration
- Check `VITE_STRAPI_URL`
- Ensure backend is running
- Check firewall rules

**3. SSL Not Working**
- Verify DNS propagation
- Check ports 80/443 open
- Regenerate SSL in Coolify
- Wait 5-10 minutes

**4. Out of Memory**
- Upgrade VPS plan
- Add swap space
- Optimize Docker images

---

## 📖 Additional Resources

### Documentation
- **Coolify**: https://coolify.io/docs
- **Strapi**: https://docs.strapi.io
- **React Router**: https://reactrouter.com
- **Docker**: https://docs.docker.com

### Community
- **Coolify Discord**: https://coolify.io/discord
- **Coolify GitHub**: https://github.com/coollabsio/coolify

### Support
- Coolify community (Discord)
- Hostinger support (VPS issues)
- This project documentation

---

## 🎓 Learning Path

### If you're new to Coolify:
1. Watch Coolify intro videos on YouTube
2. Read [COOLIFY-QUICK-START.md](./COOLIFY-QUICK-START.md)
3. Test deployment on a cheap VPS ($4.99/mo)
4. Follow [COOLIFY-DEPLOYMENT.md](./COOLIFY-DEPLOYMENT.md) step-by-step

### If you're new to Docker:
1. Learn Docker basics (1-2 hours)
2. Understand Dockerfile structure
3. Test with `docker-compose up` locally
4. Then deploy to Coolify

---

## ✅ Success Checklist

You've successfully deployed when:

- [ ] Both apps show "Running" in Coolify
- [ ] `https://api.yourdomain.com/admin` shows Strapi login
- [ ] `https://yourdomain.com` shows your website
- [ ] You can create content in Strapi
- [ ] Content appears on frontend
- [ ] Forms work correctly
- [ ] SSL certificates are active (https://)
- [ ] Automatic deployments work (webhook)
- [ ] Backups are configured

---

## 🎉 You're Ready!

Pick your guide and start deploying:

1. **Quick Start**: [COOLIFY-QUICK-START.md](./COOLIFY-QUICK-START.md) ⚡
2. **Full Guide**: [COOLIFY-DEPLOYMENT.md](./COOLIFY-DEPLOYMENT.md) 📘
3. **Environment Setup**: [ENV-COOLIFY-TEMPLATE.md](./ENV-COOLIFY-TEMPLATE.md) 🔐

**Questions?** Check the troubleshooting sections in the guides!

---

**Created by**: Ali Shafique @ Social Dots  
**Platform**: Coolify + Hostinger VPS  
**Framework**: React Router 7 + Strapi 5  

**Good luck with your deployment! 🚀**

