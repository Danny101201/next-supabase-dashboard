"use server";
import { readUserSession } from "@/utils/actions";
import { BlogType } from "@/type/blog";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { CreateBlogFormSchema } from "../components/create/CreateForm";
import { EditBlogFormSchema } from "../components/edit/EditForm";
import { createSupabaseClientBasedOnRole } from "@/utils/supabase/server";

export const createBlog = async (data: CreateBlogFormSchema) => {
	const { title, category, context } = data || {}
	const { data: userSession } = await readUserSession()
	if (userSession === null) {
		throw new Error('unAuthorized')
	}

	const supabase = await createSupabaseClientBasedOnRole()
	const { data: blogResult, error: blogResultError } = await supabase.from("blog").insert({
		title,
		category,
		context
	}).select()

	if (blogResultError) {
		throw blogResultError
	}

	revalidatePath('/dashboard/blog')
}
export const updateBlogById = async (id: string, data: EditBlogFormSchema) => {
	const { data: userSession } = await readUserSession()
	if (userSession === null) {
		throw new Error('unAuthorized')
	}
	const supbase = await createSupabaseClientBasedOnRole()
	const { error: blogResultError } = await supbase.from('blog').update(data).eq("id", id)
	if (blogResultError) {
		throw blogResultError
	}
	revalidatePath('/dashboard/blog')
}
export const deleteBlogById = async (id: string) => {
	const { data: userSession } = await readUserSession()
	if (userSession === null) {
		throw new Error('unAuthorized')
	}
	const supbase = await createSupabaseClientBasedOnRole()
	const { error: blogResultError } = await supbase.from('blog').delete().eq("id", id)
	if (blogResultError) {
		throw blogResultError
	}
	revalidatePath('/dashboard/blog')
}

type ReadBlogSearchParams = {
	search: string
}
export const readBlogs: ({ search }: Partial<ReadBlogSearchParams>) => Promise<PostgrestSingleResponse<BlogType[]>> = async ({ search }) => {
	const supbase = await createSupabaseClientBasedOnRole()
	if (search) {
		return supbase
			.from('blog')
			.select('*')
			.eq('title', search)
			.order("created_at", { ascending: false })
	}
	return supbase.from('blog').select('*').order("created_at", { ascending: false })
}
