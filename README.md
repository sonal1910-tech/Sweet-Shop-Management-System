Sweet Shop Management API is a backend system for managing sweets, inventory, and user authentication.
It allows users to register, login, view sweets, purchase sweets, and admins can manage inventory.
This project is built using Node.js, TypeScript, Express, and PostgreSQL.

sweet-shop-api

app project/
├── backend/                  # Backend code (Node.js / Express / TS)
│   ├── src/                  # Source code (routes, controllers, models)
│   ├── sweetshop.db          # SQLite database
│   ├── package.json          # Backend dependencies
│   ├── package-lock.json     # Backend lock file
│   ├── tsconfig.json         # TypeScript config
│   ├── tsconfig.build.json   # Build config
│   ├── jest.config.js        # Tests config
│   ├── .gitignore            # Ignore node_modules, dist, .env
│   ├── dist/                 # Compiled JS (ignored)
│   └── node_modules/         # Packages (ignored)

├── frontend/                 # Frontend code (React)
│   ├── src/                  # React components, pages
│   ├── package.json          # Frontend dependencies
│   ├── package-lock.json     # Frontend lock file
│   ├── .gitignore            # Ignore node_modules, build, .env
│   ├── build/                # React build folder (ignored)
│   └── node_modules/         # Packages (ignored)
│
├── .gitignore                # Root .gitignore (optional)
├── README.md                 # Project description / Antigravity submission
└── sweetshop.db (moved to backend)  # Only backend should have DB

│
├── src
│   ├── app.ts          # Express app setup
│   ├── server.ts       # Server entry point
│   ├── config
│   │   └── database.ts # PostgreSQL connection
│   ├── models
│   │   ├── User.ts
│   │   └── Sweet.ts
│   ├── routes
│   │   ├── auth.routes.ts
│   │   └── sweet.routes.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   └── sweet.controller.ts
│   ├── middleware
│   │   ├── auth.middleware.ts
│   │   └── role.middleware.ts
│   └── utils
│       └── jwt.ts
├── .env
├── package.json
└── README.md
