import { useEffect, useRef } from 'preact/hooks'

import { Drawer } from 'flowbite'
import type { DrawerOptions, DrawerInterface } from 'flowbite'
import OpenMenuButton from './OpenMenuButton'
import CloseMenuButton from './CloseMenuButton'
import MenuHeader from './MenuHeader'
import { type ExternalFrameworksOptions } from '../types/editor'

import { selectedExternalFramework } from '../store/menuStore'
import { externalFrameworkOptions } from '../constants/options'
import MenuItemButton from './MenuItemButton'

import { useStore } from '@nanostores/preact'

const NavBar = () => {
	const $selectedExternalFramework = useStore(selectedExternalFramework)
	const drawerRef = useRef(null as unknown as HTMLDivElement)
	const draweInterfaceRef = useRef(null as unknown as DrawerInterface)

	const handleOpenClick = () => {
		draweInterfaceRef.current.show()
	}

	const handleCloseClick = () => {
		draweInterfaceRef.current.hide()
	}

	const handleOptionClick = (selectedType: ExternalFrameworksOptions) => {
		selectedExternalFramework.set(selectedType)
		draweInterfaceRef.current.hide()
	}

	useEffect(() => {
		// set the drawer menu element
		if (drawerRef.current) {
			const options: DrawerOptions = {
				placement: 'top',
				backdrop: true,
				bodyScrolling: false,
				edge: false,
				edgeOffset: '',
				backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
				onHide: () => {},
				onShow: () => {}
			}

			const drawer: DrawerInterface = new Drawer(drawerRef.current, options)
			draweInterfaceRef.current = drawer
		}
	}, [])
	return (
		<>
			<div class='absolute z-40 -top-4 hover:-top-1 hover:transition-all m-auto left-0 right-0 flex items-center justify-center'>
				<OpenMenuButton handleOpenClick={handleOpenClick} />
			</div>

			<nav
				ref={drawerRef}
				id='drawer-top-example'
				class='fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform -translate-y-full bg-white dark:bg-gray-800 rounded-b-lg shadow-black '
				aria-label='Navigation'
				tabindex={-1}
				aria-labelledby='drawer-top-label'
			>
				<div class='container m-auto grid-rows-2 h-44 place-content-center'>
					<MenuHeader />
					<ul class='pt-3 flex flex-row flex-wrap justify-center'>
						{externalFrameworkOptions.map((item) => {
							return (
								<li class='mb-6 text-sm text-gray-500 dark:text-gray-400 mr-5'>
									<MenuItemButton
										optionType={item.option}
										callbackClick={handleOptionClick}
										title={item.name}
										isActive={$selectedExternalFramework === item.option}
									/>
								</li>
							)
						})}
					</ul>
				</div>
				<CloseMenuButton handleCloseClick={handleCloseClick} />
			</nav>
		</>
	)
}
export default NavBar
