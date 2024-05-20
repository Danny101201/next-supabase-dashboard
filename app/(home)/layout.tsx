import React, { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import { createSupabaseClientBasedOnRole } from "@/utils/supabase/server";
import { readUserSession } from "@/utils/actions";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const { data } = await readUserSession();

  return (
    <div className="w-full flex-col flex px-16">
      <Navbar isAuth={data.session !== null} />
      {children}
    </div>
  );
}

export default HomeLayout