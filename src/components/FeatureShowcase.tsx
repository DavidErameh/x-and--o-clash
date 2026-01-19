import { Cpu, Users, BarChart2 } from "@geist-ui/icons";

const features = [
  {
    icon: <Cpu size={32} />,
    title: "AI Opponent",
    description: "Challenge our smart minimax AI that adapts to your skill level.",
  },
  {
    icon: <Users size={32} />,
    title: "PvP Matchmaking",
    description: "Compete against other community members in real-time matches.",
  },
  {
    icon: <BarChart2 size={32} />,
    title: "Track Your Stats",
    description: "Monitor your wins, losses, and ELO rating on the leaderboard.",
  },
];

export default function FeatureShowcase() {
  return (
    <div className="py-12 px-4">
      <h2 className="text-6 font-bold text-gray-12 text-center mb-8">
        Game Features
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gray-a2 border border-gray-a4 rounded-xl p-6 flex flex-col items-center text-center gap-4"
          >
            <div className="text-blue-10">{feature.icon}</div>
            <h3 className="text-4 font-semibold text-gray-12">{feature.title}</h3>
            <p className="text-2 text-gray-10">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
