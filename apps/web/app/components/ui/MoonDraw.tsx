"use client";

import { useEffect, useState } from 'react';

export function MoonDraw() {
  const [moonPhase, setMoonPhase] = useState('🌙');
  const [phaseName, setPhaseName] = useState('New Moon');

  useEffect(() => {
    // Calculate moon phase based on current date
    const now = new Date();
    const knownNewMoon = new Date(2025, 0, 29); // Jan 29, 2025 was a new moon
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysSinceNewMoon = (now.getTime() - knownNewMoon.getTime()) / msPerDay;
    const phase = ((daysSinceNewMoon % 29.53) + 29.53) % 29.53; // Lunar cycle ~29.53 days

    if (phase < 1) {
      setMoonPhase('🌑');
      setPhaseName('New Moon');
    } else if (phase < 7.4) {
      setMoonPhase('🌒');
      setPhaseName('Waxing Crescent');
    } else if (phase < 8.4) {
      setMoonPhase('🌓');
      setPhaseName('First Quarter');
    } else if (phase < 14.8) {
      setMoonPhase('🌔');
      setPhaseName('Waxing Gibbous');
    } else if (phase < 15.8) {
      setMoonPhase('🌕');
      setPhaseName('Full Moon');
    } else if (phase < 22.1) {
      setMoonPhase('🌖');
      setPhaseName('Waning Gibbous');
    } else if (phase < 23.1) {
      setMoonPhase('🌗');
      setPhaseName('Last Quarter');
    } else {
      setMoonPhase('🌘');
      setPhaseName('Waning Crescent');
    }
  }, []);

  return (
    <section className="my-16 text-center">
      <div className="cosmic-card max-w-md mx-auto p-8">
        <h2 className="text-2xl font-bold text-cosmic-gold mb-6">
          🌟 Lunar Guidance 🌟
        </h2>
        <div className="space-y-4">
          <div className="text-8xl animate-pulse">
            {moonPhase}
          </div>
          <h3 className="text-xl font-semibold text-cosmic-purple">
            {phaseName}
          </h3>
          <p className="text-sm opacity-75 leading-relaxed">
            The moon's energy flows through you, offering wisdom and intuition for your spiritual journey.
          </p>
          <button className="cosmic-button mt-4">
            <span className="flex items-center space-x-2">
              <span>🔮</span>
              <span>Draw Moon Card</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}