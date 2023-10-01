import type { JSX } from 'preact/jsx-runtime'
import type { MutableRef } from 'preact/hooks'
import CssIcon from '../icon/CssIcon'

export interface Props {
	elementId: string
	ref: MutableRef<JSX.Element>
}
export default function CssEditorContent({ elementId }: Props): JSX.Element {
	const classNameContent = 'relative h-full min-h-full w-full min-w-full'
	const classNameIcon = 'w-12 h-12 absolute z-10 bottom-0 right-0 mr-3 mb-1 opacity-60'
	return (
		<div id={elementId} class={classNameContent}>
			<CssIcon className={classNameIcon} />
		</div>
	)
}
