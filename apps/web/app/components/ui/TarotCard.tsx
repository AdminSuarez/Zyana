"use client";

import { useState } from 'react';
import { TarotCardData, readingTypes, getRandomCards } from './TarotData';

interface TarotCardProps {
  card: TarotCardData;
  position: string;
  isRevealed?: boolean;
  isReversed?: boolean;
}

export function TarotCard({ card, position, isRevealed = false, isReversed = false }: TarotCardProps) {
  const [revealed, setRevealed] = useState(isRevealed);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-cosmic-purple uppercase tracking-wider text-center">
        {position}
      </h4>
      <div 
        className={`cosmic-card p-6 cursor-pointer transform transition-all duration-700 hover:scale-105 min-h-[300px] flex flex-col justify-center ${
          revealed ? 'bg-gradient-to-br from-cosmic-purple/20 to-cosmic-gold/20' : 'bg-gray-800'
        } ${isReversed ? 'rotate-180' : ''}`}
        onClick={() => setRevealed(!revealed)}
      >
        <div className="text-center space-y-4">
          {revealed ? (
            <>
              <div className="text-6xl animate-bounce">{card.emoji}</div>
              <h3 className="text-xl font-bold text-cosmic-gold">{card.name}</h3>
              <div className="space-y-2">
                <p className="text-sm opacity-80 leading-relaxed">
                  {isReversed ? card.reversed_meaning : card.meaning}
                </p>
                <div className="text-xs text-cosmic-purple">
                  Element: {card.element}
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {card.keywords.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-cosmic-purple/20 rounded-full text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-6xl">🔮</div>
              <h3 className="text-lg font-semibold text-cosmic-purple">Hidden Card</h3>
              <p className="text-xs opacity-60">Click to reveal your destiny</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReadingSelector({ onSelectReading }: { onSelectReading: (readingType: any) => void }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {readingTypes.map((reading) => (
        <div
          key={reading.id}
          className="cosmic-card p-6 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onSelectReading(reading)}
        >
          <h3 className="text-xl font-bold text-cosmic-gold mb-2">{reading.name}</h3>
          <p className="text-sm opacity-80 mb-3">{reading.description}</p>
          <div className="text-xs text-cosmic-purple">
            {reading.cardCount} card{reading.cardCount > 1 ? 's' : ''}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TarotSpread() {
  const [selectedReading, setSelectedReading] = useState<any>(null);
  const [cards, setCards] = useState<TarotCardData[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const startReading = (readingType: any) => {
    setIsShuffling(true);
    setSelectedReading(readingType);
    
    setTimeout(() => {
      const newCards = getRandomCards(readingType.cardCount);
      setCards(newCards);
      setIsShuffling(false);
    }, 2000);
  };

  const resetReading = () => {
    setSelectedReading(null);
    setCards([]);
  };

  if (isShuffling) {
    return (
      <section className="my-16 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-cosmic-gold mb-8">
            🔮 Shuffling the Cosmic Deck 🔮
          </h2>
          <div className="space-y-6">
            <div className="text-8xl animate-spin">🌟</div>
            <p className="text-lg opacity-80">The universe is preparing your reading...</p>
            <div className="flex justify-center space-x-4">
              <div className="w-3 h-3 bg-cosmic-purple rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-cosmic-gold rounded-full animate-bounce delay-150"></div>
              <div className="w-3 h-3 bg-cosmic-purple rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!selectedReading) {
    return (
      <section className="my-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-cosmic-gold mb-8">
            🔮 Choose Your Reading 🔮
          </h2>
          <p className="text-lg opacity-80 mb-12 max-w-2xl mx-auto">
            Select the type of guidance you seek from the cosmic realms
          </p>
          <ReadingSelector onSelectReading={startReading} />
        </div>
      </section>
    );
  }

  return (
    <section className="my-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-cosmic-gold mb-4">
          🔮 {selectedReading.name} 🔮
        </h2>
        <p className="text-lg opacity-80 mb-8">{selectedReading.description}</p>
        
        <div className={`grid gap-8 mb-8 ${
          cards.length === 1 ? 'max-w-sm mx-auto' :
          cards.length === 3 ? 'md:grid-cols-3' :
          cards.length === 7 ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-7' :
          'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {cards.map((card, index) => (
            <TarotCard
              key={`${card.id}-${index}`}
              card={card}
              position={selectedReading.positions[index]}
              isReversed={Math.random() > 0.7}
            />
          ))}
        </div>

        <button
          onClick={resetReading}
          className="cosmic-button"
        >
          <span className="flex items-center space-x-2">
            <span>🔄</span>
            <span>New Reading</span>
          </span>
        </button>
      </div>
    </section>
  );
}
