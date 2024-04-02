import type { APIContext, APIRoute } from 'astro'
import { ApiResponse } from '../../../types/connection/apiResponse'
import type { IProjectModel } from '../../../types/models/project/projectModel'
import { getProjectBySlugService } from '../../../services/project/projectService'

export const GET: APIRoute = async (context: APIContext): Promise<Response> => {
	const userId = context.locals.user?.id ?? null
	const slug = context.params?.slug ?? null

	if (!userId) {
		return ApiResponse.unAuthorized()
	}

	if (!slug) {
		return ApiResponse.error('Cannot find slug un params')
	}

	const result = await getProjectBySlugService(userId, slug)

	if (result.status.type === 'error') {
		return ApiResponse.error(result.errors)
	}

	if (!result.data) {
		return ApiResponse.error('Not found project')
	}

	return ApiResponse.success<IProjectModel>(result.data)
}
