import type { ExternalFrameworksOptions } from '../types/editor'

export interface Props {
	optionType: ExternalFrameworksOptions
	callbackClick: (type: ExternalFrameworksOptions) => void
	title: string
	isActive?: boolean
}

const cssActive =
	'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'

const cssBase =
	'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'

const MenuItemButton = ({ optionType, callbackClick, title, isActive }: Props) => {
	const handleClick = () => {
		callbackClick(optionType)
	}

	return (
		<button type='button' class={!isActive ? cssBase : cssActive} onClick={handleClick}>
			{!isActive ? (
				title
			) : (
				<span class='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
					{title}
				</span>
			)}
		</button>
	)
}

export default MenuItemButton
