# Turborepo Boilerplate (Ionic + NestJS)

A modern, full-stack monorepo boilerplate managed with [Turborepo](https://turbo.build/) and npm workspaces.

This boilerplate provides a solid starting point for building cross-platform applications with a powerful backend.

## 🏗 Architecture

The workspace is organized into `apps` and `packages`:

- **`apps/web`**: Frontend application built with **Ionic React**. Features include:
  - TailwindCSS for styling
  - Zustand for lightweight state management
  - Cross-platform readiness (Web, iOS, Android)
- **`apps/api`**: Backend application built with **NestJS**. Features include:
  - TypeORM for database interactions (Dynamic via `.env`, defaulting to PostgreSQL)
  - Swagger for API documentation

- **`packages/eslint-config`**: Shared ESLint configurations used throughout the monorepo.
- **`packages/typescript-config`**: Shared TypeScript `tsconfig.json` bases.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v7 or higher for workspaces support)
- A Database (PostgreSQL recommended)

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
   - Copy or create a `.env` file in `apps/api` containing your database connection details:
     ```env
     DB_TYPE=postgres
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=postgres
     DB_PASSWORD=secret
     DB_DATABASE=turborepo_db
     ```

### Development

Turborepo allows you to run scripts across all packages simultaneously.

To start both the frontend and backend development servers at the same time, you can run:

```bash
npx turbo run dev
```
*(Ensure you have a `dev` script mapped in your app-level `package.json` files if not already present)*

Alternatively, you can start them individually:
- **API**: `cd apps/api && npm run start:dev`
- **Web**: `cd apps/web && npm run dev`

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
