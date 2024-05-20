'use client'
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { Permission } from "@/type/permission";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { DailogForm } from "./DialogForm";
import { DeleteButton } from "./delete/DeleteButton";
import { EditForm } from "./edit/EditorForm";

export const getColumns: ({ isAdmin }: { isAdmin: boolean }) => ColumnDef<Permission>[] = ({ isAdmin }) => [
	{
		header: "Name",
		accessorKey: "members.name",
	},
	{
		header: "Email",
		accessorKey: "members.email",
	},
	{
		header: "Role",
		accessorKey: "role",
		cell: ({ row }) => {
			const role: string = row.getValue("role")
			return (
				<span
					className={cn(
						" dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
						{
							"border-green-500 text-green-600 bg-green-200":
								role === "admin",
							"border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
								role === "user",
						}
					)}
				>
					{role}
				</span>
			)
		},
	},
	{
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => {
			const status: string = row.getValue('status')
			return (
				<span
					className={cn(
						" dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
						{
							"text-green-600 px-4 dark:border-green-400 bg-green-200":
								status === "active",
							"text-red-500 bg-red-100 dark:text-red-300 dark:border-red-400":
								status === "unActive",
						}
					)}
				>
					{status}
				</span>
			)
		}
	},
	{
		header: "Joined",
		accessorKey: "created_at",
		cell: ({ row }) => {
			const created_at: string = row.getValue('created_at')
			return (
				<h1>{new Date(created_at).toDateString()}</h1>
			)
		}
	},
	{
		id: 'action',
		header: "action",
		cell: ({ row }) => {
			const permission = row.original
			return (
				<div className="flex gap-2 items-center">
					{isAdmin && (
						<DeleteButton id={permission.members.id} />
					)}
					<DailogForm
						id="update-trigger"
						title="Edit Member"
						Trigger={
							<Button variant="outline">
								<Pencil1Icon />
								Edit
							</Button>
						}
						form={<EditForm isAdmin={isAdmin} permission={permission} />}
					/>
				</div>
			)
		}
	}
]

type MemberTableProps = {
	permissions: Permission[]
	isAdmin: boolean
}
export const MemberTable = ({ permissions, isAdmin }: MemberTableProps) => {
	const columns = getColumns({ isAdmin })
	const table = useReactTable({
		data: permissions,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
