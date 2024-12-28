import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Heart, Share2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Artwork {
  id: string;
  title: string;
  artist_name: string;
  description: string;
  image_url: string;
  votes: number;
  wallet_address: string;
}

interface ArtGalleryProps {
  selectedArtId?: string | null;
}

export const ArtGallery = ({ selectedArtId }: ArtGalleryProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [votedArtworks, setVotedArtworks] = useState<string[]>(() => {
    const saved = localStorage.getItem('votedArtworks');
    return saved ? JSON.parse(saved) : [];
  });

  const { data: artworks, isLoading, error } = useQuery({
    queryKey: ['artworks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('votes', { ascending: false });
      
      if (error) throw error;
      return data as Artwork[];
    },
  });

  const voteMutation = useMutation({
    mutationFn: async (artworkId: string) => {
      const { error } = await supabase
        .from('artworks')
        .update({ votes: artworks?.find(a => a.id === artworkId)?.votes + 1 })
        .eq('id', artworkId);
      
      if (error) throw error;
    },
    onSuccess: (_, artworkId) => {
      setVotedArtworks(prev => {
        const updated = [...prev, artworkId];
        localStorage.setItem('votedArtworks', JSON.stringify(updated));
        return updated;
      });
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
      toast({
        title: "Vote Recorded",
        description: "Thank you for voting!",
      });
    },
    onError: () => {
      toast({
        title: "Vote Failed",
        description: "There was an error recording your vote. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleVote = (artworkId: string) => {
    if (votedArtworks.includes(artworkId)) {
      toast({
        title: "Already Voted",
        description: "You have already voted for this artwork",
      });
      return;
    }

    voteMutation.mutate(artworkId);
  };

  const handleShare = (artworkId: string) => {
    const shareUrl = `${window.location.origin}/contest?art=${artworkId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied",
      description: "Share this link with others to get more votes!",
    });
  };

  if (isLoading) {
    return <div className="text-center">Loading artworks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading artworks</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {artworks?.map((artwork) => (
        <Card 
          key={artwork.id}
          className={`overflow-hidden transition-all duration-300 ${
            selectedArtId === artwork.id ? "ring-2 ring-primary" : ""
          }`}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{artwork.title || "Untitled"}</span>
              <span className="text-sm text-muted-foreground">by {artwork.artist_name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <img
              src={artwork.image_url}
              alt={artwork.title || "Artwork"}
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
              <span>{artwork.votes} votes</span>
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