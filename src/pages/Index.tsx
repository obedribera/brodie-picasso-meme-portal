import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { useEffect, useRef } from "react";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      console.log("Video element loaded");
      videoRef.current.play().catch(error => {
        console.log("Video playback error:", error);
      });
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <RoadmapSection />
      <div className="w-full max-w-4xl mx-auto p-4 mb-20">
        <video 
          ref={videoRef}
          className="w-full rounded-2xl shadow-xl"
          autoPlay 
          loop 
          playsInline
          muted
          controls
        >
          <source src="https://stream-conversion.gpteng.co/?url=https://youtu.be/e8nABOXvQN8?si=RiXUHy6q9z2v3dau" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Index;