#!/bin/bash

##############################################
# Create Deployment Archives for cPanel Upload
# Usage: ./create-deployment-archives.sh
##############################################

set -e  # Exit on error

echo ""
echo "==========================================="
echo "📦 Creating Deployment Archives"
echo "==========================================="
echo ""

# Check if we're in the right directory
if [ ! -d "server" ] || [ ! -d "client" ]; then
    echo "❌ Error: Please run this script from the mortgages-by-ram directory"
    exit 1
fi

# Check if builds exist
if [ ! -d "server/dist" ]; then
    echo "❌ Error: Server not built. Run ./build-for-production.sh first"
    exit 1
fi

if [ ! -d "client/build" ]; then
    echo "❌ Error: Client not built. Run ./build-for-production.sh first"
    exit 1
fi

# Create deployment directory
mkdir -p deployment-files

echo "📦 Creating server archive..."
# Include everything except node_modules and .tmp
zip -r deployment-files/mortgages-backend.zip server/ \
    -x "server/node_modules/*" \
    -x "server/.tmp/*" \
    -x "server/.cache/*" \
    -x "server/*.log" \
    -x "server/.DS_Store"

echo "✅ Server archive created: deployment-files/mortgages-backend.zip"
echo ""

echo "📦 Creating client archive..."
# Include everything except node_modules
zip -r deployment-files/mortgages-frontend.zip client/ \
    -x "client/node_modules/*" \
    -x "client/.cache/*" \
    -x "client/*.log" \
    -x "client/.DS_Store"

echo "✅ Client archive created: deployment-files/mortgages-frontend.zip"
echo ""

# Calculate sizes
server_size=$(du -h deployment-files/mortgages-backend.zip | cut -f1)
client_size=$(du -h deployment-files/mortgages-frontend.zip | cut -f1)

echo "==========================================="
echo "✅ Archives created successfully!"
echo "==========================================="
echo ""
echo "📁 Files created in 'deployment-files/' directory:"
echo "   - mortgages-backend.zip  ($server_size)"
echo "   - mortgages-frontend.zip ($client_size)"
echo ""
echo "📤 Next steps:"
echo "   1. Upload both .zip files to cPanel File Manager"
echo "   2. Extract them in your home directory"
echo "   3. Rename folders:"
echo "      - server/ → mortgages-backend/"
echo "      - client/ → mortgages-frontend/"
echo "   4. Follow DEPLOYMENT-GUIDE.md to setup Node.js apps"
echo ""

