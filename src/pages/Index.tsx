import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { useEffect, useRef } from "react";

const Index = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    console.log("Video section mounted");
  }, []);

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <RoadmapSection />
      <div className="w-full max-w-4xl mx-auto p-4 mb-20">
        <iframe
          ref={videoRef}
          className="w-full aspect-video rounded-2xl shadow-xl"
          src="https://www.youtube.com/embed/e8nABOXvQN8"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Index;