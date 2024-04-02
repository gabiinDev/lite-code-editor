/* eslint-disable indent */
import { db, eq, isDbError, User } from 'astro:db'
import { type IRepositoryResult, RepositoryResponse } from '../repositoryResponse'
import type { IUserEntity } from '../../entities/user/userEntity'
import type { IGetBasicUserDataQueryResult } from './userQueryEntity'

export async function insertUserCommand(userData: IUserEntity): Promise<IRepositoryResult<null>> {
	try {
		await db.insert(User).values(userData)
		return RepositoryResponse.success(null)
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}

export async function getBasicUserDataQuery(
	userId: string
): Promise<IRepositoryResult<IGetBasicUserDataQueryResult | null>> {
	try {
		const userResult = (await db.select().from(User).where(eq(User.id, userId)))?.at(0)

		if (!userResult) return RepositoryResponse.error('Github user not found')

		return RepositoryResponse.success({
			username: userResult.username,
			avatarUrl: userResult.github_avatar_url
		})
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}
