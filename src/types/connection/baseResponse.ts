export interface IBaseResponseStatus {
	type: 'success' | 'error'
	code: number
}

export interface IBaseResult<T = null> {
	status: IBaseResponseStatus
	errors: string[] | null
	data: T | null
}

export abstract class BaseResponse {
	abstract success<T>(data: T): IBaseResult<T>
	abstract error(errors: string[] | string): IBaseResult
	abstract validationError(errors: string[] | string): IBaseResult
}
