import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

import { useEffect, useRef, useState } from 'preact/hooks'
import type { JSX } from 'preact/jsx-runtime'

import { handleHashedUrl, handleUpdateUrl } from '../utils/common'

import CssEditorContent from './CssEditorContent'
import HtmlEditorContent from './HtmlEditorContent'
import JsEditorContent from './JsEditorContent'
import PreviewContent from './PreviewContent'
import useMonacoEditor from '../hooks/useMonacoEditor'
import useSplit from '../hooks/useSplit'

import Loading from './Loading'

interface ReferenceHTMLElement extends JSX.Element {
	base: HTMLElement
}

export const EditorBoard = () => {
	const [css, setCss] = useState('')
	const [html, setHtml] = useState('')
	const [js, setJs] = useState('')
	const [editorsLoading, setEditorsLoading] = useState(true)

	const initSplit = useSplit()
	const gutterColRef = useRef(null as unknown as HTMLDivElement)
	const gutterRowRef = useRef(null as unknown as HTMLDivElement)

	const cssRef = useRef(null as unknown as ReferenceHTMLElement)
	const htmlRef = useRef(null as unknown as ReferenceHTMLElement)
	const jsRef = useRef(null as unknown as ReferenceHTMLElement)

	const cssEditor = useMonacoEditor({
		language: 'css',
		value: css,
		setContent: setCss,
		monacoInstance: monaco
	})
	const htmlEditor = useMonacoEditor({
		language: 'html',
		value: html,
		setContent: setHtml,
		monacoInstance: monaco
	})
	const jsEditor = useMonacoEditor({
		language: 'javascript',
		value: js,
		setContent: setJs,
		monacoInstance: monaco
	})

	useEffect(() => {
		setEditorsLoading(true)
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
				setEditorsLoading(false)
			})

			const url = window.location.pathname
			const { hasAnyContent, decodedCss, decodedHtml, decodedJs } = handleHashedUrl(url)
			if (hasAnyContent) {
				setCss(decodedCss)
				setHtml(decodedHtml)
				setJs(decodedJs)
				cssEditor.setEditorValue(decodedCss)
				htmlEditor.setEditorValue(decodedHtml)
				jsEditor.setEditorValue(decodedJs)
			}

			initSplit({
				gutterColElement: gutterColRef.current,
				gutterRowElement: gutterRowRef.current
			})
		}
	}, [])
	useEffect(() => {
		handleUpdateUrl(css, html, js)
	}, [css, html, js])

	return (
		<>
			{editorsLoading && <Loading />}
			<div class='editor grid w-full overflow-y-scroll snap-y h-screen'>
				<HtmlEditorContent ref={htmlRef} elementId='html-editor' />
				<PreviewContent elementId='preview' css={css} html={html} js={js} />
				<JsEditorContent ref={jsRef} elementId='js-editor' />
				<CssEditorContent ref={cssRef} elementId='css-editor' />
				<div ref={gutterColRef} class='gutter-col gutter-col-1 bg-slate-50 opacity-30'></div>
				<div ref={gutterRowRef} class='gutter-row gutter-row-1 bg-slate-50 opacity-30'></div>
			</div>
		</>
	)
}

export default EditorBoard
