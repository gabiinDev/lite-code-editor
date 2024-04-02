/* eslint-disable multiline-ternary */
import MenuUserSection from './MenuUserSection'
import MenuProjectForm from './MenuProjectForm'

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

const MenuHeader = () => {
	return (
		<header className='pt-5 text-center w-full flex items-center justify-between mx-auto'>
			<div className='flex justify-center items-center w-full'>
				<MenuProjectForm />
			</div>
			<div>
				<MenuUserSection />
			</div>
		</header>
	)
}

export default MenuHeader
