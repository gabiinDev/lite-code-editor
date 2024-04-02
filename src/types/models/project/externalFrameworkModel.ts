import type { IExternalFrameworkCssVariantModel } from './externalFrameworkCssVariantModel'

export type ExternalFrameworkTypes =
	| 'default'
	| 'tailwind'
	| 'natal-framework'
	| 'bootstrap'
	| 'flowbite'
	| 'skypack'

export interface IExternalFrameworkModel {
	id: string
	name: string
	type: ExternalFrameworkTypes
	url?: string | null
	default: boolean | null
	cssVariants?: IExternalFrameworkCssVariantModel[]
}

export const EXTERNAL_FRAMEWORK_DEFAULT: IExternalFrameworkModel = {
	id: '1',
	name: 'Default',
	type: 'default',
	default: true
}
