"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseClientBasedOnRole } from "@/lib/supabase";
import { BlogType } from "@/type/blog";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { CreateBlogFormSchema } from "../components/BlogForm";

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
export const updateBlogById = (id: string) => {
	console.log("update todo");
}
export const deleteBlogById = async (id: string) => {
	const supbase = await createSupabaseClientBasedOnRole()
	const { data, error: blogResultError } = await supbase.from('blog').delete().eq("id", id)
	if (blogResultError) {
		throw blogResultError
	}
	revalidatePath('/dashboard/blog')
}

type ReadBlogSearchParams = {
	title: string
}
export const readBlogs: ({ title }: Partial<ReadBlogSearchParams>) => Promise<PostgrestSingleResponse<BlogType[]>> = async ({ title }) => {
	const supbase = await createSupabaseClientBasedOnRole()
	if (title) {
		return supbase
			.from('blog')
			.select('*')
			.eq('members.name', title)
	}
	return supbase.from('blog').select('*')
}
