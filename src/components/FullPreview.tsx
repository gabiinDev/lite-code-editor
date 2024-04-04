// css: string, html: string, js: string, previewElement: HTMLElement

import type { JSX } from 'preact/jsx-runtime'
import { createHtmlTemplate } from '../common'
import { useEffect, useState } from 'preact/hooks'
import { EXTERNAL_FRAMEWORK_DEFAULT } from '../types/models/project/externalFrameworkModel'
import { fullPreviewStore } from '../store/fullPreviewStore'
import { useStore } from '@nanostores/preact'

const FullPreview = (): JSX.Element => {
	const fullPreview = useStore(fullPreviewStore)
	const [iFrameContent, setIFrameContent] = useState('')

	const handlePreviewHtml = () => {
		if (fullPreview) {
			const { css, html, javascript, externalFramework, selectedExternalFrameworkCss } = fullPreview
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
		handlePreviewHtml()
		document.title = `Lite code editor Preview ${fullPreview?.name ? '- ' + fullPreview.name : ''}`
		return () => {
			fullPreviewStore.set(null)
		}
	}, [])

	return (
		<div id='full-preview' class='h-full min-h-full w-full min-w-full'>
			<iframe
				title={fullPreview?.name ?? 'lite code editor'}
				class='bg-white w-full h-full border-0 overflow-hidden'
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

export default FullPreview
