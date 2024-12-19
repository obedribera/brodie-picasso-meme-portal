export const RoadmapSection = () => {
  const milestones = [
    {
      phase: "Phase 1",
      title: "Launch & Community Building",
      items: ["Token Launch", "Community Growth", "First NFT Collection"],
    },
    {
      phase: "Phase 2",
      title: "Platform Development",
      items: ["NFT Marketplace", "Staking Platform", "Partnership Announcements"],
    },
    {
      phase: "Phase 3",
      title: "Ecosystem Expansion",
      items: ["DAO Launch", "Cross-chain Integration", "Major Exchange Listings"],
    },
  ];

  return (
    <div className="py-20 bg-accent/30" id="roadmap">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">
          Roadmap
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white shadow-lg hover:transform hover:scale-105 transition-all"
            >
              <div className="text-secondary font-bold mb-2">
                {milestone.phase}
              </div>
              <h3 className="text-xl font-bold mb-4">{milestone.title}</h3>
              <ul className="space-y-2">
                {milestone.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};