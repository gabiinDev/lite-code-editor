import MenuIcon from '../icon/MenuIcon'

export interface Props {
	handleOpenClick: () => void
}

const OpenMenuButton = ({ handleOpenClick }: Props) => {
	return (
		<button
			class='text-white bg-neutral-600 opacity-90 hover:opacity-80 rounded-full shadow-md shadow-black'
			type='button'
			data-drawer-target='drawer-top-example'
			data-drawer-show='drawer-top-example'
			data-drawer-placement='top'
			aria-controls='drawer-top-example'
			onClick={handleOpenClick}
			title={'Open menu'}
		>
			<MenuIcon className='hover:animate-spin rounded-full w-8 h-8 p-1 ring-1 ring-gray-white dark:ring-gray-500' />
		</button>
	)
}

export default OpenMenuButton
