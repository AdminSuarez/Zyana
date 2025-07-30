"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    const id = searchParams?.get('session_id');
    if (id) {
      setSessionId(id);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-cosmic-dark flex items-center justify-center px-4">
      <div className="cosmic-card p-12 text-center max-w-2xl">
        <div className="text-6xl mb-6">🌟</div>
        <h1 className="text-4xl font-bold text-cosmic-gold mb-4">
          Welcome to Your Cosmic Journey!
        </h1>
        <p className="text-xl mb-6 opacity-80">
          Your subscription has been activated successfully. The universe is now aligning to bring you infinite wisdom and guidance.
        </p>
        
        <div className="cosmic-card bg-cosmic-purple/20 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-cosmic-gold mb-4">What's Next?</h2>
          <ul className="text-left space-y-2 opacity-90">
            <li>✨ Access all premium tarot reading types</li>
            <li>🔮 Unlock advanced astrology features</li>
            <li>🌙 Receive personalized daily guidance</li>
            <li>🎵 Enjoy cosmic soundscapes and effects</li>
            <li>💾 Save and track your spiritual journey</li>
          </ul>
        </div>

        <div className="space-y-4">
          <a 
            href="/"
            className="cosmic-button inline-block px-8 py-3 text-lg"
          >
            Begin Your Cosmic Experience
          </a>
          
          <p className="text-sm opacity-60">
            Questions? Contact us at support@zyana.app
          </p>
        </div>

        {sessionId && (
          <div className="mt-8 p-4 bg-cosmic-dark/50 rounded-lg text-xs opacity-50">
            Session ID: {sessionId}
          </div>
        )}
      </div>
    </div>
  );
}
