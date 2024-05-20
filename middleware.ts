import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import { updateSession } from './utils/supabase/middleware'
import { request } from 'http'

// export async function middleware(request: NextRequest) {
// 	return await updateSession(request)
// }




export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = createMiddlewareClient({ req, res })

	const { data: { user } } = await supabase.auth.getUser()
	if (!user) {
		return NextResponse.redirect(new URL('/auth', req.url))
	}
	// if (req.nextUrl.pathname.startsWith('/dashboard')) {
	// 	return NextResponse.rewrite(new URL('/dashboard/members', req.url))
	// }
}

export const config = {
	matcher: ['/dashboard/:path*'],
}
// export const config = {
// 	matcher: [
// 		/*
// 		 * Match all request paths except for the ones starting with:
// 		 * - _next/static (static files)
// 		 * - _next/image (image optimization files)
// 		 * - favicon.ico (favicon file)
// 		 * Feel free to modify this pattern to include more paths.
// 		 */
// 		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
// 	],
// }