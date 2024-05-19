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
import { useTransition } from "react";
import { updateMemberById, updateUserById } from "../../actions";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";

const FormSchema = z
	.object({
		email: z.string().email(),
		password: z.string().optional(),
		confirm: z.string().optional(),
	})
	.refine((data) => data.confirm === data.password, {
		message: "Passowrd doesn't match",
		path: ["confirm"],
	});

type AccountFormProps = {
	permission: Permission
}
export const AccountForm = ({ permission }: AccountFormProps) => {
	const [isPending, startTransaction] = useTransition()
	const { toast } = useToast()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: permission.members.email,
			password: "",
			confirm: "",
		},
	});

	const onSubmit = ({ email, password }: z.infer<typeof FormSchema>) => {
		startTransaction(async () => {
			try {
				await Promise.all([
					updateMemberById(permission.member_id, { email }),
					updateUserById(permission.member_id, { email, password })
				])

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
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="email@gmail.com"
									type="email"
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
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="******"
									type="password"
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									placeholder="******"
									type="password"
									onChange={field.onChange}
								/>
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
					Update
					<AiOutlineLoading3Quarters
						className={cn(" animate-spin", "hidden")}
					/>
				</Button>
			</form>
		</Form>
	);
}
