/* eslint-disable multiline-ternary */
import { useStore } from '@nanostores/preact'
import useProject from '../hooks/useProject'
import { menuProjectTypeStore } from '../store/menuStore'
// import useToast from '../hooks/useToast'
import {
	PROJECTS_BASE_ROUTE,
	PROJECTS_BASE_URL,
	PROJECTS_JAVASCRIPT_BASE_ROUTE
} from '../types/models/project/projectModel'

const OptionIcon = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			stroke-width='1.5'
			stroke='currentColor'
			class='w-8 h-8 mr-2.5'
		>
			<path
				stroke-linecap='round'
				stroke-linejoin='round'
				d='M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z'
			/>
		</svg>
	)
}

const MenuAside = () => {
	// const { toastHtmlElement, showToast, setShowToast } = useToast()
	const { hasCurrentProject, currentProject } = useProject()
	const menuProjectType = useStore(menuProjectTypeStore)

	const handleShareClick = () => {
		if (hasCurrentProject && (currentProject?.id?.length ?? 0) > 0) {
			const url = `${PROJECTS_BASE_URL}/${currentProject?.slug}`
			navigator.clipboard.writeText(url).then(
				() => {
					/* clipboard successfully set */
					// console.log('copied!')
					// setShowToast(true)
				},
				() => {
					/* clipboard write failed */
					// console.log('copied fail!')
					// setShowToast(false)
				}
			)
		}
	}

	const handleNewProjectByTypeClick = () => {
		if (menuProjectType === 'full-frontend') {
			window.location.href = `${PROJECTS_JAVASCRIPT_BASE_ROUTE}/new`
		} else if (menuProjectType === 'full-javascript') {
			window.location.href = `${PROJECTS_BASE_ROUTE}/new`
		}
	}

	return (
		<aside className='text-base font-semibold text-gray-500 dark:text-gray-400'>
			<div className='flex items-center text-base font-semibold text-gray-500 dark:text-gray-400'>
				<OptionIcon />
				<h5 id='drawer-top-label'>Options</h5>
			</div>
			<nav>
				<ul className='ml-1 mt-3'>
					<li class='mb-1'>
						<a href='/' className='block text-sm hover:text-white'>
							Home
						</a>
					</li>
					<li class='mb-1'>
						<a href='/' className='block text-sm hover:text-white'>
							Projects
						</a>
					</li>
					{hasCurrentProject && (currentProject?.id?.length ?? 0) > 0 ? (
						<li class='mb-1'>
							<button
								as={'a'}
								id='share-button'
								title='Copy url to Clipboard and share project'
								onClick={handleShareClick}
								className='block text-sm hover:text-white'
							>
								Share
							</button>
						</li>
					) : null}
					<li class='mb-1'>
						<button
							as={'a'}
							id='share-button'
							onClick={handleNewProjectByTypeClick}
							className='block text-sm hover:text-white'
						>
							{menuProjectType === 'full-frontend'
								? 'New javascript project'
								: 'New frontend project'}
						</button>
					</li>
				</ul>
			</nav>
			{/* {showToast ? toastHtmlElement : null} */}
		</aside>
	)
}

export default MenuAside
