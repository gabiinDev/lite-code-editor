/* eslint-disable indent */
import { db, eq, isDbError, User } from 'astro:db'
import { type IRepositoryResult, RepositoryResponse } from '../repositoryResponse'
import type { IValidateUserSignInCommand } from './authCommandEntity'
import { Argon2id } from 'oslo/password'

export async function validateUserSignInCommand(
	userData: IValidateUserSignInCommand
): Promise<IRepositoryResult<string | null>> {
	try {
		const userResult = (
			await db.select().from(User).where(eq(User.username, userData.username))
		)?.at(0)

		if (!userResult) return RepositoryResponse.error('Invalid credentials')

		const validPassword = await new Argon2id().verify(userResult.password, userData.password)
		if (!validPassword) return RepositoryResponse.error('Invalid credentials')
		return RepositoryResponse.success(userResult.id)
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}

export async function validateGithubUserCommand(
	githubId: string
): Promise<IRepositoryResult<string | null>> {
	try {
		const userResult = (await db.select().from(User).where(eq(User.github_id, githubId)))?.at(0)

		if (!userResult) return RepositoryResponse.error('Github user not found')

		return RepositoryResponse.success(userResult.id)
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}
