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

##### Local Development Setup
The project has been build with VS Code (any Clone is possible should be working). Some extensions might be necessary for the most coherent dev-experience. Some are:

- Biome
- Tailwind CSS IntelliSense
- Prisma IntelliSense
- Prisma

### Features
- Dashboard
- Booking system
- Ressource system
- User Management System
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

### Ressource system
It should be possible to add ressources to the system (CRUD). Furthermore, these ressources 
should be addable to `Activities`. Since this is a booking service a `Booking` model is
required to connect `Activities` to `Bookings` (we assume that *many* bookings can have 
*many* activities).  

Therefore a simple DB model (Prisma ORM) could look like this:

```prisma
model Booking {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Activity Connection
  activities ActivietiesOnBookings[]
}

model Activity {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Ressource Connection
  ressources Ressource[]

  // Booking Connection
  bookings  ActivietiesOnBookings[]
}

model ActivietiesOnBookings {
  booking    Booking  @relation(fields: [bookingId], references: [id])
  bookingId  Int
  activity   Activity @relation(fields: [activityId], references: [id])
  activityId Int
  assignedAt DateTime @default(now())

  @@id([bookingId, activityId])
}

model Ressource {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt


  // Activity connection
  activity  Activity @relation(fields: [activityId], references: [id], onDelete: Cascade)
  activityId Int

  // RessourceItem connection (the number of items conforms to availability)
  ressourceItems RessourceItem[]
}

model RessourceItem {
  id          Int      @id @default(autoincrement())
  bookedAt    DateTime @default(now())
  bookedUntil DateTime
  status      String

  // Ressource connection
  ressource Ressource @relation(fields: [ressourceId], references: [id], onDelete: Cascade)
  ressourceId Int
}

enum ItemStatus {
  AVAILABLE
  BOOKED
  DAMAGED
}
```

**Requirements:**
- Create an Acitivy
- Assign/create a Ressource to an Activity
- Update Activities
- Delete Activities
- Update Ressources
- Delete Ressources
- List Activities with Ressources (maybe including filter options if time)


### User Management System
Since we need a user to be able to book activities, we need a basic user management system.
At the current stage, we assume **no signup/login** is required. A user simply needs to 
give his name and an email address when booking and `Activity`.

The simple DB schema can lool like:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Booking Connection
  bookings Booking[]
}
```

> **ATTENTION:** The `User` model requires the `Booking` model to be updated with the user! We assume
1-N realation (one user can have many bookings, but one bokking can have only one user).

**Requirements:**
- CRUD Users (cascade bookings)
- List Users (maybe filter including filter options if time)


### Dashboard (Booking Management System)
This is the heart of the application and the main landing page for an admin. We need a meny that allows
us to navigate to other parts of the application (Dashboard, User Management, Ressource/Activity Management).
The dashboard should give an overview of all active bookings and maybe some statistics.

**Requirements:**
- Navbar
- List Bookings (searchable, sortable, filterable)
- Update Bookings
- Notify user (sucessful booking, upcoming booking, etc. - optional if time)