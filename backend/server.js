const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Models
const Destination = require('./models/Destination');
const Review = require('./models/Review');
const Expense = require('./models/Expense');
const ItineraryDay = require('./models/Itinerary');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoMemoryServer } = require('mongodb-memory-server');

// In-memory MongoDB for prototyping if no URI is provided
// We'll use a simple local connection for this demonstration
let mongoServer;

// Setup mock fallback store
const runSeed = require('./seed');
let localDestinations = [...runSeed.destinationsData];
let localReviews = [...runSeed.reviewsData];
let localExpenses = [...runSeed.expensesData];
let localItineraries = runSeed.itineraryData.map((day, idx) => ({
  _id: day._id || `day-${idx + 1}`,
  dayTitle: day.dayTitle,
  items: day.items
}));

const connectDB = async () => {
  let mongoURI = process.env.MONGO_URI;
  
  if (!mongoURI) {
    if (process.env.VERCEL) {
      console.warn('WARNING: No MONGO_URI found on Vercel. Running in mock fallback mode.');
      return;
    }
    
    try {
      console.log('No MONGO_URI found. Starting completely in-memory MongoDB server...');
      mongoServer = await MongoMemoryServer.create();
      mongoURI = mongoServer.getUri();
      
      setTimeout(async () => {
        try {
          await runSeed();
          console.log('In-memory DB seeded successfully.');
        } catch (seedErr) {
          console.error('Error seeding in-memory DB:', seedErr);
        }
      }, 2000);
    } catch (memDbErr) {
      console.error('Error starting in-memory MongoDB:', memDbErr);
      if (process.env.VERCEL) {
        console.warn('Running on Vercel: falling back to mock data mode.');
        return;
      }
      process.exit(1);
    }
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected to ' + mongoURI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    if (process.env.VERCEL) {
      console.warn('Running on Vercel: falling back to mock data mode.');
      return;
    }
    process.exit(1);
  }
};

connectDB();

// --- ROUTES ---

// Destinations API
app.get('/api/destinations', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const destinations = await Destination.find().sort({ createdAt: -1 });
      return res.json(destinations);
    }
    res.json(localDestinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reviews API
app.get('/api/reviews', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const reviews = await Review.find().sort({ createdAt: -1 });
      return res.json(reviews);
    }
    res.json(localReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newReview = new Review(req.body);
      const savedReview = await newReview.save();
      return res.status(201).json(savedReview);
    }
    const newReview = {
      ...req.body,
      _id: `review-${Date.now()}`,
      createdAt: new Date()
    };
    localReviews.unshift(newReview);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Expenses API
app.get('/api/expenses', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const expenses = await Expense.find().sort({ dateString: 1 });
      return res.json(expenses);
    }
    res.json(localExpenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newExpense = new Expense(req.body);
      const savedExpense = await newExpense.save();
      return res.status(201).json(savedExpense);
    }
    const newExpense = {
      ...req.body,
      _id: `expense-${Date.now()}`
    };
    localExpenses.push(newExpense);
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Itinerary API
app.get('/api/itineraries', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const itineraries = await ItineraryDay.find();
      return res.json(itineraries);
    }
    res.json(localItineraries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/itineraries/:id/items', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const day = await ItineraryDay.findById(req.params.id);
      if (!day) return res.status(404).json({ message: 'Day not found' });
      
      day.items.push(req.body);
      await day.save();
      return res.status(201).json(day);
    }
    const day = localItineraries.find(d => d._id === req.params.id);
    if (!day) return res.status(404).json({ message: 'Day not found' });
    day.items.push(req.body);
    res.status(201).json(day);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
