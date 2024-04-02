import type { IProjectExternalFrameworkCssEntity } from '../../entities/project/projectExternalFrameworkCssEntity'
import type { IProjectExternalFrameworkEntity } from '../../entities/project/projectExternalFrameworkEntity'
import type { IGetExternalFrameworksQueryResult } from './externalFrameworkQueryEntity'

export function getExternalFrameworksQueryMap(
	data: {
		projectExternalFramework: IProjectExternalFrameworkEntity
		projectExternalFrameworkCssVariant: IProjectExternalFrameworkCssEntity | null
	}[]
): IGetExternalFrameworksQueryResult[] {
	const resultMap = new Map<string, IGetExternalFrameworksQueryResult>()

	data.forEach((item) => {
		const externalFrameworkId = item.projectExternalFramework.id
		const cssVariant = item.projectExternalFrameworkCssVariant

		if (!resultMap.has(externalFrameworkId)) {
			resultMap.set(externalFrameworkId, {
				id: item.projectExternalFramework.id,
				name: item.projectExternalFramework.name,
				type: item.projectExternalFramework.type,
				url: item.projectExternalFramework.url,
				default: item.projectExternalFramework.default,
				cssVariants: []
			})
		}

		if (cssVariant) {
			resultMap.get(externalFrameworkId)!.cssVariants!.push({
				id: cssVariant.id,
				name: cssVariant.name,
				type: cssVariant.type,
				url: cssVariant.url,
				default: cssVariant.default,
				id_external_framework: cssVariant.id_external_framework
			})
		}
	})

	return Array.from(resultMap.values())
}

export function getExternalFrameworkByIdQueryMap(
	data: {
		projectExternalFramework: IProjectExternalFrameworkEntity
		projectExternalFrameworkCssVariant: IProjectExternalFrameworkCssEntity | null
	}[]
): IGetExternalFrameworksQueryResult {
	const projectExternalFramework = data.at(0)!.projectExternalFramework
	const projectExternalFrameworkCssVariants: IProjectExternalFrameworkCssEntity[] | null = []

	data.forEach((item) => {
		if (
			item?.projectExternalFrameworkCssVariant?.id_external_framework ===
			projectExternalFramework.id
		) {
			projectExternalFrameworkCssVariants.push(item.projectExternalFrameworkCssVariant)
		}
	})

	return {
		...projectExternalFramework,
		cssVariants: projectExternalFrameworkCssVariants
	}
}
