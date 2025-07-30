"use client";

import { useState, useEffect, useRef } from 'react';

export function useCosmicSound() {
  const [isEnabled, setIsEnabled] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playTone = (frequency: number, duration: number = 0.3, type: OscillatorType = 'sine') => {
    if (!isEnabled || !audioContext.current) return;

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);

    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + duration);
  };

  const playCardFlip = () => playTone(440, 0.2, 'triangle');
  const playCardReveal = () => {
    playTone(523.25, 0.3, 'sine'); // C5
    setTimeout(() => playTone(659.25, 0.3, 'sine'), 150); // E5
    setTimeout(() => playTone(783.99, 0.4, 'sine'), 300); // G5
  };
  const playMysticChime = () => {
    [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.8, 'sine'), i * 200);
    });
  };
  const playPortalEnter = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => playTone(200 + i * 50, 0.1, 'sawtooth'), i * 50);
    }
  };

  return {
    isEnabled,
    setIsEnabled,
    playCardFlip,
    playCardReveal,
    playMysticChime,
    playPortalEnter
  };
}

export function CosmicAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioContext = useRef<AudioContext | null>(null);
  const oscillators = useRef<OscillatorNode[]>([]);
  const gainNode = useRef<GainNode | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNode.current = audioContext.current.createGain();
      gainNode.current.connect(audioContext.current.destination);
    }

    return () => {
      stopAmbience();
    };
  }, []);

  const startAmbience = () => {
    if (!audioContext.current || !gainNode.current) return;

    // Create ethereal ambient tones
    const frequencies = [110, 146.83, 174.61, 220, 293.66];
    
    frequencies.forEach((freq, i) => {
      const oscillator = audioContext.current!.createOscillator();
      const oscGain = audioContext.current!.createGain();
      
      oscillator.connect(oscGain);
      oscGain.connect(gainNode.current!);
      
      oscillator.frequency.setValueAtTime(freq, audioContext.current!.currentTime);
      oscillator.type = 'sine';
      
      oscGain.gain.setValueAtTime(0, audioContext.current!.currentTime);
      oscGain.gain.linearRampToValueAtTime(volume * 0.1, audioContext.current!.currentTime + 2 + i);
      
      // Add subtle frequency modulation for ethereal effect
      const lfo = audioContext.current!.createOscillator();
      const lfoGain = audioContext.current!.createGain();
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      lfo.frequency.setValueAtTime(0.1 + i * 0.05, audioContext.current!.currentTime);
      lfoGain.gain.setValueAtTime(2, audioContext.current!.currentTime);
      
      oscillator.start();
      lfo.start();
      
      oscillators.current.push(oscillator);
    });

    setIsPlaying(true);
  };

  const stopAmbience = () => {
    oscillators.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator may already be stopped
      }
    });
    oscillators.current = [];
    setIsPlaying(false);
  };

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (gainNode.current) {
      gainNode.current.gain.setValueAtTime(newVolume, audioContext.current!.currentTime);
    }
  };

  return (
    <div className="cosmic-card p-6">
      <h3 className="text-xl font-bold text-cosmic-gold mb-4 text-center">
        🎵 Cosmic Ambience 🎵
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={isPlaying ? stopAmbience : startAmbience}
            className={`px-6 py-2 rounded-lg transition-all ${
              isPlaying 
                ? 'bg-cosmic-gold/20 border border-cosmic-gold text-cosmic-gold' 
                : 'cosmic-button'
            }`}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => updateVolume(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <p className="text-xs opacity-70 text-center">
          Ethereal tones to enhance your cosmic journey
        </p>
      </div>
    </div>
  );
}

export function SoundControls() {
  const { isEnabled, setIsEnabled, playMysticChime } = useCosmicSound();

  return (
    <div className="cosmic-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">🔊 Sound Effects</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cosmic-purple/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cosmic-purple"></div>
        </label>
      </div>
      {isEnabled && (
        <button
          onClick={playMysticChime}
          className="mt-2 w-full text-xs px-2 py-1 bg-cosmic-purple/20 rounded hover:bg-cosmic-purple/30 transition"
        >
          Test Sound 🎵
        </button>
      )}
    </div>
  );
}
