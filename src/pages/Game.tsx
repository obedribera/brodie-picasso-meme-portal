import { useState } from "react";
import { Navigation } from "@/components/Navigation";

export const Game = () => {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-4xl font-bold text-primary mb-8">Spot the Difference</h1>
        <div className="text-center">
          <p className="text-xl mb-4">Game coming soon!</p>
          <p className="text-muted-foreground">Upload your images to start playing</p>
          <p className="text-primary mt-4">Score: {score}</p>
        </div>
      </div>
    </div>
  );
};

export default Game;