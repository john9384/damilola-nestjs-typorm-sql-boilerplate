#!/bin/bash

# Setup script for NestJS NoSQL Template
echo "🚀 Setting up NestJS NoSQL Template environment..."

# Check if .env file already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Do you want to overwrite it? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled."
        exit 1
    fi
fi

# Create .env file
cat > .env << EOF
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/nest-boilerplate
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1d
EOF

echo "✅ .env file created successfully!"
echo ""
echo "📋 Environment variables set:"
echo "   - NODE_ENV: development"
echo "   - PORT: 3000"
echo "   - MONGO_URI: mongodb://localhost:27017/nest-boilerplate"
echo "   - JWT_SECRET: your-super-secret-jwt-key-change-in-production"
echo "   - JWT_EXPIRES_IN: 1d"
echo ""
echo "🔧 Next steps:"
echo "   1. Make sure MongoDB is running locally on port 27017"
echo "   2. Run 'yarn install' to install dependencies"
echo "   3. Run 'yarn start:dev' to start the development server"
echo "   4. Visit http://localhost:3000/api for Swagger documentation"
echo ""
echo "⚠️  Remember to change JWT_SECRET in production!"
