"use server";
import { createSupabaseClientBasedOnRole, createSupbaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { CreateFormSchema } from "../components/create/CreateForm";
import { readUserSession } from "@/lib/actions";
import { Permission } from "@/type/permission";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export const createMember = async (data: CreateFormSchema) => {
	const { data: userSession } = await readUserSession()
	if (userSession.session?.user.role !== 'admin') {
		throw new Error('you are not allowed to create User')
	}

	const supabase = await createSupbaseAdmin()
	const { email, password, role, status, name } = data

	const createResult = await supabase.auth.admin.createUser({
		email,
		password,
		email_confirm: true,
		user_metadata: {
			role,
			status
		}
	})
	if (createResult.error) {
		throw createResult.error
	}

	const { data: memberResult, error: memberResultError } = await supabase.from("members").insert({
		id: createResult.data.user.id,
		name,
	}).select()
	if (memberResultError) {
		throw memberResultError
	}
	const { data: permissionResult, error: permissionResultError } = await supabase.from("permission").insert({
		member_id: createResult.data.user.id,
		role,
		status
	}).select()

	if (permissionResultError) {
		throw permissionResultError
	}
	return permissionResult

}

export const updateMemberById = async (id: string) => {
}

export const deleteMemberById = async (id: string) => { }

export const readMembers: () => Promise<PostgrestSingleResponse<Permission[]>> = async () => {
	const supbase = await createSupabaseClientBasedOnRole()
	return supbase.from('permission').select(`*,members(*)`)
}
