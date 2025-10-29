#!/bin/bash

##############################################
# Production Build Script for cPanel Deployment
# Usage: ./build-for-production.sh
##############################################

set -e  # Exit on error

echo ""
echo "==========================================="
echo "🏗️  Building Mortgages by Ram for Production"
echo "==========================================="
echo ""

# Check if we're in the right directory
if [ ! -d "server" ] || [ ! -d "client" ]; then
    echo "❌ Error: Please run this script from the mortgages-by-ram directory"
    exit 1
fi

# Function to check if .env file exists
check_env_file() {
    local env_file=$1
    local dir_name=$2
    
    if [ ! -f "$env_file" ]; then
        echo "⚠️  Warning: $env_file not found"
        echo "   Create one before deploying to production"
        return 1
    fi
    echo "✅ $dir_name .env file found"
    return 0
}

# Check for environment files
echo "📋 Checking environment files..."
check_env_file "server/.env" "Server"
check_env_file "client/.env" "Client"
echo ""

# Build Backend (Strapi)
echo "🔨 Building Backend (Strapi)..."
cd server

if [ ! -d "node_modules" ]; then
    echo "📦 Installing server dependencies..."
    yarn install --production=false
else
    echo "✓ Dependencies already installed"
fi

echo "🏗️  Building server..."
yarn build

if [ -d "dist" ]; then
    echo "✅ Server build completed successfully"
else
    echo "❌ Server build failed"
    exit 1
fi

cd ..
echo ""

# Build Frontend (React Router)
echo "🔨 Building Frontend (React Router)..."
cd client

if [ ! -d "node_modules" ]; then
    echo "📦 Installing client dependencies..."
    yarn install --production=false
else
    echo "✓ Dependencies already installed"
fi

echo "🏗️  Building client..."
yarn build

if [ -d "build" ]; then
    echo "✅ Client build completed successfully"
else
    echo "❌ Client build failed"
    exit 1
fi

cd ..
echo ""

echo "==========================================="
echo "✅ Build completed successfully!"
echo "==========================================="
echo ""
echo "📦 Next steps:"
echo "   1. Create deployment archives:"
echo "      ./create-deployment-archives.sh"
echo ""
echo "   2. Or upload folders directly to cPanel:"
echo "      - Upload 'server/' folder"
echo "      - Upload 'client/' folder"
echo ""
echo "   3. Follow DEPLOYMENT-GUIDE.md for complete instructions"
echo ""

