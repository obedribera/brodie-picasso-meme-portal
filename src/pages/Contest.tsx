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
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground">About the Contest</h2>
                  <p className="text-lg text-muted-foreground">
                    Join us in creating a unique NFT collection that celebrates Brodie's journey and his impact on the crypto community. We're looking for original artwork that captures Brodie's spirit and story.
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Prizes:</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>1st Place: 1,000,000 $BRODIE + Featured Artist Status</li>
                      <li>2nd Place: 500,000 $BRODIE</li>
                      <li>3rd Place: 250,000 $BRODIE</li>
                    </ul>
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