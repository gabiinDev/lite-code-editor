import type { JSX } from 'preact/jsx-runtime'
import type { MutableRef } from 'preact/hooks'
import JsIcon from '../icon/JsIcon.tsx'

export interface Props {
	elementId: string
	ref: MutableRef<JSX.Element>
}
export default function CssEditorContent({ elementId }: Props): JSX.Element {
	const classNameContent = 'relative h-full min-h-full w-full min-w-full'
	const classNameIcon = 'w-10 h-10 absolute z-10 bottom-0 right-0 mr-5 mb-2 opacity-80'
	return (
		<div id={elementId} class={classNameContent}>
			<JsIcon className={classNameIcon} />
		</div>
	)
}
