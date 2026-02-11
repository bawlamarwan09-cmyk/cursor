# Trade Journal App (React + Express + MongoDB + Tailwind)

A full-stack trading journal where traders can save every trade, track PnL, monitor win rate, and record psychology notes.

## Stack
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Express.js + Mongoose
- **Database:** MongoDB

## Project structure
- `client/` React app
- `server/` Express API

## 1) Start MongoDB
Make sure MongoDB is running locally (default expected URL: `mongodb://127.0.0.1:27017/trade_journal`).

## 2) Backend setup
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

## 3) Frontend setup
```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

## API routes
- `GET /api/trades` - list trades
- `POST /api/trades` - create trade
- `DELETE /api/trades/:id` - delete trade
- `GET /api/summary` - aggregated stats

## Trade fields captured
- Date, symbol, direction, entry price, exit price, position size
- PnL, setup name, tags, emotional state, free-form notes
