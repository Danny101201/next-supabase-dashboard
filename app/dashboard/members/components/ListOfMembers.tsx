import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DailogForm } from "./DialogForm";

import { Pencil1Icon } from "@radix-ui/react-icons";
import { readUserSession } from "@/lib/actions";
import { EditForm } from "./edit/EditorForm";
import { readMembers } from "../actions";

export default async function ListOfMembers() {
	const { data: userSession } = await readUserSession();
	const isAdmin = userSession?.session?.user.role === 'admin'
	const { data: permissions } = await readMembers()

	if (permissions === null) return null
	return (
		<div className="dark:bg-inherit bg-white mx-2 rounded-sm">
			{permissions.map((permission, index) => {
				return (
					<div
						className=" grid grid-cols-5  rounded-sm  p-3 align-middle font-normal"
						key={index}
					>
						<h1>{permission.members.name}</h1>

						<div>
							<span
								className={cn(
									" dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
									{
										"border-green-500 text-green-600 bg-green-200":
											permission.role === "admin",
										"border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
											permission.role === "user",
									}
								)}
							>
								{permission.role}
							</span>
						</div>
						<h1>{new Date(permission.created_at).toDateString()}</h1>
						<div>
							<span
								className={cn(
									" dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
									{
										"text-green-600 px-4 dark:border-green-400 bg-green-200":
											permission.status === "active",
										"text-red-500 bg-red-100 dark:text-red-300 dark:border-red-400":
											permission.status === "unActive",
									}
								)}
							>
								{permission.status}
							</span>
						</div>

						<div className="flex gap-2 items-center">
							<Button variant="outline">
								<TrashIcon />
								Delete
							</Button>
							<DailogForm
								id="update-trigger"
								title="Edit Member"
								Trigger={
									<Button variant="outline">
										<Pencil1Icon />
										Edit
									</Button>
								}
								form={<EditForm isAdmin={isAdmin} />}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}
