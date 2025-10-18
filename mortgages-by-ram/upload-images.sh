#!/bin/bash

# Upload images to Strapi Media Library
# Images will be accessible at http://localhost:1337/uploads/filename.jpg

echo "📸 Uploading images to Strapi Media Library..."
echo ""

STRAPI_URL="http://localhost:1337"
UPLOAD_DIR="/Users/alishafique/Documents/Projects/MortgagesbyRam/mortgages-by-ram/temp-images"

# Array of images with their descriptions
declare -A images
images["hero-modern-home.jpg"]="Modern luxury home exterior - perfect for hero section"
images["mortgage-consultation.jpg"]="Professional mortgage consultation meeting"
images["toronto-skyline.jpg"]="Beautiful Toronto skyline at sunset"
images["happy-family-home.jpg"]="Happy family in front of their new home"
images["business-handshake.jpg"]="Business handshake closing a mortgage deal"
images["house-keys.jpg"]="House keys for new homeowners"

# Upload each image
for filename in "${!images[@]}"; do
    alt_text="${images[$filename]}"
    filepath="$UPLOAD_DIR/$filename"

    echo "⬆️  Uploading: $filename"
    echo "   Alt text: $alt_text"

    # Upload using curl with multipart form data
    curl -s -X POST "$STRAPI_URL/api/upload" \
        -F "files=@$filepath" \
        -F "fileInfo={\"alternativeText\":\"$alt_text\",\"name\":\"$filename\"}" \
        > /dev/null

    if [ $? -eq 0 ]; then
        echo "   ✅ Uploaded successfully!"
    else
        echo "   ❌ Upload failed"
    fi
    echo ""
done

echo "🎉 All images uploaded to Strapi!"
echo ""
echo "View them at: $STRAPI_URL/admin/content-manager/upload"
echo ""
echo "Images are now available at:"
for filename in "${!images[@]}"; do
    echo "  • $STRAPI_URL/uploads/$filename"
done
