import type { APIRoute } from 'astro'
import { getExternalFrameworksService } from '../../../services/externalFramework/externalFrameworkService'
import { ApiResponse } from '../../../types/connection/apiResponse'

export const GET: APIRoute = async (): Promise<Response> => {
	const result = await getExternalFrameworksService()

	if (result.status.type === 'error') {
		return ApiResponse.error(result.errors)
	}

	return ApiResponse.success(result.data)
}
