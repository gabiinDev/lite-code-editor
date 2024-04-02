/* eslint-disable indent */
import { db, eq, isDbError, ProjectExternalFramework, ProjectExternalFrameworkCss } from 'astro:db'
import type { IGetExternalFrameworksQueryResult } from './externalFrameworkQueryEntity'
import {
	getExternalFrameworkByIdQueryMap,
	getExternalFrameworksQueryMap
} from './externalFrameworkMap'
import { type IRepositoryResult, RepositoryResponse } from '../repositoryResponse'

export async function getExternalFrameworksQuery(): Promise<
	IRepositoryResult<IGetExternalFrameworksQueryResult[] | null>
> {
	try {
		const queryResult = await db
			.select({
				projectExternalFramework: ProjectExternalFramework,
				projectExternalFrameworkCssVariant: ProjectExternalFrameworkCss
			})
			.from(ProjectExternalFramework)
			.leftJoin(
				ProjectExternalFrameworkCss,
				eq(ProjectExternalFramework.id, ProjectExternalFrameworkCss.id_external_framework)
			)
			.all()

		return RepositoryResponse.success(getExternalFrameworksQueryMap(queryResult))
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}

export async function getExternalFrameworkByIdQuery(
	id: string
): Promise<IRepositoryResult<IGetExternalFrameworksQueryResult | null>> {
	try {
		const queryResult = await db
			.select({
				projectExternalFramework: ProjectExternalFramework,
				projectExternalFrameworkCssVariant: ProjectExternalFrameworkCss
			})
			.from(ProjectExternalFramework)
			.leftJoin(
				ProjectExternalFrameworkCss,
				eq(ProjectExternalFramework.id, ProjectExternalFrameworkCss.id_external_framework)
			)
			.where(eq(ProjectExternalFramework.id, id))
			.all()

		return RepositoryResponse.success(getExternalFrameworkByIdQueryMap(queryResult))
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}
