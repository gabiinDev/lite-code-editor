const RESPOSNE_HEADER = { 'Content-Type': 'application/json' }

export class ApiResponse {
	static success<T>(data: T): Response {
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: RESPOSNE_HEADER
		})
	}

	static error(errors?: string[] | string | null): Response {
		const errorObject = {
			error: typeof errors === 'string' ? [errors] : errors
		}

		return new Response(JSON.stringify(errorObject), {
			status: 400,
			headers: RESPOSNE_HEADER
		})
	}

	static unAuthorized(): Response {
		return new Response(null, {
			status: 401,
			headers: RESPOSNE_HEADER
		})
	}
}
