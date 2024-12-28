import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { ArtSubmissionForm } from "@/components/ArtSubmissionForm";
import { ArtGallery } from "@/components/ArtGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Contest = () => {
  const [searchParams] = useSearchParams();
  const artId = searchParams.get('art');

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 to-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-primary text-center mb-8">
            Brodie's Redemption: The NFT Collection
          </h1>
          
          <div className="bg-card backdrop-blur-sm rounded-2xl p-8 space-y-6 shadow-xl">
            <Tabs defaultValue={artId ? "gallery" : "about"} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="submit">Submit Art</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <div className="space-y-8 text-left">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-primary animate-pulse">
                      🚨 Community Art Contest: Brodie-Inspired NFTs! 🎨🐾
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Calling all artists and creators! 🎉 Here's your chance to showcase your talent and be part of Brodie's story. 
                      We're launching a Community Art Contest where you can design Brodie-inspired art, and the best pieces will be turned into exclusive NFT drops!
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-foreground">How It Works:</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="bg-accent/5 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-3">1. Create Your Artwork</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Let Brodie's unique charm inspire you—his quirky crooked face, playful personality, or heartwarming story</li>
                          <li>Use any style you like: digital, hand-drawn, abstract, or even meme-inspired!</li>
                        </ul>
                      </div>
                      <div className="bg-accent/5 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-3">2. Submit Your Art</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Upload your creation using our submission form</li>
                          <li>Include your name, wallet address, and a short description of your work</li>
                        </ul>
                      </div>
                      <div className="bg-accent/5 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-3">3. Community Votes</h4>
                        <p className="text-muted-foreground">
                          The top submissions will be selected by the community and project team
                        </p>
                      </div>
                      <div className="bg-accent/5 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-3">4. Exclusive NFT Drop</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Winning designs will be minted as official Brodie NFTs and featured in our marketplace</li>
                          <li>Artists will receive recognition and a share of the proceeds!</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">Prizes</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">🏆</span>
                        <div>
                          <p className="font-semibold">Grand Prize</p>
                          <p className="text-muted-foreground">Your art featured as a Brodie NFT + 1,000,000 $Brodie</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">🥈</span>
                        <div>
                          <p className="font-semibold">2nd Prize</p>
                          <p className="text-muted-foreground">Your art featured as a Brodie NFT + 500,000 $Brodie</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">🥉</span>
                        <div>
                          <p className="font-semibold">3rd Prize</p>
                          <p className="text-muted-foreground">Your art featured as a Brodie NFT + 250,000 $Brodie</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/5 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold mb-2">🎉 All entries will be featured as an NFT with Revenue share for artist!</p>
                    <p className="text-muted-foreground">Submissions close on January 16, 2025</p>
                    <p className="text-primary font-medium mt-4">Let's celebrate Brodie's story and creativity together!</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="submit">
                <ArtSubmissionForm />
              </TabsContent>

              <TabsContent value="gallery">
                <ArtGallery selectedArtId={artId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contest;