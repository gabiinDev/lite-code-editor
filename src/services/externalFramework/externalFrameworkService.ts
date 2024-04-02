/* eslint-disable indent */
import type {
	ExternalFrameworkTypes,
	IExternalFrameworkModel
} from '../../types/models/project/externalFrameworkModel'
import {
	getExternalFrameworkByIdQuery,
	getExternalFrameworksQuery
} from '../../data/repository/externalFramework/externalFrameworkRepository'
import type {
	ExternalFrameworkCssVariantTypes,
	IExternalFrameworkCssVariantModel
} from '../../types/models/project/externalFrameworkCssVariantModel'
import { ServiceResponse, type IServiceResult } from '../serviceResponse'

export async function getExternalFrameworksService(): Promise<
	IServiceResult<IExternalFrameworkModel[] | null>
> {
	const externalFrameworksResult = await getExternalFrameworksQuery()

	if (externalFrameworksResult.status.type === 'error') {
		return ServiceResponse.error(externalFrameworksResult.errors!)
	}

	const mappedData = externalFrameworksResult.data!.map((externalFramework) => {
		return {
			id: externalFramework.id,
			name: externalFramework.name,
			type: externalFramework.type as ExternalFrameworkTypes,
			url: externalFramework.url,
			default: externalFramework.default,
			cssVariants: externalFramework.cssVariants?.map((cssVariant) => {
				return {
					id: cssVariant.id,
					idExternalFramework: cssVariant.id_external_framework,
					name: cssVariant.name,
					type: cssVariant.type as ExternalFrameworkCssVariantTypes,
					url: cssVariant.url,
					default: cssVariant.default
				} as IExternalFrameworkCssVariantModel
			})
		} as IExternalFrameworkModel
	})

	return ServiceResponse.success(mappedData)
}

export async function getExternalFrameworkByIdService(
	id: string
): Promise<IServiceResult<IExternalFrameworkModel | null>> {
	const externalFrameworksResult = await getExternalFrameworkByIdQuery(id)
	if (externalFrameworksResult.status.type === 'error') {
		return ServiceResponse.error(externalFrameworksResult.errors!)
	}

	if (!externalFrameworksResult?.data) {
		return ServiceResponse.error('Not found external framework')
	}

	const mappedData = {
		id: externalFrameworksResult.data.id,
		name: externalFrameworksResult.data.name,
		type: externalFrameworksResult.data.type as ExternalFrameworkTypes,
		url: externalFrameworksResult.data.url,
		default: externalFrameworksResult.data.default,
		cssVariants: externalFrameworksResult.data?.cssVariants?.map((cssVariant) => {
			return {
				id: cssVariant.id,
				idExternalFramework: cssVariant.id_external_framework,
				name: cssVariant.name,
				type: cssVariant.type as ExternalFrameworkCssVariantTypes,
				url: cssVariant.url,
				default: cssVariant.default
			} as IExternalFrameworkCssVariantModel
		})
	} as IExternalFrameworkModel

	return ServiceResponse.success(mappedData)
}
