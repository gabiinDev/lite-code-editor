import type { MenuOptions, MenuItem } from '../types/menuOptions'
import { externalFrameworksSource } from './externalFrameworks'

const menuItems: Array<MenuItem> = externalFrameworksSource.map((item) => {
	return {
		name: item.name,
		type: item.type === 'natal-framework' ? 'dropdown' : 'button',
		externalFramework: item
	}
})

export const MenuOptionsSource: MenuOptions = {
	items: menuItems
}
