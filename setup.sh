#!/usr/bin/env bash
# 🚀 QUICK START - LocalLeads Setup Script
# Run this to verify your setup is working

echo "========================================"
echo "  LocalLeads - Quick Start Verification"
echo "========================================"
echo ""

# Check if .env.local exists
echo "📋 Checking .env.local..."
if [ -f .env.local ]; then
    echo "✅ .env.local exists"

    # Check if variables are set
    if grep -q "VITE_SUPABASE_URL" .env.local; then
        echo "  ✅ VITE_SUPABASE_URL found"
    else
        echo "  ❌ VITE_SUPABASE_URL missing"
    fi

    if grep -q "VITE_SUPABASE_ANON_KEY" .env.local; then
        echo "  ✅ VITE_SUPABASE_ANON_KEY found"
    else
        echo "  ❌ VITE_SUPABASE_ANON_KEY missing"
    fi

    if grep -q "VITE_GOOGLE_MAPS_API_KEY" .env.local; then
        echo "  ✅ VITE_GOOGLE_MAPS_API_KEY found"
    else
        echo "  ❌ VITE_GOOGLE_MAPS_API_KEY missing"
    fi
else
    echo "❌ .env.local not found!"
    echo ""
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  Please edit .env.local and add your API keys:"
    echo "   1. Add your Supabase URL and Anon Key"
    echo "   2. Add your Google Maps API Key"
    echo ""
fi

echo ""
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
else
    echo "❌ node_modules not found"
    echo "   Running: npm install"
    npm install
fi

echo ""
echo "========================================"
echo "  ✅ Setup Check Complete!"
echo "========================================"
echo ""
echo "📖 Documentation:"
echo "  • COMPLETE_SETUP.md   - Full setup guide"
echo "  • ENV_SETUP.md        - Environment variables"
echo "  • TROUBLESHOOTING.md  - Common issues"
echo ""
echo "🚀 To start development:"
echo "   npm run dev"
echo ""
echo "Open http://localhost:3000 in your browser"
echo ""
