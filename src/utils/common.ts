import { decode, encode } from 'js-base64'

const tailWindUrlScript = '<script src="https://cdn.tailwindcss.com"></script>'

export const createHtmlTemplate = (css: string, html: string, js: string) => {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style id="preview-style">
      ${css}
    </style>
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
