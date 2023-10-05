import { create } from 'zustand'
import { type ExternalFrameworksOptions } from '../types/editor'

interface CustomOptionsState {
	selectedExternalFramework: ExternalFrameworksOptions | null
	setExternalFramework: (externalFramework: ExternalFrameworksOptions) => void
}

export const useCustomOptionsStore = create<CustomOptionsState>((set) => ({
	selectedExternalFramework: null,
	setExternalFramework(externalFramework: ExternalFrameworksOptions) {
		set({ selectedExternalFramework: externalFramework })
	}
}))
