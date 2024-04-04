import { persistentAtom } from '@nanostores/persistent'
import type { IExternalFrameworkModel } from '../types/models/project/externalFrameworkModel'
import type { IExternalFrameworkCssVariantModel } from '../types/models/project/externalFrameworkCssVariantModel'

export interface IFullPreviewStore {
	name: string
	html?: string | null
	javascript?: string | null
	css?: string | null
	externalFramework?: IExternalFrameworkModel | null
	selectedExternalFrameworkCss?: IExternalFrameworkCssVariantModel
}

export const fullPreviewStore = persistentAtom<IFullPreviewStore | null>('full-preview', null, {
	encode: JSON.stringify,
	decode: JSON.parse
})
