import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Instagram } from "lucide-react";
import TelegramIcon from "./icons/TelegramIcon";
import TikTokIcon from "./icons/TikTokIcon";
import XIcon from "./icons/XIcon";
import DexToolsIcon from "./icons/DexToolsIcon";

interface Tab {
  id: string;
  label: string;
  url?: string;
}

const tabs: Tab[] = [
  { id: "home", label: "Home" },
  { 
    id: "story", 
    label: "Brodie's Story",
    url: "https://www.thesun.co.uk/news/32365003/crooked-dog-brodie-celeb-fans-amanda-seyfried/"
  },
];

export const Navigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab: Tab) => {
    if (tab.url) {
      window.open(tab.url, '_blank');
    } else {
      setActiveTab(tab.id);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">$BRODIE</div>
        
        <div className="flex items-center gap-4">
          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://x.com/Brodie_CTO_" 
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
              href="https://www.tiktok.com/@bestboybrodie?is_from_webapp=1&sender_device=pc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <TikTokIcon />
            </a>
            <a 
              href="https://www.instagram.com/bestboybrodie/?igsh=MWRoZ2l0OW42em9nYg%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://www.dextools.io/app/en/solana/pair-explorer/5SiQqcq4am9jsYfasHJv1WQBc7bfoDmAkUcYGNnWaHBu?t=1735182372873" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <DexToolsIcon />
            </a>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={cn(
                  "px-3 py-1 rounded-full transition-all text-sm",
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-primary/10"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Buy Button */}
          <a 
            href="https://dexscreener.com/solana/5siqqcq4am9jsyfashjv1wqbc7bfoDmakucygnnwahbu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-secondary/90 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 transition-all hover:gap-2"
          >
            Buy
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </nav>
  );
};