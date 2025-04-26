### Prerequisites

- Node.js (v18+)
- pnpm
- PostgreSQL

### Backend Setup

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database connection details
# DATABASE_URL="postgres://username:password@localhost/smartfeed"

# 4. Generate Prisma client
npx prisma generate

# 5. Run database migrations
npx prisma migrate dev

# 6. Start backend server
npm run dev
```

### Frontend Setup

```bash
# 1. Navigate to frontend folder (from project root)
cd frontend

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev
```

## Accessing the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database UI: http://localhost:3000/prisma-studio (after running `npx prisma studio`)

## Common Issues

- If you get database connection errors, verify your PostgreSQL credentials in .env
- Make sure ports 3000 and 5173 aren't in use by other applications
- If Prisma errors occur, try `npx prisma db push` to sync schema without migrations

## Project Structure

```
smartfeed/
├── frontend/    # React app
└── backend/     # Express API + Prisma
```