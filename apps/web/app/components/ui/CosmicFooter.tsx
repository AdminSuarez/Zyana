"use client";

import { useState } from 'react';

export function CosmicFooter() {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <footer className="bg-cosmic-dark border-t border-cosmic-purple/30 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-cosmic-gold font-bold mb-4">🔮 Zyana</h3>
            <p className="text-sm opacity-75 mb-4">
              Your cosmic companion for tarot wisdom, astrology insights, and spiritual growth.
            </p>
            <div className="flex space-x-4">
              <span className="text-cosmic-purple">✨</span>
              <span className="text-cosmic-gold">🌙</span>
              <span className="text-cosmic-purple">⭐</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-cosmic-gold font-semibold mb-4">Readings</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>• Daily Guidance</li>
              <li>• Love & Relationships</li>
              <li>• Career Path</li>
              <li>• Celtic Cross</li>
              <li>• Three Card Spread</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-cosmic-gold font-semibold mb-4">Cosmic Tools</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>• Astrology Calculator</li>
              <li>• Numerology Insights</li>
              <li>• Moon Phase Tracker</li>
              <li>• Zodiac Compatibility</li>
              <li>• Dream Interpretation</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-cosmic-gold font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>• Reading History</li>
              <li>• Share Insights</li>
              <li>• Cosmic Events</li>
              <li>• Learning Center</li>
              <li>• Support</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cosmic-purple/20 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm opacity-60">
              © {currentYear} Zyana. Channeling cosmic wisdom with love.
            </p>
            <div className="flex space-x-6 text-sm opacity-60">
              <a href="#" className="hover:text-cosmic-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-cosmic-gold transition-colors">Terms</a>
              <a href="#" className="hover:text-cosmic-gold transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-6 text-xs opacity-50">
            <p>
              🌟 May the stars guide your journey and the cosmos illuminate your path 🌟
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
