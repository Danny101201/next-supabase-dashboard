import React, { ReactNode } from "react";
import Navbar from "../../components/Navbar";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex-col flex px-16">
      <Navbar />
      {children}
    </div>
  );
}
