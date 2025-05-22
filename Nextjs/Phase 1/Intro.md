## What is Next.js ?

- Next.js is a React framework that gives building blocks to create web applications.
- By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for the application.

### Feature that make different from react

- Feature that provided by Next.js

  - **Routing** (without installing React Router)
  - **Server-side rendering** (SSR)
  - **Static site generation** (SSG)
  - **API routes** (like building a mini backend)
  - **Image optimization**
  - **Built-in deployment support** (via Vercel)

### Create New Project

- Manual Installation

  ```
  npm install react@latest react-dom@latest next@latest
  ```

- Automatic Installation

  ```
  npx create-next-app@latest
  ```

  - On installation, we'll see the following prompts:

        ```
        What is your project named? my-app
        Would you like to use TypeScript? No / Yes
        Would you like to use ESLint? No / Yes
        Would you like to use Tailwind CSS? No / Yes
        Would you like your code inside a `src/` directory? No / Yes
        Would you like to use App Router? (recommended) No / Yes
        Would you like to use Turbopack for `next dev`?  No / Yes
        Would you like to customize the import alias (`@/*` by default)? No / Yes
        What import alias would you like configured? @/*
        ```

- Package-lock.json:- contain detailed information about the exact versions of each package.

## Notes

- Next.js uses file-system routing, which means the routes in the application are determined by how we structure our files.
- We can optionally use a `src` folder in the root of the project to separate application's code from configuration files.
