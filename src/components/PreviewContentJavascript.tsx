import type { JSX } from 'preact/jsx-runtime'
import { useEffect, useState } from 'preact/hooks'
import useProject from '../hooks/useProject'

export interface Props {
	elementId: string
}

const PreviewContentJavascript = ({ elementId }: Props): JSX.Element => {
	const [iFrameContent, setIFrameContent] = useState('')
	const [hasErrorCode, setHasErrorCode] = useState(false)
	const { currentProject } = useProject()

	const handlePreviewHtml = () => {
		if (currentProject && currentProject?.config) {
			const { javascript } = currentProject.config
			try {
				// eslint-disable-next-line no-eval, no-new-func
				const resultadoFunc = new Function('codigo', 'return eval(codigo);')
				const result = resultadoFunc(javascript)
				if (result) {
					setIFrameContent(result)
					setHasErrorCode(false)
				}
			} catch (e) {
				console.log('error', e)
				let errorMessage = ''
				if (e instanceof Error) {
					errorMessage = e.message
				} else if (e instanceof SyntaxError) {
					errorMessage = e.message
				}
				setIFrameContent(errorMessage)
				setHasErrorCode(true)
			}
		}
	}

	useEffect(() => {
		if (currentProject && currentProject?.config) handlePreviewHtml()
	}, [currentProject?.config?.javascript, currentProject?.name])

	return (
		<div id={elementId} className='snap-start h-full min-h-full w-full min-w-full px-7 py-10'>
			<code className={`w-full h-full ${hasErrorCode ? 'text-red-500' : 'text-white'}`}>
				{iFrameContent}
			</code>
		</div>
	)
}

export default PreviewContentJavascript
