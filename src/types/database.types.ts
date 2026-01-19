export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          whop_user_id: string
          username: string
          created_at: string
        }
        Insert: {
          id?: string
          whop_user_id: string
          username: string
          created_at?: string
        }
        Update: {
          id?: string
          whop_user_id?: string
          username?: string
          created_at?: string
        }
      }
      games: {
        Row: {
          id: string
          player1_id: string
          player2_id: string | null
          winner_id: string | null
          status: 'waiting' | 'active' | 'completed'
          current_turn: string | null
          board_state: Json
          created_at: string
        }
        Insert: {
          id?: string
          player1_id: string
          player2_id?: string | null
          winner_id?: string | null
          status?: 'waiting' | 'active' | 'completed'
          current_turn?: string | null
          board_state?: Json
          created_at?: string
        }
        Update: {
          id?: string
          player1_id?: string
          player2_id?: string | null
          winner_id?: string | null
          status?: 'waiting' | 'active' | 'completed'
          current_turn?: string | null
          board_state?: Json
          created_at?: string
        }
      }
      player_stats: {
        Row: {
          id: string
          user_id: string
          wins: number
          losses: number
          draws: number
          elo: number
        }
        Insert: {
          id?: string
          user_id: string
          wins?: number
          losses?: number
          draws?: number
          elo?: number
        }
        Update: {
          id?: string
          user_id?: string
          wins?: number
          losses?: number
          draws?: number
          elo?: number
        }
      }
    }
  }
}
