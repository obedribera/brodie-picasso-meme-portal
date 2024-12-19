import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface PuzzlePiece {
  id: number;
  currentPosition: number;
  correctPosition: number;
  imageUrl: string;
}

const Game = () => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const images = [
    "/lovable-uploads/ae287fa0-06e4-4b0b-925d-10a48fd6c375.png",
    "/lovable-uploads/ec5afcd9-1271-49ca-a58f-a60c21a88b6a.png"
  ];

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const totalPieces = 9; // 3x3 grid
    const newPieces: PuzzlePiece[] = [];
    
    for (let i = 0; i < totalPieces; i++) {
      newPieces.push({
        id: i,
        currentPosition: i,
        correctPosition: i,
        imageUrl: images[Math.random() > 0.5 ? 0 : 1] // Randomly select one of the two images
      });
    }

    // Shuffle pieces
    const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
    setPieces(shuffledPieces);
  };

  const handlePieceClick = (clickedPosition: number) => {
    const newPieces = [...pieces];
    const clickedPiece = newPieces[clickedPosition];
    
    // Find adjacent positions
    const adjacentPositions = [
      clickedPosition - 3, // up
      clickedPosition + 3, // down
      clickedPosition % 3 !== 0 ? clickedPosition - 1 : -1, // left
      clickedPosition % 3 !== 2 ? clickedPosition + 1 : -1, // right
    ].filter(pos => pos >= 0 && pos < pieces.length);

    // Check if any adjacent piece can be swapped
    for (const adjPos of adjacentPositions) {
      const temp = newPieces[adjPos];
      newPieces[adjPos] = clickedPiece;
      newPieces[clickedPosition] = temp;
      setPieces(newPieces);
      
      // Check if puzzle is complete
      const isComplete = newPieces.every(piece => piece.currentPosition === piece.correctPosition);
      if (isComplete) {
        setIsComplete(true);
        toast({
          title: "Congratulations! 🎉",
          description: "You've completed the puzzle!",
        });
      }
      break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8 text-center">Brodie Puzzle Game</h1>
          
          <div className="grid grid-cols-3 gap-1 bg-black p-1 rounded-lg mb-6">
            {pieces.map((piece, index) => (
              <div
                key={piece.id}
                onClick={() => handlePieceClick(index)}
                className="aspect-square relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src={piece.imageUrl}
                  alt={`Puzzle piece ${piece.id}`}
                  className="absolute w-[300%] h-[300%]"
                  style={{
                    top: `-${Math.floor(piece.correctPosition / 3) * 100}%`,
                    left: `-${(piece.correctPosition % 3) * 100}%`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={initializePuzzle}
              variant="secondary"
              className="px-8"
            >
              Reset Puzzle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;