import { Hero, PortalEntry, MoonDraw } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero title="You’ve arrived." subtitle="This is not an app. This is a return." />
      <PortalEntry />
      <MoonDraw />
    </div>
  );
}
