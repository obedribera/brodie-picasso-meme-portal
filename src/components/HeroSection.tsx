import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gradient-to-b from-accent to-white">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="md:w-1/2 text-left">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary animate-bounce-slow">
              🎨 Brodie
            </h1>
            <p className="text-2xl md:text-4xl mb-8 text-foreground">
              The Picasso Dog Token
            </p>
            <p className="text-xl mb-12 text-gray-600">
              A spunky partially blind rescue pup who looks a bit like a Picasso masterpiece
            </p>
            <button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full text-xl font-bold flex items-center gap-2 transition-all hover:gap-4">
              Buy $BRODIE
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          <div className="md:w-1/2 flex flex-col gap-4">
            <img 
              src="/lovable-uploads/ae287fa0-06e4-4b0b-925d-10a48fd6c375.png"
              alt="Brodie the Picasso Dog"
              className="rounded-3xl shadow-2xl max-w-[500px] w-full hover:scale-105 transition-transform duration-300"
            />
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-3xl shadow-2xl"
                src="https://www.youtube.com/embed/e8nABOXvQN8?autoplay=1&loop=1&playlist=e8nABOXvQN8"
                title="Brodie Token Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};