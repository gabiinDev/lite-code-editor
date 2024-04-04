/* eslint-disable indent */
import { db, eq, isDbError, Project, ProjectConfig, ProjectType } from 'astro:db'
import { type IRepositoryResult, RepositoryResponse } from '../repositoryResponse'
import type { IGetProjectsQueryResult } from './projectQueryEntity'
import { getProjectQueryMap, getProjectsQueryMap } from './projectMap'
import type { IProjectEntity } from '../../entities/project/projectEntity'
import { and } from 'drizzle-orm'
import type { IProjectConfigEntity } from '../../entities/project/projectConfigEntity'

export async function getProjectsQuery(
	userId: string
): Promise<IRepositoryResult<IGetProjectsQueryResult[] | null>> {
	try {
		// validate correct userId
		if (userId === null || userId === 'undefined' || userId === '') {
			return RepositoryResponse.validationError('Usuario incorrecto')
		}

		const queryResult = await db
			.select({
				project: Project,
				config: ProjectConfig,
				type: ProjectType
			})
			.from(Project)
			.innerJoin(ProjectType, eq(Project.id_type, ProjectType.id))
			.innerJoin(ProjectConfig, eq(Project.id, ProjectConfig.id_project))
			.where(eq(Project.id_user, userId))
			.all()

		return RepositoryResponse.success(getProjectsQueryMap(queryResult))
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}

export async function insertProjectCommand(
	project: IProjectEntity,
	projectConfig: IProjectConfigEntity
): Promise<IRepositoryResult<null>> {
	try {
		// validate correct userId
		if (project.id_user === null || project.id_user === 'undefined' || project.id_user === '') {
			return RepositoryResponse.validationError('Usuario incorrecto')
		}

		if (project.id !== null || project.id !== 'undefined' || project.id !== '') {
			// find by name
			const projectById = (await db.select().from(Project).where(eq(Project.id, project.id)))?.at(0)

			if (projectById) {
				return RepositoryResponse.validationError('project already exists, cant insert new')
			}
		}

		// find by name
		const projectByName = (
			await db
				.select()
				.from(Project)
				.where(and(eq(Project.name, project.name), eq(Project.id_user, project.id_user)))
		)?.at(0)

		if (projectByName) return RepositoryResponse.validationError('project name already exists')

		// insert project
		if (project) await db.insert(Project).values(project).onConflictDoNothing()

		if (projectConfig) {
			// insert config
			await db.insert(ProjectConfig).values(projectConfig).onConflictDoNothing()
		}

		return RepositoryResponse.success(null)
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}

export async function updateProjectCommand(
	project: IProjectEntity,
	projectConfig: IProjectConfigEntity
): Promise<IRepositoryResult<null>> {
	try {
		// validate correct userId
		if (project.id_user === null || project.id_user === 'undefined' || project.id_user === '') {
			return RepositoryResponse.validationError('Usuario incorrecto')
		}

		// find by name
		const projectByName = (
			await db
				.select()
				.from(Project)
				.where(and(eq(Project.name, project.name), eq(Project.id_user, project.id_user)))
		)?.at(0)

		if (projectByName) return RepositoryResponse.validationError('project name already exists')

		// insert project
		if (project) await db.update(Project).set(project).where(eq(Project.id, project.id))

		if (projectConfig) {
			// insert config
			await db
				.update(ProjectConfig)
				.set(projectConfig)
				.where(eq(ProjectConfig.id, projectConfig.id))
		}

		return RepositoryResponse.success(null)
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}

export async function getProjectBySlugQuery(
	slug: string
): Promise<IRepositoryResult<IGetProjectsQueryResult | null>> {
	try {
		// validate correct slug
		if (slug === null || slug === 'undefined' || slug === '') {
			return RepositoryResponse.validationError('Slug incorrecto')
		}

		const queryResults = await db
			.select({
				project: Project,
				config: ProjectConfig,
				type: ProjectType
			})
			.from(Project)
			.innerJoin(ProjectType, eq(Project.id_type, ProjectType.id))
			.innerJoin(ProjectConfig, eq(Project.id, ProjectConfig.id_project))
			.where(eq(Project.slug, slug))
			.all()

		if (!queryResults || !queryResults?.at(0)) {
			return RepositoryResponse.error('Cant find project with slug ' + slug)
		}

		const queryData = queryResults.at(0)!
		return RepositoryResponse.success(getProjectQueryMap(queryData))
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}

export async function getProjectByIdQuery(
	userId: string,
	id: string
): Promise<IRepositoryResult<IGetProjectsQueryResult | null>> {
	try {
		// validate correct userId
		if (userId === null || userId === 'undefined' || userId === '') {
			return RepositoryResponse.validationError('Usuario incorrecto')
		}

		// validate correct slug
		if (id === null || id === 'undefined' || id === '') {
			return RepositoryResponse.validationError('id incorrecto')
		}

		const queryResults = await db
			.select({
				project: Project,
				config: ProjectConfig,
				type: ProjectType
			})
			.from(Project)
			.innerJoin(ProjectType, eq(Project.id_type, ProjectType.id))
			.innerJoin(ProjectConfig, eq(Project.id, ProjectConfig.id_project))
			.where(and(eq(Project.id_user, userId), eq(Project.id, id)))
			.all()

		if (!queryResults || !queryResults?.at(0)) {
			return RepositoryResponse.error('Cant find project by id')
		}

		const queryData = queryResults.at(0)!
		return RepositoryResponse.success(getProjectQueryMap(queryData))
	} catch (e) {
		if (isDbError(e)) {
			return RepositoryResponse.error(e.message)
		}

		const { message } = e as TypeError
		return RepositoryResponse.error(message)
	}
}
