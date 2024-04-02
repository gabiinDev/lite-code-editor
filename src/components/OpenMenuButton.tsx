import MenuIcon from '../icon/MenuIcon'

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onClick: (...args: any) => void
}

const OpenMenuButton = ({ onClick }: Props) => {
	return (
		<button
			class='text-white bg-neutral-600 opacity-90 hover:opacity-80 rounded-full shadow-md shadow-black'
			type='button'
			data-drawer-placement='top'
			title={'Open menu'}
			onClick={onClick}
		>
			<MenuIcon className='hover:animate-spin rounded-full w-8 h-8 p-1 ring-1 ring-gray-white dark:ring-gray-500' />
		</button>
	)
}

export default OpenMenuButton
