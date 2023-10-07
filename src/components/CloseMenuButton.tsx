export interface Props {
	onClick?: (...args: any) => void
}

const CloseMenuButton = ({ onClick }: Props) => {
	return (
		<div class='absolute m-auto left-0 right-0 -bottom-3 flex items-center justify-center'>
			<button
				type='button'
				class='text-white bg-neutral-600 opacity-90 hover:opacity-80 rounded-full shadow-md shadow-black'
				onClick={onClick}
			>
				<svg
					class='rounded-full w-6 h-6 p-1 ring-1 ring-gray-white dark:ring-gray-500'
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
			</button>
		</div>
	)
}

export default CloseMenuButton
