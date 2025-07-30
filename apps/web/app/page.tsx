"use client";

import { useState } from 'react';
import { Hero } from "./components/ui/Hero";
import { PortalEntry } from "./components/ui/PortalEntry";
import { MoonDraw } from "./components/ui/MoonDraw";
import { TarotSpread } from './components/ui/TarotCard';
import { AstrologyCalculator, DailyHoroscope } from './components/ui/Astrology';
import { SoundControls, CosmicAmbience } from './components/ui/Sound';
import { useAuth, UserProfile, AuthModal } from './components/ui/Auth';
import { CosmicBanner } from './components/ui/CosmicBanner';
import { CosmicFooter } from './components/ui/CosmicFooter';

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signUp, signOut } = useAuth();

  const navigation = [
    { id: 'home', label: 'Home', emoji: '🏠' },
    { id: 'tarot', label: 'Tarot', emoji: '🔮' },
    { id: 'astrology', label: 'Astrology', emoji: '✨' },
    { id: 'horoscope', label: 'Horoscope', emoji: '🌟' },
    { id: 'moon', label: 'Moon', emoji: '🌙' },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <>
            <Hero title="You've arrived." subtitle="This is not an app. This is a return to the cosmic wisdom that has always been within you. Let the stars guide your journey through the mystical realms of possibility." />
            <PortalEntry />
          </>
        );
      case 'tarot':
        return <TarotSpread />;
      case 'astrology':
        return <AstrologyCalculator />;
      case 'horoscope':
        return <DailyHoroscope />;
      case 'moon':
        return <MoonDraw />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-2xl">🌟</span>
              <span className="text-xl font-bold text-cosmic-gold">Zyana</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`px-3 py-2 rounded-lg transition-all text-sm ${
                    currentSection === item.id
                      ? 'bg-cosmic-purple/30 text-cosmic-gold'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <span className="mr-1">{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-cosmic-gold">✨ {user.name}</span>
                  <button
                    onClick={signOut}
                    className="text-xs px-2 py-1 border border-gray-600 rounded hover:bg-gray-800 transition"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="cosmic-button text-sm px-4 py-2"
                >
                  Join
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 w-full z-40 bg-black/90 backdrop-blur-md border-t border-gray-800">
        <div className="flex justify-around py-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`flex flex-col items-center p-2 transition-all ${
                currentSection === item.id
                  ? 'text-cosmic-gold'
                  : 'text-gray-400'
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-8">
        {renderSection()}
      </main>

      {/* Floating Controls */}
      <div className="fixed right-4 top-20 space-y-4 z-30">
        <SoundControls />
        <CosmicAmbience />
        {user && <UserProfile user={user} onSignOut={signOut} />}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSignUp={(name, email) => {
          signUp(name, email);
          setShowAuthModal(false);
        }}
      />

      {/* Footer */}
      <CosmicFooter />
    </div>
  );
}
