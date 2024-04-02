import type { APIContext, APIRoute } from 'astro'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { insertUserService } from '../../../services/user/userService'
import { lucia } from '../../../auth'
import { ApiResponse } from '../../../types/connection/apiResponse'

export const POST: APIRoute = async (context: APIContext): Promise<Response> => {
	const formData = await context.request.formData()
	const username = formData.get('username')
	const password = formData.get('password')

	if (!username || !password) return ApiResponse.error('Username and password are required')

	if (typeof username !== 'string' || typeof password !== 'string') {
		return ApiResponse.error('Username and password must be strings')
	}

	if (username.length < 4 || password.length < 4) {
		return ApiResponse.error('Username and password must be at least 4 characters long')
	}

	// add user to db
	const generatedUserId = generateId(15)
	const hashedPassword = await new Argon2id().hash(password)

	await insertUserService({
		id: generatedUserId,
		username,
		password: hashedPassword,
		name: 'usuario prueba',
		email: 'test@test.com',
		createdAt: new Date(),
		idAccountType: '1'
	})

	// create session from lucia
	// and add session to db
	const userSession = await lucia.createSession(generatedUserId, {})
	const userSessionCookie = lucia.createSessionCookie(userSession.id)

	context.cookies.set(userSessionCookie.name, userSessionCookie.value, userSessionCookie.attributes)

	return context.redirect('/')
}
