const MenuHeader = () => {
	return (
		<header class='pt-5 text-center'>
			<h5
				id='drawer-top-label'
				class='w-full inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400'
			>
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
				Options
			</h5>
		</header>
	)
}

export default MenuHeader
