import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative z-10 text-white">
      <ParticlesBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <RoadmapSection />
    </div>
  );
};

export default Index;