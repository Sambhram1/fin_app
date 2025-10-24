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
      profiles: {
        Row: {
          id: string
          username: string
          xp: number
          level: number
          streak: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          xp?: number
          level?: number
          streak?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          xp?: number
          level?: number
          streak?: number
          created_at?: string
          updated_at?: string
        }
      }
      quiz_questions: {
        Row: {
          id: string
          question: string
          explanation: string | null
          category: string | null
          difficulty: 'easy' | 'medium' | 'hard' | null
          created_at: string
        }
        Insert: {
          id?: string
          question: string
          explanation?: string | null
          category?: string | null
          difficulty?: 'easy' | 'medium' | 'hard' | null
          created_at?: string
        }
        Update: {
          id?: string
          question?: string
          explanation?: string | null
          category?: string | null
          difficulty?: 'easy' | 'medium' | 'hard' | null
          created_at?: string
        }
      }
      quiz_options: {
        Row: {
          id: string
          question_id: string
          option_text: string
          is_correct: boolean
        }
        Insert: {
          id?: string
          question_id: string
          option_text: string
          is_correct?: boolean
        }
        Update: {
          id?: string
          question_id?: string
          option_text?: string
          is_correct?: boolean
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          user_id: string
          score: number
          total_questions: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          score?: number
          total_questions: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          score?: number
          total_questions?: number
          created_at?: string
        }
      }
      budgets: {
        Row: {
          id: string
          user_id: string
          month_start: string
          monthly_income: number
          needs_percent: number
          wants_percent: number
          savings_percent: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          month_start: string
          monthly_income: number
          needs_percent?: number
          wants_percent?: number
          savings_percent?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          month_start?: string
          monthly_income?: number
          needs_percent?: number
          wants_percent?: number
          savings_percent?: number
          created_at?: string
        }
      }
      budget_entries: {
        Row: {
          id: string
          budget_id: string
          category: string
          planned_amount: number
          actual_amount: number
          created_at: string
        }
        Insert: {
          id?: string
          budget_id: string
          category: string
          planned_amount: number
          actual_amount?: number
          created_at?: string
        }
        Update: {
          id?: string
          budget_id?: string
          category?: string
          planned_amount?: number
          actual_amount?: number
          created_at?: string
        }
      }
      savings_goals: {
        Row: {
          id: string
          user_id: string
          title: string
          target_amount: number
          current_amount: number
          target_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          target_amount: number
          current_amount?: number
          target_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          target_amount?: number
          current_amount?: number
          target_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      future_simulations: {
        Row: {
          id: string
          user_id: string
          monthly_contribution: number
          months: number
          annual_interest_rate: number
          projected_value: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          monthly_contribution: number
          months: number
          annual_interest_rate: number
          projected_value: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          monthly_contribution?: number
          months?: number
          annual_interest_rate?: number
          projected_value?: number
          created_at?: string
        }
      }
    }
    Views: {
      user_dashboard_summary: {
        Row: {
          user_id: string
          username: string
          level: number
          xp: number
          streak: number
          total_saved: number
          quizzes_last_30_days: number
          budgets_last_30_days: number
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
