import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { RoadmapSection } from "@/components/RoadmapSection";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <RoadmapSection />
    </div>
  );
};

export default Index;