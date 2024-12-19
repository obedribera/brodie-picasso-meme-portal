import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gradient-to-b from-accent to-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary animate-bounce-slow">
          🎨 Brodie
        </h1>
        <p className="text-2xl md:text-4xl mb-8 text-foreground">
          The World's First Artistic Dog Token
        </p>
        <p className="text-xl mb-12 text-gray-600 max-w-2xl mx-auto">
          Join the pack and become part of the most creative community in crypto!
        </p>
        <button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full text-xl font-bold flex items-center gap-2 mx-auto transition-all hover:gap-4">
          Buy $BRODIE
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};