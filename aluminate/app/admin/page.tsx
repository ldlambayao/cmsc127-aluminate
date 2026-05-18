"use client";

import AdminDashboard from "@/components/dashboards/AdminDashboard";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const sessionUser = sessionData.session?.user ?? null;
        if (!sessionUser) {
          router.push("/login");
          return;
        }

        const roleCheck: any = await supabase
          .from("users")
          .select("fname, lname")
          .eq("uuid", sessionUser.id)
          .eq("role", 2)
          .single()

        if (!roleCheck.success) {
          router.push("/login");
        }

      } catch (err) {
        console.error(err);
      }
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) router.push("/login");
    });

    return () => listener?.subscription.unsubscribe();
  }, [router]);


  return <AdminDashboard />;
}
