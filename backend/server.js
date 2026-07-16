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

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.log('No MONGO_URI found. Starting completely in-memory MongoDB server...');
      mongoServer = await MongoMemoryServer.create();
      mongoURI = mongoServer.getUri();
      
      // Also seed the in-memory DB when it starts empty
      setTimeout(async () => {
        try {
          const runSeed = require('./seed');
          await runSeed();
          console.log('In-memory DB seeded successfully.');
        } catch (seedErr) {
          console.error('Error seeding in-memory DB:', seedErr);
        }
      }, 2000);
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected to ' + mongoURI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

// --- ROUTES ---

// Destinations API
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reviews API
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Expenses API
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ dateString: 1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Itinerary API
app.get('/api/itineraries', async (req, res) => {
  try {
    const itineraries = await ItineraryDay.find();
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/itineraries/:id/items', async (req, res) => {
  try {
    const day = await ItineraryDay.findById(req.params.id);
    if (!day) return res.status(404).json({ message: 'Day not found' });
    
    day.items.push(req.body);
    await day.save();
    res.status(201).json(day);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
