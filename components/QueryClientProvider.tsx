'use client'
import React, { PropsWithChildren, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  )

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     console.log(event, session)
  //     if (event === 'USER_UPDATED') console.log('USER_UPDATED', session)
  //   })
  // }, [])
  return (
    <QueryClientProvider client={queryClient} >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
