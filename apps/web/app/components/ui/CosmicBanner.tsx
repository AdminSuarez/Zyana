"use client";

import { useState, useEffect } from 'react';
import { useCosmicSound } from './Sound';

const cosmicQuotes = [
  "The stars align for those who believe in magic",
  "Your cosmic journey begins with a single card",
  "The universe whispers secrets through the tarot",
  "Trust in the celestial wisdom that guides you",
  "Every reading reveals a new layer of your soul"
];

export function CosmicBanner() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [visible, setVisible] = useState(true);
  const { isEnabled, playMysticChime } = useCosmicSound();

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentQuote(prev => (prev + 1) % cosmicQuotes.length);
        setVisible(true);
        if (isEnabled) playMysticChime();
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [isEnabled, playMysticChime]);

  return (
    <div className="bg-gradient-to-r from-cosmic-purple via-cosmic-dark to-cosmic-purple p-4 text-center">
      <div className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-cosmic-gold font-medium">
          ✨ {cosmicQuotes[currentQuote]} ✨
        </p>
      </div>
    </div>
  );
}
