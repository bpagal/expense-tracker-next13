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
          date: string | null;
          name: string | null;
        };
        Insert: {
          id?: string;
          date?: string | null;
          name?: string | null;
        };
        Update: {
          id?: string;
          date?: string | null;
          name?: string | null;
        };
      };
      expenses: {
        Row: {
          id: string;
          date: string | null;
          amount: number | null;
          category: string | null;
          details: string | null;
        };
        Insert: {
          id?: string;
          date?: string | null;
          amount: number;
          category: string;
          details: string;
        };
        Update: {
          id?: string;
          date: string;
          amount: number;
          category: string;
          details: string;
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
