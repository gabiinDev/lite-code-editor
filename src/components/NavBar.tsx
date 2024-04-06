/* eslint-disable multiline-ternary */
import { useEffect, useRef } from 'preact/hooks'

import { menuOpenStore, menuProjectTypeStore, setMenuOpenStore } from '../store/menuStore'

import { Drawer } from 'flowbite'
import type { DrawerOptions, DrawerInterface } from 'flowbite'

import OpenMenuButton from './OpenMenuButton'
import CloseMenuButton from './CloseMenuButton'
import MenuFrameworkList from './MenuFrameworkList'
import { useStore } from '@nanostores/preact'
import MenuAside from './MenuAside'
import MenuProjectForm from './MenuProjectForm'
import MenuUserSection from './MenuUserSection'

const NavBar = () => {
	const menuOpen = useStore(menuOpenStore)
	const menuProjectType = useStore(menuProjectTypeStore)
	const drawerElementRef = useRef(null as unknown as HTMLDivElement)
	const drawerRef = useRef(null as unknown as DrawerInterface)

	const handleShowMenu = () => {
		setMenuOpenStore(true)
	}

	const handleCloseMenu = () => {
		setMenuOpenStore(false)
	}

	useEffect(() => {
		if (drawerElementRef.current) {
			const options: DrawerOptions = {
				placement: 'top',
				backdrop: true,
				bodyScrolling: false,
				edge: false,
				edgeOffset: '',
				onHide: () => {
					setMenuOpenStore(false)
				}
			}

			const drawer: DrawerInterface = new Drawer(drawerElementRef.current, options)
			drawerRef.current = drawer
		}
	}, [])

	useEffect(() => {
		if (drawerElementRef.current) {
			if (menuOpen) drawerRef.current.show()
			else drawerRef.current.hide()
		}
	}, [menuOpen])

	return (
		<>
			<div className='absolute z-40 -top-4 hover:-top-1 hover:transition-all m-auto left-0 right-0 flex items-center justify-center'>
				<OpenMenuButton onClick={handleShowMenu} />
			</div>

			<nav
				ref={drawerElementRef}
				className='fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform -translate-y-full bg-white dark:bg-gray-800 rounded-b-lg shadow-black h-[38%]'
				tabindex={-1}
			>
				<div className='container mx-auto'>
					<div className='flex w-full justify-between items-center gap-2 pt-5 mb-5'>
						<div className='mr-auto'>
							<MenuAside />
						</div>
						<div className='mx-auto flex justify-center items-center'>
							<MenuProjectForm />
						</div>
						<div className='ml-auto'>
							<MenuUserSection />
						</div>
					</div>
					{menuProjectType === 'full-frontend' ? (
						<div className='flex flex-row w-full justify-center items-center'>
							<MenuFrameworkList />
						</div>
					) : null}
					{
						// eslint-disable-next-line multiline-ternary
						menuOpen ? <CloseMenuButton onClick={handleCloseMenu} /> : null
					}
				</div>
			</nav>
		</>
	)
}
export default NavBar
