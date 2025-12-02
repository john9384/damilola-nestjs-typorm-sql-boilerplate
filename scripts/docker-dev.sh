#!/bin/bash

# Development Docker setup script for NestJS NoSQL Template

set -e

echo "🐳 Setting up NestJS NoSQL Template for development with Docker..."

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

# Function to stop and remove existing containers
cleanup() {
    echo "🧹 Cleaning up existing containers..."
    docker-compose -f docker-compose.dev.yml down -v 2>/dev/null || true
}

# Function to build and start development environment
start_dev() {
    echo "🚀 Building and starting development environment..."
    docker-compose -f docker-compose.dev.yml up --build -d
    
    echo "⏳ Waiting for services to be ready..."
    sleep 10
    
    echo "✅ Development environment is ready!"
    echo ""
    echo "📋 Services:"
    echo "   - NestJS App: http://localhost:3000"
    echo "   - Swagger Docs: http://localhost:3000/api/docs"
    echo "   - MongoDB: localhost:27017"
    echo ""
    echo "🔧 Useful commands:"
    echo "   - View logs: docker-compose -f docker-compose.dev.yml logs -f"
    echo "   - Stop services: docker-compose -f docker-compose.dev.yml down"
    echo "   - Restart app: docker-compose -f docker-compose.dev.yml restart app"
    echo ""
    echo "💡 Hot reloading is enabled! Changes to your code will automatically restart the app."
}

# Function to show logs
show_logs() {
    echo "📋 Showing logs..."
    docker-compose -f docker-compose.dev.yml logs -f
}

# Function to stop services
stop_services() {
    echo "🛑 Stopping development services..."
    docker-compose -f docker-compose.dev.yml down
    echo "✅ Services stopped."
}

# Function to restart app only
restart_app() {
    echo "🔄 Restarting NestJS app..."
    docker-compose -f docker-compose.dev.yml restart app
    echo "✅ App restarted."
}

# Main script logic
case "${1:-start}" in
    "start")
        check_docker
        check_docker_compose
        cleanup
        start_dev
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
    "clean")
        cleanup
        stop_services
        echo "🧹 Removing volumes..."
        docker volume rm nest-nosql-template_mongodb_data 2>/dev/null || true
        echo "✅ Cleanup completed."
        ;;
    *)
        echo "Usage: $0 {start|logs|stop|restart|clean}"
        echo ""
        echo "Commands:"
        echo "  start   - Build and start development environment (default)"
        echo "  logs    - Show logs from all services"
        echo "  stop    - Stop all development services"
        echo "  restart - Restart only the NestJS app"
        echo "  clean   - Stop services and remove volumes"
        exit 1
        ;;
esac
