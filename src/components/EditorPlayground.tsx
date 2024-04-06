/* eslint-disable multiline-ternary */
import { useEffect } from 'preact/hooks'
import Loading from './Loading'
import NavBar from './NavBar'
import EditorBoard from './EditorBoard'
import useUser from '../hooks/useUser'
import useProject from '../hooks/useProject'
import type { ProjectType } from '../types/models/project/projectTypeModel'
import EditorBoardJavascript from './EditorBoardJavascript'
import type { ProjectState } from '../types/menuOptions'
import { setMenuProjectTypeStore } from '../store/menuStore'

interface IProps {
	state: ProjectState
	slug?: string
	type: ProjectType
}

const EditorPlayground = ({ state, slug, type }: IProps) => {
	const { loadingUser } = useUser()
	const {
		setDefaultCurrentProject,
		setProjectFromSlug,
		hasCurrentProject,
		setHasCurrentProject,
		getingProject
	} = useProject()

	useEffect(() => {
		setMenuProjectTypeStore(type)
		if (state === 'new') {
			setDefaultCurrentProject(type)
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
					{type === 'full-frontend' ? <EditorBoard /> : <EditorBoardJavascript />}
				</>
			)}
		</main>
	)
}
export default EditorPlayground
