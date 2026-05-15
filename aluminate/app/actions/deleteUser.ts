'use server';

import { createClient } from '@supabase/supabase-js'

export async function deleteUserAction(userId: string) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId)

  if (error) throw new Error(error.message)
  return { success: true }
}
