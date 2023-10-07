import type { JSX } from 'preact'

export interface Props {
	title: string
	isActive?: boolean
	children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

const MenuDropdown = ({ title, isActive, children }: Props) => {
	const cssActive =
		'relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'

	const cssBase =
		'flex items-center justify-between w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'

	return (
		<>
			<button
				id='dropdownNavbarLink'
				data-dropdown-toggle='dropdownNavbar'
				class={!isActive ? cssBase : cssActive}
			>
				{
					// eslint-disable-next-line multiline-ternary
					!isActive ? (
						<>
							{title}
							<svg
								class='w-2.5 h-2.5 ml-2.5'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 10 6'
							>
								<path
									stroke='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='m1 1 4 4 4-4'
								/>
							</svg>
						</>
					) : (
						<span class='flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
							{title}
							<svg
								class='w-2.5 h-2.5 ml-2.5'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 10 6'
							>
								<path
									stroke='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='m1 1 4 4 4-4'
								/>
							</svg>
						</span>
					)
				}
			</button>
			<div
				id='dropdownNavbar'
				class='z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'
			>
				{children}
			</div>
		</>
	)
}
export default MenuDropdown
