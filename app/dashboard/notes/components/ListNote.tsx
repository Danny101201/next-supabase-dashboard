import { readUserSession } from '@/lib/actions'
import { createSupbaseAdmin, createSupabaseClientBasedOnRole, createSupbaseServerClient } from '@/lib/supabase'
import React from 'react'

export const ListNote = async () => {
  const supabase = await createSupabaseClientBasedOnRole()
  const { data, error } = await supabase.from('members').select()

  // if (error) throw error
  return (
    <div>ListNote</div>
  )
}
