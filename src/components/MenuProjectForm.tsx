/* eslint-disable multiline-ternary */
import { useEffect, useRef, useState } from 'preact/hooks'
import { menuOpenStore } from '../store/menuStore'
import SaveIcon from '../icon/SaveIcon'
import CloseIcon from '../icon/CloseIcon'
import { useStore } from '@nanostores/preact'
import useUser from '../hooks/useUser'
import useProject from '../hooks/useProject'
import Loading from './Loading'
// import useAceptOrCancelModal from '../hooks/useAceptOrCancelModal'

const MenuProjectForm = () => {
	const menuOpen = useStore(menuOpenStore)
	const [isEditing, setIsEditing] = useState(false)
	const inputRef = useRef(null as unknown as HTMLInputElement)
	const { isLoggedIn } = useUser()
	const { currentProject, hasCurrentProject, setCurrentProject, addEditProject, savingProject } =
		useProject()

	// const { showModal, hideModal, ModalHtmlElement } = useAceptOrCancelModal({
	// 	elementId: 'popup-modal'
	// })

	const handleDiscartChangesClick = (e: Event) => {
		e.preventDefault()
		setIsEditing(false)
	}

	const handleSaveChangesClick = async (e: Event) => {
		e.preventDefault()
		await saveChanges()
	}

	const saveChanges = async () => {
		if (isLoggedIn && currentProject && currentProject?.config) {
			if (currentProject?.id?.length > 0) {
				// show confirmation dialog
				// to edit project data
				// showConfirm()
				console.log('dialog showwwwwww')
			} else {
				setIsEditing(false)
				currentProject.name = inputRef.current.value
				setCurrentProject(currentProject)
				await addEditProject()
			}
		}
	}

	// const handleSaveKeyCombination = async (e: KeyboardEvent) => {
	// 	if (isLoggedIn && e.ctrlKey && e.key === 's') {
	// 		e.preventDefault()
	// 		await saveChanges()
	// 	}
	// }

	// const showConfirm = () => {
	// 	showModal('¿Esta seguro que desea sobreescribir los cambios?')
	// }

	// useEffect(() => {
	// 	if (hasCurrentProject) {
	// 		console.log('set event listener')
	// 		// set event listener for ctrl + s
	// 		document.addEventListener('keydown', handleSaveKeyCombination)
	// 		return () => {
	// 			console.log('remove event listener')
	// 			document.removeEventListener('keydown', handleSaveKeyCombination)
	// 		}
	// 	}
	// }, [hasCurrentProject])

	useEffect(() => {
		if (isEditing && inputRef.current) inputRef.current.focus()
	}, [isEditing])

	useEffect(() => {
		if (!menuOpen) setIsEditing(false)
	}, [menuOpen])
	return (
		<>
			{!savingProject && hasCurrentProject ? (
				<div className='flex items-center justify-center'>
					{!isEditing ? (
						<div
							className='flex flex-col items-center justify-center w-full text-center'
							onDblClick={isLoggedIn ? () => setIsEditing(true) : undefined}
						>
							<h2
								class={
									isLoggedIn
										? 'mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white hover:cursor-pointer select-none'
										: 'mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white select-none'
								}
							>
								{currentProject?.name ?? ''}
							</h2>
							{isLoggedIn ? (
								<small className='text-gray-500 dark:text-gray-400 text-right text-xs'>
									Double click project name to edit
								</small>
							) : (
								<a href={'/login'} className='text-gray-500 dark:text-gray-400 text-right text-xs'>
									Login to keep save your changes
								</a>
							)}
						</div>
					) : (
						<form className='max-w-md mx-auto w-full flex flex-row gap-3'>
							<div className='relative z-0 w-full mb-5 group'>
								<input
									ref={inputRef}
									value={currentProject?.name}
									type='text'
									name='project-name'
									id='project-name'
									className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									required
									placeholder={currentProject?.name}
								/>
							</div>
							<div className='flex flex-row gap-3'>
								<button title='Save project' onClick={handleSaveChangesClick}>
									<SaveIcon
										fill='none'
										className='text-white rounded-full w-6 h-6 p-1 ring-1 ring-gray-white dark:ring-gray-500'
									/>
								</button>
								<button title='Discart' onClick={handleDiscartChangesClick}>
									<CloseIcon
										fill='none'
										className='text-white rounded-full w-6 h-6 p-1 ring-1 ring-gray-white dark:ring-gray-500'
									/>
								</button>
							</div>
						</form>
					)}
				</div>
			) : (
				<Loading />
			)}
			{/* {ModalHtmlElement()} */}
			{/* <AceptOrCancelModal
				elementId='popup-modal'
				content='¿Esta seguro que desea sobreescribir los cambios?'
			/> */}
		</>
	)
}

export default MenuProjectForm
