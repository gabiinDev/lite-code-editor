/* eslint-disable multiline-ternary */
import useUser from '../hooks/useUser'
import GithubIcon from '../icon/GithubIcon'
import NoAvatarIcon from '../icon/NoAvatarIcon'

const MenuUserSection = () => {
	const { isLoggedIn, avatarUrl, username, cleanUser } = useUser()
	const handleLogoutClick = (e: Event) => {
		e.preventDefault()
		if (isLoggedIn) cleanUser()
		window.location.href = '/api/auth/signout'
	}

	const handleSigninClick = (e: Event) => {
		e.preventDefault()
		if (isLoggedIn) cleanUser()
		window.location.href = '/api/auth/github'
	}

	return isLoggedIn ? (
		<div className='flex items-center'>
			<div className='flex flex-col items-center'>
				<span className='text-sm text-gray-500 dark:text-gray-400 mr-3'>{username}</span>
				<button
					onClick={handleLogoutClick}
					className='text-xs text-blue-500 dark:text-blue-400 hover:underline mt-1'
				>
					Logout
				</button>
			</div>
			{avatarUrl ? (
				<img
					className='w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500'
					src={avatarUrl}
					alt={`imagen avatar de ${username}`}
				/>
			) : (
				<div class='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
					<NoAvatarIcon className='absolute w-12 h-12 text-gray-400 -left-1' />
				</div>
			)}
		</div>
	) : (
		<button
			onClick={handleSigninClick}
			className='flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-md'
		>
			<GithubIcon className='mr-2 w-6 h-6' fill='#ffffff' />
			<span className='text-sm'>Sign in with Github</span>
		</button>
	)
}

export default MenuUserSection
