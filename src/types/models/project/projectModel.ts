import { PROJECT_CONFIG_DEFAULT, type IProjectConfigModel } from './projectConfigModel'
import { PROJECT_TYPE_FULL_FRONTEND, type IProjectTypeModel } from './projectTypeModel'

export const PROJECTS_BASE_ROUTE = '/projects'
export const PROJECTS_JAVASCRIPT_BASE_ROUTE = `${PROJECTS_BASE_ROUTE}/javascript`
export const PROJECTS_BASE_URL = `${import.meta.env.PUBLIC_SITE_URL}${PROJECTS_BASE_ROUTE}`
export const PROJECTS_JAVASCRIPT_BASE_URL = `${
	import.meta.env.PUBLIC_SITE_URL
}${PROJECTS_JAVASCRIPT_BASE_ROUTE}`

export interface IProjectModel {
	id: string
	idUser: string
	type: IProjectTypeModel
	name: string
	description?: string | null
	config?: IProjectConfigModel | null
	url?: string | null
	slug?: string | null
	createdAt: Date
	updatedAt?: Date | null
}

export const PROJECT_DEFAULT_TEMPLATE: IProjectModel = {
	id: '',
	idUser: '',
	type: PROJECT_TYPE_FULL_FRONTEND,
	name: 'new project',
	description: '',
	config: PROJECT_CONFIG_DEFAULT,
	url: '',
	createdAt: new Date(),
	updatedAt: null
}
