import type { ExternalFrameworksOptions } from '../types/editor'

export const externalFrameworkOptions: Array<{ name: string; option: ExternalFrameworksOptions }> =
	[
		{ name: 'Default', option: 'default' },
		{ name: 'Tailwind CSS', option: 'tailwind' },
		{ name: 'Natal Framework', option: 'natal-framework' },
		{ name: 'Bootstrap', option: 'bootstrap' },
		{ name: 'Flowbite', option: 'flowbite' },
		{ name: 'Skypack', option: 'skypack' }
	]
