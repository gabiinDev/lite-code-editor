export type ProjectType = 'full-frontend' | 'full-javascript'

export interface IProjectTypeModel {
	id: string
	name: string
	description?: string | null
}

export const PROJECT_TYPE_FULL_FRONTEND: IProjectTypeModel = {
	id: '1',
	name: 'full-frontend',
	description: 'Tipo de proyecto que integra HTML, JS y CSS'
}

export const PROJECT_TYPE_FULL_JAVASCRIPT: IProjectTypeModel = {
	id: '2',
	name: 'full-javascript',
	description: 'Tipo de proyecto que solo Javascript al estilo RunJs'
}
