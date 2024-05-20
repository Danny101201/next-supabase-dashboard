import { Button } from "@/components/ui/button";
import React from "react";
import { DailogForm } from "./DialogForm";
import { BlogForm } from "./BlogForm";

export const CreateBlog = () => {
	return (
		<DailogForm
			id="create-trigger"
			title="Create Blog"
			Trigger={<Button variant="outline">Create+</Button>}
			form={<BlogForm isEdit={false} />}
		/>
	);
}
