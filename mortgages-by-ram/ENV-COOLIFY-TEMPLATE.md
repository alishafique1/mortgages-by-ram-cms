# Environment Variables for Coolify

This file contains all environment variables needed for deploying to Coolify.

## 🔐 Generate Security Keys First!

Run this command to generate secure random keys:

```bash
node generate-keys.js
```

Copy the output and use it to fill in the values below.

---

## Backend Environment Variables (Strapi)

Copy these into Coolify → Backend App → Environment Variables:

```env
# Core Configuration
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Security Keys (REQUIRED - Generate using: node generate-keys.js)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_generated_api_token_salt
ADMIN_JWT_SECRET=your_generated_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_generated_transfer_token_salt
JWT_SECRET=your_generated_jwt_secret

# Database Configuration (SQLite - Default)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Optional: MySQL Configuration (if using MySQL instead of SQLite)
# DATABASE_CLIENT=mysql
# DATABASE_HOST=mysql
# DATABASE_PORT=3306
# DATABASE_NAME=mortgages_db
# DATABASE_USERNAME=mortgages_user
# DATABASE_PASSWORD=your_secure_mysql_password
# DATABASE_SSL=false
```

### Optional Backend Variables

```env
# Cloudinary (for cloud media storage)
# CLOUDINARY_NAME=your_cloudinary_name
# CLOUDINARY_KEY=your_cloudinary_api_key
# CLOUDINARY_SECRET=your_cloudinary_api_secret

# Email (SMTP for password reset, notifications)
# EMAIL_PROVIDER=smtp
# EMAIL_SMTP_HOST=smtp.gmail.com
# EMAIL_SMTP_PORT=587
# EMAIL_SMTP_USERNAME=your@email.com
# EMAIL_SMTP_PASSWORD=your_app_password
# EMAIL_ADDRESS_FROM=noreply@yourdomain.com
# EMAIL_ADDRESS_REPLY=hello@yourdomain.com
```

---

## Frontend Environment Variables (React Router)

Copy these into Coolify → Frontend App → Environment Variables:

```env
# Core Configuration
PORT=3000
NODE_ENV=production

# Backend API URL (REQUIRED - use your backend domain)
VITE_STRAPI_URL=https://api.yourdomain.com

# Optional: OpenAI for chatbot functionality
# OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional: Analytics
# GA_TRACKING_ID=G-XXXXXXXXXX
# GTM_ID=GTM-XXXXXXX
```

---

## Persistent Storage Volumes

### Backend Storage (Strapi)

Add these in Coolify → Backend App → Storages tab:

| Name | Source | Destination | Purpose |
|------|--------|-------------|---------|
| strapi-database | `/var/lib/docker/volumes/strapi-data` | `/app/.tmp` | SQLite database |
| strapi-uploads | `/var/lib/docker/volumes/strapi-uploads` | `/app/public/uploads` | Media files |

---

## Domain Configuration

### Backend (Strapi)

- **Domain**: `api.yourdomain.com`
- **HTTPS**: Enabled (auto SSL via Let's Encrypt)
- **Port**: 1337

### Frontend (React Router)

- **Domain**: `yourdomain.com` or `www.yourdomain.com`
- **HTTPS**: Enabled (auto SSL via Let's Encrypt)
- **Port**: 3000

---

## DNS Records Required

Add these A records in your DNS provider (Hostinger or other):

```
Type    Name    Value               TTL
A       @       your-vps-ip         3600
A       www     your-vps-ip         3600
A       api     your-vps-ip         3600
```

**Note**: Replace `your-vps-ip` with your actual Hostinger VPS IP address.

---

## Verification Checklist

After setting up environment variables in Coolify:

### Backend Checklist
- [ ] All security keys are unique and properly generated
- [ ] `DATABASE_CLIENT` is set to `sqlite` or `mysql`
- [ ] Storage volumes are mounted correctly
- [ ] Domain points to VPS IP
- [ ] SSL certificate is generated

### Frontend Checklist
- [ ] `VITE_STRAPI_URL` points to backend domain (https://api.yourdomain.com)
- [ ] `NODE_ENV` is set to `production`
- [ ] Domain points to VPS IP
- [ ] SSL certificate is generated

---

## Security Best Practices

### DO ✅
- Use the key generator script: `node generate-keys.js`
- Mark sensitive variables as "Secret" in Coolify
- Use HTTPS for all domains
- Keep keys secure and never commit them to Git
- Use strong passwords for Strapi admin

### DON'T ❌
- Use default or example keys in production
- Share security keys publicly
- Commit `.env` files to Git
- Reuse keys across different projects
- Use short or simple keys

---

## Testing Environment Variables

### Test Backend
```bash
# Should return API info
curl https://api.yourdomain.com/api

# Should show Strapi admin login
curl https://api.yourdomain.com/admin
```

### Test Frontend
```bash
# Should return HTML
curl https://yourdomain.com

# Check if it can connect to backend
# Visit https://yourdomain.com in browser
# Open browser console - check for API errors
```

---

## Troubleshooting

### Backend won't start

**Check:**
1. All required environment variables are set
2. Keys are properly formatted (no extra spaces or quotes)
3. `DATABASE_FILENAME` path is correct: `.tmp/data.db`
4. Storage volumes are mounted

**View logs:**
- Coolify → Backend App → Logs tab

### Frontend can't connect to backend

**Check:**
1. `VITE_STRAPI_URL` is correct (should be https://api.yourdomain.com)
2. Backend is running and accessible
3. CORS is configured in backend (see COOLIFY-DEPLOYMENT.md)
4. No typos in domain name

### SSL certificate errors

**Check:**
1. DNS has propagated (use `nslookup yourdomain.com`)
2. Domain is correctly added in Coolify
3. Ports 80 and 443 are open in firewall
4. Wait a few minutes and try regenerating SSL

---

## Example: Complete Backend Configuration

Here's what your backend environment variables should look like (with example values):

```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
APP_KEYS=zX9kL2mN4pQ5rS6tU7vW8xY1zA3bC4dE5fG6hI7jK8lM9nO0pQ1rS2tU3vW4xY5z,aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3aB4cD5eF6gH7iJ8kL9mN0oP1q,rS2tU3vW4xY5zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS0tU1vW2xY3zA4bC5dE6fG7h,iJ8kL9mN0oP1qR2sT3uV4wX5yZ6aB7cD8eF9gH0iJ1kL2mN3oP4qR5sT6uV7wX8y
API_TOKEN_SALT=Z9aB8cD7eF6gH5iJ4kL3mN2oP1qR0sT9uV8wX7yZ6aB5cD4eF3gH2iJ1kL0mN9o
ADMIN_JWT_SECRET=P8qR7sT6uV5wX4yZ3aB2cD1eF0gH9iJ8kL7mN6oP5qR4sT3uV2wX1yZ0aB9cD8e
TRANSFER_TOKEN_SALT=F7gH6iJ5kL4mN3oP2qR1sT0uV9wX8yZ7aB6cD5eF4gH3iJ2kL1mN0oP9qR8sT7u
JWT_SECRET=V6wX5yZ4aB3cD2eF1gH0iJ9kL8mN7oP6qR5sT4uV3wX2yZ1aB0cD9eF8gH7iJ6k
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

**Important**: These are EXAMPLE keys. Generate your own using `node generate-keys.js`!

---

## Updating Environment Variables

### To update a variable:

1. Go to Coolify → Your App → Environment Variables
2. Edit the variable
3. Click "Save"
4. **Important**: Redeploy the application for changes to take effect
   - Click "Deploy" button

### When to redeploy:

- ✅ When changing any environment variable
- ✅ After updating code in Git
- ✅ After changing Dockerfile
- ❌ Just viewing logs (no redeploy needed)

---

## Need Help?

See the full deployment guide for detailed instructions:
- [COOLIFY-DEPLOYMENT.md](./COOLIFY-DEPLOYMENT.md) - Complete guide
- [COOLIFY-QUICK-START.md](./COOLIFY-QUICK-START.md) - Quick reference

---

**Template by**: Ali Shafique @ Social Dots  
**Last Updated**: October 2025

