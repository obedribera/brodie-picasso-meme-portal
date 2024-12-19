import { ArrowRight, Instagram, GamepadIcon } from "lucide-react";
import TelegramIcon from "./icons/TelegramIcon";
import TikTokIcon from "./icons/TikTokIcon";
import XIcon from "./icons/XIcon";
import { TokenPrice } from "./TokenPrice";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gradient-to-b from-accent to-background">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="md:w-1/2 text-left">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary animate-pulse">
              🎨 Brodie
            </h1>
            <p className="text-2xl md:text-4xl mb-8 text-foreground animate-fade-in">
              The Picasso Dog Token
            </p>
            <p className="text-xl mb-8 text-muted-foreground animate-slide-in-right">
              A spunky partially blind rescue pup who looks a bit like a Picasso masterpiece
            </p>
            <div className="flex items-center gap-6 mb-8 animate-fade-in">
              <a 
                href="https://x.com/brodie52218" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors hover:scale-110 transform duration-200"
              >
                <XIcon />
              </a>
              <a 
                href="https://t.me/BrodieOfficialCTO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors hover:scale-110 transform duration-200"
              >
                <TelegramIcon />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors hover:scale-110 transform duration-200"
              >
                <TikTokIcon />
              </a>
              <a 
                href="https://www.instagram.com/bestboybrodie/?igsh=MWRoZ2l0OW42em9nYg%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors hover:scale-110 transform duration-200"
              >
                <Instagram className="w-8 h-8" />
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <a 
                href="https://dexscreener.com/solana/5siqqcq4am9jsyfashjv1wqbc7bfodmakucygnnwahbu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary hover:bg-secondary/90 text-background px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:gap-4 hover:scale-105 transform duration-200 animate-bounce"
              >
                Buy $BRODIE
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link 
                to="/game"
                className="inline-block bg-accent hover:bg-accent/90 text-background px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:gap-4 hover:scale-105 transform duration-200"
              >
                Game
                <GamepadIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col gap-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/lovable-uploads/ae287fa0-06e4-4b0b-925d-10a48fd6c375.png"
                alt="Brodie the Picasso Dog"
                className="rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-300 animate-float"
              />
              <img 
                src="/lovable-uploads/ec5afcd9-1271-49ca-a58f-a60c21a88b6a.png"
                alt="Picasso Artwork"
                className="rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-300 animate-float-delayed"
              />
            </div>
            <TokenPrice />
          </div>
        </div>
      </div>
    </div>
  );
};