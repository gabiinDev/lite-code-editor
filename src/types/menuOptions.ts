import type { IExternalFrameworkModel } from './models/project/externalFrameworkModel'

export type MenuItemType = 'button' | 'dropdown'

export interface MenuItem {
	name: string
	type: MenuItemType
	externalFramework: IExternalFrameworkModel
}

export interface MenuOptions {
	items: Array<MenuItem>
}

export type ProjectState = 'new' | 'edit' | 'view'
