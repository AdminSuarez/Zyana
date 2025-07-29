# zyana-app-features.md

zyana/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   │   ├── archetype/
│   │   │   │   └── page.tsx
│   │   │   ├── avatar/
│   │   │   │   └── page.tsx
│   │   │   ├── deck/
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   ├── dreams/
│   │   │   │   └── page.tsx
│   │   │   ├── rituals/
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── premium/
│   │   │   │   └── page.tsx
│   │   │   ├── share/
│   │   │   │   └── page.tsx
│   │   │   ├── token/
│   │   │   │   └── page.tsx
│   │   │   ├── community/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── launch/
│   │   │   │   └── page.tsx
│   │   │   ├── marketing/
│   │   │   │   └── page.tsx
│   │   │   ├── ai-rituals/
│   │   │   │   └── page.tsx
│   │   │   ├── tarot/
│   │   │   │   └── builder.tsx
│   │   │   └── page.tsx
│   │   ├── lib/
│   │   │   ├── supabaseClient.ts
│   │   │   └── useUser.ts
│   │   ├── pages/
│   │   │   └── api/
│   │   │       ├── archetype-description.ts
│   │   │       ├── generate-ritual.ts
│   │   │       └── newsletter.ts
│   │   └── public/
│   │       ├── assets/
│   │       │   ├── app-icon.png
│   │       │   ├── splash.png
│   │       │   └── press-kit.pdf
│   │       └── landing.html
├── packages/
│   ├── ai/
│   │   ├── companionMemory.ts
│   │   ├── customCompanion.ts
│   │   ├── moonPhase.ts
│   │   ├── oracle.ts
│   │   └── voiceSynth.ts
│   ├── lib/
│   │   └── supabaseClient.ts
│   └── ui/
│       └── [UI components - if any]
├── supabase/
│   ├── migrations/
│   │   └── init.sql
│   └── functions/
│       ├── cronMoonPush/
│       │   └── index.ts
│       ├── ritual_email_trigger/
│       │   └── index.ts
│       └── stripe_checkout/
│           └── index.ts
├── scripts/
│   └── autoPushMoon.js
├── .vercel.json
├── deploy-instructions.md
├── github-url.md
├── press-kit-contents.md
├── screenshot-guide.md
├── zyana-app-features.md
├── README.md
