import React, { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import { readUserSession } from "@/utils/actions";

export default async function HomeLayout({ children }: { children: ReactNode }) {
  const { data, error } = await readUserSession()
  return (
    <div className="w-full flex-col flex px-16">
      <Navbar isAuth={data.session !== null} />
      {children}
    </div>
  );
}
