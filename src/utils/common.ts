import { decode, encode } from 'js-base64'

import { type ExternalFrameworksOptions } from '../types/editor'

const tailWindUrlScript = 'https://cdn.tailwindcss.com'
const natalFrameworkUrlScript = 'https://natalfwk.gruposancorseguros.com/2.3.2/nf.min.js'
const natalFrameworkUrlCss = 'https://natalfwk.gruposancorseguros.com/2.3.2/nf.min.css'

interface AvaibableFrameworks {
	type: ExternalFrameworksOptions
	url: string
}

const avaliableFrameworks: Array<AvaibableFrameworks> = [
	{ type: 'default', url: '' },
	{ type: 'tailwind', url: tailWindUrlScript },
	{ type: 'natal-framework', url: natalFrameworkUrlScript }
]

const getScriptTag = (value: AvaibableFrameworks | null) => {
	if (!value?.type || value?.url === '') return ''

	if (value?.type === 'tailwind') {
		return `<script src="${value.url}"></script>`
	}
	return `<script defer type="module" src="${value.url}"></script>`
}

const getLinkTag = (urlLink?: string) => {
	const value = urlLink ? `<link rel="stylesheet" type="text/css" href="${urlLink}"></link>` : ''
	return value
}

const setScriptToInitExternal = (value: AvaibableFrameworks | null) => {
	if (value?.type === 'natal-framework') {
		return `<script defer type="text/javascript">
			window.NF = window.NF || {};
		</script>`
	}
	return ''
}

export const createHtmlTemplate = (
	css: string,
	html: string,
	js: string,
	externalFramework: ExternalFrameworksOptions
) => {
	const selectedFramework =
		avaliableFrameworks.find(({ type }) => type === externalFramework) ?? null
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      ${css}
    </style>
			${selectedFramework?.type === 'natal-framework' ? getLinkTag(natalFrameworkUrlCss) : ''}
			${getScriptTag(selectedFramework)}
			${setScriptToInitExternal(selectedFramework)}
  </head>
  <body>
    ${html}
    <script type="module">
    ${js}
    </script>
  </body>
</html>`
}

export const handleUpdateUrl = (css: string, html: string, js: string) => {
	const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`
	window.history.replaceState(null, '', `/${hashedCode}`)
}

export const handleHashedUrl = (url: string) => {
	let decodedCss = ''
	let decodedHtml = ''
	let decodedJs = ''

	if (!url.endsWith('/') && !url.endsWith('#') && url !== '/code') {
		const [rawHtml, rawCss, rawJs] = url.slice(1).split('%7C')

		decodedCss = rawCss ? decode(rawCss) : ''
		decodedHtml = rawHtml ? decode(rawHtml) : ''
		decodedJs = rawJs ? decode(rawJs) : ''
	}
	const hasAnyContent = decodedCss !== '' || decodedHtml !== '' || decodedJs !== ''
	return { hasAnyContent, decodedCss, decodedHtml, decodedJs }
}
