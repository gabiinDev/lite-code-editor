import {
	BaseResponse,
	type IBaseResponseStatus,
	type IBaseResult
} from '../../types/connection/baseResponse'

const REPOSITORY_RESPONSE_OK: IBaseResponseStatus = { type: 'success', code: 200 }
const REPOSITORY_RESPONSE_ERROR: IBaseResponseStatus = { type: 'error', code: 500 }
const REPOSITORY_VALIDATION_ERROR: IBaseResponseStatus = { type: 'error', code: 400 }

export interface IRepositoryResult<T = null> extends IBaseResult<T> {}

export class RepositoryResult<T = null> implements IRepositoryResult<T> {
	constructor(response: IBaseResult<T>) {
		this.status = response.status
		this.errors = response.errors
		this.data = response.data
	}

	status: IBaseResponseStatus
	errors: string[] | null
	data: T | null
}

export abstract class RepositoryResponse extends BaseResponse {
	static success<T>(data: T): IRepositoryResult<T> {
		return new RepositoryResult<T>({
			status: REPOSITORY_RESPONSE_OK,
			data,
			errors: null
		})
	}

	static error(errors: string | string[]): IRepositoryResult {
		console.error('RepositoryResponse -> ERROR', errors)
		return new RepositoryResult({
			status: REPOSITORY_RESPONSE_ERROR,
			errors: typeof errors === 'string' ? [errors] : errors,
			data: null
		})
	}

	static validationError(errors: string | string[]): IRepositoryResult {
		console.error('RepositoryResponse -> VALIDATION ERROR', errors)
		return new RepositoryResult({
			status: REPOSITORY_VALIDATION_ERROR,
			errors: typeof errors === 'string' ? [errors] : errors,
			data: null
		})
	}
}
