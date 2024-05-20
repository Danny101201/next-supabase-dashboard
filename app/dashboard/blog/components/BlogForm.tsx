"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createBlog } from "../actions";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";

const categories = ["css", "js"]
const createBlogFormSchema = z.object({
	title: z.string().min(5, {
		message: "Title must be at least 5 characters.",
	}),
	category: z.enum(["css", "js"]),
	context: z.string()
});
export type CreateBlogFormSchema = z.infer<typeof createBlogFormSchema>

export const BlogForm = ({ isEdit }: { isEdit: boolean }) => {
	const [isPending, startTransaction] = useTransition()
	const { toast } = useToast()
	const form = useForm<CreateBlogFormSchema>({
		resolver: zodResolver(createBlogFormSchema),
		defaultValues: {
			title: "",
			context: ""
		},
	});


	const onSubmit = (data: CreateBlogFormSchema) => {
		if (isEdit) {
			//  handleUpdateMember
		} else {
			startTransaction(async () => {
				try {
					const result = await createBlog(data);
					toast({
						title: 'success createBlog'
					})
				} catch (e) {
					if (e instanceof Error) {
						toast({
							title: 'failed createBlog',
							description: e.message
						})
					}
				}
			})
			// handleCreateMember
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Blog title"
									type="text"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="context"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Context</FormLabel>
							<FormControl>
								<Input
									placeholder="Blog Context"
									type="text"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories.map((category, index) => {
										return (
											<SelectItem
												value={category}
												key={index}
											>
												{category}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" variant="outline" disabled={isPending}>
					Submit
				</Button>
			</form>
		</Form>
	);
}
