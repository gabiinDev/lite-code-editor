/* eslint-disable indent */
import { insertUserCommand, getBasicUserDataQuery } from '../../data/repository/user/userRepository'
import { insertUserSessionCommand } from '../../data/repository/user/userSessionRepository'
import type { IUserBasicInfoModel, IUserModel } from '../../types/models/user/userModel'
import type { IUserSessionModel } from '../../types/models/user/userSessionModel'
import { ServiceResponse, type IServiceResult } from '../serviceResponse'

export async function insertUserService(userData: IUserModel): Promise<IServiceResult<null>> {
	await insertUserCommand({
		id: userData.id,
		id_account_type: userData.idAccountType,
		username: userData.username,
		name: userData.name,
		email: userData.email,
		password: userData.password,
		created_at: new Date(),
		updated_at: null,
		github_id: userData.githubId,
		github_avatar_url: userData.githubAvatarUrl
	})
	return ServiceResponse.success(null)
}

export async function insertUserSessionService(
	userSessionData: IUserSessionModel
): Promise<IServiceResult<null>> {
	await insertUserSessionCommand({
		id: userSessionData.id,
		userId: userSessionData.userId,
		expiresAt: userSessionData.expiresAt
	})
	return ServiceResponse.success(null)
}

export async function getUserBasicDataService(
	userId: string
): Promise<IServiceResult<IUserBasicInfoModel | null>> {
	const result = await getBasicUserDataQuery(userId)

	if (!result.data) return ServiceResponse.error(result.errors!)

	return ServiceResponse.success({
		username: result.data.username,
		avatarUrl: result.data.avatarUrl ?? null
	})
}
