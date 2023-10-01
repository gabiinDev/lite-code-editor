import { useState } from 'preact/hooks'

import { MONACO_EDITOR_COMMON_OPTIONS } from '../constants/monacoEditor'

export type Language = 'html' | 'css' | 'js'

export interface Props {
	language: Language
	value: string
	element: HTMLElement
}

export const useEditor = ({ language, value, element }: Props) => {
	const [editorContent, setEditorContent] = useState()
}
