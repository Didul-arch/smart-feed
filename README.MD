### Prerequisites

- Node.js (v18+)
- pnpm
- PostgreSQL (SupaBase)

### Backend Setup

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database connection details
# DATABASE_URL="postgres://username:password@localhost/smartfeed"

# 4. Generate Prisma client
pnpx prisma generate

# 5. Run database migrations
pnpx prisma migrate dev

# 6. Start backend server
pnpm run dev
```

### Frontend Setup

```bash
# 1. Navigate to frontend folder (from project root)
cd frontend

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm run dev

## Common Issues

- If you get database connection errors, verify your PostgreSQL credentials in .env
- Make sure ports 3000 and 5173 aren't in use by other applications
- If Prisma errors occur, try `npx prisma db push` to sync schema without migrations

## Project Structure

```
smartfeed/
├── frontend/    # React + Vite
└── backend/     # Express API + Prisma
```