# Workspace

A **pnpm workspace monorepo** using TypeScript, designed for building modern full-stack applications with a focus on type safety, code generation, and supply-chain security.

## Overview

This monorepo uses pnpm workspaces to manage multiple packages efficiently. Each package manages its own dependencies while sharing common configurations and utilities through the workspace catalog.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React 19.1.0, Vite 7, Tailwind CSS 4

## Project Structure

```
workspace/
├── lib/                    # Shared libraries
│   ├── api-client-react/   # React API client hooks
│   ├── api-spec/           # OpenAPI specifications
│   ├── api-zod/            # Zod schemas for API validation
│   └── db/                 # Database schema and utilities
├── artifacts/              # Application artifacts
│   ├── api-server/         # API server implementation
│   ├── etrm/               # ETRM application
│   └── mockup-sandbox/     # Mockup sandbox environment
├── scripts/                # Utility scripts
└── attached_assets/        # Static assets
```

## Security Features

### Supply-Chain Attack Defense

This workspace implements a **minimum release age** policy requiring npm packages to be published for at least **1 day (1440 minutes)** before installation. This is a critical defense against supply-chain attacks.

Trusted packages excluded from this check:
- `@replit/*` packages
- `stripe-replit-sync`

### Platform-Specific Optimizations

The workspace excludes unnecessary platform-specific binaries (macOS, Windows, other Linux architectures) to optimize for the Linux x64 runtime environment used by Replit.

## Key Commands

### Development

```bash
# Install dependencies
pnpm install

# Run type checking across all packages
pnpm run typecheck

# Type check library packages only
pnpm run typecheck:libs

# Build all packages (typecheck + build)
pnpm run build
```

### Package-Specific Commands

```bash
# Regenerate API hooks and Zod schemas from OpenAPI spec
pnpm --filter @workspace/api-spec run codegen

# Push database schema changes (development only)
pnpm --filter @workspace/db run push

# Run API server in development mode
pnpm --filter @workspace/api-server run dev
```

### Working with Filters

Use pnpm filters to target specific packages:

```bash
# Run a command in a specific package
pnpm --filter <package-name> <command>

# Example: Build only the db package
pnpm --filter @workspace/db run build

# Example: Run dev server for etrm artifact
pnpm --filter etrm run dev
```

## Workspace Configuration

### Catalog Dependencies

Common dependencies are managed centrally in `pnpm-workspace.yaml`:

- React ecosystem (React 19.1.0, React DOM, @types/react)
- TanStack Query (@tanstack/react-query)
- Styling (Tailwind CSS 4, tailwind-merge, class-variance-authority)
- UI (lucide-react, framer-motion)
- Database (drizzle-orm)
- Validation (zod)
- Build tools (Vite 7, esbuild, tsx)

### Peer Dependencies

Peer dependencies are **not** auto-installed (`autoInstallPeers: false`), giving explicit control over dependency resolution.

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run type checking**:
   ```bash
   pnpm run typecheck
   ```

3. **Build the project**:
   ```bash
   pnpm run build
   ```

4. **Start development**:
   ```bash
   # Start the API server
   pnpm --filter @workspace/api-server run dev
   
   # Or start a specific artifact
   pnpm --filter etrm run dev
   ```

## License

MIT
