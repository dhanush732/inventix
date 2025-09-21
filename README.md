# Product Cart (Astro + React + DDD)

A demo shopping cart product management module using Astro.js with TypeScript, React islands, TailwindCSS, Zod validation & Vitest tests. Focus is on clean Domain Driven Design for core product entity and CRUD operations, containerized with Docker.

## Features
- Astro + React island for interactive Product Manager UI
- Domain Driven Design layering (domain, app/service, infra placeholder)
- REST API endpoints (`/api/products*.json`) for list/create/get/update/delete
- Zod validation & typed schemas with robust error handling
- In-memory repository (easily swappable for persistent storage)
- Vitest unit and integration tests
- TailwindCSS fancy glassmorphism styles
- Docker multi-stage build & lightweight runtime image

## Project Structure
```
src/
  domain/        # Entities, value objects, repository abstractions
  app/           # Application services orchestrating domain logic
  infra/         # (Placeholder) Infrastructure adapters (DB, external APIs)
  pages/         # Astro pages & API routes
  ui/            # React UI components (islands)
```

## Running Locally
```cmd
npm install
npm run dev
```
Open http://localhost:4321

## Testing
```cmd
npm run test
```
Coverage output in `coverage/`.

## Docker
Build and run:
```cmd
docker build -t product-cart .
docker run -p 4321:4321 product-cart
```

## API Examples
```http
GET /api/products.json
POST /api/products.json { name, price, currency, stock }
GET /api/products/{id}.json
PATCH /api/products/{id}.json { price: 123 }
DELETE /api/products/{id}.json
```

## Extending
- Replace in-memory repository with a persistent adapter (e.g., Prisma/Postgres) in `infra`.
- Add authentication & authorization middleware.
- Introduce shopping cart aggregate, orders, and checkout service.

## License
MIT (adjust as needed)
