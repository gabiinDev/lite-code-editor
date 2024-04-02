import { atom } from 'nanostores'
import { type IProjectModel } from '../types/models/project/projectModel'
import type { IProjectConfigModel } from '../types/models/project/projectConfigModel'

const currentProjectStore = atom<IProjectModel | null>(null)
const hasCurrentProjectStore = atom<boolean>(false)

function setCurrentProjectStore(project: IProjectModel) {
	const current = { ...currentProjectStore.get(), ...project } as IProjectModel
	currentProjectStore.set(current)
}

function setCurrentProjectConfigStore(config: IProjectConfigModel) {
	const current = { ...currentProjectStore.get(), config: { ...config } } as IProjectModel
	currentProjectStore.set(current)
}

function setHasCurrentProjectStore(project: boolean) {
	hasCurrentProjectStore.set(project)
}

export {
	currentProjectStore,
	hasCurrentProjectStore,
	setCurrentProjectStore,
	setCurrentProjectConfigStore,
	setHasCurrentProjectStore
}
