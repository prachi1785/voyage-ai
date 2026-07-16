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
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFF?style=for-the-badge&logo=vite&logoColor=FFD62B)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

- **React 19** – Vite-powered for rapid development and hot module replacement.
- **Vanilla CSS** – Styled with customized HSL color systems, glassmorphism, and responsive design.
- **Lucide Icons** – Crisp, modern SVG icons for clean aesthetics.

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

- **Node.js & Express** – Scalable serverless API route controllers.
- **MongoDB & Mongoose** – Document-oriented data schemas and collections.
- **In-Memory DB Server** – Automatic local fallback using `mongodb-memory-server`.

### Deployment & Tooling
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

- **Vercel** – Seamless monorepo builds with Serverless functions mapping.
- **Git & GitHub** – Strict version control and automated deployments.

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
