# cPanel Node.js Configuration Guide

Detailed guide for configuring Node.js applications in cPanel.

---

## 📋 Table of Contents

1. [Accessing Node.js App Manager](#accessing-nodejs-app-manager)
2. [Creating Applications](#creating-applications)
3. [Environment Variables](#environment-variables)
4. [Managing Applications](#managing-applications)
5. [Common Issues](#common-issues)
6. [Advanced Configuration](#advanced-configuration)

---

## 🎯 Accessing Node.js App Manager

### Step-by-Step:

1. Log into your cPanel account
2. Scroll down to the "Software" section
3. Look for one of these:
   - "Setup Node.js App"
   - "Node.js Selector"
   - "Node.js App Manager"
4. Click to open

**Note:** If you don't see this option, contact your hosting provider to enable Node.js support.

---

## 🚀 Creating Applications

### Backend Application (Strapi)

#### 1. Click "Create Application"

#### 2. Fill in the form:

**Node.js Version:**
```
Select: 18.x, 20.x, or 22.x
Recommended: 20.x
```

**Application Mode:**
```
Select: Production
```

**Application Root:**
```
Path: /home/username/mortgages-backend/server
```
Replace `username` with your actual cPanel username.

**Application URL:**
```
Domain: api.yourdomain.com
```
Or choose a subdomain you created.

**Application Startup File:**
```
File: dist/src/index.js
```

**Environment Variables:**
(See below for details)

#### 3. Click "Create"

---

### Frontend Application (React Router)

#### 1. Click "Create Application" again

#### 2. Fill in the form:

**Node.js Version:**
```
Select: Same as backend (18.x, 20.x, or 22.x)
```

**Application Mode:**
```
Select: Production
```

**Application Root:**
```
Path: /home/username/mortgages-frontend/client
```

**Application URL:**
```
Domain: yourdomain.com
```
Your main domain.

**Application Startup File:**
```
File: build/server/index.js
```

**Environment Variables:**
(See below for details)

#### 3. Click "Create"

---

## ⚙️ Environment Variables

### Backend Environment Variables

Add these variables one by one in the Node.js App Manager:

| Variable Name | Example Value | Description |
|--------------|---------------|-------------|
| `HOST` | `0.0.0.0` | Server host (allows external connections) |
| `PORT` | `1337` | Port number (use cPanel assigned port) |
| `NODE_ENV` | `production` | Environment mode |
| `APP_KEYS` | `key1,key2,key3,key4` | Strapi app keys (comma-separated) |
| `API_TOKEN_SALT` | `[generated-key]` | API token salt |
| `ADMIN_JWT_SECRET` | `[generated-key]` | Admin JWT secret |
| `TRANSFER_TOKEN_SALT` | `[generated-key]` | Transfer token salt |
| `JWT_SECRET` | `[generated-key]` | JWT secret |
| `DATABASE_CLIENT` | `sqlite` | Database type |
| `DATABASE_FILENAME` | `.tmp/data.db` | SQLite database file |

**To add a variable:**
1. Scroll to "Environment Variables" section
2. Click "Add Variable"
3. Enter variable name (e.g., `HOST`)
4. Enter value (e.g., `0.0.0.0`)
5. Click "Save"
6. Repeat for all variables

**For MySQL database instead of SQLite:**

| Variable Name | Example Value |
|--------------|---------------|
| `DATABASE_CLIENT` | `mysql` |
| `DATABASE_HOST` | `localhost` |
| `DATABASE_PORT` | `3306` |
| `DATABASE_NAME` | `mortgages_db` |
| `DATABASE_USERNAME` | `mortgages_user` |
| `DATABASE_PASSWORD` | `[secure-password]` |

---

### Frontend Environment Variables

| Variable Name | Example Value | Description |
|--------------|---------------|-------------|
| `PORT` | `3000` | Port (use cPanel assigned port) |
| `NODE_ENV` | `production` | Environment mode |
| `VITE_STRAPI_URL` | `https://api.yourdomain.com` | Backend API URL |

**Important:** The `VITE_STRAPI_URL` must match your backend domain with `https://`.

---

## 🔧 Managing Applications

### Starting/Stopping Applications

**To Start:**
1. Find your application in the list
2. Click the "Start" or "Restart" button
3. Wait for status to change to "Running"

**To Stop:**
1. Find your application in the list
2. Click the "Stop" button
3. Status will change to "Stopped"

**To Restart:**
1. Click the "Restart" button
2. Useful after changing environment variables or uploading new code

---

### Viewing Application Status

The dashboard shows:
- **Status**: Running / Stopped / Error
- **Node.js Version**: Currently using
- **Application Root**: File path
- **Application URL**: Public URL
- **Memory Usage**: RAM consumption
- **Restarts**: Number of restarts

---

### Viewing Logs

**To view logs:**
1. Find your application
2. Click "View Logs" or "Application Logs"
3. Check for errors or warnings

**Common log locations:**
```
/home/username/logs/nodejs-app-[appname].log
```

**Via SSH:**
```bash
tail -f /home/username/logs/nodejs-app-backend.log
```

---

### Installing/Updating Dependencies

**Method 1: Via cPanel (Recommended)**
1. Find your application
2. Click "Run NPM Install"
3. Wait for installation to complete

**Method 2: Via SSH**
```bash
cd /home/username/mortgages-backend/server
npm install --production

cd /home/username/mortgages-frontend/client
npm install --production
```

**After updating dependencies:**
- Always restart the application

---

### Editing Environment Variables

**To update a variable:**
1. Find your application
2. Scroll to "Environment Variables"
3. Find the variable you want to change
4. Click "Edit" or modify the value directly
5. Click "Save"
6. **Important:** Restart the application for changes to take effect

**To add a new variable:**
1. Click "Add Variable"
2. Enter name and value
3. Click "Save"
4. Restart application

**To delete a variable:**
1. Find the variable
2. Click "Delete" or "Remove"
3. Confirm deletion
4. Restart application

---

## ⚠️ Common Issues

### Issue 1: Application Won't Start

**Symptoms:**
- Status shows "Error" or "Stopped"
- Logs show "Cannot find module"

**Solutions:**
1. Check that the startup file path is correct
2. Verify `node_modules` folder exists
3. Run "NPM Install" again
4. Check Node.js version compatibility

---

### Issue 2: Port Already in Use

**Symptoms:**
- Error: "Port 1337 is already in use"

**Solutions:**
1. Use the port assigned by cPanel (shown in the interface)
2. Update `PORT` environment variable to match
3. Don't hardcode ports in your code

---

### Issue 3: Application Keeps Restarting

**Symptoms:**
- Status shows "Running" but keeps restarting
- "Restarts" counter keeps increasing

**Solutions:**
1. Check application logs for errors
2. Verify environment variables are correct
3. Check database connection (if using MySQL)
4. Ensure file permissions are correct (755/644)
5. Check memory usage (may need to upgrade plan)

---

### Issue 4: 502 Bad Gateway

**Symptoms:**
- Website shows "502 Bad Gateway" error

**Solutions:**
1. Application crashed - check logs
2. Restart the application
3. Verify startup file path is correct
4. Check for JavaScript errors in code
5. Increase memory limits (contact hosting provider)

---

### Issue 5: Module Not Found

**Symptoms:**
- Error: "Cannot find module 'xyz'"

**Solutions:**
1. Ensure all dependencies are listed in `package.json`
2. Run "NPM Install" again
3. Check that `node_modules` folder is uploaded (or regenerate it)
4. Verify Node.js version matches your local development version

---

### Issue 6: Database Connection Error

**Symptoms:**
- Error: "Connection refused" or "Access denied"

**SQLite Solutions:**
1. Ensure `.tmp` directory exists
2. Check write permissions: `chmod 755 .tmp`
3. Verify `DATABASE_FILENAME` path is correct

**MySQL Solutions:**
1. Verify database exists in cPanel → MySQL Databases
2. Check username and password are correct
3. Ensure user has all privileges on database
4. Confirm `DATABASE_HOST` is `localhost`

---

### Issue 7: Frontend Can't Connect to Backend

**Symptoms:**
- Frontend loads but no data appears
- Console shows CORS errors or network errors

**Solutions:**
1. Verify backend is running (check status)
2. Test backend directly: visit `https://api.yourdomain.com/api`
3. Check `VITE_STRAPI_URL` matches backend URL exactly
4. Ensure both domains have valid SSL certificates
5. Configure CORS in Strapi (see below)

---

## 🔐 Advanced Configuration

### Configuring CORS for Strapi

If frontend can't connect to backend due to CORS errors:

1. Edit `server/config/middlewares.ts` locally
2. Add CORS configuration:

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
        'https://api.yourdomain.com',
        'http://localhost:5173', // for local development
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

3. Rebuild and reupload the server code
4. Restart the backend application

---

### Increasing Memory Limits

If your application needs more memory:

1. Contact your hosting provider
2. Request increased memory limits for Node.js apps
3. Or upgrade to a higher hosting plan
4. Or consider VPS hosting for more control

---

### Setting Up Cron Jobs

To run scheduled tasks (e.g., backups):

1. Go to cPanel → Cron Jobs
2. Add a new cron job
3. Example: Daily database backup at 2 AM
   ```
   0 2 * * * cd /home/username/mortgages-backend/server && node backup.js
   ```

---

### Using PM2 Instead of Passenger

If you have SSH access, you can use PM2 for better process management:

```bash
# Install PM2
npm install -g pm2

# Start backend
cd /home/username/mortgages-backend/server
pm2 start dist/src/index.js --name backend

# Start frontend
cd /home/username/mortgages-frontend/client
pm2 start build/server/index.js --name frontend

# Save PM2 configuration
pm2 save
pm2 startup
```

**Note:** This requires SSH access and may not be supported on all shared hosting plans.

---

### Monitoring Application Performance

**Via cPanel:**
- Check memory usage in Node.js App Manager
- View application metrics (if available)

**Via SSH:**
```bash
# Check running processes
ps aux | grep node

# Check memory usage
free -m

# Monitor logs in real-time
tail -f /home/username/logs/nodejs-app-backend.log
```

---

## 📊 Performance Tips

1. **Use Production Mode:** Always set `NODE_ENV=production`
2. **Enable Compression:** Strapi has built-in gzip compression
3. **Optimize Images:** Use optimized images in Strapi
4. **Database Indexing:** Add indexes to frequently queried fields
5. **Caching:** Consider adding Redis for caching (if available)
6. **CDN:** Use a CDN for static assets (optional)

---

## 🔄 Updating Your Application

When you need to deploy updates:

1. **Make changes locally** and test
2. **Build the application:**
   ```bash
   cd server
   yarn build
   
   cd ../client
   yarn build
   ```
3. **Upload changed files** to cPanel
4. **Restart applications** in Node.js App Manager
5. **Clear browser cache** and test

**For dependency updates:**
1. Upload new `package.json`
2. Click "Run NPM Install" in Node.js App Manager
3. Restart application

---

## 📞 Getting Help

**If you need assistance:**

1. Check application logs first
2. Review this guide and [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
3. Search cPanel documentation
4. Contact your hosting provider's support
5. Check Strapi community forums

---

## 🎓 Additional Resources

- [Strapi Documentation](https://docs.strapi.io)
- [React Router Documentation](https://reactrouter.com)
- [cPanel Documentation](https://docs.cpanel.net)
- [Node.js Documentation](https://nodejs.org/docs)

---

**Last Updated:** October 2025  
**Compatible with:** cPanel with Node.js App Manager, Strapi 5.x, React Router 7.x

