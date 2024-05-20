'use client'
import { useSupabaseBrowser } from '@/utils/supabase/client'
import React from 'react'

import { getCountryById } from '@/queries/get-country-by-id'
import { useQuery } from '@tanstack/react-query'

type CountryProps = {
  id: number
}
export const Country = ({ id }: CountryProps) => {
  const supabase = useSupabaseBrowser()
  const { data: country } = useQuery({ queryKey: ['getCountryById', id], queryFn: async () => (await getCountryById(supabase, id)).data })

  return (
    <div>Country : {country?.name}</div>
  )
}
