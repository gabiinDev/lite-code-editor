import * as monaco from 'monaco-editor'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// import '../styles/editor-board-javascript-split.css'

import { useEffect, useRef, useState } from 'preact/hooks'
import type { JSX } from 'preact/jsx-runtime'

import JsEditorContent from './JsEditorContent'
import useMonacoEditor, { type Language } from '../hooks/useMonacoEditor'
import useSplit from '../hooks/useSplit'
import useProject from '../hooks/useProject'
import useLoading from '../hooks/useLoading'
import { PROJECTS_BASE_URL } from '../types/models/project/projectModel'
import { fullPreviewStore } from '../store/fullPreviewStore'
import PreviewContentJavascript from './PreviewContentJavascript'

interface ReferenceHTMLElement extends JSX.Element {
	base: HTMLElement
}

export const EditorBoardJavascript = () => {
	const [editorsLoading, setEditorsLoading] = useState(true)
	const { currentProject, hasCurrentProject, setCurrentProjectConfig } = useProject()
	const { Loading } = useLoading('Loading editor ...')

	const initSplit = useSplit({ type: 'full-javascript' })
	const gutterColRef = useRef(null as unknown as HTMLDivElement)
	const jsRef = useRef(null as unknown as ReferenceHTMLElement)

	const handleDidChangeContentCallback = (content: string, language: Language) => {
		if (currentProject?.config) {
			if (language === 'javascript') currentProject.config.javascript = content
			setCurrentProjectConfig(currentProject.config)
		}
	}

	const jsEditor = useMonacoEditor({
		language: 'javascript',
		initContent: currentProject?.config?.javascript ?? '',
		monacoInstance: monaco,
		onDidChangeContentCallback: handleDidChangeContentCallback
	})

	const handleFormatKeyCombination = async (e: KeyboardEvent) => {
		if (e.altKey && e.key === 'f') {
			e.preventDefault()
			jsEditor.formatCode()
		}
	}

	const handlePreviewKeyCombination = async (e: KeyboardEvent) => {
		if (e.altKey && e.key === 'g' && currentProject && currentProject?.config) {
			e.preventDefault()
			fullPreviewStore.set({
				name: currentProject.name,
				css: currentProject.config.css,
				html: currentProject.config.html,
				javascript: currentProject.config.javascript,
				externalFramework: currentProject.config.externalFramework,
				selectedExternalFrameworkCss: currentProject.config.selectedExternalFrameworkCss
			})
			window.open(`${PROJECTS_BASE_URL}/preview`, '_blank', 'resizable,scrollbars,status')
		}
	}

	useEffect(() => {
		window.MonacoEnvironment = {
			getWorker(_: string, label: string) {
				if (label === 'javascript') {
					return new JsWorker()
				}
				return new Promise<Worker>(() => {})
			}
		}

		if (jsRef.current?.base) {
			jsEditor.initEditor({ element: jsRef.current.base }).then(() => {
				jsEditor.setEditorValue(currentProject?.config?.javascript ?? '')
				initSplit({
					gutterColElement: gutterColRef.current
				})

				setEditorsLoading(false)
			})
		} else setEditorsLoading(false)
	}, [currentProject?.id])

	useEffect(() => {
		document.addEventListener('keydown', handleFormatKeyCombination)
		document.addEventListener('keydown', handlePreviewKeyCombination)

		return () => {
			document.removeEventListener('keydown', handleFormatKeyCombination)
			document.removeEventListener('keydown', handlePreviewKeyCombination)
		}
	}, [currentProject?.id])

	return (
		<>
			{editorsLoading && !hasCurrentProject && <Loading />}
			<div className='grid h-screen overflow-y-hidden snap-mandatory w-full'>
				<JsEditorContent ref={jsRef} elementId='js-editor' />
				<PreviewContentJavascript elementId='preview-javascript' />
				<div
					ref={gutterColRef}
					className='gutter-col gutter-col-1 bg-neutral-950'
					id='gutter-col'
				></div>
			</div>
		</>
	)
}

export default EditorBoardJavascript
