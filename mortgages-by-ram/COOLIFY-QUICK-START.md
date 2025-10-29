# ⚡ Coolify Quick Start - 15 Minute Deployment

Deploy your Mortgages by Ram website to Hostinger VPS using Coolify in about 15 minutes (after Coolify is installed).

---

## Prerequisites Checklist

- [ ] Hostinger VPS running Ubuntu/Debian
- [ ] Coolify installed (see installation below)
- [ ] Code pushed to GitHub/GitLab
- [ ] Domain DNS pointed to VPS IP
- [ ] Security keys generated

---

## Part 1: Install Coolify (One Time - 10 minutes)

### 1. SSH into your VPS

```bash
ssh root@your-vps-ip
```

### 2. Run Coolify installer

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

**Wait 5-10 minutes for installation**

### 3. Access Coolify

Visit: `http://your-vps-ip:8000`

Create your admin account:
- Email: your@email.com  
- Password: (strong password)

---

## Part 2: Deploy Your Apps (15 minutes)

### Step 1: Generate Security Keys

On your local machine:

```bash
cd /Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram
node generate-keys.js
```

**Copy the output** - you'll need it!

---

### Step 2: Deploy Backend (Strapi)

#### In Coolify UI:

1. **Create Project**
   - Click "+ Add" → "Project"
   - Name: `Mortgages by Ram`
   - Click "Create"

2. **Add Backend Application**
   - Click "+ Add" → "Application"
   - Source: Git Repository
   - Connect GitHub account
   - Select: `YourUsername/MortgagesbyRam`
   - Branch: `main`

3. **Configure Build**
   - Name: `mortgages-backend`
   - Build Pack: Dockerfile
   - Dockerfile Location: `server/Dockerfile`
   - Base Directory: `mortgages-by-ram/server`
   - Port: `1337`

4. **Environment Variables**
   
   Add these (click "+ Add" for each):
   ```env
   HOST=0.0.0.0
   PORT=1337
   NODE_ENV=production
   APP_KEYS=paste_your_generated_keys_here
   API_TOKEN_SALT=paste_your_generated_salt_here
   ADMIN_JWT_SECRET=paste_your_generated_secret_here
   TRANSFER_TOKEN_SALT=paste_your_generated_salt_here
   JWT_SECRET=paste_your_generated_secret_here
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   ```

5. **Add Storage Volumes**
   - Go to "Storages" tab
   - Add volume: Source `/var/lib/docker/volumes/strapi-data` → Destination `/app/.tmp`
   - Add volume: Source `/var/lib/docker/volumes/strapi-uploads` → Destination `/app/public/uploads`

6. **Configure Domain**
   - Go to "Domains" tab
   - Add domain: `api.yourdomain.com`
   - Enable HTTPS: ✅

7. **Deploy!**
   - Click "Deploy"
   - Watch logs
   - Wait for "Running" status (~5 minutes)

---

### Step 3: Deploy Frontend (React Router)

1. **Add Frontend Application**
   - In same project → "+ Add" → "Application"
   - Source: Same repository
   - Branch: `main`

2. **Configure Build**
   - Name: `mortgages-frontend`
   - Build Pack: Dockerfile
   - Dockerfile Location: `client/Dockerfile`
   - Base Directory: `mortgages-by-ram/client`
   - Port: `3000`

3. **Environment Variables**
   ```env
   PORT=3000
   NODE_ENV=production
   VITE_STRAPI_URL=https://api.yourdomain.com
   ```

4. **Configure Domain**
   - Go to "Domains" tab
   - Add domain: `yourdomain.com`
   - Enable HTTPS: ✅

5. **Set Dependency** (Important!)
   - Go to "Advanced" tab
   - Depends On: Select `mortgages-backend`

6. **Deploy!**
   - Click "Deploy"
   - Watch logs
   - Wait for "Running" status (~3 minutes)

---

### Step 4: Verify Everything Works

1. **Backend**: Visit `https://api.yourdomain.com/admin`
   - Create your first admin user
   - You should see Strapi dashboard

2. **Frontend**: Visit `https://yourdomain.com`
   - Your website should be live!
   - Check all pages work

---

## Part 3: Set Up Automatic Deployments (5 minutes)

### 1. Get Webhook URL

In Coolify (each app):
- Go to app → "Webhooks" tab
- Click "Generate Webhook URL"
- Copy the URL

### 2. Add to GitHub

For each app (backend & frontend):

1. Go to GitHub repository
2. Settings → Webhooks → Add webhook
3. Paste webhook URL
4. Content type: `application/json`
5. Events: "Just the push event"
6. Click "Add webhook"

**Now your app auto-deploys on every `git push`!** 🎉

---

## DNS Configuration (Do This First!)

In Hostinger or your DNS provider:

```
Type    Name    Value           TTL
A       @       your-vps-ip     3600
A       www     your-vps-ip     3600
A       api     your-vps-ip     3600
```

**Wait 5-15 minutes for DNS propagation**

Verify:
```bash
nslookup yourdomain.com
nslookup api.yourdomain.com
```

---

## Troubleshooting

### Build Fails

**Check logs:**
- Coolify → Your app → Logs tab
- Look for errors

**Common fixes:**
- Clear build cache: Settings → Advanced → Clear Build Cache
- Verify environment variables are correct
- Check Dockerfile paths are correct

### Can't Connect to Backend

**Fix CORS:**

Update `server/config/middlewares.ts`:

```typescript
{
  name: 'strapi::cors',
  config: {
    origin: [
      'https://yourdomain.com',
      'https://api.yourdomain.com'
    ],
  },
}
```

Commit and push (or redeploy).

### SSL Certificate Not Working

**Check:**
- DNS is propagated (use `nslookup`)
- Domain is correctly added in Coolify
- Ports 80 and 443 are open in firewall

**Regenerate:**
- Go to app → Domains tab
- Click "Regenerate SSL"

---

## Quick Commands Reference

### Generate Keys
```bash
node generate-keys.js
```

### Push Code
```bash
git add .
git commit -m "Deploy to Coolify"
git push origin main
```

### Check DNS
```bash
nslookup yourdomain.com
nslookup api.yourdomain.com
```

### SSH to VPS
```bash
ssh root@your-vps-ip
```

### View Docker Containers
```bash
docker ps
docker logs [container-id]
docker logs -f [container-id]  # follow logs
```

### Restart Container
```bash
docker restart [container-id]
```

---

## Environment Variables Cheat Sheet

### Backend (Strapi)
```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
APP_KEYS=<from generate-keys.js>
API_TOKEN_SALT=<from generate-keys.js>
ADMIN_JWT_SECRET=<from generate-keys.js>
TRANSFER_TOKEN_SALT=<from generate-keys.js>
JWT_SECRET=<from generate-keys.js>
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### Frontend (React Router)
```env
PORT=3000
NODE_ENV=production
VITE_STRAPI_URL=https://api.yourdomain.com
```

---

## What's Next?

After deployment:

1. **Add Content**
   - Log into Strapi: `https://api.yourdomain.com/admin`
   - Create pages, articles, upload images

2. **Test Everything**
   - All pages load
   - Forms work
   - Chatbot works (if enabled)
   - Images load correctly

3. **Set Up Backups** (See full guide)

4. **Monitor Performance**
   - Check Coolify dashboard
   - Set up email alerts

---

## Need More Help?

- **Full Guide**: [COOLIFY-DEPLOYMENT.md](./COOLIFY-DEPLOYMENT.md)
- **Coolify Docs**: https://coolify.io/docs
- **Coolify Discord**: https://coolify.io/discord

---

## Summary

**Time breakdown:**
- Coolify installation: 10 minutes (one time)
- Backend deployment: 8 minutes
- Frontend deployment: 5 minutes
- Webhook setup: 2 minutes

**Total**: ~15 minutes after Coolify is installed

🎉 **You're done!** Your site is live on Coolify!

---

**Deployed by**: Ali Shafique @ Social Dots  
**Platform**: Coolify + Hostinger VPS

