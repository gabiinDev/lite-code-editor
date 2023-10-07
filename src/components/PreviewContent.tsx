// css: string, html: string, js: string, previewElement: HTMLElement

import type { JSX } from 'preact/jsx-runtime'
import { createHtmlTemplate } from '../utils/common'
import { useEffect, useState } from 'preact/hooks'
import { useStore } from '@nanostores/preact'
import { selectedExternalFramework, selectedExternalFrameworkCssVariant } from '../store/menuStore'

export interface Props {
	elementId: string
	css: string
	html: string
	js: string
	title?: string
}

const PreviewContent = ({ elementId, css, html, js, title = 'Preview' }: Props): JSX.Element => {
	const $selectedExternalFramework = useStore(selectedExternalFramework)
	const $selectedExternalFrameworkCssVariant = useStore(selectedExternalFrameworkCssVariant)
	const [iFrameContent, setIFrameContent] = useState('')
	const [iFrameTitle, setIFrameTitle] = useState(title)

	const handlePreviewHtml = () => {
		const htmlParsed = html ?? ''
		const cssParsed = css ?? ''
		const jsParsed = js ?? ''
		const template = createHtmlTemplate(
			cssParsed,
			htmlParsed,
			jsParsed,
			$selectedExternalFramework,
			$selectedExternalFrameworkCssVariant
		)
		setIFrameContent(template)
	}

	useEffect(() => {
		handlePreviewHtml()
	}, [css, html, js])

	useEffect(() => {
		handlePreviewHtml()
	}, [$selectedExternalFramework.type, $selectedExternalFrameworkCssVariant?.name])

	useEffect(() => {
		setIFrameTitle(title)
	}, [title])

	return (
		<div id={elementId} class='snap-start h-full min-h-full w-full min-w-full'>
			<iframe
				title={iFrameTitle}
				class='bg-white w-full h-full border-0'
				srcdoc={iFrameContent}
				allow='midi; geolocation; microphone; camera; display-capture; encrypted-media; clipboard-read; clipboard-write; notifications; persistent-storage; background-sync; ambient-light-sensor; accessibility-events;'
				sandbox='allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation allow-downloads'
			></iframe>
		</div>
	)
}

export default PreviewContent
