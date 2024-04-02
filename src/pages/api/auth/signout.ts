import type { APIContext, APIRoute } from 'astro'
import { lucia } from '../../../auth'

export const GET: APIRoute = async (context: APIContext): Promise<Response> => {
	if (!context.locals.session) {
		return context.redirect('/')
	}

	await lucia.validateSession(context.locals.session.id)

	const sessionCookie = lucia.createBlankSessionCookie()
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

	console.log('borra sesion')

	return context.redirect('/')
}
