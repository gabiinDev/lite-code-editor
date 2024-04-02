import { atom } from 'nanostores'
import type { MenuItem } from '../types/menuOptions'

const menuExternalFrameworksStore = atom<MenuItem[] | null>(null)

const setMenuExternalFrameworksStore = (value: MenuItem[] | null) => {
	menuExternalFrameworksStore.set(value)
}

const menuOpenStore = atom(false)

const setMenuOpenStore = (value: boolean) => {
	menuOpenStore.set(value)
}

export {
	menuExternalFrameworksStore,
	setMenuExternalFrameworksStore,
	menuOpenStore,
	setMenuOpenStore
}
