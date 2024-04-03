/* eslint-disable indent */
import { ServiceResponse, type IServiceResult } from '../serviceResponse'
import {
	PROJECTS_BASE_URL,
	PROJECTS_JAVASCRIPT_BASE_URL,
	type IProjectModel
} from '../../types/models/project/projectModel'
import {
	getProjectByIdQuery,
	getProjectBySlugQuery,
	getProjectsQuery,
	insertProjectCommand,
	updateProjectCommand
} from '../../data/repository/project/projectRepository'
import type { IProjectConfigModel } from '../../types/models/project/projectConfigModel'
import type { IProjectTypeModel } from '../../types/models/project/projectTypeModel'
import { slugify } from '../../common'
import { getExternalFrameworkByIdService } from '../externalFramework/externalFrameworkService'
import { generateRandomId } from '../../common/database'

export async function getProjectsService(
	userId: string
): Promise<IServiceResult<IProjectModel[] | null>> {
	// validate correct userId
	if (userId === null || userId === 'undefined' || userId === '') {
		return ServiceResponse.validationError('Usuario incorrecto')
	}

	const projects = await getProjectsQuery(userId)

	if (projects.status.type === 'error') {
		return ServiceResponse.error(projects.errors!)
	}

	const mappedData = projects.data!.map((project) => {
		return {
			...project,
			idUser: project.id_user,
			createdAt: project.created_at,
			updatedAt: project.updated_at,
			config: {
				id: project.config.id,
				idProject: project.config.id_project,
				idExternalFramework: project.config.id_external_framework,
				html: project.config.html,
				javascript: project.config.javascript,
				css: project.config.css
			} as IProjectConfigModel,
			type: {
				id: project.type.id,
				name: project.type.name
			} as IProjectTypeModel
		} as IProjectModel
	})

	return ServiceResponse.success(mappedData)
}

export interface ISaveOrUpdateProjectResponse {
	slug: string
}

export async function saveOrUpdateProjectsService(
	project: IProjectModel
): Promise<IServiceResult<ISaveOrUpdateProjectResponse | null>> {
	// validate correct project idUser
	if (project.idUser === null || project.idUser === 'undefined' || project.idUser === '') {
		return ServiceResponse.validationError('Usuario incorrecto')
	}

	if (project.id === null || project.id === 'undefined' || project.id === '') {
		return await insertProject(project)
	} else {
		// verifi if project id exists and update
		const projectResult = await getProjectByIdQuery(project.idUser, project.id)
		if (projectResult.status.type === 'error') {
			return ServiceResponse.error(projectResult.errors!)
		}

		if (!projectResult.data) return ServiceResponse.error('Not found project')

		return await updateProject(project)
	}
}

export async function getProjectBySlugService(
	slug: string
): Promise<IServiceResult<IProjectModel | null>> {
	// validate correct slug
	if (slug === null || slug === 'undefined' || slug === '') {
		return ServiceResponse.validationError('Slug incorrecto')
	}

	const project = await getProjectBySlugQuery(slug)
	if (project.status.type === 'error') {
		return ServiceResponse.error(project.errors!)
	}

	if (!project.data) {
		return ServiceResponse.error('Not found project')
	}

	const selectedExternalFramework = await getExternalFrameworkByIdService(
		project.data.config.id_external_framework
	)

	if (!selectedExternalFramework.data) {
		return ServiceResponse.error('Not found selected framework')
	}

	const mappedData = {
		...project.data,
		idUser: project.data.id_user,
		createdAt: project.data.created_at,
		updatedAt: project.data.updated_at,
		config: {
			id: project.data.config.id,
			idProject: project.data.config.id_project,
			idExternalFramework: project.data.config.id_external_framework,
			html: project.data.config.html,
			javascript: project.data.config.javascript,
			css: project.data.config.css,
			externalFramework: selectedExternalFramework.data,
			selectedExternalFrameworkCss: selectedExternalFramework.data.cssVariants?.find(
				(s) => s.id === project.data?.config.id_selected_external_framework_css
			)
		} as IProjectConfigModel,
		type: {
			id: project.data.type.id,
			name: project.data.type.name
		} as IProjectTypeModel
	} as IProjectModel

	return ServiceResponse.success<IProjectModel | null>(mappedData)
}

async function insertProject(
	project: IProjectModel
): Promise<IServiceResult<ISaveOrUpdateProjectResponse | null>> {
	// generate project id
	const projectId = generateRandomId()
	const projectConfigId = generateRandomId()

	// appply slug to project
	project.slug = slugify(project.name)

	// create url
	if (project.type.name === 'full-frontend') {
		project.url = `${PROJECTS_BASE_URL}/${project.slug}`
	} else if (project.type.name === 'full-javascript') {
		project.url = `${PROJECTS_JAVASCRIPT_BASE_URL}/${project.slug}`
	}

	// new project
	const result = await insertProjectCommand(
		{
			...project,
			id: projectId,
			id_type: project.type.id,
			id_user: project.idUser,
			created_at: new Date()
		},
		{
			...project.config,
			id: projectConfigId,
			id_project: projectId,
			id_external_framework: project.config?.externalFramework?.id ?? '',
			id_selected_external_framework_css: project.config?.selectedExternalFrameworkCss?.id
		}
	)

	if (result.status.type === 'error') {
		return ServiceResponse.error(result.errors!)
	}

	return ServiceResponse.success({ slug: project.slug })
}

async function updateProject(
	project: IProjectModel
): Promise<IServiceResult<ISaveOrUpdateProjectResponse | null>> {
	// appply slug to project
	project.slug = slugify(project.name)
	// create url
	project.url = `https://litecode.gabrieldiazdev.com/project/${project.slug}`

	// update
	const result = await updateProjectCommand(
		{
			...project,
			id_type: project.type.id,
			id_user: project.idUser,
			created_at: project.createdAt,
			updated_at: new Date()
		},
		{
			...project.config,
			id: project.config?.id ?? '',
			id_project: project.config?.idProject ?? '',
			id_external_framework: project.config?.externalFramework?.id ?? '',
			id_selected_external_framework_css: project.config?.selectedExternalFrameworkCss?.id
		}
	)

	if (result.status.type === 'error') {
		return ServiceResponse.error(result.errors!)
	}

	return ServiceResponse.success({ slug: project.slug })
}
