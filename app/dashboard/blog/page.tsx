import React from "react";
import { CreateBlog } from "./components/create/CreateBlog";
import { SearchBlog } from "./components/SearchBlog";
import { BlogTable } from "./components/BlogTable";
import { readBlogs } from "./actions";

export default async function Blog({ searchParams }: { searchParams: { search: string } }) {
	const { search } = searchParams || {}

	const { data: blogs } = await readBlogs({ search })

	return (
		<div className="space-y-5 w-full overflow-y-auto px-3">
			<h1 className="text-3xl font-bold">Blog</h1>
			<div className="flex gap-2">
				<SearchBlog initialSearch={search} />
				<CreateBlog />
			</div>
			<BlogTable blogs={blogs ?? []} />
		</div>
	);
}
