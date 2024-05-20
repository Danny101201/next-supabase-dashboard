
import { Country } from '@/components/Country'
import { getCountryById } from '@/queries/get-country-by-id'
import { createSupbaseServerClient } from '@/utils/supabase/server'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'

const CountryPage = async ({ params }: { params: { id: number } }) => {
  const queryClient = new QueryClient()
  const supbase = await createSupbaseServerClient()
  queryClient.prefetchQuery({ queryKey: ['getCountryById', params.id], queryFn: async () => (await getCountryById(supbase, params.id)).data })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Country id={params.id} />
    </HydrationBoundary>
  )
}

export default CountryPage