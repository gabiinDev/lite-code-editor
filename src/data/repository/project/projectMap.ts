import type { IProjectConfigEntity } from '../../entities/project/projectConfigEntity'
import type { IProjectEntity } from '../../entities/project/projectEntity'
import type { IProjectTypeEntity } from '../../entities/project/projectTypeEntity'
import type { IGetProjectsQueryResult } from './projectQueryEntity'

export function getProjectsQueryMap(
	data: {
		project: IProjectEntity
		config: IProjectConfigEntity
		type: IProjectTypeEntity
	}[]
): IGetProjectsQueryResult[] {
	return data.map(({ project, config, type }) => ({
		...project,
		config,
		type
	}))
}

export function getProjectQueryMap(data: {
	project: IProjectEntity
	config: IProjectConfigEntity
	type: IProjectTypeEntity
}): IGetProjectsQueryResult {
	return { ...data.project, config: data.config, type: data.type } as IGetProjectsQueryResult
}
