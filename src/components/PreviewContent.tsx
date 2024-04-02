// css: string, html: string, js: string, previewElement: HTMLElement

import type { JSX } from 'preact/jsx-runtime'
import { createHtmlTemplate } from '../common'
import { useEffect, useState } from 'preact/hooks'
import useProject from '../hooks/useProject'
import { EXTERNAL_FRAMEWORK_DEFAULT } from '../types/models/project/externalFrameworkModel'

export interface Props {
	elementId: string
}

const PreviewContent = ({ elementId }: Props): JSX.Element => {
	const [iFrameContent, setIFrameContent] = useState('')
	const { currentProject } = useProject()

	const handlePreviewHtml = () => {
		if (currentProject && currentProject?.config) {
			const { css, html, javascript, externalFramework, selectedExternalFrameworkCss } =
				currentProject.config
			const template = createHtmlTemplate(
				css ?? '',
				html ?? '',
				javascript ?? '',
				externalFramework ?? EXTERNAL_FRAMEWORK_DEFAULT,
				selectedExternalFrameworkCss
			)
			setIFrameContent(template)
		}
	}

	useEffect(() => {
		if (currentProject && currentProject?.config) handlePreviewHtml()
	}, [
		currentProject?.config?.css,
		currentProject?.config?.html,
		currentProject?.config?.javascript,
		currentProject?.config?.externalFramework?.type,
		currentProject?.config?.selectedExternalFrameworkCss?.type,
		currentProject?.name
	])

	return (
		<div id={elementId} class='snap-start h-full min-h-full w-full min-w-full'>
			<iframe
				title={currentProject?.name ?? 'lite code editor'}
				class='bg-white w-full h-full border-0'
				srcdoc={iFrameContent}
				allow='midi; geolocation; microphone; camera; display-capture; encrypted-media; clipboard-read; clipboard-write;'
				sandbox='allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation allow-downloads'
				loading='lazy'
				allowFullScreen={true}
				name='lite code preview'
			></iframe>
		</div>
	)
}

export default PreviewContent
