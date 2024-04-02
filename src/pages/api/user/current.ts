import type { APIContext, APIRoute } from 'astro'
import { getBasicUserDataQuery } from '../../../data/repository/user/userRepository'
import { ApiResponse } from '../../../types/connection/apiResponse'

export const GET: APIRoute = async (context: APIContext): Promise<Response> => {
	const userId = context.locals.user?.id ?? null

	console.log('desde api', userId)

	if (!userId) {
		console.log('SIN AUTORIZAR')
		return ApiResponse.unAuthorized()
	}

	const result = await getBasicUserDataQuery(userId)

	if (result.status.type === 'error') {
		return ApiResponse.error(result.errors)
	}

	return ApiResponse.success(result.data)
}
