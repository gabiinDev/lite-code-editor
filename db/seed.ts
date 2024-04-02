import {
	db,
	AccountType,
	ProjectType,
	ProjectExternalFramework,
	ProjectExternalFrameworkCss
} from 'astro:db'

export default async function () {
	let migrationStep = ''
	try {
		console.log('pasa por aca')
		// poblar tipos de cuenta
		migrationStep = 'poblar tipos de cuenta'
		await db.insert(AccountType).values([
			{ id: '1', name: 'site' },
			{ id: '2', name: 'github' }
		])

		// poblar tipos de proyecto
		migrationStep = 'poblar tipos de proyecto'
		await db.insert(ProjectType).values([
			{
				id: '1',
				name: 'full-frontend',
				description: 'Tipo de proyecto que integra HTML, JS y CSS'
			},
			{
				id: '2',
				name: 'full-javascript',
				description: 'Tipo de proyecto que solo Javascript al estilo RunJs'
			}
		])

		// poblar frameworks
		migrationStep = 'poblar frameworks'
		const idNatalFramework = '3'
		await db.insert(ProjectExternalFramework).values([
			{ id: '1', name: 'Default', type: 'default', default: true },
			{ id: '2', name: 'Tailwind CSS', type: 'tailwind', url: 'https://cdn.tailwindcss.com' },
			{
				id: idNatalFramework,
				name: 'Natal Framework',
				type: 'natal-framework',
				url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf.min.js',
				default: false
			}
		])

		// poblar variantes css de frameworks
		migrationStep = 'poblar variantes css de frameworks'
		await db.insert(ProjectExternalFrameworkCss).values([
			{
				id: '1',
				name: 'Grupo Sancor Seguros',
				type: 'default',
				url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf.min.css',
				default: true,
				id_external_framework: idNatalFramework
			},
			{
				id: '2',
				name: 'Prevenet',
				type: 'prevenet',
				url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-pnet.min.css',
				default: false,
				id_external_framework: idNatalFramework
			},
			{
				id: '3',
				name: 'Intermediarios',
				type: 'intermediarios',
				url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-int.min.css',
				default: false,
				id_external_framework: idNatalFramework
			},
			{
				id: '4',
				name: 'Clientes y Prestadores de Sancor Seguros',
				type: 'clientes-prestadores',
				url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-cli.min.css',
				default: false,
				id_external_framework: idNatalFramework
			},
			{
				id: '5',
				name: 'Prevención Salud',
				type: 'prevencion-salud',
				url: 'https://natalfwk.gruposancorseguros.com/2.3.2/nf-ps.min.css',
				default: false,
				id_external_framework: idNatalFramework
			}
		])
	} catch (e) {
		console.error('Error en paso: ', migrationStep)
		console.error('Error detalle: ', e)
	}
}
