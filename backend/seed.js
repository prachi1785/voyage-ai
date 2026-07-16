const mongoose = require('mongoose');
const Destination = require('./models/Destination');
const Review = require('./models/Review');
const Expense = require('./models/Expense');
const ItineraryDay = require('./models/Itinerary');

const destinationsData = [
  {
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    tags: ['Culture', 'Temples', 'Spring'],
    priceLevel: '$$$',
    description: 'Experience the magic of ancient temples, bamboo forests, and traditional tea houses.'
  },
  {
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac542?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    tags: ['Romance', 'Beaches', 'Views'],
    priceLevel: '$$$$',
    description: 'Breathtaking sunsets and iconic white-washed architecture overlooking the Aegean Sea.'
  },
  {
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    tags: ['Nature', 'Relaxation', 'Culture'],
    priceLevel: '$$',
    description: 'Lush jungles, vibrant coral reefs, and a deeply spiritual local culture await.'
  },
  {
    name: 'Banff National Park, Canada',
    image: 'https://images.unsplash.com/photo-1522896582496-e2a14e9154a1?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    tags: ['Mountains', 'Adventure', 'Lakes'],
    priceLevel: '$$$',
    description: 'Stunning turquoise lakes framed by majestic mountain peaks.'
  }
];

const reviewsData = [
  {
    user: 'Alex T.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    destination: 'Kyoto, Japan',
    text: 'Visiting the Fushimi Inari Shrine early in the morning was the best decision. Avoided the crowds and got amazing photos!',
    likes: 24,
    dateString: '2 weeks ago'
  },
  {
    user: 'Sarah M.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    destination: 'Santorini, Greece',
    text: 'Book restaurants in Oia for sunset well in advance. They fill up months before summer!',
    likes: 56,
    dateString: '1 month ago'
  },
  {
    user: 'David K.',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    destination: 'Bali, Indonesia',
    text: 'Ubud is great, but don’t miss out on exploring the northern parts of the island for a more authentic vibe.',
    likes: 18,
    dateString: '3 weeks ago'
  }
];

const itineraryData = [
  {
    dayTitle: 'Day 1: Arrival & Exploration',
    items: [
      { time: '10:00 AM', title: 'Check-in to Hotel', type: 'lodging' },
      { time: '01:00 PM', title: 'Lunch at Local Market', type: 'food' },
      { time: '03:30 PM', title: 'City Walking Tour', type: 'activity' },
    ]
  },
  {
    dayTitle: 'Day 2: Main Attractions',
    items: [
      { time: '09:00 AM', title: 'Museum Visit', type: 'activity' },
      { time: '01:00 PM', title: 'Scenic Lunch', type: 'food' },
      { time: '04:00 PM', title: 'Sunset Viewpoint', type: 'activity' },
    ]
  }
];

const expensesData = [
  { title: 'Flights', category: 'Transport', amount: 850, dateString: '2023-11-01' },
  { title: 'Hotel Deposit', category: 'Accommodation', amount: 400, dateString: '2023-11-05' },
  { title: 'Museum Tickets', category: 'Activities', amount: 45, dateString: '2023-11-10' },
];

const runSeed = async () => {
  try {
    // Clear existing data
    await Destination.deleteMany({});
    await Review.deleteMany({});
    await ItineraryDay.deleteMany({});
    await Expense.deleteMany({});

    // Keep it fast/parallel where possible
    await Promise.all([
      Destination.insertMany(destinationsData),
      Review.insertMany(reviewsData),
      ItineraryDay.insertMany(itineraryData),
      Expense.insertMany(expensesData)
    ]);
    
    console.log('Database seeded successfully via seed.js!');
  } catch (err) {
    console.error('Error in seed.js:', err);
  }
};

// Export to be used by server.js or conditionally run directly
runSeed.destinationsData = destinationsData;
runSeed.reviewsData = reviewsData;
runSeed.itineraryData = itineraryData;
runSeed.expensesData = expensesData;
module.exports = runSeed;


if (require.main === module) {
  // If run directly and not imported
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smartTravelPlanner', async () => {
    await runSeed();
    process.exit(0);
  });
}
