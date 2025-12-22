import ParticleSystem from "./components/ParticleSystem";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center relative bg-black text-white selection:bg-white/20">
      <Navbar />
      <div className="w-full z-10 relative">
        <Hero />
        {/* Placeholder for other sections to match "All content" request later if we can get it, 
            but for now Hero is the main visible part. 
            I will keep the page structure simple as per Antigravity landing. */}
      </div>
      <ParticleSystem />
    </main>
  );
}
