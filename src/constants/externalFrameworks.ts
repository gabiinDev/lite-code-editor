import { ExternalFramework, type ExternalFrameworks } from '../types/editor'

export const defaultFramework = new ExternalFramework({
	default: true,
	name: 'Default',
	type: 'default',
	url: ''
})

const natalFramework = new ExternalFramework({
	default: false,
	name: 'Natal Framework',
	type: 'natal-framework',
	url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf.min.js',
	cssVariants: [
		{
			type: 'default',
			parent: 'natal-framework',
			name: 'Grupo Sancor Seguros',
			url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf.min.css'
		},
		{
			type: 'prevenet',
			parent: 'natal-framework',
			name: 'Prevenet',
			url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-pnet.min.css'
		},
		{
			type: 'intermediarios',
			parent: 'natal-framework',
			name: 'Intermediarios',
			url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-int.min.css'
		},
		{
			type: 'clientes-prestadores',
			parent: 'natal-framework',
			name: 'Clientes y Prestadores de Sancor Seguros',
			url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-cli.min.css'
		},
		{
			type: 'prevencion-salud',
			parent: 'natal-framework',
			name: 'Prevención Salud',
			url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-ps.min.css'
		}
	]
})

const tailwindFramework = new ExternalFramework({
	default: false,
	name: 'Tailwind CSS',
	type: 'tailwind',
	url: 'https://cdn.tailwindcss.com'
})

const bootstrapFramework = new ExternalFramework({
	default: false,
	name: 'Bootstrap',
	type: 'bootstrap',
	url: ''
})

const flowbiteFramework = new ExternalFramework({
	default: false,
	name: 'Flowbite',
	type: 'flowbite',
	url: ''
})

const skypackFramework = new ExternalFramework({
	default: false,
	name: 'Skypack',
	type: 'skypack',
	url: ''
})

export const externalFrameworksSource: Array<ExternalFrameworks> = [
	defaultFramework,
	natalFramework,
	tailwindFramework,
	bootstrapFramework,
	flowbiteFramework,
	skypackFramework
]
