import { ArrowRight, Instagram } from "lucide-react";
import TelegramIcon from "./icons/TelegramIcon";
import TikTokIcon from "./icons/TikTokIcon";
import XIcon from "./icons/XIcon";
import { TokenPrice } from "./TokenPrice";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gradient-to-b from-accent to-background">
      <div className="container mx-auto px-4 text-center">
        <Link 
          to="/contest"
          className="block mb-8 group"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-1 transition-all duration-300 hover:scale-105">
            <div className="bg-background/90 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Brodie's Redemption: The NFT Collection
              </h2>
              <p className="text-lg md:text-xl text-foreground/80">
                Join the Art Contest • Win $BRODIE Tokens • Become Part of History
              </p>
              <span className="inline-block mt-4 text-primary font-semibold group-hover:underline">
                Learn More →
              </span>
            </div>
          </div>
        </Link>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="md:w-1/2 text-left">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary animate-pulse">
              🎨 Brodie
            </h1>
            <p className="text-2xl md:text-4xl mb-4 text-foreground animate-fade-in">
              The Picasso Dog Token
            </p>
            <p className="text-sm md:text-base mb-2 text-muted-foreground">
              Contract Address:
            </p>
            <p className="text-sm md:text-base mb-8 text-muted-foreground font-mono break-all">
              22UaSSL6c6TYLexhaxWisq2mDaRTzNDX1X222anPpump
            </p>
            <div className="flex items-center gap-6 mb-8 animate-fade-in">
              <a 
                href="https://x.com/Brodie_CTO_" 
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
                href="https://www.tiktok.com/@bestboybrodie?is_from_webapp=1&sender_device=pc" 
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
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://dexscreener.com/solana/5siqqcq4am9jsyfashjv1wqbc7bfodmakucygnnwahbu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary hover:bg-secondary/90 text-background px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:gap-4 hover:scale-105 transform duration-200 animate-bounce"
              >
                Buy $BRODIE
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="https://www.dextools.io/app/en/solana/pair-explorer/5SiQqcq4am9jsYfasHJv1WQBc7bfoDmAkUcYGNnWaHBu?t=1735182372873"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:gap-4 hover:scale-105 transform duration-200"
              >
                DexTools Chart
                <ArrowRight className="w-4 h-4" />
              </a>
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