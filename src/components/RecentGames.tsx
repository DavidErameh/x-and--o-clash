'use client';

import { GameHistoryItem } from '@/types/dashboard';

interface RecentGamesProps {
  games: GameHistoryItem[];
}

export default function RecentGames({ games }: RecentGamesProps) {
  if (games.length === 0) {
    return (
      <div className="bg-gray-a2 border border-gray-a4 rounded-xl p-6 text-center">
        <p className="text-2 text-gray-10">No games played yet. Start playing!</p>
      </div>
    );
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win': return 'text-green-10';
      case 'loss': return 'text-red-10';
      default: return 'text-yellow-10';
    }
  };

  const getResultText = (result: string) => {
    switch (result) {
      case 'win': return 'Won';
      case 'loss': return 'Lost';
      default: return 'Draw';
    }
  };

  return (
    <div className="bg-gray-a2 border border-gray-a4 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-a4">
        <h3 className="text-4 font-semibold text-gray-12">Recent Games</h3>
      </div>
      <div className="divide-y divide-gray-a4">
        {games.map((game) => (
          <div key={game.id} className="p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="text-2 text-gray-12">
                vs {game.opponent}
              </span>
              <span className="text-1 text-gray-9">
                {game.mode === 'ai' ? '🤖 AI' : '👥 PvP'} • {new Date(game.playedAt).toLocaleDateString()}
              </span>
            </div>
            <span className={`text-3 font-semibold ${getResultColor(game.result)}`}>
              {getResultText(game.result)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
