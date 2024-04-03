/* eslint-disable multiline-ternary */
import { useEffect } from 'preact/hooks'
import '../styles/editorPlayground.css'

import Loading from './Loading'
import NavBar from './NavBar'
import EditorBoard from './EditorBoard'
import useUser from '../hooks/useUser'
import useProject from '../hooks/useProject'
import type { ProjectState } from '../types/menuOptions'

interface IProps {
	projectState: ProjectState
	slug?: string
}

const EditorPlayground = ({ projectState, slug }: IProps) => {
	const { loadingUser } = useUser()
	const {
		setDefaultCurrentProject,
		setProjectFromSlug,
		hasCurrentProject,
		setHasCurrentProject,
		getingProject
	} = useProject()

	useEffect(() => {
		if (projectState.state === 'new') {
			setDefaultCurrentProject()
			setHasCurrentProject(true)
		} else if (slug) {
			setProjectFromSlug(slug).then((result) => {
				if (!result) window.location.href = '/404'
				else setHasCurrentProject(true)
			})
		}
	}, [])
	return (
		<main>
			{loadingUser && getingProject && !hasCurrentProject ? (
				<Loading />
			) : (
				<>
					<NavBar />
					<EditorBoard />
				</>
			)}
		</main>
	)
}
export default EditorPlayground
