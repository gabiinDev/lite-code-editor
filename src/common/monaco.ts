import * as monaco from 'monaco-editor'

export const getMatchingTagName = (model: monaco.editor.ITextModel, position: monaco.Position) => {
	const textFromCurrentLineUntilPosition = model.getValueInRange({
		startLineNumber: position.lineNumber,
		endLineNumber: position.lineNumber,
		startColumn: 1,
		endColumn: position.column
	})

	return textFromCurrentLineUntilPosition.match(/.*<(\w+).*>$/)?.[1]
}

export const buildCompletionList = (tagName: string, position: monaco.Position) => {
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
