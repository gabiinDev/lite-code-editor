/* eslint-disable indent */
import { db, isDbError, UserSession } from 'astro:db'
import { type IRepositoryResult, RepositoryResponse } from '../repositoryResponse'
import type { IUserSessionEntity } from '../../entities/user/userSessionEntity'

export async function insertUserSessionCommand(
	sessionData: IUserSessionEntity
): Promise<IRepositoryResult<null>> {
	try {
		await db.insert(UserSession).values(sessionData)
		return RepositoryResponse.success(null)
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}
