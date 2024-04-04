/* eslint-disable multiline-ternary */
import MenuUserSection from './MenuUserSection'
import MenuProjectForm from './MenuProjectForm'

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
