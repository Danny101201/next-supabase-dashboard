import { TypedSupabaseClient } from './../utils/types';

export const getCountryById = (client: TypedSupabaseClient, countryId: number) => {
  return client
    .from('countries')
    .select(`id,name`)
    .eq('id', countryId)
    .throwOnError()
    .single()
}