export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ideas: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string | null
          idea: string
          platform: 'web' | 'mobile' | 'both'
          target_audience: string | null
          features: string | null
          blueprint: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          idea: string
          platform: 'web' | 'mobile' | 'both'
          target_audience?: string | null
          features?: string | null
          blueprint?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          idea?: string
          platform?: 'web' | 'mobile' | 'both'
          target_audience?: string | null
          features?: string | null
          blueprint?: string | null
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
        }
      }
    }
  }
}
