import { Input } from "@/components/ui/input";
import React from "react";

export const SearchBlog = () => {
	return (
		<Input
			placeholder="search by title"
			className=" border-zinc-600  focus:border-zinc-600"
		/>
	);
}
