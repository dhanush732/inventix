src/
  domain/        # Entities, value objects, repository abstractions
  app/           # Application services orchestrating domain logic
  infra/         # (Placeholder) Infrastructure adapters (DB, external APIs)
  pages/         # Astro pages & API routes
  ui/            # React UI components (islands)

# Inventix

Inventix is a modern, full-stack product inventory and e-commerce management application built with Astro, TypeScript, React, and Tailwind CSS. It demonstrates clean architecture principles (DDD), robust API design, and a responsive UI for managing products, stock, and catalog data.

## Features

- **Astro + TypeScript**: Fast, modern web framework with type safety
- **Domain-Driven Design**: Clear separation of domain, application, and infrastructure layers
- **RESTful API**: Endpoints for product CRUD operations with validation and error handling
- **React UI**: Responsive product manager, inventory dashboard, and product grid
- **Tailwind CSS**: Utility-first styling for rapid UI development
- **Unit & Integration Tests**: Vitest coverage for domain logic and API endpoints
- **Docker Support**: Containerized for easy deployment
- **Extensible Architecture**: Ready for database, authentication, and more

## Project Structure

```
ProductCart/
├── src/
│   ├── app/                # Application services (business logic)
│   ├── domain/             # Domain models, validation, repository interface
│   ├── infra/              # Infrastructure (future: DB, adapters)
│   ├── pages/api/          # API route handlers (REST endpoints)
│   ├── ui/                 # React components, pages, modals
│   └── styles.css          # Tailwind base styles
├── tests/                  # Unit and integration tests
├── Dockerfile              # Multi-stage build for deployment
├── astro.config.mjs        # Astro project config
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
├── tailwind.config.cjs     # Tailwind CSS config
├── postcss.config.cjs      # PostCSS config
└── README.md               # Project documentation
```

## Domain-Driven Design (DDD)

- **Domain Layer**: Product entity, validation schemas (Zod), repository interface, error types
- **Application Layer**: Service functions for product CRUD, business rules
- **API Layer**: Astro API routes for RESTful endpoints
- **UI Layer**: React components for product management and inventory

## API Endpoints

- `GET /api/products.json` — List all products
- `POST /api/products.json` — Create a new product
- `GET /api/products/[id].json` — Get product by ID
- `PATCH /api/products/[id].json` — Update product by ID
- `DELETE /api/products/[id].json` — Delete product by ID

All endpoints validate input and return appropriate error responses (400, 404, 500).

## Testing

- **Unit Tests**: Domain and service logic tested with Vitest
- **Integration Tests**: API route handlers tested with mocked Astro context
- **Coverage**: Run `npm test` for coverage report

## UI Features

- **Product Grid**: Ecommerce-style product display
- **Inventory Dashboard**: Admin table with drawer form for add/edit
- **Product Detail Page**: View and edit single product
- **Responsive Design**: Works on desktop and mobile

## Docker Usage

Build and run the app in a container:

```sh
# Build the Docker image
docker build -t inventix .

# Run the container
docker run -p 4321:4321 inventix
```

## Development

```sh
# Install dependencies
npm install

# Start Astro dev server
npm run dev

# Run tests
npm test
```

## Extending Inventix

- **Persistence**: Swap in a database-backed repository (see infra/)
- **Authentication**: Add user login and protected routes
- **CI/CD**: Integrate with GitHub Actions for automated testing/deployment
- **Performance**: Profile and optimize for scale

## License

MIT

## Author

Dhanush (dhanush732)

---

For questions or contributions, open an issue or pull request on GitHub.
