import React from "react";
import MemberTable from "./components/MemberTable";
import SearchMembers from "./components/SearchMembers";
import CreateMember from "./components/create/CreateMember";
import { readUserSession } from "@/lib/actions";



export default async function Members() {
	const { data: userSession } = await readUserSession();

	const isAdmin = userSession?.session?.user.role === 'admin'

	return (
		<div className="space-y-5 w-full overflow-y-auto px-3">
			<h1 className="text-3xl font-bold">Members</h1>
			<div className="flex gap-2">
				{isAdmin && (
					<>
						<SearchMembers />
						<CreateMember />
					</>
				)}
			</div>
			<MemberTable />
		</div>
	);
}
