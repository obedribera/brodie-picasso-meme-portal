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
      <div className="w-full max-w-4xl mx-auto mb-20">
        <video 
          className="w-full rounded-2xl shadow-xl"
          autoPlay 
          loop 
          playsInline
          controls={false}
          muted={false}
        >
          <source src="https://stream-conversion.gpteng.co/?url=https://youtu.be/e8nABOXvQN8" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Index;