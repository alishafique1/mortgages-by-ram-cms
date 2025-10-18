#!/bin/bash

echo "🚀 Blog Creation Script for Mortgages by Ram"
echo "=============================================="
echo ""
echo "This script will create 10 mortgage-focused blog entries in your Strapi CMS."
echo ""
echo "📋 Prerequisites:"
echo "1. Strapi server must be running on http://localhost:1337"
echo "2. You need an API token with 'Full access' permissions"
echo ""
echo "🔑 To get your API token:"
echo "1. Open: http://localhost:1337/admin"
echo "2. Go to: Settings → API Tokens"
echo "3. Click 'Create new API Token'"
echo "4. Set Token type to 'Full access'"
echo "5. Copy the generated token"
echo ""
echo "📝 Blog entries that will be created:"
echo "1. First-Time Home Buyer Guide"
echo "2. Toronto Mortgage Rates: What to Expect in 2025"
echo "3. Refinancing Your Mortgage: When and Why"
echo "4. Investment Property Mortgages: Building Your Portfolio"
echo "5. Understanding Mortgage Pre-Approval vs Pre-Qualification"
echo "6. Down Payment Strategies: Maximizing Your Options"
echo "7. Mortgage Insurance: CMHC vs Private Lenders"
echo "8. Toronto Real Estate Market: Q1 2025 Analysis"
echo "9. Mortgage Stress Test: How It Affects Your Buying Power"
echo "10. Closing Costs: What First-Time Buyers Need to Know"
echo ""
echo "💡 After creating the blogs, check your frontend at: http://localhost:5174/articles"
echo ""
echo "Ready to proceed? Press Enter to continue..."
read

echo "Please enter your API token:"
read -s API_TOKEN

if [ -z "$API_TOKEN" ]; then
    echo "❌ No API token provided. Exiting."
    exit 1
fi

echo ""
echo "🔄 Creating blog entries..."
node create-blog-entries.js "$API_TOKEN"

echo ""
echo "✅ Script completed!"
echo "🌐 Check your articles at: http://localhost:5174/articles"
