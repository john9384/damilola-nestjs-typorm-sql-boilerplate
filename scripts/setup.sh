#!/bin/bash

# NestJS SQL Template Setup Script
echo "🚀 Setting up NestJS SQL Template..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 &> /dev/null; then
    echo "⚠️  PostgreSQL is not running. Please start PostgreSQL:"
    echo "   macOS: brew services start postgresql"
    echo "   Ubuntu: sudo systemctl start postgresql"
    echo "   Windows: Start PostgreSQL service"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOF
# Application
NODE_ENV=development
PORT=3000

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=a
POSTGRES_PASSWORD=
POSTGRES_DB=postgres

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1d
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Run database migrations
echo "🗄️  Running database migrations..."
npm run migration:run

# Build the application
echo "🔨 Building the application..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "🎉 You can now start the application:"
echo "   npm run start:dev"
echo ""
echo "📚 API Documentation will be available at:"
echo "   http://localhost:3000/api"
echo ""
echo "🔐 Test the authentication system:"
echo "   1. Start onboarding: POST /auth/onboard"
echo "   2. Complete registration: POST /auth/complete"
echo "   3. Login: POST /auth/login"
