# 🗺️ Smart Travel Planner

A premium, modern MERN stack web application designed to help travelers plan, budget, and review their trips. Built with a focus on rich aesthetics, smooth micro-animations, glassmorphism, and responsive design.

🔗 **Live Link:** [https://smart-travel-planner-rho.vercel.app](https://smart-travel-planner-rho.vercel.app)

---

## ✨ Features

- **🔍 Destination Search:** Search and filter curated destinations by tags (e.g., Culture, Adventure, Romance) and budget levels.
- **📅 Itinerary Creation:** Build day-by-day schedules with specific activities (lodging, dining, activities) and time slots.
- **💰 Budget Planning:** Log expenses by category (Transport, Accommodation, Activities, Food, Shopping) and visualize budget allocations.
- **✍️ User Reviews:** Add and read trip reviews complete with profile avatars, ratings, and like counters.
- **🛡️ Database Fallback:** Implements a robust connection-state listener. If no live database is connected (or when running serverless on Vercel without settings), the app falls back to an in-memory mock store so it remains fully interactive.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite-powered for rapid hot module replacement)
- **Vanilla CSS** with HSL-tailored colors, smooth gradients, and glassmorphism styling
- **Lucide React** for modern iconography

### Backend
- **Node.js** & **Express.js** for serverless API endpoints
- **MongoDB** & **Mongoose** for data modeling
- **MongoDB Memory Server** for seamless local prototyping without requiring DB setups

### Deployment
- **Vercel** (configured for monorepo deployments using Serverless Functions)

---

## 📁 Project Structure

```text
smart-travel-planner/
├── api/                  # Serverless function entrypoint for Vercel
│   └── index.js          # Imports and exports Express app
├── backend/              # Node/Express Backend code
│   ├── models/           # Mongoose schemas (Destination, Expense, Itinerary, Review)
│   ├── seed.js           # Seed data script for populating the database
│   └── server.js         # Express app initialization and API routes
├── frontend/             # Vite + React Frontend code
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── assets/       # Media/SVG files
│   │   ├── components/   # UI components (DestinationSearch, Budget, Itinerary, Reviews, Header)
│   │   ├── utils/        # Frontend mock data fallback
│   │   ├── App.jsx       # Main application shell
│   │   └── index.css     # Global styles & premium styling system
│   └── vite.config.js    # Vite dev-server config with API proxy
├── vercel.json           # Vercel monorepo routing & build settings
├── package.json          # Root dependencies (concurrently, dotenv, mongoose, etc.)
└── README.md             # Project documentation
```

---

## 🚀 Local Quickstart

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone the repository
```bash
git clone https://github.com/prachi1785/voyage-ai.git
cd voyage-ai
```

### 2. Install dependencies
Install all root, backend, and frontend dependencies:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 3. Run the development server
Start both the Vite frontend and Express backend concurrently:
```bash
npm run dev
```
* The React app will run on: **[http://localhost:5173/](http://localhost:5173/)**
* The Express server will run on: **[http://localhost:5001/](http://localhost:5001/)**

---

## ☁️ Vercel Deployment Settings

The project is configured for seamless monorepo deployment on Vercel using `vercel.json`:

1. **Framework Preset:** Choose **`Other`** (Vercel will automatically read `vercel.json` to handle routes and builds).
2. **Environment Variables:**
   - Add **`MONGO_URI`** with your MongoDB Atlas connection string.
   - *Note: Remember to whitelist access from anywhere (`0.0.0.0/0`) in MongoDB Atlas so Vercel can connect to the database.*
3. **Database Fallback:** If `MONGO_URI` is omitted, the app will run in read-only mock-data fallback mode instead of crashing.
