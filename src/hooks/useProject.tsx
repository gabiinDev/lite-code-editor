import { useStore } from '@nanostores/preact'
import {
	currentProjectStore,
	setCurrentProjectStore,
	setCurrentProjectConfigStore,
	hasCurrentProjectStore,
	setHasCurrentProjectStore
} from '../store/projectStore'
import { PROJECT_DEFAULT_TEMPLATE, type IProjectModel } from '../types/models/project/projectModel'
import type { IProjectConfigModel } from '../types/models/project/projectConfigModel'
import { useState } from 'preact/hooks'

const useProject = () => {
	const currentProject = useStore(currentProjectStore)
	const hasCurrentProject = useStore(hasCurrentProjectStore)
	const [savingProject, setSavingProject] = useState(false)
	const [userProjects, setUserProjects] = useState<IProjectModel[] | null>(null)
	const [loadingProjects, setLoadingProjects] = useState(false)
	const [getingProject, setGetingProject] = useState(false)

	const setCurrentProject = (project: IProjectModel) => {
		console.log('setCurrentProject')
		setCurrentProjectStore(project)
	}

	const setDefaultCurrentProject = () => {
		console.log('setDefaultCurrentProject')
		setCurrentProject(PROJECT_DEFAULT_TEMPLATE)
		setGetingProject(false)
	}

	const setCurrentProjectConfig = (config: IProjectConfigModel) => {
		console.log('setCurrentProjectConfig')
		setCurrentProjectConfigStore(config)
	}

	const cleanCurrentProject = () => {
		console.log('cleanCurrentProject')
		setDefaultCurrentProject()
		setHasCurrentProjectStore(false)
	}

	const addEditProject = async (): Promise<boolean> => {
		setSavingProject(true)
		const data = await fetch('/api/project', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(currentProject)
		})

		if (data.ok) {
			setSavingProject(false)
			return true
		}

		setSavingProject(false)
		return false
	}

	const getUserProyects = async () => {
		try {
			const data = await fetch('/api/project')
			if (data.ok) {
				const projects: IProjectModel[] | null = await data.json()
				setUserProjects(projects)
			}
		} catch (error) {
			console.log('getUserProyects error ', error)
		}
	}

	const setProjectFromSlug = async (slug: string): Promise<boolean> => {
		console.log('setProjectFromSlug')
		setGetingProject(true)
		try {
			const data = await fetch('/api/project/' + slug)
			if (data.ok) {
				const project: IProjectModel | null = await data.json()
				if (project) {
					setCurrentProject(project)
					setGetingProject(false)
					return true
				}
			}
		} catch (error) {
			console.log('getProjectFromSlug error ', error)
		}
		setGetingProject(false)
		return false
	}

	return {
		currentProject,
		userProjects,
		loadingProjects,
		getingProject,
		hasCurrentProject,
		savingProject,
		setCurrentProject,
		setDefaultCurrentProject,
		setCurrentProjectConfig,
		setHasCurrentProject: setHasCurrentProjectStore,
		setLoadingProjects,
		setProjectFromSlug,
		cleanCurrentProject,
		getUserProyects,
		addEditProject
	}
}

export default useProject
