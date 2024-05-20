'use client'
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchFormSchema = z.object({
	search: z.string()
})
type SearchFormSchema = z.infer<typeof searchFormSchema>

type SearchBlogProps = {
	initialSearch: string
}
export const SearchBlog = ({ initialSearch }: SearchBlogProps) => {

	const router = useRouter()
	const form = useForm<SearchFormSchema>({
		resolver: zodResolver(searchFormSchema),
		defaultValues: {
			search: initialSearch,
		},
	});

	const onSubmit = ({ search }: SearchFormSchema) => {
		router.replace(`/dashboard/blog/?search=${search}`)
		router.refresh()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full  flex"
			>
				<FormField
					control={form.control}
					name="search"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Input
									{...field}
									placeholder="search by name"
									className=" ring-zinc-300 bg-white dark:bg-inherit focus:dark:ring-zinc-700  focus:ring-zinc-300"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
