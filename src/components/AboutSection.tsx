import { Palette, Coins, Users } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: <Palette className="w-12 h-12 text-secondary" />,
      title: "Artistic Vision",
      description: "Every transaction is a masterpiece in the making",
    },
    {
      icon: <Coins className="w-12 h-12 text-secondary" />,
      title: "Community Driven",
      description: "Governed by artists, collectors, and dog lovers alike",
    },
    {
      icon: <Users className="w-12 h-12 text-secondary" />,
      title: "Growing Pack",
      description: "Join thousands of holders worldwide",
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-[#E5DEFF] to-[#FDE1D3]" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">
          About Brodie
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm text-center hover:transform hover:scale-105 transition-all shadow-lg"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};