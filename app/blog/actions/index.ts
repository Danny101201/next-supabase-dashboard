
'use server'
import { createSupabaseClientBasedOnRole } from "@/utils/supabase/server"
import { BlogType } from "@/type/blog"

import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { createServerAction } from 'zsa'

export const readBlogs =
	createServerAction()
		.handler(async () => {
			const supbase = await createSupabaseClientBasedOnRole()
			const result = (await supbase.from('blog').select(`*`)).data
			return result
		})
export const readBlogs2 = async () => {
	const supbase = await createSupabaseClientBasedOnRole()
	return (await supbase.from('blog').select(`*`)).data
}