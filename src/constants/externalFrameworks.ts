import type { IExternalFrameworkModel } from '../types/models/project/externalFrameworkModel'

export const defaultFramework: IExternalFrameworkModel = {
	id: '1',
	name: 'Default',
	type: 'default',
	url: null,
	default: true,
	cssVariants: null
}

const natalFramework: IExternalFrameworkModel = {
	id: '2',
	default: false,
	name: 'Natal Framework',
	type: 'natal-framework',
	url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf.min.js',
	cssVariants: [
		{
			id: '1',
			idExternalFramework: '2',
			type: 'default',
			name: 'Grupo Sancor Seguros',
			url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf.min.css',
			default: true
		},
		{
			id: '2',
			idExternalFramework: '2',
			type: 'prevenet',
			name: 'Prevenet',
			url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-pnet.min.css',
			default: false
		},
		{
			id: '3',
			idExternalFramework: '2',
			type: 'intermediarios',
			name: 'Intermediarios',
			url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-int.min.css',
			default: false
		},
		{
			id: '4',
			idExternalFramework: '2',
			type: 'clientes-prestadores',
			name: 'Clientes y Prestadores de Sancor Seguros',
			url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-cli.min.css',
			default: false
		},
		{
			id: '5',
			idExternalFramework: '2',
			type: 'prevencion-salud',
			name: 'Prevención Salud',
			url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-ps.min.css',
			default: false
		}
	]
}

const tailwindFramework: IExternalFrameworkModel = {
	id: '3',
	default: false,
	name: 'Tailwind CSS',
	type: 'tailwind',
	url: 'https://cdn.tailwindcss.com',
	cssVariants: null
}

const bootstrapFramework: IExternalFrameworkModel = {
	id: '4',
	default: false,
	name: 'Bootstrap',
	type: 'bootstrap',
	url: '',
	cssVariants: null
}

const flowbiteFramework: IExternalFrameworkModel = {
	id: '5',
	default: false,
	name: 'Flowbite',
	type: 'flowbite',
	url: '',
	cssVariants: null
}

const skypackFramework: IExternalFrameworkModel = {
	id: '6',
	default: false,
	name: 'Skypack',
	type: 'skypack',
	url: '',
	cssVariants: null
}

export const externalFrameworksSource: Array<IExternalFrameworkModel> = [
	defaultFramework,
	natalFramework,
	tailwindFramework,
	bootstrapFramework,
	flowbiteFramework,
	skypackFramework
]
