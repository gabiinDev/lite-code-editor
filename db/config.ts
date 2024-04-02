import { column, defineDb, defineTable } from 'astro:db'

const AccountType = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true, optional: false }),
		name: column.text({ unique: true, optional: false })
	}
})

const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true, optional: false }),
		id_account_type: column.text({ references: () => AccountType.columns.id, optional: false }),
		name: column.text({ optional: true }),
		email: column.text({ unique: true, optional: false }),
		username: column.text({ unique: true, optional: false }),
		password: column.text({ optional: false }),
		created_at: column.date({ optional: false }),
		updated_at: column.date({ optional: true }),
		github_id: column.text({ optional: true, unique: true }),
		github_avatar_url: column.text({ optional: true, unique: false })
	}
})

const UserSession = defineTable({
	columns: {
		id: column.text({ optional: false, unique: true }),
		userId: column.text({ optional: false, references: () => User.columns.id }),
		expiresAt: column.number({ optional: false })
	}
})

const ProjectType = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true, optional: false }),
		name: column.text({ unique: true, optional: false }),
		description: column.text({ optional: true })
	}
})

const Project = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true, optional: false }),
		id_type: column.text({ references: () => ProjectType.columns.id, optional: false }),
		id_user: column.text({ references: () => User.columns.id, optional: false }),
		name: column.text({ unique: true, optional: false }),
		description: column.text({ optional: true }),
		url: column.text({ optional: true }),
		slug: column.text({ unique: true, optional: true }),
		created_at: column.date({ optional: false }),
		updated_at: column.date({ optional: true })
	}
})

const ProjectExternalFrameworkCss = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true, optional: false }),
		name: column.text({ unique: true, optional: false }),
		type: column.text({ optional: false, unique: true }),
		url: column.text({ optional: true }),
		default: column.boolean({ optional: false }),
		id_external_framework: column.text({
			references: () => ProjectExternalFramework.columns.id,
			optional: false
		})
	}
})

const ProjectExternalFramework = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true, optional: false }),
		name: column.text({ unique: true, optional: false }),
		type: column.text({ optional: false, unique: true }),
		url: column.text({ optional: true }),
		default: column.boolean({ optional: true })
	}
})

const ProjectConfig = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true, optional: false }),
		id_project: column.text({ references: () => Project.columns.id, optional: false }),
		html: column.text({ optional: true }),
		javascript: column.text({ optional: true }),
		css: column.text({ optional: true }),
		id_external_framework: column.text({
			references: () => ProjectExternalFramework.columns.id,
			optional: false
		}),
		id_selected_external_framework_css: column.text({
			references: () => ProjectExternalFrameworkCss.columns.id,
			optional: true
		})
	}
})

export default defineDb({
	tables: {
		AccountType,
		User,
		UserSession,
		ProjectType,
		Project,
		ProjectConfig,
		ProjectExternalFramework,
		ProjectExternalFrameworkCss
	}
})
