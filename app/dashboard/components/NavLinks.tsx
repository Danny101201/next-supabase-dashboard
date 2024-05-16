"use client";
import React from "react";
import { PersonIcon, CrumpledPaperIcon, CubeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavLinks() {
	const pathname = usePathname();

	const links = [
		{
			href: "/dashboard/members",
			text: "Members",
			Icon: PersonIcon,
		},
		{
			href: "/dashboard/todo",
			text: "Todo",
			Icon: CrumpledPaperIcon,
		},
		{
			href: "/dashboard/notes",
			text: "Notes",
			Icon: CubeIcon,
		},
	];

	return (
		<div className="space-y-5">
			{links.map((link, index) => {
				const Icon = link.Icon;
				return (
					<Link
						href={link.href}
						key={index}
						className={cn(
							"flex items-center gap-2 rounded-sm p-2",
							{
								" bg-green-500 dark:bg-green-700 text-white ":
									pathname === link.href,
							}
						)}
					>
						<Icon />
						{link.text}
					</Link>
				);
			})}
		</div>
	);
}
