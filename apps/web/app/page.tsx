import { Hero } from "./components/ui/Hero";
import { PortalEntry } from "./components/ui/PortalEntry";
import { MoonDraw } from "./components/ui/MoonDraw";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero title="You’ve arrived." subtitle="This is not an app. This is a return." />
      <PortalEntry />
      <MoonDraw />
    </div>
  );
}