import { useStore } from '@nanostores/preact'
import { useEffect, useState } from 'preact/hooks'
import type { IUserBasicInfoModel } from '../types/models/user/userModel'
import { currentUserStore, setCurrentUserStore } from '../store/userStore'

const useUser = () => {
	const currentUser = useStore(currentUserStore)
	const [loadingUser, setLoadingUser] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const cleanUser = () => {
		setCurrentUserStore(null)
	}

	useEffect(() => {
		async function getCurrentUser() {
			try {
				const data = await fetch('/api/user/current')
				if (data.ok) {
					const userData: IUserBasicInfoModel | null = await data.json()
					setCurrentUserStore(userData)
				} else {
					setCurrentUserStore(null)
				}
				setLoadingUser(false)
			} catch (error) {
				console.log('error hook usuario', error)
				setLoadingUser(false)
			}
		}

		// if have user in astro session
		// but is not in the store
		if (!currentUser) getCurrentUser()
	}, [])

	useEffect(() => {
		if (currentUser?.username) setIsLoggedIn(true)
		else setIsLoggedIn(false)
	}, [currentUser?.username])

	return {
		currentUser,
		loadingUser,
		isLoggedIn,
		cleanUser,
		username: currentUser?.username,
		avatarUrl: currentUser?.avatarUrl
	}
}

export default useUser
