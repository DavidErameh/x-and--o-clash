export type ConnectionState = 'connected' | 'disconnected' | 'reconnecting';

export interface RealtimePayload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: Record<string, any>;
  old: Record<string, any>;
}

export interface GameUpdatePayload {
  board_state: { cells: (string | null)[] };
  current_turn: string;
  status: string;
  winner_id: string | null;
}
