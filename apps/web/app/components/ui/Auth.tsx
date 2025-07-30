"use client";

import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  savedReadings: SavedReading[];
}

interface SavedReading {
  id: string;
  type: string;
  date: string;
  cards: any[];
  notes?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('zyana_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signUp = (name: string, email: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      joinDate: new Date().toISOString(),
      savedReadings: []
    };
    setUser(newUser);
    localStorage.setItem('zyana_user', JSON.stringify(newUser));
    return newUser;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('zyana_user');
  };

  const saveReading = (reading: Omit<SavedReading, 'id'>) => {
    if (!user) return;

    const newReading: SavedReading = {
      ...reading,
      id: Date.now().toString()
    };

    const updatedUser = {
      ...user,
      savedReadings: [...user.savedReadings, newReading]
    };

    setUser(updatedUser);
    localStorage.setItem('zyana_user', JSON.stringify(updatedUser));
  };

  return { user, isLoading, signUp, signOut, saveReading };
}

export function AuthModal({ isOpen, onClose, onSignUp }: {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (name: string, email: string) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onSignUp(name, email);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="cosmic-card max-w-md w-full mx-4 p-8">
        <h2 className="text-2xl font-bold text-cosmic-gold mb-6 text-center">
          🌟 Join the Cosmic Community 🌟
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cosmic Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-cosmic-purple focus:outline-none"
              placeholder="Enter your mystical name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-cosmic-purple focus:outline-none"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 cosmic-button"
            >
              Join Now
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function UserProfile({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  const [showReadings, setShowReadings] = useState(false);

  return (
    <div className="cosmic-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-cosmic-gold">Welcome, {user.name}</h3>
          <p className="text-sm opacity-70">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
        </div>
        <button
          onClick={onSignOut}
          className="text-sm px-3 py-1 border border-gray-600 rounded hover:bg-gray-800 transition"
        >
          Sign Out
        </button>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => setShowReadings(!showReadings)}
          className="w-full cosmic-button flex items-center justify-center space-x-2"
        >
          <span>📚</span>
          <span>View Saved Readings ({user.savedReadings.length})</span>
        </button>

        {showReadings && (
          <div className="space-y-3">
            {user.savedReadings.length === 0 ? (
              <p className="text-center opacity-70">No saved readings yet</p>
            ) : (
              user.savedReadings.map((reading) => (
                <div key={reading.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-cosmic-purple">{reading.type}</h4>
                    <span className="text-xs opacity-70">
                      {new Date(reading.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm opacity-80">
                    {reading.cards.length} cards drawn
                  </p>
                  {reading.notes && (
                    <p className="text-xs mt-2 italic opacity-70">{reading.notes}</p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
