import * as monaco from 'monaco-editor'
import { emmetHTML } from 'emmet-monaco-es'

import { useState, type StateUpdater } from 'preact/hooks'

import { MONACO_EDITOR_COMMON_OPTIONS } from '../constants/monacoEditor'
import { buildCompletionList, getMatchingTagName } from '../utils/monaco'
import { debounce } from '../utils/debounce'

export type Language = 'html' | 'css' | 'javascript'

export interface Props {
	language: Language
	value: string
	monacoInstance: typeof monaco
}

const useMonacoEditor = ({ language, value, monacoInstance }: Props) => {
	const [content, setContent] = useState(value)
	let editorInstanse = null as null | monaco.editor.IStandaloneCodeEditor

	const initEditor = ({ element }: { element: HTMLElement }): Promise<any> => {
		return new Promise((resolve, reject) => {
			try {
				monacoInstance.editor.getEditors().forEach((editor) => {
					if (editor.getContainerDomNode().id === element?.id) {
						editor.dispose()
					}
				})
				editorInstanse = monacoInstance.editor.create(element, {
					language,
					value,
					...MONACO_EDITOR_COMMON_OPTIONS
				})
				editorInstanse.onDidChangeModelContent(() => {
					const content = editorInstanse?.getValue() ?? ''
					setContent(content)
				})

				initExtraSettings(language, monacoInstance)
				editorInstanse?.onDidChangeModelLanguageConfiguration(() => {
					resolve(`${language} has been initialized`)
				})
			} catch (error) {
				reject(error)
				throw new Error(`${language} has an error on starting. Error: ${error}`)
			}
		})
	}

	const setEditorValue = (value: string) => {
		if (value !== '') {
			editorInstanse?.setValue(value)
		}
	}

	return { initEditor, setEditorValue, content, setContent }
}

const initExtraSettings = (language: Language, monacoInstance: typeof monaco) => {
	if (language === 'html') initHtmlExtraSettings(monacoInstance)
}

const initHtmlExtraSettings = (monacoInstance: typeof monaco) => {
	monacoInstance.languages.registerCompletionItemProvider('html', {
		triggerCharacters: ['>'],
		provideCompletionItems: (model, position) => {
			const tagName = getMatchingTagName(model, position)

			if (!tagName) return null
			return buildCompletionList(tagName, position)
		}
	})
	// init emmet for html editor
	emmetHTML(monacoInstance)
}

export default useMonacoEditor
