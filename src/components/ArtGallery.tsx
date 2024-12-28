import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Heart, Share2 } from "lucide-react";

// Mock data - replace with actual data from your backend
const mockArtworks = [
  {
    id: "1",
    title: "Brodie's Dream",
    artistName: "CryptoArtist",
    description: "A vibrant interpretation of Brodie's journey",
    imageUrl: "/lovable-uploads/ae287fa0-06e4-4b0b-925d-10a48fd6c375.png",
    votes: 156,
  },
  {
    id: "2",
    title: "Digital Picasso",
    artistName: "NFTCreator",
    description: "Inspired by Picasso's style",
    imageUrl: "/lovable-uploads/ec5afcd9-1271-49ca-a58f-a60c21a88b6a.png",
    votes: 89,
  },
];

interface ArtGalleryProps {
  selectedArtId?: string | null;
}

export const ArtGallery = ({ selectedArtId }: ArtGalleryProps) => {
  const { toast } = useToast();
  const [votedArtworks, setVotedArtworks] = useState<string[]>([]);

  const handleVote = (artworkId: string) => {
    if (votedArtworks.includes(artworkId)) {
      toast({
        title: "Already Voted",
        description: "You have already voted for this artwork",
      });
      return;
    }

    setVotedArtworks([...votedArtworks, artworkId]);
    toast({
      title: "Vote Recorded",
      description: "Thank you for voting!",
    });
  };

  const handleShare = (artworkId: string) => {
    const shareUrl = `${window.location.origin}/contest?art=${artworkId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied",
      description: "Share this link with others to get more votes!",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockArtworks.map((artwork) => (
        <Card 
          key={artwork.id}
          className={`overflow-hidden transition-all duration-300 ${
            selectedArtId === artwork.id ? "ring-2 ring-primary" : ""
          }`}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{artwork.title}</span>
              <span className="text-sm text-muted-foreground">by {artwork.artistName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-64 object-cover"
            />
            <p className="p-6 text-muted-foreground">{artwork.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button
              variant={votedArtworks.includes(artwork.id) ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleVote(artwork.id)}
              className="flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span>{artwork.votes + (votedArtworks.includes(artwork.id) ? 1 : 0)} votes</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare(artwork.id)}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};