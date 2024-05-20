import { createClient } from "@supabase/supabase-js";
import { TypedSupabaseClient } from "../types";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../database.types";
import { useMemo } from "react";


let client: TypedSupabaseClient | undefined
export const getSupabaseBrowserClient = () => {
	if (client) {
		return client
	}
	client = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)
	return client
}

export const useSupabaseBrowser = (() => {
	return useMemo(getSupabaseBrowserClient, [])
})