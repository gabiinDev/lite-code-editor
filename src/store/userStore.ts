import { atom } from 'nanostores'
import type { IUserBasicInfoModel } from '../types/models/user/userModel'

const currentUserStore = atom<IUserBasicInfoModel | null>(null)

function setCurrentUserStore(user: IUserBasicInfoModel | null) {
	if (!user) return currentUserStore.set(null)

	const current = { ...currentUserStore.get(), ...user } as IUserBasicInfoModel
	currentUserStore.set(current)
}

export { currentUserStore, setCurrentUserStore }
