export interface IUserModel {
	id: string
	idAccountType: string
	name: string
	email: string
	username: string
	password: string
	createdAt: Date
	updatedAt?: Date | null
	githubId?: string | null
	githubAvatarUrl?: string | null
}

export interface IUserBasicInfoModel {
	username: string | null
	avatarUrl?: string | null
}
