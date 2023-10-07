import { useEffect, useRef, useState } from 'preact/hooks'
import { useStore } from '@nanostores/preact'

import { selectedExternalFramework, selectedExternalFrameworkCssVariant } from '../store/menuStore'

import { Drawer, initDropdowns } from 'flowbite'
import type { DrawerOptions, DrawerInterface } from 'flowbite'

import OpenMenuButton from './OpenMenuButton'
import MenuHeader from './MenuHeader'
import MenuItemButton from '../components/MenuItemButton'

import type { MenuItem } from '../types/menuOptions'
import type { ExternalFrameworksOptionsCssVariants } from '../types/editor'
import { MenuOptionsSource } from '../constants/menuOptions'
import MenuDropdown from './MenuDropdown'
import CloseMenuButton from './CloseMenuButton'

const NavBar = () => {
	const $selectedExternalFramework = useStore(selectedExternalFramework)
	const $selectedExternalFrameworkCssVariant = useStore(selectedExternalFrameworkCssVariant)
	const drawerElementRef = useRef(null as unknown as HTMLDivElement)
	const drawerRef = useRef(null as unknown as DrawerInterface)
	const [showCloseButton, setShowCloseButton] = useState(false)

	const handleOptionClick = (
		{ externalFramework }: MenuItem,
		selectedVariant?: ExternalFrameworksOptionsCssVariants | undefined
	) => {
		selectedExternalFramework.set(externalFramework)
		selectedExternalFrameworkCssVariant.set(selectedVariant)
		// handleCloseMenu()
	}

	const handleShowMenu = () => {
		drawerRef.current.show()
		setShowCloseButton(true)
	}

	const handleCloseMenu = () => {
		drawerRef.current.hide()
		setShowCloseButton(false)
	}

	useEffect(() => {
		initDropdowns()
	}, [])

	useEffect(() => {
		if (drawerElementRef.current) {
			const options: DrawerOptions = {
				placement: 'top',
				backdrop: true,
				bodyScrolling: false,
				edge: false,
				edgeOffset: '',
				onHide: () => {
					setShowCloseButton(false)
				}
			}

			const drawer: DrawerInterface = new Drawer(drawerElementRef.current, options)
			drawerRef.current = drawer
		}
	}, [])

	return (
		<>
			<div class='absolute z-40 -top-4 hover:-top-1 hover:transition-all m-auto left-0 right-0 flex items-center justify-center'>
				<OpenMenuButton onClick={handleShowMenu} />
			</div>

			<nav
				ref={drawerElementRef}
				class='fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform -translate-y-full bg-white dark:bg-gray-800 rounded-b-lg shadow-black h-[30%]'
				tabindex={-1}
			>
				<div class='container m-auto grid-rows-2 h-44 place-content-center'>
					<MenuHeader />
					<ul class='pt-3 flex flex-row flex-wrap justify-center'>
						{MenuOptionsSource.items.map((item) => {
							return (
								<li class='mb-6 text-sm text-gray-500 dark:text-gray-400 mr-5'>
									{
										// eslint-disable-next-line multiline-ternary
										item.type === 'button' ? (
											<MenuItemButton
												item={item}
												onClick={() => handleOptionClick(item)}
												title={item.name}
												isActive={$selectedExternalFramework.type === item.externalFramework.type}
											/>
										) : (
											<MenuDropdown
												title={item.name}
												isActive={$selectedExternalFramework.type === item.externalFramework.type}
											>
												<ul
													class='p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200'
													aria-labelledby='dropdownNavbarLink'
												>
													{item.externalFramework?.cssVariants?.map((variant, index) => {
														return (
															<li>
																<div class='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
																	<input
																		id={`radio-${index}`}
																		type='radio'
																		value={variant.name}
																		name={`radio-${variant.parent}`}
																		class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
																		onClick={() => handleOptionClick(item, variant)}
																		checked={
																			$selectedExternalFrameworkCssVariant?.name === variant.name
																		}
																	/>
																	<label
																		for={`radio-${index}`}
																		class='w-full ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
																	>
																		{variant.name}
																	</label>
																</div>
															</li>
														)
													})}
												</ul>
											</MenuDropdown>
										)
									}
								</li>
							)
						})}
					</ul>
					{
						// eslint-disable-next-line multiline-ternary
						showCloseButton ? <CloseMenuButton onClick={handleCloseMenu} /> : null
					}
				</div>
			</nav>
		</>
	)
}
export default NavBar
