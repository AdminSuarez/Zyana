# Zyana ✨ — Ritual, Dream, Art & Oracle Platform

A full-stack spiritual OS: AI-guided rituals, dream mapping, moon sync, tarot, community, shop, and audio companions.  
Includes AllWays ArtWorks — a unique artisan wire/crystal/digital shop.

---

## Features

- 🧿 AI Rituals (daily, moon, archetype)
- 🔊 Voice Oracle Companion (GPT + audio)
- 📓 Dream Journal (with AI memory, search)
- 🃏 Tarot Spread Builder
- 🌙 Moon Phase Sync (notifies, adapts content)
- 🛒 AllWays ArtWorks Marketplace (wire art, crystals, prints)
- 🧬 Growth Analytics & Energy Tokens
- 🧠 Premium Membership (Stripe: Free, Ritual, Oracle, Eternal)
- 🏛 Community/Collective Rituals
- 📤 Public Ritual Sharing & Referral
- 📈 Admin dashboard, order mgmt, metrics

## Folders

- `/apps/web/app/allways-artworks/` — Shop pages, admin, cart, product modals, custom order form
- `/packages/lib/shop.ts` — All shop/product/order utilities
- `/supabase/migrations/init.sql` — All DB tables (users, rituals, products, orders, shop, tokens, etc.)
- `/docs/zyana-competitive-analysis.md` — Features vs Nebula, Pattern, etc.

## Setup

1. **Clone:**  
   `git clone https://github.com/YOUR_USERNAME/zyana.git`

2. **Install:**  
   `pnpm install` (or `npm install`)

3. **Configure Supabase:**  
   Create project, run `init.sql`, fill in `.env` (see `.env.template`)

4. **Stripe:**  
   Fill in Stripe keys in `.env` and `/supabase/functions/stripe_checkout/index.ts`

5. **Run Dev:**  
   `pnpm dev` (web), `npx expo start` (mobile)

6. **Deploy:**  
   - Web: Vercel (use `.vercel.json`, see `deploy-instructions.md`)
   - Mobile: EAS/Expo (see `eas.json`)

7. **Shop:**  
   - Add your art via `/allways-artworks/admin`
   - Upload images to `/public/assets/art/`
   - Stripe checkout/confirm setup in admin
   - Orders & downloads tracked in dashboard

---

### **For More**

- Press Kit: `/public/assets/press-kit.pdf`
- App Store Meta: `/public/metadata/app-store-template.txt`
- Demo scripts: `/docs/demo.md`
- Screenshot Guide: `/docs/app-store-screenshots.md`
- AllWays ArtWorks config: `/apps/web/app/allways-artworks/`
- Questions: `press@zyana.app`

**You are ready for GitHub, Vercel, Stripe, and the App Store.**

---

# AllWays ArtWorks
Showcase and sell your unique creations, take custom orders, and connect your spiritual brand to every seeker!

