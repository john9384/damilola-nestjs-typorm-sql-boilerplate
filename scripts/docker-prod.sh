#!/bin/bash

# Production Docker setup script for NestJS NoSQL Template

set -e

echo "🐳 Setting up NestJS NoSQL Template for production with Docker..."

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to check if Docker Compose is available
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
        exit 1
    fi
}

# Function to check environment variables
check_env() {
    if [ -z "$JWT_SECRET" ]; then
        echo "⚠️  Warning: JWT_SECRET environment variable is not set."
        echo "   Using default value. Please set a secure JWT_SECRET for production."
    fi
    
    if [ -z "$MONGO_ROOT_PASSWORD" ]; then
        echo "⚠️  Warning: MONGO_ROOT_PASSWORD environment variable is not set."
        echo "   Using default value. Please set a secure MONGO_ROOT_PASSWORD for production."
    fi
}

# Function to stop and remove existing containers
cleanup() {
    echo "🧹 Cleaning up existing containers..."
    docker-compose -f docker-compose.prod.yml down -v 2>/dev/null || true
}

# Function to build and start production environment
start_prod() {
    echo "🚀 Building and starting production environment..."
    docker-compose -f docker-compose.prod.yml up --build -d
    
    echo "⏳ Waiting for services to be ready..."
    sleep 15
    
    echo "✅ Production environment is ready!"
    echo ""
    echo "📋 Services:"
    echo "   - NestJS App: http://localhost:3000"
    echo "   - Swagger Docs: http://localhost:3000/api/docs"
    echo "   - MongoDB: localhost:27017"
    echo ""
    echo "🔧 Useful commands:"
    echo "   - View logs: docker-compose -f docker-compose.prod.yml logs -f"
    echo "   - Stop services: docker-compose -f docker-compose.prod.yml down"
    echo "   - Restart app: docker-compose -f docker-compose.prod.yml restart app"
    echo ""
    echo "⚠️  Production mode is optimized for performance, not development."
}

# Function to show logs
show_logs() {
    echo "📋 Showing logs..."
    docker-compose -f docker-compose.prod.yml logs -f
}

# Function to stop services
stop_services() {
    echo "🛑 Stopping production services..."
    docker-compose -f docker-compose.prod.yml down
    echo "✅ Services stopped."
}

# Function to restart app only
restart_app() {
    echo "🔄 Restarting NestJS app..."
    docker-compose -f docker-compose.prod.yml restart app
    echo "✅ App restarted."
}

# Function to update production
update_prod() {
    echo "🔄 Updating production environment..."
    docker-compose -f docker-compose.prod.yml pull
    docker-compose -f docker-compose.prod.yml up --build -d
    echo "✅ Production environment updated."
}

# Main script logic
case "${1:-start}" in
    "start")
        check_docker
        check_docker_compose
        check_env
        cleanup
        start_prod
        ;;
    "logs")
        show_logs
        ;;
    "stop")
        stop_services
        ;;
    "restart")
        restart_app
        ;;
    "update")
        update_prod
        ;;
    "clean")
        cleanup
        stop_services
        echo "🧹 Removing volumes..."
        docker volume rm nest-nosql-template_mongodb_data_prod 2>/dev/null || true
        echo "✅ Cleanup completed."
        ;;
    *)
        echo "Usage: $0 {start|logs|stop|restart|update|clean}"
        echo ""
        echo "Commands:"
        echo "  start   - Build and start production environment (default)"
        echo "  logs    - Show logs from all services"
        echo "  stop    - Stop all production services"
        echo "  restart - Restart only the NestJS app"
        echo "  update  - Pull latest images and restart services"
        echo "  clean   - Stop services and remove volumes"
        echo ""
        echo "Environment Variables:"
        echo "  JWT_SECRET          - Secret key for JWT tokens"
        echo "  MONGO_ROOT_PASSWORD - MongoDB root password"
        echo "  JWT_EXPIRES_IN      - JWT token expiration time"
        exit 1
        ;;
esac
