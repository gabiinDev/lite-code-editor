import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { encode, decode } from 'js-base64'

import { emmetHTML } from 'emmet-monaco-es'

import { createHtmlTemplate } from '../utils/common'

let htmlCodeContent = ''
let cssCodeContent = ''
let jsCodeContent = ''

const MONACO_EDITOR_COMMON_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
	minimap: {
		enabled: false
	},
	wordWrap: 'on',
	theme: 'vs-dark',
	fontLigatures: 'on',
	fontSize: 17,
	lineNumbers: 'off',
	tabSize: 2,
	automaticLayout: true,
	fixedOverflowWidgets: true,
	scrollBeyondLastLine: false,
	roundedSelection: false,
	padding: {
		top: 16
	}
}

window.MonacoEnvironment = {
	getWorker(_: string, label: string) {
		if (label === 'html') {
			return new HtmlWorker()
		}
		if (label === 'css') {
			return new CssWorker()
		}
		if (label === 'javascript') {
			return new JsWorker()
		}
		return new Promise<Worker>(() => {})
	}
}

export const initHtmlEditor = (previewElement: HTMLElement) => {
	const $htmlEditor = document.querySelector('#html-editor') as HTMLElement

	const monacoHtmlEditor = monaco.editor.create($htmlEditor, {
		language: 'html',
		value: '',
		...MONACO_EDITOR_COMMON_OPTIONS
	})

	monacoHtmlEditor.onDidChangeModelContent(() => {
		htmlCodeContent = monacoHtmlEditor.getValue()
		//console.log('html', htmlCodeContent)
		setPreviewContent(cssCodeContent, htmlCodeContent, jsCodeContent, previewElement)
	})

	monaco.languages.registerCompletionItemProvider('html', {
		triggerCharacters: ['>'],
		provideCompletionItems: (model, position) => {
			const tagName = getMatchingTagName(model, position)

			if (!tagName) return null
			return buildCompletionList(tagName, position, monaco)
		}
	})

	emmetHTML(monaco)

	return monacoHtmlEditor
}

const getMatchingTagName = (model: monaco.editor.ITextModel, position: monaco.Position) => {
	const textFromCurrentLineUntilPosition = model.getValueInRange({
		startLineNumber: position.lineNumber,
		endLineNumber: position.lineNumber,
		startColumn: 1,
		endColumn: position.column
	})

	return textFromCurrentLineUntilPosition.match(/.*<(\w+).*>$/)?.[1]
}

const buildCompletionList = (tagName: string, position: monaco.Position, monaco: any) => {
	const closingTag = `</${tagName}>`
	const insertTextSnippet = `$0${closingTag}`
	const rangeInCurrentPosition = {
		startLineNumber: position.lineNumber,
		endLineNumber: position.lineNumber,
		startColumn: position.column,
		endColumn: position.column
	}

	return {
		suggestions: [
			{
				label: closingTag,
				kind: monaco.languages.CompletionItemKind.EnumMember,
				insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
				insertText: insertTextSnippet,
				range: rangeInCurrentPosition
			}
		]
	}
}

export const initCssEditor = (previewElement: HTMLElement) => {
	const $cssEditor = document.querySelector('#css-editor') as HTMLElement
	const monacoCssEditor = monaco.editor.create($cssEditor, {
		language: 'css',
		value: '',
		...MONACO_EDITOR_COMMON_OPTIONS
	})

	monacoCssEditor.onDidChangeModelContent(() => {
		cssCodeContent = monacoCssEditor.getValue()
		setPreviewContent(cssCodeContent, htmlCodeContent, jsCodeContent, previewElement)
	})

	return monacoCssEditor
}

export const initJsEditor = (previewElement: HTMLElement) => {
	const $jsEditor = document.querySelector('#js-editor') as HTMLElement
	const monacoJsEditor = monaco.editor.create($jsEditor, {
		language: 'javascript',
		value: '',
		...MONACO_EDITOR_COMMON_OPTIONS
	})

	monacoJsEditor.onDidChangeModelContent(() => {
		jsCodeContent = monacoJsEditor.getValue()
		setPreviewContent(cssCodeContent, htmlCodeContent, jsCodeContent, previewElement)
	})

	return monacoJsEditor
}

export const setInitEditorContent = (
	url: string,
	previewElement: HTMLElement,
	htmlMonaco: monaco.editor.IStandaloneCodeEditor,
	cssMonaco: monaco.editor.IStandaloneCodeEditor,
	jsMonaco: monaco.editor.IStandaloneCodeEditor
) => {
	console.log(url)
	let css = ''
	let html = ''
	let js = ''

	if (!url.endsWith('/') && !url.endsWith('#') && url !== '/code') {
		const [rawHtml, rawCss, rawJs] = url.slice(1).split('%7C')

		html = rawHtml ? decode(rawHtml) : ''
		css = rawCss ? decode(rawCss) : ''
		js = rawJs ? decode(rawJs) : ''
		console.log('asdas', html, css, js)
		setPreviewContent(css, html, js, previewElement)

		htmlMonaco.setValue(html)
		cssMonaco.setValue(css)
		jsMonaco.setValue(js)
	}
}

const setPreviewContent = (css: string, html: string, js: string, previewElement: HTMLElement) => {
	const htmlParsed = html ?? ''
	const cssParsed = css ?? ''
	const jsParsed = js ?? ''

	const htmlTemplate = createHtmlTemplate(cssParsed, htmlParsed, jsParsed)
	previewElement.setAttribute('srcdoc', htmlTemplate)

	updateHashedCodeUrl(cssParsed, htmlParsed, jsParsed)
}

const updateHashedCodeUrl = (css: string, html: string, js: string) => {
	const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`
	window.history.replaceState(null, '', `/${hashedCode}`)
}
