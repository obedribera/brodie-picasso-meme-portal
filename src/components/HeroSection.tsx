import { ArrowRight, Instagram } from "lucide-react";
import TelegramIcon from "./icons/TelegramIcon";
import TikTokIcon from "./icons/TikTokIcon";
import XIcon from "./icons/XIcon";

export const HeroSection = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gradient-to-b from-accent to-white">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="md:w-1/2 text-left">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary animate-bounce-slow">
              🎨 Brodie
            </h1>
            <p className="text-2xl md:text-4xl mb-8 text-foreground">
              The Picasso Dog Token
            </p>
            <p className="text-xl mb-8 text-gray-600">
              A spunky partially blind rescue pup who looks a bit like a Picasso masterpiece
            </p>
            <div className="flex items-center gap-6 mb-8">
              <a 
                href="https://x.com/brodie52218" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <XIcon />
              </a>
              <a 
                href="https://t.me/BrodieOfficialCTO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <TelegramIcon />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <TikTokIcon />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Instagram className="w-8 h-8" />
              </a>
            </div>
            <a 
              href="https://dexscreener.com/solana/5siqqcq4am9jsyfashjv1wqbc7bfodmakucygnnwahbu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full text-xl font-bold flex items-center gap-2 transition-all hover:gap-4"
            >
              Buy $BRODIE
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
          <div className="md:w-1/2 flex flex-col gap-4">
            <img 
              src="/lovable-uploads/ae287fa0-06e4-4b0b-925d-10a48fd6c375.png"
              alt="Brodie the Picasso Dog"
              className="rounded-3xl shadow-2xl max-w-[500px] w-full hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden">
              <iframe
                src="https://www.youtube.com/embed/e8nABOXvQN8?autoplay=1&loop=1&playlist=e8nABOXvQN8"
                title="Brodie Token Audio"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};