import { Button } from "@/components/ui/button";
import React from "react";
import { ListOfMembers } from "./ListOfMembers";
import Table from "@/components/ui/Table";

type MemberTableProps = {
	search: string
}
export const MemberTable = ({ search }: MemberTableProps) => {
	const tableHeader = ["Name", "Role", "Joined", "Status"];

	return (
		<Table headers={tableHeader}>
			<ListOfMembers search={search} />
		</Table>
	);
}
