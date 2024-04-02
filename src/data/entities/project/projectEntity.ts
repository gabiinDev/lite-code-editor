export interface IProjectEntity {
	id: string
	id_type: string
	id_user: string
	name: string
	description?: string | null
	url?: string | null
	slug?: string | null
	created_at: Date
	updated_at?: Date | null
}
