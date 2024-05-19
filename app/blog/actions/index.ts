import { createSupabaseClientBasedOnRole } from "@/lib/supabase"
import { BlogType } from "@/type/todo"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export const readBlogs: () => Promise<PostgrestSingleResponse<BlogType[]>> = async () => {
	const supbase = await createSupabaseClientBasedOnRole()
	return supbase.from('blog').select(`*`)
}