import type { IProjectExternalFrameworkEntity } from '../../entities/project/projectExternalFrameworkEntity'
import type { IProjectExternalFrameworkCssEntity } from '../../entities/project/projectExternalFrameworkCssEntity'

export interface IGetExternalFrameworksQueryResult extends IProjectExternalFrameworkEntity {
	cssVariants: IProjectExternalFrameworkCssEntity[] | null
}
