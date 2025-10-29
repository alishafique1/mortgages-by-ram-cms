# cPanel Deployment Guide - Mortgages by Ram

This guide will walk you through deploying your Mortgages by Ram website to cPanel with Node.js App Manager.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Building Applications](#building-applications)
4. [Uploading to cPanel](#uploading-to-cpanel)
5. [Setting Up Node.js Applications](#setting-up-nodejs-applications)
6. [Post-Deployment Configuration](#post-deployment-configuration)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- ✅ cPanel account with Node.js App Manager
- ✅ Node.js version 18.x, 20.x, or 22.x available on cPanel
- ✅ Domain or subdomain configured in cPanel
- ✅ FTP/SFTP access or File Manager access
- ✅ SSL certificate (AutoSSL or Let's Encrypt)

## Environment Setup

### Step 1: Generate Security Keys

Before deployment, generate secure random keys for Strapi. Run this command locally:

```bash
node -e "for(let i=0;i<5;i++) console.log(require('crypto').randomBytes(32).toString('base64'))"
```

This will output 5 random keys. Save these for the next step.

### Step 2: Create Server Environment File

Create a file named `.env` in the `server/` directory with the following content:

```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Security Keys - Use the keys you generated above
APP_KEYS=<KEY1>,<KEY2>,<KEY3>,<KEY4>
API_TOKEN_SALT=<KEY5>
ADMIN_JWT_SECRET=<KEY1>
TRANSFER_TOKEN_SALT=<KEY2>
JWT_SECRET=<KEY3>

# Database Configuration (SQLite - Default)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

**Important Notes:**
- Replace `<KEY1>`, `<KEY2>`, etc. with the actual keys you generated
- Keep this file secure and never commit it to Git
- The `APP_KEYS` should be 4 keys separated by commas

**Optional: Using MySQL Instead of SQLite**

If you prefer to use MySQL (recommended for production), replace the database section with:

```env
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_user
DATABASE_PASSWORD=your_database_password
```

You'll need to create a MySQL database in cPanel first.

### Step 3: Create Client Environment File

Create a file named `.env` in the `client/` directory:

```env
NODE_ENV=production

# Update with your actual domain
# Option A: Using subdomain
VITE_STRAPI_URL=https://api.yourdomain.com

# Option B: Using port (if running on same domain)
# VITE_STRAPI_URL=https://yourdomain.com:1337
```

Replace `yourdomain.com` with your actual domain name.

## Building Applications

### Step 1: Build the Backend (Strapi)

```bash
cd mortgages-by-ram/server
yarn install --production=false
yarn build
```

This will create a `dist/` folder with the compiled backend code.

### Step 2: Build the Frontend (React Router)

```bash
cd ../client
yarn install --production=false
yarn build
```

This will create a `build/` folder with the compiled frontend code.

## Uploading to cPanel

### Option A: Using File Manager (Recommended for beginners)

1. **Compress the folders locally:**
   - Zip the `server/` folder → `server.zip`
   - Zip the `client/` folder → `client.zip`

2. **Upload via cPanel File Manager:**
   - Log into cPanel
   - Open File Manager
   - Navigate to your home directory (e.g., `/home/username/`)
   - Click "Upload" and upload both zip files
   - Extract each zip file in place

3. **Rename the folders (recommended):**
   - Rename `server/` to `mortgages-backend/`
   - Rename `client/` to `mortgages-frontend/`

### Option B: Using FTP/SFTP

1. Connect to your cPanel via FTP/SFTP
2. Upload the entire `server/` folder to `/home/username/mortgages-backend/`
3. Upload the entire `client/` folder to `/home/username/mortgages-frontend/`

### Option C: Using Git (if SSH is available)

```bash
# On your cPanel server via SSH
cd /home/username/
git clone <your-repo-url>
cd MortgagesbyRam/mortgages-by-ram
```

## Setting Up Node.js Applications

### Step 1: Configure Backend Application

1. **Access Node.js App Manager:**
   - Log into cPanel
   - Find "Setup Node.js App" or "Node.js Selector"
   - Click "Create Application"

2. **Backend Configuration:**
   - **Node.js Version**: Select 18.x, 20.x, or 22.x
   - **Application Mode**: Production
   - **Application Root**: `/home/username/mortgages-backend/server`
   - **Application URL**: Choose a subdomain (e.g., `api.yourdomain.com`)
   - **Application Startup File**: `dist/src/index.js`
   - **Passenger Log File**: (optional) `/home/username/logs/backend.log`

3. **Set Environment Variables** (in Node.js App Manager):
   
   Click "Add Variable" for each:
   ```
   Variable Name: HOST          | Value: 0.0.0.0
   Variable Name: PORT          | Value: (note the port cPanel assigns)
   Variable Name: NODE_ENV      | Value: production
   Variable Name: APP_KEYS      | Value: (paste your generated keys)
   Variable Name: API_TOKEN_SALT | Value: (paste your generated key)
   Variable Name: ADMIN_JWT_SECRET | Value: (paste your generated key)
   Variable Name: TRANSFER_TOKEN_SALT | Value: (paste your generated key)
   Variable Name: JWT_SECRET    | Value: (paste your generated key)
   Variable Name: DATABASE_CLIENT | Value: sqlite
   Variable Name: DATABASE_FILENAME | Value: .tmp/data.db
   ```

4. **Install Dependencies:**
   - Click "Run NPM Install" button in Node.js App Manager, OR
   - Use terminal: `cd /home/username/mortgages-backend/server && npm install --production`

5. **Start the Application:**
   - Click "Start Application" or "Restart Application"

### Step 2: Configure Frontend Application

1. **Create Frontend Application:**
   - Go back to Node.js App Manager
   - Click "Create Application"

2. **Frontend Configuration:**
   - **Node.js Version**: Select 18.x, 20.x, or 22.x (same as backend)
   - **Application Mode**: Production
   - **Application Root**: `/home/username/mortgages-frontend/client`
   - **Application URL**: Your main domain (e.g., `yourdomain.com`)
   - **Application Startup File**: `build/server/index.js`
   - **Passenger Log File**: (optional) `/home/username/logs/frontend.log`

3. **Set Environment Variables:**
   ```
   Variable Name: PORT          | Value: (note the port cPanel assigns)
   Variable Name: NODE_ENV      | Value: production
   Variable Name: VITE_STRAPI_URL | Value: https://api.yourdomain.com
   ```

4. **Install Dependencies:**
   - Click "Run NPM Install" button, OR
   - Use terminal: `cd /home/username/mortgages-frontend/client && npm install --production`

5. **Start the Application:**
   - Click "Start Application" or "Restart Application"

## Post-Deployment Configuration

### Step 1: Configure DNS (if using subdomain)

If you're using a subdomain for the backend (e.g., `api.yourdomain.com`):

1. Go to cPanel → Domains → Subdomains
2. Create subdomain: `api`
3. Point it to the backend Node.js application

### Step 2: Enable SSL Certificates

1. Go to cPanel → SSL/TLS Status
2. Enable AutoSSL for both your main domain and subdomain
3. Wait for certificates to be issued (usually takes a few minutes)

### Step 3: Access Strapi Admin Panel

1. Visit `https://api.yourdomain.com/admin` (or your backend URL + `/admin`)
2. **First Time Setup**: Create your first admin user
3. Log in to the admin panel

### Step 4: Configure Strapi Settings

If you encounter CORS issues, update `server/config/middlewares.ts`:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://yourdomain.com', 'https://api.yourdomain.com'],
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

Then rebuild and restart the backend application.

### Step 5: Upload Media Files

If you have existing media files:

1. Upload them to `server/public/uploads/` via FTP or File Manager
2. Or upload through Strapi admin panel

### Step 6: Test Your Website

1. Visit your main domain: `https://yourdomain.com`
2. Test all pages and features
3. Check that content loads from Strapi
4. Test the chatbot functionality
5. Test form submissions

## File Permissions

Ensure correct permissions are set:

```bash
# For directories
find /home/username/mortgages-backend -type d -exec chmod 755 {} \;
find /home/username/mortgages-frontend -type d -exec chmod 755 {} \;

# For files
find /home/username/mortgages-backend -type f -exec chmod 644 {} \;
find /home/username/mortgages-frontend -type f -exec chmod 644 {} \;

# Make sure Strapi can write to upload directories
chmod -R 755 /home/username/mortgages-backend/server/public/uploads
chmod -R 755 /home/username/mortgages-backend/server/.tmp
```

## Troubleshooting

### Application Won't Start

**Check logs:**
- View logs in Node.js App Manager
- Or check log files: `/home/username/logs/backend.log`

**Common issues:**
1. **Port conflicts**: Make sure PORT in .env matches what cPanel assigned
2. **Node.js version**: Ensure version 18.x - 22.x is selected
3. **Missing dependencies**: Run `npm install` again
4. **Startup file path**: Verify `dist/src/index.js` exists for backend

### Database Connection Errors

**SQLite:**
```bash
# Ensure .tmp directory exists and is writable
mkdir -p /home/username/mortgages-backend/server/.tmp
chmod 755 /home/username/mortgages-backend/server/.tmp
```

**MySQL:**
- Verify database credentials in environment variables
- Ensure database exists in cPanel → MySQL Databases
- Check that user has all privileges on the database

### Frontend Can't Connect to Backend

1. **Verify backend is running**: Visit `https://api.yourdomain.com/api`
2. **Check VITE_STRAPI_URL**: Make sure it matches your backend URL
3. **SSL issues**: Ensure both domains have valid SSL certificates
4. **CORS errors**: Update middlewares.ts as shown above

### 502 Bad Gateway Error

This usually means the application crashed:
1. Check application logs
2. Restart the application in Node.js App Manager
3. Verify all environment variables are set correctly

### Memory Issues

If the application crashes due to memory:
1. Contact your hosting provider to increase memory limits
2. Consider using a VPS instead of shared hosting for better performance

### File Upload Fails in Strapi

```bash
# Ensure upload directory is writable
chmod -R 755 /home/username/mortgages-backend/server/public/uploads
```

## Updating Your Application

When you make changes and need to redeploy:

1. **Build locally** (as shown in Building Applications section)
2. **Upload changed files** via FTP or File Manager
3. **Restart applications** in Node.js App Manager

For code changes only (no new dependencies):
- Just upload changed files and restart

For dependency changes:
- Upload new `package.json`
- Run `npm install` via terminal or Node.js App Manager
- Restart application

## Alternative: Static Frontend Deployment

If cPanel limits the number of Node.js applications, you can serve the frontend as static files:

### Build as Static

```bash
cd client
yarn build --preset static
```

### Deploy Static Files

1. Upload contents of `build/client/` to `public_html/`
2. Only run the Strapi backend as a Node.js application
3. Update `.htaccess` for proper routing:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Security Best Practices

1. **Keep secrets secure**: Never commit `.env` files to Git
2. **Use strong passwords**: For Strapi admin and database
3. **Enable rate limiting**: Configure in Strapi settings
4. **Keep dependencies updated**: Regularly run `npm update`
5. **Use HTTPS**: Ensure SSL certificates are active
6. **File permissions**: 755 for directories, 644 for files
7. **Backup database**: Regularly backup your SQLite file or MySQL database

## Support

If you encounter issues:

1. Check the logs in Node.js App Manager
2. Contact your hosting provider's support
3. Review Strapi documentation: https://docs.strapi.io
4. Review React Router documentation: https://reactrouter.com

---

**Congratulations!** Your Mortgages by Ram website should now be live on cPanel. 🎉

