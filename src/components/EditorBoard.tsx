import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

import { useEffect, useRef, useState } from 'preact/hooks'
import type { JSX } from 'preact/jsx-runtime'

import CssEditorContent from './CssEditorContent'
import HtmlEditorContent from './HtmlEditorContent'
import JsEditorContent from './JsEditorContent'
import PreviewContent from './PreviewContent'
import useMonacoEditor, { type Language } from '../hooks/useMonacoEditor'
import useSplit from '../hooks/useSplit'
import useProject from '../hooks/useProject'
import useLoading from '../hooks/useLoading'
import { PROJECTS_BASE_URL } from '../types/models/project/projectModel'
import { fullPreviewStore } from '../store/fullPreviewStore'

interface ReferenceHTMLElement extends JSX.Element {
	base: HTMLElement
}

export const EditorBoard = () => {
	const [editorsLoading, setEditorsLoading] = useState(true)
	const { currentProject, hasCurrentProject, setCurrentProjectConfig } = useProject()
	const { Loading } = useLoading('Loading editor ...')

	const initSplit = useSplit()
	const gutterColRef = useRef(null as unknown as HTMLDivElement)
	const gutterRowRef = useRef(null as unknown as HTMLDivElement)

	const cssRef = useRef(null as unknown as ReferenceHTMLElement)
	const htmlRef = useRef(null as unknown as ReferenceHTMLElement)
	const jsRef = useRef(null as unknown as ReferenceHTMLElement)

	const handleDidChangeContentCallback = (content: string, language: Language) => {
		if (currentProject?.config) {
			if (language === 'css') currentProject.config.css = content
			if (language === 'html') currentProject.config.html = content
			if (language === 'javascript') currentProject.config.javascript = content

			setCurrentProjectConfig(currentProject.config)
		}
	}

	const cssEditor = useMonacoEditor({
		language: 'css',
		initContent: currentProject?.config?.css || '',
		monacoInstance: monaco,
		onDidChangeContentCallback: handleDidChangeContentCallback
	})

	const htmlEditor = useMonacoEditor({
		language: 'html',
		initContent: currentProject?.config?.html ?? '',
		monacoInstance: monaco,
		onDidChangeContentCallback: handleDidChangeContentCallback
	})

	const jsEditor = useMonacoEditor({
		language: 'javascript',
		initContent: currentProject?.config?.javascript ?? '',
		monacoInstance: monaco,
		onDidChangeContentCallback: handleDidChangeContentCallback
	})

	const handleFormatKeyCombination = async (e: KeyboardEvent) => {
		if (e.altKey && e.key === 'f') {
			e.preventDefault()
			cssEditor.formatCode()
			htmlEditor.formatCode()
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
				if (label === 'html') {
					return new HtmlWorker()
				}
				if (label === 'css') {
					return new CssWorker()
				}
				if (label === 'javascript') {
					return new JsWorker()
				}
				return new Promise<Worker>(() => {})
			}
		}

		if (cssRef.current?.base && htmlRef.current?.base && jsRef.current?.base) {
			Promise.all([
				cssEditor.initEditor({ element: cssRef.current.base }),
				htmlEditor.initEditor({ element: htmlRef.current.base }),
				jsEditor.initEditor({ element: jsRef.current.base })
			]).then(() => {
				cssEditor.setEditorValue(currentProject?.config?.css ?? '')
				htmlEditor.setEditorValue(currentProject?.config?.html ?? '')
				jsEditor.setEditorValue(currentProject?.config?.javascript ?? '')

				initSplit({
					gutterColElement: gutterColRef.current,
					gutterRowElement: gutterRowRef.current
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
			<div class='grid h-screen overflow-y-hidden snap-mandatory w-full'>
				<HtmlEditorContent ref={htmlRef} elementId='html-editor' />
				<PreviewContent elementId='preview' />
				<JsEditorContent ref={jsRef} elementId='js-editor' />
				<CssEditorContent ref={cssRef} elementId='css-editor' />
				<div
					ref={gutterColRef}
					class='gutter-col gutter-col-1 bg-neutral-950'
					id='gutter-col'
				></div>
				<div
					ref={gutterRowRef}
					class='gutter-row gutter-row-1 bg-neutral-950'
					id='gutter-row'
				></div>
			</div>
		</>
	)
}

export default EditorBoard
