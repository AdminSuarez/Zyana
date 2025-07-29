const fs = require("fs");
const path = require("path");

// List of all folders/files from your zyana-app-features.md
const structure = [
  // ... your structure array as before ...
  "apps/web/app/archetype/page.tsx",
  "apps/web/app/avatar/page.tsx",
  "apps/web/app/deck/new/page.tsx",
  "apps/web/app/dreams/page.tsx",
  "apps/web/app/rituals/new/page.tsx",
  "apps/web/app/rituals/page.tsx",
  "apps/web/app/premium/page.tsx",
  "apps/web/app/share/page.tsx",
  "apps/web/app/token/page.tsx",
  "apps/web/app/community/page.tsx",
  "apps/web/app/dashboard/page.tsx",
  "apps/web/app/launch/page.tsx",
  "apps/web/app/marketing/page.tsx",
  "apps/web/app/ai-rituals/page.tsx",
  "apps/web/app/tarot/builder.tsx",
  "apps/web/app/page.tsx",
  "apps/web/lib/supabaseClient.ts",
  "apps/web/lib/useUser.ts",
  "apps/web/pages/api/archetype-description.ts",
  "apps/web/pages/api/generate-ritual.ts",
  "apps/web/pages/api/newsletter.ts",
  "apps/web/public/assets/app-icon.png",
  "apps/web/public/assets/splash.png",
  "apps/web/public/assets/press-kit.pdf",
  "apps/web/public/landing.html",
  "packages/ai/companionMemory.ts",
  "packages/ai/customCompanion.ts",
  "packages/ai/moonPhase.ts",
  "packages/ai/oracle.ts",
  "packages/ai/voiceSynth.ts",
  "packages/lib/supabaseClient.ts",
  "packages/ui/",
  "supabase/migrations/init.sql",
  "supabase/functions/cronMoonPush/index.ts",
  "supabase/functions/ritual_email_trigger/index.ts",
  "supabase/functions/stripe_checkout/index.ts",
  "scripts/autoPushMoon.js",
  ".vercel.json",
  "deploy-instructions.md",
  "github-url.md",
  "press-kit-contents.md",
  "screenshot-guide.md",
  "zyana-app-features.md",
  "README.md",
];

// Helper to ensure a directory exists, deleting a blocking file if needed
function ensureDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    if (!fs.lstatSync(dirPath).isDirectory()) {
      fs.unlinkSync(dirPath); // Remove the file blocking the folder
      fs.mkdirSync(dirPath, { recursive: true });
      console.log("Removed file and created folder:", dirPath);
    }
  } else {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("Created folder:", dirPath);
  }
}

// Create folders and files
structure.forEach((item) => {
  const fullPath = path.join(__dirname, "..", "..", item);
  const dir = item.endsWith("/") ? fullPath : path.dirname(fullPath);

  ensureDir(dir);

  if (!item.endsWith("/")) {
    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
      // If a directory exists where a file should be, remove it
      fs.rmdirSync(fullPath, { recursive: true });
      console.log("Removed directory to create file:", fullPath);
    }
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, "");
      console.log("Created file:", fullPath);
    }
  }
});

console.log("Script finished! Check your folders and files.");