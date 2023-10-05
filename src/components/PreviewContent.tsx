// css: string, html: string, js: string, previewElement: HTMLElement

import type { JSX } from 'preact/jsx-runtime'
import { createHtmlTemplate } from '../utils/common'
import { useEffect, useState } from 'preact/hooks'
import { useCustomOptionsStore } from '../store/editorOptions'

export interface Props {
	elementId: string
	css: string
	html: string
	js: string
	title?: string
}

const PreviewContent = ({ elementId, css, html, js, title = 'Preview' }: Props): JSX.Element => {
	const [iFrameContent, setIFrameContent] = useState('')
	const [iFrameTitle, setIFrameTitle] = useState(title)
	// const selectedExternalFramework = useCustomOptionsStore(
	// 	(state) => state.selectedExternalFramework
	// )
	useEffect(() => {
		const htmlParsed = html ?? ''
		const cssParsed = css ?? ''
		const jsParsed = js ?? ''
		const template = createHtmlTemplate(cssParsed, htmlParsed, jsParsed, null)
		setIFrameContent(template)
	}, [css, html, js, null])

	useEffect(() => {
		setIFrameTitle(title)
	}, [title])

	return (
		<div id={elementId} class='snap-start h-full min-h-full w-full min-w-full'>
			<iframe
				title={iFrameTitle}
				class='bg-white w-full h-full border-0'
				srcdoc={iFrameContent}
			></iframe>
		</div>
	)
}

export default PreviewContent
