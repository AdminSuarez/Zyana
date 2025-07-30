"use client";

import { useState } from 'react';
import { useCosmicSound } from './Sound';

export function PortalEntry() {
  const [isHovered, setIsHovered] = useState(false);
  const { isEnabled, playPortalEnter } = useCosmicSound();

  const handlePortalClick = () => {
    if (isEnabled) playPortalEnter();
    // Navigate to tarot section (this would trigger navigation in parent)
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="my-16 text-center">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-cosmic-gold">
          🌌 Enter the Cosmic Portal 🌌
        </h2>
        <p className="text-lg opacity-80 max-w-xl mx-auto">
          Step through the veil between worlds and discover what the universe has in store for you.
        </p>
        <button 
          className={`cosmic-button transform transition-all duration-500 ${
            isHovered ? 'scale-110 shadow-2xl shadow-cosmic-purple/50' : 'scale-100'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handlePortalClick}
        >
          <span className="flex items-center space-x-2">
            <span>🚪</span>
            <span>Enter Portal</span>
            <span>✨</span>
          </span>
        </button>
        
        <div className="grid md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="cosmic-card p-4">
            <h3 className="font-bold text-cosmic-gold mb-2">🔮 Daily Reading</h3>
            <p className="text-sm opacity-75">Get your cosmic guidance for today</p>
          </div>
          <div className="cosmic-card p-4">
            <h3 className="font-bold text-cosmic-gold mb-2">🌙 Moon Wisdom</h3>
            <p className="text-sm opacity-75">Align with lunar energies</p>
          </div>
          <div className="cosmic-card p-4">
            <h3 className="font-bold text-cosmic-gold mb-2">⭐ Star Map</h3>
            <p className="text-sm opacity-75">Explore your celestial path</p>
          </div>
          <div className="cosmic-card p-4">
            <h3 className="font-bold text-cosmic-gold mb-2">🔢 Numerology</h3>
            <p className="text-sm opacity-75">Discover your life path</p>
          </div>
        </div>
      </div>
    </section>
  );
}