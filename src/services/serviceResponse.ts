import {
	BaseResponse,
	type IBaseResponseStatus,
	type IBaseResult
} from '../types/connection/baseResponse'

export const SERVICE_RESPONSE_OK: IBaseResponseStatus = { type: 'success', code: 200 }
export const SERVICE_RESPONSE_ERROR: IBaseResponseStatus = { type: 'error', code: 500 }
export const SERVICE_RESPONSE_API_ERROR: IBaseResponseStatus = { type: 'error', code: 400 }

export interface IServiceResult<T = null> extends IBaseResult<T> {}

export class ServiceResult<T = null> implements IServiceResult<T> {
	constructor(response: IBaseResult<T>) {
		this.status = response.status
		this.errors = response.errors
		this.data = response.data
	}

	status: IBaseResponseStatus
	errors: string[] | null
	data: T | null
}

export abstract class ServiceResponse extends BaseResponse {
	static success<T>(data: T): IServiceResult<T> {
		return new ServiceResult<T>({
			status: SERVICE_RESPONSE_OK,
			data,
			errors: null
		})
	}

	static error(errors: string | string[] | null): IServiceResult {
		return new ServiceResult({
			status: SERVICE_RESPONSE_ERROR,
			errors: typeof errors === 'string' ? [errors] : errors,
			data: null
		})
	}

	static validationError(errors: string | string[]): IServiceResult {
		return new ServiceResult({
			status: SERVICE_RESPONSE_API_ERROR,
			errors: typeof errors === 'string' ? [errors] : errors,
			data: null
		})
	}
}
