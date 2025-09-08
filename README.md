# CillyBlog

A full‑stack blogging platform with authentication, image uploads, and a public home feed.

## Tech Stack
- Frontend: React 18 (Vite, React Router, TailwindCSS, Axios)
- Backend: Node.js, Express.js, Mongoose/MongoDB, JWT (httpOnly cookie), Cloudinary (optional images)
- Tooling: ESLint, Nodemon

## Architecture
- `frontend/`: React SPA (Vite)
- `backend/`: REST API (Express + MongoDB)
- Cookie-based auth: `jwt` httpOnly cookie set on login/register

## Prerequisites
- Node.js 18+ and npm
- MongoDB (Atlas or local)
- Cloudinary account (optional; only if you want image upload)

## Environment
Create `backend/.env`:
```
PORT=4001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_long_random_secret
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_SECRET_KEY=your_cloud_secret
FRONTEND_URL=http://localhost:5173
```

## Install & Run (Dev)
Backend:
```
cd backend
npm i
npm run start
```
Frontend:
```
cd ../frontend
npm i
npm run dev
```
Open: `http://localhost:5173`

## API (Base URL)
- Local API: `http://localhost:4001/api`
- Blogs:
  - `POST /blogs/create` (auth, image optional)
  - `GET /blogs/all-blogs` (public)
  - `GET /blogs/single-blog/:id` (public)
  - `GET /blogs/my-blog` (auth)
- Users:
  - `POST /users/register`
  - `POST /users/login`
  - `POST /users/logout`
  - `GET /users/my-profile` (auth)

## Content Rules
- Post must include: Author, Publish Date, Title, Category, Content (≥ 150 words). Image is optional.
- Homepage shows: Author, Publish Date, and preview (≤ 150 words).

## Seeding (Optional)
```
cd backend
npm run seed
```

## NPM Scripts
- backend: `start` (nodemon), `seed`
- frontend: `dev`, `build`, `preview`, `lint`

## Deploy Notes
- Set env vars on server/provider.
- Ensure CORS `FRONTEND_URL` is set to your deployed frontend URL.
- Use HTTPS so cookies work securely in production.