import { supabase } from './supabase';
import { Database } from '@/types/database.types';

type User = Database['public']['Tables']['users']['Row'];
type Game = Database['public']['Tables']['games']['Row'];

export async function createUser(whopUserId: string, username: string) {
  const { data, error } = await (supabase
    .from('users') as any)
    .insert({ whop_user_id: whopUserId, username })
    .select()
    .single();
  
  if (error) throw error;
  
  // Initialize stats
  if (data) {
    await (supabase.from('player_stats') as any).insert({ user_id: data.id });
  }
  
  return data;
}

export async function getUserByWhopId(whopUserId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('whop_user_id', whopUserId)
    .single();
    
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
  return data;
}

export async function createGame(player1Id: string) {
  const { data, error } = await (supabase
    .from('games') as any)
    .insert({
      player1_id: player1Id,
      status: 'waiting',
      board_state: { cells: Array(9).fill(null) }
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

export async function joinGame(gameId: string, player2Id: string) {
  const { data, error } = await (supabase
    .from('games') as any)
    .update({ 
      player2_id: player2Id, 
      status: 'active',
      current_turn: player2Id
    })
    .eq('id', gameId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

export async function getOpenGames() {
  const { data, error } = await supabase
    .from('games')
    .select('*, player1:users!player1_id(username)')
    .eq('status', 'waiting')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}
