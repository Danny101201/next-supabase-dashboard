'use client'
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { BlogType } from "@/type/blog";
import { DeleteButton } from "./delete/DeleteButton";

export const columns: ColumnDef<BlogType>[] = [
	{
		header: "Title",
		accessorKey: "title",
	},
	{
		header: "Category",
		accessorKey: "category",
	},
	{
		header: "Create At",
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
			const blog = row.original
			return (
				<div className="flex gap-2 items-center">
					<DeleteButton id={blog.id} />
					{/* <DailogForm
						id="update-trigger"
						title="Edit Member"
						Trigger={
							<Button variant="outline">
								<Pencil1Icon />
								Edit
							</Button>
						}
						form={<EditForm isAdmin={isAdmin} permission={permission} />}
					/> */}
				</div>
			)
		}
	}
]

type BlogTableProps = {
	blogs: BlogType[]
}
export const BlogTable = ({ blogs }: BlogTableProps) => {

	const table = useReactTable({
		data: blogs,
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
