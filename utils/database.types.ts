export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          created_at: string | null;
          name: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          name?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          name?: string | null;
        };
      };
      expenses: {
        Row: {
          id: string;
          created_at: string | null;
          amount: number | null;
          category: string | null;
          details: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          amount?: number | null;
          category?: string | null;
          details?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          amount?: number | null;
          category?: string | null;
          details?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
