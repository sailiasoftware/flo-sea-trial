# Concept

Simple booking and ressource system for a small sailing school.

### Tech stack
- Next.js 15
- Prisma
- TailwindCSS
- Typescript
- Clerk (Auth - optional if time)
- Postres (DB)
- Vercel (for potential deployment)
- Stripe (for payments - optional if time)
- Docker (for local development) 

### Features
- Dashboard
- Booking system
- Ressource system
- Payment system (optional)
- Auth system (optional)

# Quick setup

This project uses `bun` as the packege manager. In case you use a different package manager, you can still use the same commands.

1. Clone the repo

2. Install the dependencies
```bash
bun install
```
3. Create a `.env` file.
Copy and rename the `.env.example` file to `.env`.

4. Start Docker locally and run the DB bash script in the root folder of the project
```bash
sh start-database.sh
```

5. Start the dev server
```bash
bun dev
```

# Feature Concepts