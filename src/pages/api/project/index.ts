import type { APIContext, APIRoute } from 'astro'
import { ApiResponse } from '../../../types/connection/apiResponse'
import {
	getProjectsService,
	saveOrUpdateProjectsService,
	type ISaveOrUpdateProjectResponse
} from '../../../services/project/projectService'
import type { IProjectModel } from '../../../types/models/project/projectModel'

export const POST: APIRoute = async (context: APIContext): Promise<Response> => {
	const userId = context.locals.user?.id ?? null

	if (!userId) {
		return ApiResponse.unAuthorized()
	}

	const dataFormBody: IProjectModel = await context.request.json()
	if (!dataFormBody) return ApiResponse.error('no data content')
	const response = await saveOrUpdateProjectsService({ ...dataFormBody, idUser: userId })
	return ApiResponse.success<ISaveOrUpdateProjectResponse | null>({
		slug: response.data?.slug ?? ''
	})
}

export const GET: APIRoute = async (context: APIContext): Promise<Response> => {
	const userId = context.locals.user?.id ?? null
	if (!userId) {
		return ApiResponse.unAuthorized()
	}

	const result = await getProjectsService(userId)

	if (result.status.type === 'error') {
		return ApiResponse.error(result.errors)
	}

	return ApiResponse.success<IProjectModel[] | null>(result.data)
}
