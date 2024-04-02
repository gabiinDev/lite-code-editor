export type ExternalFrameworkCssVariantTypes =
	| 'default'
	| 'prevenet'
	| 'intermediarios'
	| 'clientes-prestadores'
	| 'prevencion-salud'

export interface IExternalFrameworkCssVariantModel {
	id: string
	idExternalFramework: string
	name: string
	type: ExternalFrameworkCssVariantTypes
	url?: string | null
	default: boolean | null
}

export const EXTERNAL_FRAMEWORK_CSS_VARIANT_DEFAULT: IExternalFrameworkCssVariantModel = {
	id: '',
	idExternalFramework: '',
	name: '',
	type: 'default',
	url: '',
	default: false
}
