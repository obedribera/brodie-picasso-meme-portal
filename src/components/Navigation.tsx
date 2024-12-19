import { useState } from "react";
import { cn } from "@/lib/utils";

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
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "px-4 py-2 rounded-full transition-all",
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-primary/10"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};