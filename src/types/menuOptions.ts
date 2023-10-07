import type { ExternalFrameworks } from '../types/editor'

export type MenuItemType = 'button' | 'dropdown'

export interface MenuItem {
	name: string
	type: MenuItemType
	externalFramework: ExternalFrameworks
}

export interface MenuOptions {
	items: Array<MenuItem>
}
