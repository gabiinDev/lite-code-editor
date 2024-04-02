/* eslint-disable indent */
import {
	validateGithubUserCommand,
	validateUserSignInCommand
} from '../../data/repository/auth/authRepository'
import type { ISignInModel } from '../../types/models/auth/signInModel'
import { ServiceResponse, type IServiceResult } from '../serviceResponse'

export async function signInService(
	loginData: ISignInModel
): Promise<IServiceResult<string | null>> {
	const userId = await validateUserSignInCommand(loginData)
	if (!userId.data) return ServiceResponse.error(userId.errors)
	return ServiceResponse.success(userId.data)
}

export async function validateGithubUserService(
	githubId: string
): Promise<IServiceResult<string | null>> {
	const userId = await validateGithubUserCommand(githubId)
	if (!userId.data) return ServiceResponse.error(userId.errors)
	return ServiceResponse.success(userId.data)
}
