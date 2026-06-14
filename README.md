# Sell In Door

A split frontend/backend e-commerce scaffold built for QR code-driven mobile access.

## Project structure

- `backend/` — Node.js + Express.js API server
- `frontend/` — React.js + Vite + Tailwind CSS storefront

## Features

- MongoDB + Mongoose data models
- Category and Product schemas
- Full product CRUD API
- Public store browsing UI
- Product detail pages with QR-friendly URLs
- Admin dashboard for add/edit/delete operations
- QR code generator page in frontend

## Backend setup

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the env file:
   ```bash
   cp .env.example .env
   ```
4. Update `backend/.env` with your MongoDB connection string.
5. Start the server:
   ```bash
   npm run dev
   ```

The backend listens on the port specified in `backend/.env` (default `5000`).

## Frontend setup

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend runs on `http://localhost:3000` by default and should call the backend at `/api/...` when both are running locally.

## Available frontend routes

- `/` — Store homepage with category filtering
- `/products/:id` — Product detail page
- `/admin` — Admin dashboard for product management
- `/qr` — QR code generator page

## API endpoints

- `GET /api/categories`
- `POST /api/categories`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

## Notes

- This scaffold is designed for local development and can be extended with authentication, authorization, and deployment configuration.
- Use `npm install` in both `backend/` and `frontend/` before running the app.
- If you want secure admin access, add authentication middleware in the backend and a protected admin route in the frontend.
