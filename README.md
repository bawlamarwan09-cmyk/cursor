# Trade Journal App (React + Express + MongoDB + Tailwind)

A full-stack trading journal where traders can save every trade, track PnL, monitor win rate, and record psychology notes.

## Stack
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Express.js + Mongoose
- **Database:** MongoDB

## Project structure
- `client/` React app
- `server/` Express API for local development
- `api/` Vercel serverless entrypoint
- `vercel.json` Vercel routing/build configuration

## 1) Start MongoDB
Make sure MongoDB is running locally (default expected URL: `mongodb://127.0.0.1:27017/trade_journal`).

## 2) Backend setup (local)
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

## 3) Frontend setup (local)
```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

## Deploy on Vercel
This repository includes `vercel.json` so Vercel can:
- build and serve the React app from `client/`
- route `/api/*` requests to `api/index.js`

Set this environment variable in Vercel Project Settings:
- `MONGODB_URI` (your MongoDB connection string)

Optional:
- `CLIENT_ORIGIN` if you need stricter CORS policy

## API routes
- `GET /api/trades` - list trades
- `POST /api/trades` - create trade
- `DELETE /api/trades/:id` - delete trade
- `GET /api/summary` - aggregated stats

## Trade fields captured
- Date, symbol, direction, entry price, exit price, position size
- PnL, setup name, tags, emotional state, free-form notes
