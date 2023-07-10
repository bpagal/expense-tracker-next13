export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type ExpensesRow = {
  id: string;
  date: string;
  amount: number;
  category: string;
  details: string;
};
export type ExpenseAddForm = {
  details: string;
  amount: string;
  category: string;
  id: string;
  date: string;
};
export type ExpenseAddEdit = {
  details: string;
  amount: number;
  category: string;
  id?: string;
  date?: string;
};
export type YearsMonths = { years_months: string };

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
        Row: ExpensesRow;
        Insert: ExpenseAddEdit;
        Update: ExpenseAddEdit;
      };
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      select_distinct_years_months: {
        Args: Record<PropertyKey, never>;
        Returns: YearsMonths[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
