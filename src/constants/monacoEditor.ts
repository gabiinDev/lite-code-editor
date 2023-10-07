import { editor } from 'monaco-editor'

export const MONACO_EDITOR_COMMON_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
	minimap: {
		enabled: false
	},
	wordWrap: 'on',
	theme: 'vs-dark',
	fontLigatures: 'on',
	fontSize: 15,
	lineNumbers: 'off',
	tabSize: 2,
	automaticLayout: true,
	fixedOverflowWidgets: true,
	scrollBeyondLastLine: false,
	roundedSelection: false,
	padding: {
		top: 12
	},
	formatOnType: true,
	formatOnPaste: true,
	dragAndDrop: true,
	tabCompletion: 'onlySnippets',
	codeLens: true
}
