import type { APIContext, APIRoute } from 'astro'
import { lucia } from '../../../auth'
import { signInService } from '../../../services/auth/authService'
import { ApiResponse } from '../../../types/connection/apiResponse'

export const POST: APIRoute = async (context: APIContext): Promise<Response> => {
	const formData = await context.request.formData()
	const username = formData.get('username')
	const password = formData.get('password')

	if (!username || !password) {
		return ApiResponse.error('Username and password are required')
	}

	if (typeof username !== 'string' || typeof password !== 'string') {
		return ApiResponse.error('Username and password must be strings')
	}

	if (username.length < 4 || password.length < 4) {
		return ApiResponse.error('Username and password must be at least 4 characters long')
	}

	const userId = await signInService({ username, password })

	if (!userId.data) return ApiResponse.error(userId.errors)

	// create session from lucia
	// and add session to db
	const userSession = await lucia.createSession(userId.data, {})
	const userSessionCookie = lucia.createSessionCookie(userSession.id)

	context.cookies.set(userSessionCookie.name, userSessionCookie.value, userSessionCookie.attributes)

	return context.redirect('/')
}
