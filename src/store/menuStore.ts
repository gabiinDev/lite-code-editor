import { atom } from 'nanostores'
import type { MenuItem } from '../types/menuOptions'
import { type ProjectType } from '../types/models/project/projectTypeModel'

const menuExternalFrameworksStore = atom<MenuItem[] | null>(null)

const setMenuExternalFrameworksStore = (value: MenuItem[] | null) => {
	menuExternalFrameworksStore.set(value)
}

const menuOpenStore = atom(false)
const menuProjectTypeStore = atom<ProjectType | null>(null)

const setMenuOpenStore = (value: boolean) => {
	menuOpenStore.set(value)
}

const setMenuProjectTypeStore = (value: ProjectType | null) => {
	menuProjectTypeStore.set(value)
}

export {
	menuExternalFrameworksStore,
	setMenuExternalFrameworksStore,
	menuOpenStore,
	menuProjectTypeStore,
	setMenuOpenStore,
	setMenuProjectTypeStore
}
