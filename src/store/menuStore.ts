import { atom } from 'nanostores'

import { type ExternalFrameworksOptions } from '../types/editor'

// interface CustomOptionsState {
// 	selectedExternalFramework: ExternalFrameworksOptions | null
// 	setExternalFramework: (externalFramework: ExternalFrameworksOptions) => void
// }

export const selectedExternalFramework = atom<ExternalFrameworksOptions>('default')
