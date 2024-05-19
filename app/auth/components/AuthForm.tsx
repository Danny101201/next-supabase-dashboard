"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { loginWithEmailAndPassword } from "../actions";
import { AuthTokenResponse } from "@supabase/supabase-js";

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, { message: "Password can not be empty" }),
});

export default function AuthForm() {

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const { error } = JSON.parse(
			await loginWithEmailAndPassword(data)
		) as AuthTokenResponse;

		if (error) {
			alert('Fail to login')
		} else {
			alert('Successfully login ')
		}
	}

	return (
		<div className="w-96">
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
									<Input placeholder="please enter email" {...field} />
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
										placeholder="please enter password"
										{...field}
										type="password"
									/>
								</FormControl>
								<FormDescription>
									{
										"contact your admin if you forgot your password"
									}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						variant="outline"
						className="w-full flex items-center gap-2"
					>
						Login{" "}
						<AiOutlineLoading3Quarters
							className={cn("animate-spin", {
								hidden: true,
							})}
						/>
					</Button>
				</form>
			</Form>
		</div>
	);
}
