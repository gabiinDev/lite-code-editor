// css: string, html: string, js: string, previewElement: HTMLElement

import type { JSX } from 'preact/jsx-runtime'
import { createHtmlTemplate } from '../utils/common'
import { useEffect, useState } from 'preact/hooks'

export interface Props {
	elementId: string
	css: string
	html: string
	js: string
	title?: string
}

export default function PreviewContent({
	elementId,
	css,
	html,
	js,
	title = 'Preview'
}: Props): JSX.Element {
	const [iFrameContent, setIFrameContent] = useState('')
	const [iFrameTitle, setIFrameTitle] = useState(title)
	const classNameContent = 'snap-start h-full min-h-full w-full min-w-full'
	const classNameIFrame = 'bg-black bg-opacity-80 w-full h-full border-0'

	useEffect(() => {
		const htmlParsed = html ?? ''
		const cssParsed = css ?? ''
		const jsParsed = js ?? ''
		const template = createHtmlTemplate(cssParsed, htmlParsed, jsParsed)
		setIFrameContent(template)
	}, [css, html, js])

	useEffect(() => {
		setIFrameTitle(title)
	}, [title])

	return (
		<div id={elementId} class={classNameContent}>
			<iframe title={iFrameTitle} class={classNameIFrame} srcdoc={iFrameContent}></iframe>
		</div>
	)
}
