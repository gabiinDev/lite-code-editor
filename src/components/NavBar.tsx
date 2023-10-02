import { useEffect, useRef } from 'preact/hooks'

import { Drawer } from 'flowbite'
import type { DrawerOptions, DrawerInterface } from 'flowbite'
import MenuIcon from '../icon/MenuIcon'

const NavBar = () => {
	const drawerRef = useRef(null as unknown as HTMLDivElement)
	const draweInterfaceRef = useRef(null as unknown as DrawerInterface)
	const handleShowClick = () => {
		draweInterfaceRef.current.show()
	}

	const handleHideClick = () => {
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
				onHide: () => {
					console.log('drawer is hidden')
				},
				onShow: () => {
					console.log('drawer is shown')
				}
			}

			const drawer: DrawerInterface = new Drawer(drawerRef.current, options)
			draweInterfaceRef.current = drawer
		}
	}, [])

	return (
		<>
			<div class='absolute z-40 top-0 lg:left-[calc(100%-51.3%)] md:left-[calc(100%-52.6%)] mt-1'>
				<button
					class='text-white hover:animate-spin'
					type='button'
					data-drawer-target='drawer-top-example'
					data-drawer-show='drawer-top-example'
					data-drawer-placement='top'
					aria-controls='drawer-top-example'
					onClick={handleShowClick}
				>
					<MenuIcon className='rounded-full w-8 h-8 p-1 ring-2 ring-gray-300 dark:ring-gray-500' />
				</button>
			</div>

			<div
				ref={drawerRef}
				id='drawer-top-example'
				class='fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform -translate-y-full bg-white dark:bg-gray-800'
				tabindex={-1}
				aria-labelledby='drawer-top-label'
			>
				<h5
					id='drawer-top-label'
					class='inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400'
				>
					<svg
						class='w-4 h-4 mr-2.5'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 20 20'
					>
						<path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
					</svg>
					Top drawer
				</h5>
				<button
					type='button'
					onClick={handleHideClick}
					data-drawer-hide='drawer-top-example'
					aria-controls='drawer-top-example'
					class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
				>
					<svg
						class='w-3 h-3'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 14 14'
					>
						<path
							stroke='currentColor'
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
						/>
					</svg>
					<span class='sr-only'>Close menu</span>
				</button>
				<p class='max-w-lg mb-6 text-sm text-gray-500 dark:text-gray-400'>
					Supercharge your hiring by taking advantage of our{' '}
					<a
						href='#'
						class='text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline'
					>
						limited-time sale
					</a>{' '}
					for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the
					#1 design job board.
				</p>
				<a
					href='#'
					class='px-4 py-2 mr-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
				>
					Learn more
				</a>
				<a
					href='#'
					class='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
				>
					Get access{' '}
					<svg
						class='w-3.5 h-3.5 ml-2'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 14 10'
					>
						<path
							stroke='currentColor'
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M1 5h12m0 0L9 1m4 4L9 9'
						/>
					</svg>
				</a>
			</div>
		</>
	)
}
export default NavBar
