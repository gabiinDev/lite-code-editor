import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

import { useEffect, useRef, useState } from 'preact/hooks'
import type { JSX } from 'preact/jsx-runtime'

import { useStore } from '@nanostores/preact'

import { handleHashedUrl, handleUpdateUrl } from '../utils/common'
import { externalFrameworksSource } from '../constants/externalFrameworks'

import CssEditorContent from './CssEditorContent'
import HtmlEditorContent from './HtmlEditorContent'
import JsEditorContent from './JsEditorContent'
import PreviewContent from './PreviewContent'
import useMonacoEditor from '../hooks/useMonacoEditor'
import useSplit from '../hooks/useSplit'

import Loading from './Loading'

import { selectedExternalFramework, selectedExternalFrameworkCssVariant } from '../store/menuStore'
import type { ExternalFrameworksOptions } from '../types/editor'

interface ReferenceHTMLElement extends JSX.Element {
	base: HTMLElement
}

export const EditorBoard = () => {
	const $selectedExternalFramework = useStore(selectedExternalFramework)
	const $selectedExternalFrameworkCssVariant = useStore(selectedExternalFrameworkCssVariant)

	const [editorsLoading, setEditorsLoading] = useState(false)

	const initSplit = useSplit()
	const gutterColRef = useRef(null as unknown as HTMLDivElement)
	const gutterRowRef = useRef(null as unknown as HTMLDivElement)

	const cssRef = useRef(null as unknown as ReferenceHTMLElement)
	const htmlRef = useRef(null as unknown as ReferenceHTMLElement)
	const jsRef = useRef(null as unknown as ReferenceHTMLElement)

	const cssEditor = useMonacoEditor({
		language: 'css',
		value: '',
		monacoInstance: monaco
	})
	const htmlEditor = useMonacoEditor({
		language: 'html',
		value: '',
		monacoInstance: monaco
	})
	const jsEditor = useMonacoEditor({
		language: 'javascript',
		value: '',
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
			]).then()

			const url = window.location.pathname
			const {
				hasAnyContent,
				decodedCss,
				decodedHtml,
				decodedJs,
				decodedFramework,
				decodedCssVariant
			} = handleHashedUrl(url)
			if (hasAnyContent) {
				cssEditor.setContent(decodedCss)
				htmlEditor.setContent(decodedHtml)
				jsEditor.setContent(decodedJs)
				cssEditor.setEditorValue(decodedCss)
				htmlEditor.setEditorValue(decodedHtml)
				jsEditor.setEditorValue(decodedJs)

				if (decodedFramework && decodedFramework !== '') {
					const selectedFramework = externalFrameworksSource.find(
						(item) => item.type === (decodedFramework as ExternalFrameworksOptions)
					)
					selectedExternalFramework.set(selectedFramework!)

					if (decodedCssVariant && decodedCssVariant !== '') {
						const selectedCssVariant = selectedFramework?.cssVariants?.find(
							(item) => item.type === decodedCssVariant
						)
						selectedExternalFrameworkCssVariant.set(selectedCssVariant)
					}
				}
			}

			initSplit({
				gutterColElement: gutterColRef.current,
				gutterRowElement: gutterRowRef.current
			})
		}
		setEditorsLoading(false)
	}, [])

	useEffect(() => {
		handleUpdateUrl(
			cssEditor.content,
			htmlEditor.content,
			jsEditor.content,
			$selectedExternalFramework.type,
			$selectedExternalFrameworkCssVariant?.type
		)
	}, [
		cssEditor.content,
		htmlEditor.content,
		jsEditor.content,
		$selectedExternalFramework.type,
		$selectedExternalFrameworkCssVariant?.type
	])

	return (
		<>
			{editorsLoading && <Loading />}
			<div class='grid h-screen overflow-y-hidden snap-mandatory w-full'>
				<HtmlEditorContent ref={htmlRef} elementId='html-editor' />
				<PreviewContent
					elementId='preview'
					css={cssEditor.content}
					html={htmlEditor.content}
					js={jsEditor.content}
				/>
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
