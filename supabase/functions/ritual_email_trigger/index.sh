#!/usr/bin/env bash
set -e

# Root directories (no zyana/prefix, no cd)
mkdir -p apps/web/app/{components,api,landing,newsletter,marketing,rituals,archetype,tarot,growth,admin,community,collective,avatar,dreammap,token,share,premium,feedback,memory,vision,launch,partners} web/lib web/public/assets mobile/screens ../packages/ai supabase/migrations supabase/functions supabase/triggers docs


# ----- README and top-level docs -----
cat > README.md <<EOF
# Zyana – The Spiritual OS

Welcome to Zyana! Your all-in-one AI ritual, tarot, dream, and crystal companion. This repo contains web (Next.js), mobile (Expo/React Native), AI (OpenAI+TTS), and all deployment files.

**Quickstart:**  
1. Run \`pnpm install\` or \`yarn\`/\`npm\`
2. Add your API keys to \`.env\` or Vercel/Expo
3. Push to GitHub → Vercel/Expo for deploy (see \`deploy-instructions.md\`)
4. Drop real assets (app icon, splash, press kit, etc.) into \`public/assets/\`
EOF

cat > .vercel.json <<EOF
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "cleanUrls": true,
  "trailingSlash": false
}
EOF

cat > deploy-instructions.md <<EOF
# 🚀 Zyana App Deployment Guide

## 1. Push Code to GitHub
- Create repo, add, commit, and push (see README)
## 2. Deploy to Vercel
- Import GitHub repo, add ENV keys, connect zyana.app, deploy
## 3. Set up DNS
- CNAME: zyana.app → cname.vercel-dns.com (wait 10 mins)
- Done!

Full step-by-step in main chat/above.
EOF

cat > github-url.md <<EOF
GitHub Repo Suggestion:
https://github.com/YOUR_USERNAME/zyana
EOF

# ----- Press kit, docs, screenshots -----
cat > docs/zyana-app-features.md <<EOF
# ✅ Full Zyana Feature Summary

| Feature | Description |
|--------|-------------|
| 🧘 AI Rituals | Personalized daily and moon-phase rituals |
| 🧠 Dream Journal | Save dreams, symbols, and insights |
| 🃏 Tarot Builder | Choose deck, spread, and meanings |
| 🔮 Crystal Search | Find stones by property or intention |
| 🌕 Moon Sync | Rituals adapt to lunar phases |
| 🌱 Daily Oracle | Morning affirmation & focus draw |
| 🧬 Archetypes | Quiz + reflection insights |
| 🌍 Community | Share rituals, journal entries |
| 📩 Email Opt-In | ConvertKit & AI sequence setup |
| 🧾 Admin Tools | Metrics & behavior insight dashboard |

Fully mobile + web compatible. Optimized for iOS App Store & Google Play.
EOF

cat > docs/screenshot-guide.md <<EOF
# 📸 App Store Screenshot Guide (Zyana)

| Type | Size | Caption |
|------|------|---------|
| Home Ritual | 1242x2688 | “Your daily ritual starts here” |
| AI Result | 1242x2688 | “Get rituals written just for you” |
| Dream Journal | 1242x2688 | “Track dreams and uncover symbols” |
| Archetype Quiz | 1242x2688 | “Discover your mystic identity” |
| Tarot Spread | 1242x2688 | “Design and reflect with digital tarot” |
| Crystal Search | 1242x2688 | “Find healing stones by intention” |

Use Figma, Screenshot on iPhone Sim, or Expo Go on real device.
EOF

cat > docs/press-kit-contents.md <<EOF
# 🎨 Zyana Press Kit Contents
- App Icon (1024x1024 PNG)
- Splash Screen (1242x2436 PNG)
- Logo (SVG + PNG)
- Feature Screenshots (6)
- Contact: press@zyana.app
EOF

cat > docs/demo.md <<EOF
# Demo Scripts for Zyana

## Tarot + Ritual Flow
Welcome to Zyana. Draw a card, receive its meaning, then channel that into a personalized ritual created by AI.

## Dream Companion
Track your dreams each night. Let Zyana’s memory reveal your patterns over time—emotionally and archetypally.

## Crystals & Intentions
Search for crystals based on your intention. Save your favorite stones for specific rituals, and align with cosmic cycles.

## Growth + Token Use
Your journey is evolving. Visualize growth with insights and energy points to unlock new ritual paths.
EOF

cat > docs/email-sequence.md <<EOF
# Zyana Email Sequence (ConvertKit Compatible)

### Email 1: Welcome to Zyana 🌌
Subject: Step into your sacred space

Welcome, seeker. Zyana is your spiritual companion — ready to guide your dreams, rituals, and intentions. Start with your first AI-crafted ritual now ✨

[Start Ritual] → zyana.app/ritual

### Email 2: Discover Your Archetype 🔮
Subject: What kind of mystic are you?

Are you a Seeker, Oracle, or Alchemist? Take the journey and unlock your unique archetype.

[Reveal My Archetype] → zyana.app/archetype

### Email 3: Tarot & Dreams
Subject: Messages from the Moon

Draw a card. Write a dream. Let Zyana reveal the patterns you were born to live.

[Explore Tarot] → zyana.app/tarot
[Journal My Dream] → zyana.app/dream

### Email 4: Share Your Ritual
Subject: Inspire the Circle

What did your ritual reveal? Share your intention and inspire others in the Zyana community.

[Join the Community] → zyana.app/community
EOF

# ----- Public assets -----
echo "[Placeholder for 1024x1024 app icon]" > apps/web/public/assets/app-icon.png
echo "[Placeholder for 1242x2436 splash screen]" > apps/web/public/assets/splash.png
echo "[Placeholder for SVG logo]" > apps/web/public/assets/logo.svg
echo "[Placeholder for PNG logo]" > apps/web/public/assets/logo.png
echo "[Placeholder for press/media kit with logos, feature bullets, and screenshots]" > apps/web/public/assets/press-kit.pdf

# ----- Supabase SQL and API stubs (for migrations, etc.) -----
cat > supabase/migrations/init.sql <<EOF
-- Users
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique,
  persona text,
  created_at timestamp default now()
);

-- Rituals
create table if not exists rituals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  title text,
  content jsonb,
  created_at timestamp default now()
);

-- Dreams
create table if not exists dreams (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  entry text,
  created_at timestamp default now()
);

-- Companions
create table if not exists companions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  archetype text,
  voice_url text,
  memory jsonb
);

-- Tokens
create table if not exists tokens (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  amount integer default 0,
  created_at timestamp default now()
);

-- Community Posts
create table if not exists community_posts (
  id uuid primary key default uuid_generate_v4(),
  content text,
  created_at timestamp default now()
);

-- Feedback
create table if not exists feedback (
  id uuid primary key default uuid_generate_v4(),
  text text,
  created_at timestamp default now()
);

-- Newsletter
create table if not exists newsletter (
  id uuid primary key default uuid_generate_v4(),
  email text unique,
  created_at timestamp default now()
);

-- Public Rituals
create table if not exists public_rituals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  ritual_id uuid references rituals,
  public_url text,
  created_at timestamp default now()
);

-- Referrals
create table if not exists referrals (
  id uuid primary key default uuid_generate_v4(),
  referrer_id uuid references users,
  referred_email text,
  token_bonus integer default 10,
  accepted boolean default false,
  created_at timestamp default now()
);

-- Usage Metrics
create table if not exists usage_metrics (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  feature text,
  timestamp timestamp default now()
);

-- Subscriptions
create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  plan text,
  stripe_customer_id text,
  stripe_subscription_id text,
  active boolean default true,
  created_at timestamp default now()
);

EOF

# ...add more for functions, triggers as in prior answers if needed...

# ----- API and AI stubs -----
cat > apps/web/pages/api/newsletter.ts <<EOF
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  // ConvertKit example:
  const response = await fetch("https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: process.env.CONVERTKIT_API_KEY,
      email: email
    })
  });

  if (response.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "Subscription failed" });
  }
}
EOF

cat > apps/web/pages/api/generate-ritual.ts <<EOF
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a mystical guide creating detailed spiritual rituals." },
      { role: "user", content: prompt }
    ],
    model: "gpt-4"
  });

  res.status(200).json({ ritual: completion.choices[0].message.content });
}
EOF

cat > apps/web/pages/api/archetype-description.ts <<EOF
import type { NextApiRequest, NextApiResponse } from "next";

const archetypeMap: Record<string, string> = {
  Seeker: "The Seeker is driven by curiosity and a yearning for truth. Their rituals seek clarity and purpose.",
  Mystic: "The Mystic dwells in the unseen realms, tapping into intuition and symbols. Their rituals are lunar, meditative, and trance-like.",
  Guardian: "The Guardian protects tradition and space. Rituals involve grounding, defense, and energetic shielding.",
  Oracle: "The Oracle reads patterns and omens. They often use cards, runes, and visions. Their rituals reveal fate.",
  Visionary: "The Visionary is creative and expansive. Their rituals spark innovation, ideas, and manifestation.",
  Alchemist: "The Alchemist transforms. Their rituals involve elements, intention, and shadow integration."
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.body;
  const description = archetypeMap[type] || "Unknown archetype.";
  res.status(200).json({ description });
}
EOF

# ---- SAMPLE COMPONENTS, PAGES, UI ----

# (You can copy-paste the UI/page code from my earlier answers, or ask for a specific page.)
# ...Paste as many as you need; for brevity, not every single component is included here in the script. Just ask if you want a specific one generated or expanded.

echo "✅ Zyana FULL project created!"
echo "Now add real image assets, edit API stubs, and you're ready for GitHub and Vercel/Expo!"
