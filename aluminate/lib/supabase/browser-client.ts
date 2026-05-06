"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          uuid: string;
          fname: string;
          mname: string;
          lname: string;
          contact_number: number;
        };
        Insert: {
          uuid: string;
          fname: string;
          mname: string;
          lname: string;
          contact_number: number;
          role: number;
        }
      };
      alumni: {
        Row: {
          alumnus_id: string;
          student_number: string;
          program_code: number;
          uuid: string;
          tracer_survey_status: "Completed" | "Not completed";
          satisfaction_survey_status: "Completed" | "Not completed";
          graduation_month: string;
          graduation_year: number;
        };
        Insert: {
          alumnus_id?: string;
          student_number: string;
          program_code: number;
          uuid?: string;
          tracer_survey_status: "Completed" | "Not completed";
          satisfaction_survey_status: "Completed" | "Not completed";
          graduation_month: string;
          graduation_year: number;
        };
        Update: {
          tracer_survey_status?: "Completed" | "Not completed";
          satisfaction_survey_status?: "Completed" | "Not completed";
          graduation_month?: string;
          graduation_year?: number;
        }
      };
      tracer_survey_responses: {
        Row: {
          response_id: string;
          alumnus_id: string;
          nature_of_work: string;
          higher_studies: boolean;
          list_of_higher_studies: string;
          employment_status: boolean;
          work_relation: boolean;
          share_suggestions: string;
          satisfaction_level:  "Very Satisfied" | "Satisfied" | "Neutral" | "Dissatisfied" | "Very Dissatisfied";
          satisfaction_reason: string;
          ways_degprog_helped: string;
          degprog_suggestions: string;
          receive_updates: string;
          interview_interest: string;
          date_answered: string;
        }
      };
    };
  };
};

let client: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  if (client) {
    return client;
  }

  // During build time (server-side rendering), return a dummy client to avoid initialization errors
  if (typeof window === "undefined") {
    // Return a minimal object that won't fail during build
    return {
      auth: {},
      from: () => ({})
    } as unknown as SupabaseClient<Database>;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  return client;
}
