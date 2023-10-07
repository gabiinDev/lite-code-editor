import { atom } from 'nanostores'

import type { ExternalFrameworks, ExternalFrameworksOptionsCssVariants } from '../types/editor'
import { defaultFramework } from '../constants/externalFrameworks'

export const selectedExternalFramework = atom<ExternalFrameworks>(defaultFramework)
export const selectedExternalFrameworkCssVariant = atom<
	ExternalFrameworksOptionsCssVariants | undefined
>()
