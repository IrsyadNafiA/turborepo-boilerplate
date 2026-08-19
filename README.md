# Turborepo Boilerplate (Ionic + NestJS)

A modern, full-stack monorepo boilerplate managed with [Turborepo](https://turbo.build/) and npm workspaces.

This boilerplate provides a solid starting point for building cross-platform applications with a powerful backend, packed with enterprise-grade standards like strict typing, pre-commit hooks, and dockerization.

## 🏗 Architecture & Features

The workspace is organized into `apps` and `packages`:

- **`apps/web`**: Frontend application built with **Ionic React**. Features include:
  - **TailwindCSS** for styling.
  - **Zustand** for lightweight state management.
  - **Axios** integration configured with interceptors and dynamic `.env` API endpoints (`VITE_API_URL`).
  - **Ionic React Router** for seamless cross-platform page navigation.
  - Cross-platform readiness (Web, iOS, Android).

- **`apps/api`**: Backend application built with **NestJS**. Features include:
  - **TypeORM** for database interactions (Dynamic via `.env`, defaulting to PostgreSQL).
  - **Swagger** for interactive API documentation.
  - **Robust Exception Handling**: A global `AllExceptionsFilter` prevents 500 server errors from leaking stack traces.
  - **Standardized API Responses**: A global `TransformInterceptor` formats all successful responses into a strict, type-safe `{ statusCode, message, data }` structure using Generics (`Response<T>`).

- **`packages/eslint-config`**: Shared ESLint configurations used throughout the monorepo.
- **`packages/typescript-config`**: Shared TypeScript `tsconfig.json` bases.

### 🛡️ Code Quality & DevOps
- **Pre-commit Hooks**: Integrated with **Husky** and **lint-staged** to automatically lint modified files before commits, preventing bad code from entering the repository.
- **Docker Ready**: Includes `Dockerfile`s optimized with Turborepo's `turbo prune` for both the backend (Node) and frontend (Nginx). Fully orchestrated with `docker-compose`.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v7 or higher for workspaces support)
- A Database (PostgreSQL recommended, or Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/IrsyadNafiA/turborepo-boilerplate.git
   cd turborepo-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Copy `apps/api/.env.example` to `apps/api/.env` and update your backend credentials.
   - Copy `apps/web/.env.example` to `apps/web/.env` and configure your frontend variables (e.g., `VITE_API_URL`).

### Development

Turborepo allows you to run scripts across all packages simultaneously.

To start both the frontend and backend development servers at the same time:
```bash
npx turbo run dev
```

Alternatively, you can start them individually:
- **API**: `cd apps/api && npm run start:dev`
- **Web**: `cd apps/web && npm run dev`

### Running with Docker

You can spin up the entire stack (PostgreSQL, NestJS Backend, Nginx-served Ionic Web) locally using Docker Compose:

```bash
docker-compose up --build -d
```
The API will be available on port `3000` and the Web UI on port `8080`.

### API Documentation

Once the backend is running, you can view the Swagger API documentation by navigating to:
```
http://localhost:3000/api
```

## 🛠 Commands

- **Build**: `npx turbo run build` - Builds all apps and packages.
- **Lint**: `npm run lint --workspaces --if-present` - Lints all files across the workspace.

## 📄 License

This project is open-source and available under the MIT License.
