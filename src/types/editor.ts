export type ExternalFrameworksOptions =
	| 'default'
	| 'tailwind'
	| 'natal-framework'
	| 'bootstrap'
	| 'flowbite'
	| 'skypack'

export interface ExternalFrameworksOptionsCssVariants {
	name: string
	parent: ExternalFrameworksOptions
	url: string
	type: string
}

export interface ExternalFrameworks {
	default?: boolean
	name: string
	type: ExternalFrameworksOptions
	url: string
	cssVariants?: Array<ExternalFrameworksOptionsCssVariants>
}

export class ExternalFramework implements ExternalFrameworks {
	constructor(data: ExternalFrameworks) {
		this.default = data?.default ?? false
		this.name = data.name
		this.type = data.type
		this.url = data.url
		this.cssVariants = data.cssVariants
	}

	default?: boolean
	name: string
	type: ExternalFrameworksOptions
	url: string
	cssVariants?: ExternalFrameworksOptionsCssVariants[] | undefined
}

export class ExternalCssVariant implements ExternalFrameworksOptionsCssVariants {
	constructor(data: ExternalFrameworksOptionsCssVariants) {
		this.name = data.name
		this.parent = data.parent
		this.url = data.url
		this.type = data.type
	}

	name: string
	parent: ExternalFrameworksOptions
	url: string
	type: string
}

export type NatalFrameworkCssVariants =
	| 'default'
	| 'prevenet'
	| 'intermediarios'
	| 'clientes-prestadores'
	| 'prevencion-salud'
