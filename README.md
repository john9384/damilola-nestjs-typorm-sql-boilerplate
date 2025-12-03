# NestJS TypeORM SQL Boilerplate

A production-ready NestJS application template with PostgreSQL, TypeORM, JWT authentication, and comprehensive API documentation. Built with clean architecture principles, featuring a modular structure, standardized response format, and robust error handling.

## 🚀 Features

- **🏗️ Clean Architecture** - Separation of concerns with domain, application, infrastructure, and presentation layers
- **🗄️ PostgreSQL & TypeORM** - Robust relational database with migrations support
- **🔐 JWT Authentication** - Secure token-based authentication with Passport.js
- **📚 Swagger Documentation** - Interactive API documentation with Swagger UI
- **🛡️ Global Guards & Interceptors** - Standardized response format and error handling
- **✅ Request Validation** - Automatic validation with class-validator
- **🐳 Docker Support** - Complete containerization with docker-compose
- **🔄 Base Repository Pattern** - Reusable repository base class for all entities
- **📦 Modular Design** - Feature-based module organization
- **🔧 TypeScript** - Full type safety throughout the application

## 📋 Prerequisites

- **Node.js** v18 or higher
- **PostgreSQL** 15 or higher
- **npm** or **yarn**
- **Docker & Docker Compose** (optional, for containerized deployment)

## 🏗️ Project Structure

```
src/
├── common/                    # Shared utilities and cross-cutting concerns
│   ├── decorators/           # Custom decorators (Public, CurrentUser)
│   ├── filters/              # Exception filters (HTTP, All exceptions)
│   ├── guards/               # Authentication guards (JWT)
│   └── interceptors/         # Response transformation interceptor
├── config/                   # Configuration files
│   ├── app.config.ts        # Application configuration
│   ├── orm.config.ts        # Database configuration
│   └── validation.schema.ts # Environment validation schema
├── database/                 # Database layer
│   ├── entities/            # TypeORM entities (BaseEntity, User, AuthToken)
│   ├── interfaces/          # Repository interfaces
│   ├── migrations/          # Database migrations
│   ├── base.repository.ts  # Base repository class
│   └── typeorm.module.ts   # TypeORM module configuration
├── modules/                  # Feature modules
│   ├── auth/                # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.dto.ts
│   │   └── strategies/      # Passport strategies (JWT)
│   ├── user/                # User management module
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.repository.ts
│   │   └── user.dto.ts
│   ├── events/              # Event handling module
│   └── jobs/                # Background jobs module
├── types/                    # TypeScript type definitions
├── tests/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── app.module.ts            # Root application module
└── main.ts                  # Application entry point
```

## 🚀 Quick Start

### Option 1: Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nestjs-typorm-sql-boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   NODE_ENV=development
   PORT=3000

   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=nest_sql_template

   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=1d
   ```

4. **Start PostgreSQL**

   ```bash
   # macOS
   brew services start postgresql

   # Ubuntu/Debian
   sudo systemctl start postgresql

   # Windows
   # Start PostgreSQL service from Services
   ```

5. **Run database migrations**

   ```bash
   npm run migration:run
   ```

6. **Start the application**

   ```bash
   # Development mode (with hot reload)
   npm run start:dev

   # Production mode
   npm run build
   npm run start:prod
   ```

7. **Access the application**
   - API: http://localhost:3000
   - Swagger Documentation: http://localhost:3000/docs
   - Health Check: http://localhost:3000/health

### Option 2: Docker Development

1. **Clone and setup**

   ```bash
   git clone <repository-url>
   cd nestjs-typorm-sql-boilerplate
   cp env.example .env
   ```

2. **Start with Docker Compose**

   ```bash
   # Development environment
   npm run docker:compose:dev

   # Production environment
   npm run docker:compose
   ```

3. **View logs**

   ```bash
   npm run docker:compose:logs
   ```

4. **Stop services**
   ```bash
   npm run docker:compose:down
   ```

## 📝 Environment Variables

| Variable            | Description              | Default       | Required |
| ------------------- | ------------------------ | ------------- | -------- |
| `NODE_ENV`          | Application environment  | `development` | No       |
| `PORT`              | Application port         | `3000`        | No       |
| `POSTGRES_HOST`     | PostgreSQL host          | `localhost`   | Yes      |
| `POSTGRES_PORT`     | PostgreSQL port          | `5432`        | No       |
| `POSTGRES_USER`     | PostgreSQL username      | -             | Yes      |
| `POSTGRES_PASSWORD` | PostgreSQL password      | -             | Yes      |
| `POSTGRES_DB`       | PostgreSQL database name | -             | Yes      |
| `JWT_SECRET`        | JWT signing secret       | -             | Yes      |
| `JWT_EXPIRES_IN`    | JWT expiration time      | `1d`          | No       |

**Note:** For Docker, set `POSTGRES_HOST=postgres` (service name) instead of `localhost`.

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. All protected routes require a valid JWT token in the Authorization header.

### Authentication Flow

1. **Signup** - Create a new user account

   ```bash
   POST /auth/signup
   {
     "name": "John Doe",
     "email": "user@example.com",
     "password": "password123"
   }
   ```

2. **Login** - Authenticate and receive access token

   ```bash
   POST /auth/login
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

3. **Get Current User** - Retrieve authenticated user information
   ```bash
   GET /auth/me
   Authorization: Bearer <accessToken>
   ```

### Using Protected Routes

Include the JWT token in the Authorization header:

```bash
Authorization: Bearer <your-access-token>
```

### Public Routes

Routes marked with `@Public()` decorator don't require authentication:

- `POST /auth/signup`
- `POST /auth/login`

## 📡 API Response Format

All API responses follow a standardized format:

### Success Response

```json
{
  "success": true,
  "content": {
    // Response data
  },
  "message": "Success",
  "statusCode": 200
}
```

### Error Response

```json
{
  "success": false,
  "content": null,
  "message": "Error message",
  "statusCode": 400
}
```

## 📚 API Endpoints

### Authentication

| Method | Endpoint       | Description                       | Auth Required |
| ------ | -------------- | --------------------------------- | ------------- |
| POST   | `/auth/signup` | Create a new user account         | No            |
| POST   | `/auth/login`  | Authenticate and get access token | No            |
| GET    | `/auth/me`     | Get current authenticated user    | Yes           |

### Users

| Method | Endpoint     | Description       | Auth Required |
| ------ | ------------ | ----------------- | ------------- |
| POST   | `/users`     | Create a new user | Yes           |
| GET    | `/users`     | Get all users     | Yes           |
| GET    | `/users/:id` | Get user by ID    | Yes           |
| PATCH  | `/users/:id` | Update user       | Yes           |

### Health Check

| Method | Endpoint  | Description               | Auth Required |
| ------ | --------- | ------------------------- | ------------- |
| GET    | `/health` | Application health status | No            |

## 🗄️ Database Migrations

### Generate Migration

```bash
# Generate migration from entity changes
npm run migration:generate -- src/database/migrations/MigrationName

# Or use the convenience wrapper
npm run migration:generate:name -- --name MigrationName
```

### Create Empty Migration

```bash
# Create an empty migration file
npm run migration:create -- src/database/migrations/MigrationName

# Or use the convenience wrapper
npm run migration:create:name -- --name MigrationName
```

### Run Migrations

```bash
# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## 🐳 Docker Commands

```bash
# Build production image
npm run docker:build

# Run production container
npm run docker:run

# Start development environment
npm run docker:compose:dev

# Start production environment
npm run docker:compose

# Stop all services
npm run docker:compose:down

# View logs
npm run docker:compose:logs
```

## 🏛️ Architecture

### Clean Architecture Layers

1. **Domain Layer** (`modules/*/domain/`)
   - Business entities and interfaces
   - Repository interfaces
   - Domain logic

2. **Application Layer** (`modules/*/application/` or `modules/*/services/`)
   - Use cases and business logic
   - Service classes
   - DTOs for data transfer

3. **Infrastructure Layer** (`modules/*/infrastructure/` or `database/`)
   - Repository implementations
   - External service integrations
   - Database access

4. **Presentation Layer** (`modules/*/presentation/` or `modules/*/controllers/`)
   - Controllers
   - Request/Response DTOs
   - API endpoints

### Base Repository Pattern

All repositories extend `BaseRepository<T>` which provides:

- `create(data)` - Create new entity
- `findById(id)` - Find by ID
- `findOne(filter)` - Find one by filter
- `findAll(filter?)` - Find all with optional filter
- `update(id, data)` - Update entity
- `delete(id)` - Delete entity

### Base Entity

All entities extend `BaseEntity` which provides:

- `id` - UUID primary key
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## 🔧 Development

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Format code
npm run format

# Lint code
npm run lint
```

### Adding New Features

1. **Create Domain Entity** - Define business logic in `database/entities/`
2. **Extend BaseEntity** - Inherit from `BaseEntity` for common fields
3. **Create Repository** - Extend `BaseRepository<Entity>` in `modules/*/repository.ts`
4. **Add Service Layer** - Business logic in `modules/*/service.ts`
5. **Create Controller** - API endpoints in `modules/*/controller.ts`
6. **Add DTOs** - Request/response validation in `modules/*/dto.ts`
7. **Update Swagger** - Add API documentation decorators
8. **Write Tests** - Unit and integration tests

### Module Structure Example

```
modules/feature/
├── feature.module.ts        # Module definition
├── feature.controller.ts   # API endpoints
├── feature.service.ts      # Business logic
├── feature.repository.ts   # Data access (extends BaseRepository)
└── feature.dto.ts          # Data transfer objects
```

## 🛡️ Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Request Validation** - Automatic input validation
- **CORS** - Configurable cross-origin resource sharing
- **Global Exception Filters** - Consistent error handling
- **Guards** - Route protection with JWT

## 📖 Swagger Documentation

Interactive API documentation is available at:

- **URL**: http://localhost:3000/docs
- **Features**:
  - Try-it-out functionality
  - Request/response examples
  - Schema definitions
  - Authentication support

## 🔄 Module Dependencies

```
AppModule
├── ConfigModule (global)
├── DatabaseModule
├── AuthModule (registers JwtStrategy)
├── GuardsModule (provides JwtAuthGuard)
├── UserModule (uses GuardsModule)
├── EventsModule
└── JobsModule
```

**Note:** `GuardsModule` is separate from `AuthModule` to avoid circular dependencies.

## 🚨 Error Handling

The application uses global exception filters that catch and format all errors:

- **HttpExceptionFilter** - Handles HTTP exceptions
- **AllExceptionsFilter** - Catches all unhandled exceptions
- **TransformResponseInterceptor** - Standardizes success responses

All errors follow the standard response format with appropriate status codes.

## 📦 Available Scripts

| Script                     | Description                       |
| -------------------------- | --------------------------------- |
| `npm run build`            | Build the application             |
| `npm run start`            | Start the application             |
| `npm run start:dev`        | Start in development mode (watch) |
| `npm run start:prod`       | Start in production mode          |
| `npm run lint`             | Run ESLint                        |
| `npm run format`           | Format code with Prettier         |
| `npm run test`             | Run unit tests                    |
| `npm run test:e2e`         | Run E2E tests                     |
| `npm run migration:run`    | Run database migrations           |
| `npm run migration:revert` | Revert last migration             |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check `.env` file has correct database credentials
- For Docker: Use `postgres` as host (service name)

### Migration Issues

- Ensure database exists
- Check migration files are in correct directory
- Verify TypeORM configuration

### Authentication Issues

- Verify `JWT_SECRET` is set in `.env`
- Check token expiration settings
- Ensure token is included in Authorization header

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Built with ❤️ using NestJS, TypeORM, and PostgreSQL**
