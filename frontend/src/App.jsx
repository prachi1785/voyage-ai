import React, { useState } from 'react';
import Header from './components/Header';
import DestinationSearch from './components/DestinationSearch';
import Itinerary from './components/Itinerary';
import Budget from './components/Budget';
import Reviews from './components/Reviews';
import './index.css';

function App() {
  const [currentTab, setCurrentTab] = useState('explore');

  return (
    <div className="app-wrapper animate-fade-in">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {currentTab === 'explore' && (
          <div className="animate-fade-in text-center" style={{ marginTop: '4rem' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: 1.1 }}>Find Your Next <br/><span className="text-gradient">Adventure</span></h1>
            <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Plan, budget, and share your journey with the smartest travel companion.
            </p>
            <DestinationSearch onSelectDestination={(dest) => setCurrentTab('itinerary')} />
          </div>
        )}
        
        {currentTab === 'itinerary' && (
          <div className="animate-fade-in">
            <Itinerary />
          </div>
        )}
        
        {currentTab === 'budget' && (
          <div className="animate-fade-in">
            <Budget />
          </div>
        )}
        
        {currentTab === 'community' && (
          <div className="animate-fade-in">
            <Reviews />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
