# Quick Deployment Reference

Quick command reference for deploying to cPanel.

## 🔑 Step 1: Generate Security Keys

```bash
node -e "for(let i=0;i<5;i++) console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Save these 5 keys for your `.env` files.

## 📝 Step 2: Create Environment Files

### `server/.env`
```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
APP_KEYS=KEY1,KEY2,KEY3,KEY4
API_TOKEN_SALT=KEY5
ADMIN_JWT_SECRET=KEY1
TRANSFER_TOKEN_SALT=KEY2
JWT_SECRET=KEY3
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### `client/.env`
```env
NODE_ENV=production
VITE_STRAPI_URL=https://api.yourdomain.com
```

## 🏗️ Step 3: Build Applications

```bash
# Build backend
cd server
yarn install --production=false
yarn build

# Build frontend
cd ../client
yarn install --production=false
yarn build
```

## 📦 Step 4: Prepare for Upload

```bash
# Create zip files for easy upload
cd ..
zip -r server.zip server/ -x "server/node_modules/*" "server/.tmp/*"
zip -r client.zip client/ -x "client/node_modules/*" "client/build/*"
```

## ⬆️ Step 5: Upload to cPanel

1. Login to cPanel File Manager
2. Upload `server.zip` and `client.zip`
3. Extract both files
4. Rename folders to `mortgages-backend` and `mortgages-frontend`

## ⚙️ Step 6: Setup Node.js Apps in cPanel

### Backend Application:
- **Root**: `/home/username/mortgages-backend/server`
- **URL**: `api.yourdomain.com`
- **Startup**: `dist/src/index.js`
- **Node.js**: 18.x or 20.x

### Frontend Application:
- **Root**: `/home/username/mortgages-frontend/client`
- **URL**: `yourdomain.com`
- **Startup**: `build/server/index.js`
- **Node.js**: 18.x or 20.x

## 🔐 Step 7: Set Environment Variables

Add all variables from your `.env` files in the Node.js App Manager.

## 🚀 Step 8: Install & Start

For each application:
1. Click "Run NPM Install"
2. Click "Start Application"

## ✅ Step 9: Verify

- Backend: `https://api.yourdomain.com/admin`
- Frontend: `https://yourdomain.com`

---

**Full guide**: See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed instructions.

