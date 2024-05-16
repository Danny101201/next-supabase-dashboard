import { createSupabaseClientBasedOnRole } from "@/lib/supabase"
import { TodoType } from "@/type/todo"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export const readTodos: () => Promise<PostgrestSingleResponse<TodoType[]>> = async () => {
	const supbase = await createSupabaseClientBasedOnRole()
	return supbase.from('todos').select(`*`)
}