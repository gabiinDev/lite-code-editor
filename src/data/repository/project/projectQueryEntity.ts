import type { IProjectConfigEntity } from '../../entities/project/projectConfigEntity'
import type { IProjectEntity } from '../../entities/project/projectEntity'
import type { IProjectTypeEntity } from '../../entities/project/projectTypeEntity'

export interface IGetProjectsQueryResult extends IProjectEntity {
	type: IProjectTypeEntity
	config: IProjectConfigEntity
}
