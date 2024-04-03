/* eslint-disable @typescript-eslint/no-explicit-any */
import * as monaco from 'monaco-editor'
import { emmetHTML } from 'emmet-monaco-es'

import { MONACO_EDITOR_COMMON_OPTIONS } from '../constants/monacoEditor'
import { buildCompletionList, getMatchingTagName } from '../common/monaco'
import { debounce } from '../common/debounce'

export type Language = 'html' | 'css' | 'javascript'

export interface Props {
	language: Language
	initContent?: string
	monacoInstance: typeof monaco
	onDidChangeContentCallback: (content: string, language: Language) => void
}

export interface IInitEditor {
	element: HTMLElement
}

const useMonacoEditor = ({
	language,
	initContent = '',
	monacoInstance,
	onDidChangeContentCallback
}: Props) => {
	let editorInstanse = null as null | monaco.editor.IStandaloneCodeEditor

	const initEditor = ({ element }: IInitEditor): Promise<any> => {
		return new Promise((resolve, reject) => {
			try {
				monacoInstance.editor.getEditors().forEach((editor) => {
					if (editor.getContainerDomNode().id === element?.id) {
						editor.dispose()
					}
				})
				editorInstanse = monacoInstance.editor.create(element, {
					language,
					value: initContent,
					...MONACO_EDITOR_COMMON_OPTIONS
				})
				editorInstanse.onDidChangeModelContent(
					debounce(() => {
						onDidChangeContentCallback(editorInstanse?.getValue() ?? '', language)
					}, 700)
				)

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

	const formatCode = () => {
		editorInstanse?.getAction('editor.action.formatDocument')?.run()
	}

	return { initEditor, setEditorValue, formatCode }
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
