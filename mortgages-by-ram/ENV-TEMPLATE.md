# Environment Configuration Templates

This file contains templates for creating your production `.env` files.

## ⚠️ IMPORTANT: Security Notes

- **NEVER** commit `.env` files to Git
- **ALWAYS** use strong, randomly generated keys
- **KEEP** these files secure on your server
- **REGENERATE** keys if they are ever exposed

---

## 🔐 Generate Security Keys

Before creating your `.env` files, generate secure random keys:

```bash
node generate-keys.js
```

Or manually:

```bash
node -e "for(let i=0;i<5;i++) console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📄 Server Environment File

**Location:** `server/.env`

```env
# Server Configuration
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Security Keys - REPLACE WITH YOUR GENERATED KEYS
APP_KEYS=<REPLACE_WITH_KEY1>,<REPLACE_WITH_KEY2>,<REPLACE_WITH_KEY3>,<REPLACE_WITH_KEY4>
API_TOKEN_SALT=<REPLACE_WITH_KEY5>
ADMIN_JWT_SECRET=<REPLACE_WITH_KEY1>
TRANSFER_TOKEN_SALT=<REPLACE_WITH_KEY2>
JWT_SECRET=<REPLACE_WITH_KEY3>

# Database Configuration - SQLite (Default, file-based)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Optional: Use MySQL instead (recommended for production)
# Uncomment the lines below and comment out the SQLite lines above
# DATABASE_CLIENT=mysql
# DATABASE_HOST=localhost
# DATABASE_PORT=3306
# DATABASE_NAME=mortgages_db
# DATABASE_USERNAME=mortgages_user
# DATABASE_PASSWORD=<SECURE_PASSWORD>
# DATABASE_SSL=false
```

### Key Descriptions:

- **HOST**: Server host (use `0.0.0.0` to allow external connections)
- **PORT**: Port number (cPanel will assign one, usually 1337 works)
- **NODE_ENV**: Environment (`production` for deployment)
- **APP_KEYS**: Multiple keys separated by commas (min 4 keys)
- **API_TOKEN_SALT**: Salt for API tokens
- **ADMIN_JWT_SECRET**: Secret for admin JWT tokens
- **TRANSFER_TOKEN_SALT**: Salt for transfer tokens
- **JWT_SECRET**: Secret for general JWT tokens
- **DATABASE_CLIENT**: Database type (`sqlite` or `mysql`)
- **DATABASE_FILENAME**: SQLite database file path (only for SQLite)

---

## 📄 Client Environment File

**Location:** `client/.env`

```env
# Environment
NODE_ENV=production

# Backend API URL
# IMPORTANT: Update with your actual domain before building!
# 
# Choose ONE of the following options:

# Option A: Using subdomain (recommended)
VITE_STRAPI_URL=https://api.yourdomain.com

# Option B: Using port on same domain
# VITE_STRAPI_URL=https://yourdomain.com:1337

# Option C: Using path on same domain (requires reverse proxy)
# VITE_STRAPI_URL=https://yourdomain.com/api
```

### Configuration Notes:

- **VITE_STRAPI_URL**: Must be accessible from the browser
- Use `https://` for production (SSL required)
- The URL should point to your Strapi backend
- Must be set before building the frontend

---

## 📋 Domain Configuration Examples

### Example 1: Using Subdomain (Recommended)

**Backend URL:** `https://api.mortgagesbyram.com`  
**Frontend URL:** `https://mortgagesbyram.com`

**server/.env:**
```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
# ... other keys ...
```

**client/.env:**
```env
NODE_ENV=production
VITE_STRAPI_URL=https://api.mortgagesbyram.com
```

### Example 2: Using Ports on Same Domain

**Backend URL:** `https://mortgagesbyram.com:1337`  
**Frontend URL:** `https://mortgagesbyram.com`

**server/.env:**
```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
# ... other keys ...
```

**client/.env:**
```env
NODE_ENV=production
VITE_STRAPI_URL=https://mortgagesbyram.com:1337
```

---

## 🔄 Updating Environment Variables on cPanel

If you need to change environment variables after deployment:

1. Log into cPanel → Node.js App Manager
2. Click on your application
3. Scroll to "Environment Variables"
4. Update the values
5. Click "Restart" to apply changes

**Note:** Changes to environment variables require restarting the application.

---

## 🔄 Switching from SQLite to MySQL

If you want to switch to MySQL after initial deployment:

1. **Create MySQL Database in cPanel:**
   - Go to cPanel → MySQL Databases
   - Create database: `mortgages_db`
   - Create user: `mortgages_user` with secure password
   - Add user to database with ALL PRIVILEGES

2. **Update server/.env:**
   ```env
   DATABASE_CLIENT=mysql
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_NAME=mortgages_db
   DATABASE_USERNAME=mortgages_user
   DATABASE_PASSWORD=your_secure_password
   ```

3. **Install MySQL driver** (if not already installed):
   ```bash
   cd /home/username/mortgages-backend/server
   npm install mysql2
   ```

4. **Restart Strapi** via Node.js App Manager

5. **Migrate data** (if you had existing data in SQLite):
   - Use Strapi's export/import features
   - Or manually migrate via admin panel

---

## 🛡️ Security Checklist

Before deploying, ensure:

- [ ] All keys are randomly generated (not the default examples)
- [ ] Strong database password (if using MySQL)
- [ ] `.env` files are NOT committed to Git
- [ ] `.env` files are in `.gitignore`
- [ ] SSL certificates are active on all domains
- [ ] File permissions are correct (755 for dirs, 644 for files)
- [ ] Only necessary ports are open in firewall

---

## 📞 Support

If you need help:
- Review [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
- Review [QUICK-DEPLOY.md](./QUICK-DEPLOY.md)
- Contact your hosting provider
- Check Strapi documentation: https://docs.strapi.io

