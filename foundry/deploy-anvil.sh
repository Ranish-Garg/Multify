#!/bin/bash

# Anvil Smart Account Deployment Script

echo "🔥 Starting Anvil Smart Account Deployment..."

# Check if anvil is running
if ! pgrep -f "anvil" > /dev/null; then
    echo "❌ Anvil is not running. Please start anvil first:"
    echo "   anvil"
    exit 1
fi

echo "✅ Anvil detected"

# Deploy and get initCode
echo "📦 Deploying factory and generating initCode..."

forge script script/Deploy.s.sol --fork-url http://localhost:8545 --broadcast

echo "✅ Deployment complete!"
echo ""
echo "📋 Use the initCode from above in your UserOperations"
echo "🎯 The factory will handle account creation automatically"
echo ""
echo "To test with different parameters, edit the script and run again."
