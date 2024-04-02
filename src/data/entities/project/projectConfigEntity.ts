export interface IProjectConfigEntity {
	id: string
	id_project: string
	id_external_framework: string
	id_selected_external_framework_css?: string | null
	html?: string | null
	javascript?: string | null
	css?: string | null
}
