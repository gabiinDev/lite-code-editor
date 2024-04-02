import type { IExternalFrameworkCssVariantModel } from './externalFrameworkCssVariantModel'
import { EXTERNAL_FRAMEWORK_DEFAULT, type IExternalFrameworkModel } from './externalFrameworkModel'

export interface IProjectConfigModel {
	id: string
	idProject: string
	idExternalFramework: string
	html?: string | null
	javascript?: string | null
	css?: string | null
	externalFramework?: IExternalFrameworkModel | null
	selectedExternalFrameworkCss?: IExternalFrameworkCssVariantModel
}

export const PROJECT_CONFIG_DEFAULT: IProjectConfigModel = {
	id: '',
	idProject: '',
	idExternalFramework: '',
	html: null,
	javascript: null,
	css: null,
	externalFramework: EXTERNAL_FRAMEWORK_DEFAULT
}
