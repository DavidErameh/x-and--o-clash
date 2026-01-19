'use client';

import { ConnectionState } from '@/types/realtime';

interface ConnectionStatusProps {
  state: ConnectionState;
}

export default function ConnectionStatus({ state }: ConnectionStatusProps) {
  const getStatusConfig = () => {
    switch (state) {
      case 'connected':
        return { color: 'bg-green-500', text: 'Connected', pulse: false };
      case 'disconnected':
        return { color: 'bg-red-500', text: 'Disconnected', pulse: false };
      case 'reconnecting':
        return { color: 'bg-yellow-500', text: 'Reconnecting...', pulse: true };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center gap-2 text-1">
      <span
        className={`w-2 h-2 rounded-full ${config.color} ${config.pulse ? 'animate-pulse' : ''}`}
      />
      <span className="text-gray-10">{config.text}</span>
    </div>
  );
}
