'use client'
import { useSupabaseBrowser } from '@/utils/supabase/client'
import { BlogType } from '@/type/blog'
import React, { useEffect, useState } from 'react'
import BlogCard from './card'
import { useServerActionQuery } from '@/utils/hooks/server-action-hooks'
import { readBlogs } from '../actions'
import { useQueryClient } from '@tanstack/react-query'

export const BlogList = () => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useServerActionQuery(readBlogs, {
    input: undefined,
    queryKey: ['blogs']
  })

  const supabase = useSupabaseBrowser()

  useEffect(() => {
    const channel = supabase
      .channel('supabase_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'blog'
        },
        (payload) => {
          const newRecord = payload.new as BlogType
          // setBlogs(pre => [...pre, newRecord])
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'blog'
        },
        (payload) => {
          const oldRecord = payload.old as BlogType
          // setBlogs(pre => pre.filter(blog => blog.id !== oldRecord.id))
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'blog'
        },
        (payload) => {
          const newRecord = payload.new as Omit<BlogType, 'id'>
          const oldRecord = payload.old as Pick<BlogType, 'id'>
          // setBlogs(pre => pre.map(blog => blog.id !== oldRecord.id ? blog : { ...blog, ...newRecord }))
        }
      )
      .subscribe()


    return () => {
      supabase.removeChannel(channel)
    }
  }, [])


  return (
    <>
      {data?.map((blog) => (
        <BlogCard key={blog?.id} {...blog} />
      ))}
    </>
  )
}
