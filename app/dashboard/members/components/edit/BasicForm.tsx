"use client";

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
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Permission } from "@/type/permission";
import { updateMemberById } from "../../actions";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
});
type BasicFormProps = {
	permission: Permission
}
export const BasicForm = ({ permission }: BasicFormProps) => {
	const { toast } = useToast()
	const [isPending, startTransaction] = useTransition()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: permission.members.name,
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		startTransaction(async () => {
			try {
				const result = await updateMemberById(permission.member_id, data);
				toast({
					title: 'success updateUser'
				})
			} catch (e) {
				if (e instanceof Error) {
					toast({
						title: 'failed updateUser',
						description: e.message
					})
				}
			}
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Display Name</FormLabel>
							<FormControl>
								<Input placeholder="please enter name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="flex gap-2 items-center w-full"
					variant="outline"
					disabled={isPending}
				>
					Update{" "}
					<AiOutlineLoading3Quarters
						className={cn(" animate-spin", "hidden")}
					/>
				</Button>
			</form>
		</Form>
	);
}
