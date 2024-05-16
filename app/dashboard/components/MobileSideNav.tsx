"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideBar } from "./SideNav";
import { useEffect } from "react";

export default function MobileSideNav() {
	useEffect(() => {
		window.addEventListener("resize", (e: UIEvent) => {
			const w = e.target as Window;
		});
		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, []);

	return (
		<Sheet>
			<SheetTrigger asChild id="toggle-sidebar">
				<span></span>
			</SheetTrigger>
			<SheetContent side={"left"} className="dark:bg-graident-dark flex">
				<SideBar />
			</SheetContent>
		</Sheet>
	);
}
