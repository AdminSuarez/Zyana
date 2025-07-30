"use client";

import { useState, useEffect } from 'react';

const zodiacSigns = [
  { name: "Aries", emoji: "♈", element: "Fire", dates: "Mar 21 - Apr 19", traits: ["Bold", "Energetic", "Leader"] },
  { name: "Taurus", emoji: "♉", element: "Earth", dates: "Apr 20 - May 20", traits: ["Stable", "Reliable", "Sensual"] },
  { name: "Gemini", emoji: "♊", element: "Air", dates: "May 21 - Jun 20", traits: ["Curious", "Adaptable", "Social"] },
  { name: "Cancer", emoji: "♋", element: "Water", dates: "Jun 21 - Jul 22", traits: ["Nurturing", "Emotional", "Intuitive"] },
  { name: "Leo", emoji: "♌", element: "Fire", dates: "Jul 23 - Aug 22", traits: ["Confident", "Creative", "Generous"] },
  { name: "Virgo", emoji: "♍", element: "Earth", dates: "Aug 23 - Sep 22", traits: ["Analytical", "Practical", "Helpful"] },
  { name: "Libra", emoji: "♎", element: "Air", dates: "Sep 23 - Oct 22", traits: ["Balanced", "Diplomatic", "Artistic"] },
  { name: "Scorpio", emoji: "♏", element: "Water", dates: "Oct 23 - Nov 21", traits: ["Intense", "Mysterious", "Transformative"] },
  { name: "Sagittarius", emoji: "♐", element: "Fire", dates: "Nov 22 - Dec 21", traits: ["Adventurous", "Philosophical", "Free-spirited"] },
  { name: "Capricorn", emoji: "♑", element: "Earth", dates: "Dec 22 - Jan 19", traits: ["Ambitious", "Disciplined", "Practical"] },
  { name: "Aquarius", emoji: "♒", element: "Air", dates: "Jan 20 - Feb 18", traits: ["Independent", "Innovative", "Humanitarian"] },
  { name: "Pisces", emoji: "♓", element: "Water", dates: "Feb 19 - Mar 20", traits: ["Compassionate", "Artistic", "Intuitive"] }
];

function calculateLifePath(birthDate: string): number {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let sum = day + month + year;
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum;
}

function getLifePathMeaning(number: number): string {
  const meanings = {
    1: "The Leader - Independent, pioneering, and original",
    2: "The Diplomat - Cooperative, sensitive, and peaceful",
    3: "The Creative - Expressive, optimistic, and artistic",
    4: "The Builder - Practical, loyal, and hardworking",
    5: "The Adventurer - Freedom-loving, energetic, and curious",
    6: "The Nurturer - Caring, responsible, and family-oriented",
    7: "The Seeker - Spiritual, analytical, and introspective",
    8: "The Achiever - Ambitious, material success, and power",
    9: "The Humanitarian - Compassionate, generous, and wise",
    11: "The Intuitive - Inspired, idealistic, and enlightened",
    22: "The Master Builder - Visionary, practical idealist",
    33: "The Master Teacher - Compassionate service to humanity"
  };
  return meanings[number as keyof typeof meanings] || "Unknown";
}

function getZodiacSign(birthDate: string) {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10];
  return zodiacSigns[11];
}

export function AstrologyCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateProfile = () => {
    if (!birthDate) return;

    const zodiac = getZodiacSign(birthDate);
    const lifePath = calculateLifePath(birthDate);
    const lifePathMeaning = getLifePathMeaning(lifePath);

    setResults({
      zodiac,
      lifePath,
      lifePathMeaning,
      birthDate: new Date(birthDate).toLocaleDateString()
    });
  };

  return (
    <section className="my-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-cosmic-gold mb-8">
          ✨ Cosmic Profile Calculator ✨
        </h2>
        <p className="text-lg opacity-80 mb-8">
          Discover your astrological and numerological blueprint
        </p>

        <div className="cosmic-card p-8 mb-8">
          <div className="max-w-md mx-auto space-y-4">
            <label className="block text-lg font-medium text-cosmic-purple">
              Enter Your Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-cosmic-purple focus:outline-none text-center"
            />
            <button
              onClick={calculateProfile}
              className="cosmic-button w-full"
              disabled={!birthDate}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>🔮</span>
                <span>Calculate My Cosmic Profile</span>
              </span>
            </button>
          </div>
        </div>

        {results && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="cosmic-card p-8">
              <h3 className="text-2xl font-bold text-cosmic-gold mb-4">
                🌟 Your Zodiac Sign 🌟
              </h3>
              <div className="text-8xl mb-4">{results.zodiac.emoji}</div>
              <h4 className="text-xl font-semibold text-cosmic-purple mb-2">
                {results.zodiac.name}
              </h4>
              <p className="text-sm opacity-80 mb-4">{results.zodiac.dates}</p>
              <div className="space-y-2">
                <p><strong>Element:</strong> {results.zodiac.element}</p>
                <div>
                  <strong>Key Traits:</strong>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    {results.zodiac.traits.map((trait: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-cosmic-purple/20 rounded-full text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="cosmic-card p-8">
              <h3 className="text-2xl font-bold text-cosmic-gold mb-4">
                🔢 Your Life Path Number 🔢
              </h3>
              <div className="text-8xl mb-4 text-cosmic-purple">{results.lifePath}</div>
              <h4 className="text-lg font-semibold mb-4">
                {results.lifePathMeaning.split(' - ')[0]}
              </h4>
              <p className="text-sm opacity-80 leading-relaxed">
                {results.lifePathMeaning.split(' - ')[1]}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function DailyHoroscope() {
  const [selectedSign, setSelectedSign] = useState<string>('');
  const [horoscope, setHoroscope] = useState<string>('');

  const generateHoroscope = (sign: string) => {
    const horoscopes = [
      `Today brings powerful cosmic energy for ${sign}. Trust your intuition and embrace new opportunities.`,
      `The stars align favorably for ${sign} today. Focus on relationships and creative endeavors.`,
      `${sign}, your natural talents shine brightly today. Take action on your dreams and aspirations.`,
      `Cosmic forces encourage ${sign} to seek balance and harmony in all aspects of life today.`,
      `${sign}, today is perfect for spiritual growth and connecting with your inner wisdom.`
    ];
    return horoscopes[Math.floor(Math.random() * horoscopes.length)];
  };

  const handleSignSelect = (sign: any) => {
    setSelectedSign(sign.name);
    setHoroscope(generateHoroscope(sign.name));
  };

  return (
    <section className="my-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-cosmic-gold mb-8">
          🌟 Daily Horoscope 🌟
        </h2>
        <p className="text-lg opacity-80 mb-8">
          Select your zodiac sign for today's cosmic guidance
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4 mb-8">
          {zodiacSigns.map((sign) => (
            <button
              key={sign.name}
              onClick={() => handleSignSelect(sign)}
              className={`p-4 rounded-lg transition-all hover:scale-110 ${
                selectedSign === sign.name
                  ? 'bg-cosmic-purple/30 border-2 border-cosmic-gold'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div className="text-3xl mb-2">{sign.emoji}</div>
              <div className="text-xs font-medium">{sign.name}</div>
            </button>
          ))}
        </div>

        {horoscope && (
          <div className="cosmic-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-cosmic-gold mb-4">
              Today's Message for {selectedSign}
            </h3>
            <p className="text-lg leading-relaxed opacity-90">{horoscope}</p>
            <div className="mt-6 text-sm opacity-70">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
