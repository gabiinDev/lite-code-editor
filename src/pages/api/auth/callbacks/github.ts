import { github, lucia } from '../../../../auth'
import { OAuth2RequestError } from 'arctic'
import type { APIContext } from 'astro'
import { validateGithubUserService } from '../../../../services/auth/authService'
import { insertUserService } from '../../../../services/user/userService'
import { ApiResponse } from '../../../../types/connection/apiResponse'
import { generateHashedPassword, generateRandomId } from '../../../../common/database'
import type { IGitHubUser } from '../../../../types/models/user/githubUser'

export async function GET(context: APIContext): Promise<Response> {
	const code = context.url.searchParams.get('code')
	const state = context.url.searchParams.get('state')
	const storedState = context.cookies.get('github_oauth_state')?.value ?? null

	if (!code || !state || !storedState || state !== storedState) {
		return ApiResponse.error()
	}

	try {
		const tokens = await github.validateAuthorizationCode(code)
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		})

		const githubUser: IGitHubUser = await githubUserResponse.json()
		const existingUser = await validateGithubUserService(githubUser.id)

		if (existingUser && existingUser?.data) {
			const session = await lucia.createSession(existingUser.data, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
			return context.redirect('/')
		}

		const generatedUserId = generateRandomId()
		const hashedPassword = await generateHashedPassword(generatedUserId)

		await insertUserService({
			id: generatedUserId,
			username: githubUser.login,
			password: hashedPassword,
			name: githubUser.name,
			email: githubUser.email,
			createdAt: new Date(),
			idAccountType: '2', // github
			githubId: githubUser.id,
			githubAvatarUrl: githubUser.avatar_url
		})

		const session = await lucia.createSession(generatedUserId, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
		return context.redirect('/')
	} catch (e) {
		console.log('callback github error', e)
		if (e instanceof OAuth2RequestError) {
			return ApiResponse.error('invalid code')
		}

		return ApiResponse.error()
	}
}
