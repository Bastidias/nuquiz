#!/bin/bash
# Dev server startup script
# Kills any existing Next.js dev servers before starting a new one

echo "🧹 Cleaning up existing dev servers..."

# Kill any processes on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null && echo "✓ Killed process on port 3000"

# Kill any Next.js dev processes
pkill -f "next dev" 2>/dev/null && echo "✓ Killed Next.js dev processes"

sleep 1

echo "🚀 Starting dev server..."
next dev
