/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { decode, encode } from 'js-base64'
import type {
	ExternalFrameworkTypes,
	IExternalFrameworkModel
} from '../types/models/project/externalFrameworkModel'
import type { IExternalFrameworkCssVariantModel } from '../types/models/project/externalFrameworkCssVariantModel'

const getScriptTag = (value: IExternalFrameworkModel | null) => {
	if (!value?.type || !value?.url || value?.url === '') return ''

	if (value?.type === 'tailwind') {
		return `<script src="${value.url}"></script>`
	}
	return `<script defer type="module" src="${value.url}"></script>`
}

const getLinkTag = (urlLink?: string) => {
	if (urlLink) return `<link rel="stylesheet" type="text/css" href="${urlLink}"></link>`
	return ''
}

const setCssVariant = (variant: IExternalFrameworkCssVariantModel | undefined): string => {
	if (variant?.url) return getLinkTag(variant.url)
	return ''
}

const setScriptToInitExternal = (value: IExternalFrameworkModel | null) => {
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
	externalFramework: IExternalFrameworkModel,
	externalCssVariant?: IExternalFrameworkCssVariantModel
) => {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
			${setCssVariant(externalCssVariant)}
		<style>
      ${css}
    </style>
		${getScriptTag(externalFramework)}
		${setScriptToInitExternal(externalFramework)}
  </head>
  <body style="overflow: hidden;">
    ${html}
    <script type="module">
    ${js}
    </script>
  </body>
</html>`
}

export const handleUpdateUrl = (
	css: string,
	html: string,
	js: string,
	framework: ExternalFrameworkTypes,
	cssVariant: string = ''
) => {
	const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}|${encode(framework)}|${encode(
		cssVariant
	)}`
	window.history.replaceState(null, '', `/${hashedCode}`)
}

export const handleHashedUrl = (url: string) => {
	let decodedCss = ''
	let decodedHtml = ''
	let decodedJs = ''
	let decodedFramework = ''
	let decodedCssVariant = ''

	if (!url.endsWith('/') && !url.endsWith('#') && url !== '/projects/new') {
		const [rawHtml, rawCss, rawJs, rawFramework, rawCssVariant] = url.slice(1).split('%7C')

		decodedCss = rawCss ? decode(rawCss) : ''
		decodedHtml = rawHtml ? decode(rawHtml) : ''
		decodedJs = rawJs ? decode(rawJs) : ''
		decodedFramework = rawFramework ? decode(rawFramework) : ''
		decodedCssVariant = rawCssVariant ? decode(rawCssVariant) : ''
	}
	const hasAnyContent =
		decodedCss !== '' ||
		decodedHtml !== '' ||
		decodedJs !== '' ||
		decodedFramework !== '' ||
		decodedCssVariant !== ''
	return { hasAnyContent, decodedCss, decodedHtml, decodedJs, decodedFramework, decodedCssVariant }
}

export const slugify = (text: string) => {
	if (!text) return ''
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

export const buildURL = (pathToGo: string): string => {
	return `${window.location.origin}/${pathToGo}`
}
