"use client";

import { useState } from 'react';

export interface TarotCardData {
  id: string;
  name: string;
  meaning: string;
  reversed_meaning: string;
  emoji: string;
  element: string;
  keywords: string[];
}

export const majorArcana: TarotCardData[] = [
  {
    id: "fool",
    name: "The Fool",
    meaning: "New beginnings, spontaneity, and unlimited potential await you.",
    reversed_meaning: "Recklessness, poor judgment, or missed opportunities.",
    emoji: "🃏",
    element: "Air",
    keywords: ["adventure", "faith", "potential"]
  },
  {
    id: "magician",
    name: "The Magician",
    meaning: "You have all the tools needed to manifest your desires.",
    reversed_meaning: "Manipulation, poor planning, or unused talents.",
    emoji: "🔮",
    element: "Fire",
    keywords: ["manifestation", "power", "skill"]
  },
  {
    id: "high-priestess",
    name: "The High Priestess",
    meaning: "Trust your intuition and inner wisdom to guide you.",
    reversed_meaning: "Secrets, hidden agendas, or lack of center.",
    emoji: "🌙",
    element: "Water",
    keywords: ["intuition", "mystery", "subconscious"]
  },
  {
    id: "empress",
    name: "The Empress",
    meaning: "Fertility, femininity, and abundance flow into your life.",
    reversed_meaning: "Creative block, dependence, or smothering.",
    emoji: "👑",
    element: "Earth",
    keywords: ["abundance", "nature", "nurturing"]
  },
  {
    id: "emperor",
    name: "The Emperor",
    meaning: "Structure, authority, and control bring stability.",
    reversed_meaning: "Tyranny, rigidity, or lack of discipline.",
    emoji: "⚡",
    element: "Fire",
    keywords: ["authority", "structure", "control"]
  },
  {
    id: "star",
    name: "The Star",
    meaning: "Hope, inspiration, and spiritual guidance illuminate your path.",
    reversed_meaning: "Lack of faith, disconnection from purpose.",
    emoji: "⭐",
    element: "Air",
    keywords: ["hope", "inspiration", "healing"]
  },
  {
    id: "moon",
    name: "The Moon",
    meaning: "Trust your intuition as you navigate uncertainty and illusion.",
    reversed_meaning: "Confusion, fear, or deception being revealed.",
    emoji: "🌙",
    element: "Water",
    keywords: ["intuition", "illusion", "subconscious"]
  },
  {
    id: "sun",
    name: "The Sun",
    meaning: "Joy, success, and positive energy radiate from all endeavors.",
    reversed_meaning: "Temporary clouds over happiness, delays in success.",
    emoji: "☀️",
    element: "Fire",
    keywords: ["joy", "success", "vitality"]
  }
];

export const readingTypes = [
  {
    id: "daily",
    name: "Daily Guidance",
    description: "One card to guide your day",
    cardCount: 1,
    positions: ["Your Energy Today"]
  },
  {
    id: "past-present-future",
    name: "Past, Present, Future",
    description: "See your journey through time",
    cardCount: 3,
    positions: ["Past Influences", "Present Situation", "Future Potential"]
  },
  {
    id: "love",
    name: "Love & Relationships",
    description: "Insight into matters of the heart",
    cardCount: 3,
    positions: ["You", "Your Partner/Potential", "The Relationship"]
  },
  {
    id: "career",
    name: "Career & Purpose",
    description: "Find your path to success",
    cardCount: 3,
    positions: ["Current Career Energy", "Hidden Opportunities", "Next Steps"]
  },
  {
    id: "chakra",
    name: "Chakra Alignment",
    description: "Balance your energy centers",
    cardCount: 7,
    positions: ["Root", "Sacral", "Solar Plexus", "Heart", "Throat", "Third Eye", "Crown"]
  }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomCards(count: number): TarotCardData[] {
  const shuffled = shuffleArray(majorArcana);
  return shuffled.slice(0, count);
}
