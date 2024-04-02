export interface IUserEntity {
	id: string
	id_account_type: string
	name: string
	email: string
	username: string
	password: string
	created_at: Date
	updated_at?: Date | null
	github_id?: string | null
	github_avatar_url?: string | null
}
