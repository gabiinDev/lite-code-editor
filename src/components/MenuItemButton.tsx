import type { MenuItem } from '../types/menuOptions'

export interface Props {
	item: MenuItem
	title: string
	isActive?: boolean
	onClick: (...args: any) => void
}

const cssActive =
	'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'

const cssBase =
	'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'

const MenuItemButton = ({ onClick, title, isActive }: Props) => {
	return (
		<button type='button' class={!isActive ? cssBase : cssActive} onClick={onClick}>
			{
				// eslint-disable-next-line multiline-ternary
				!isActive ? (
					title
				) : (
					<span class='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
						{title}
					</span>
				)
			}
		</button>
	)
}

export default MenuItemButton
