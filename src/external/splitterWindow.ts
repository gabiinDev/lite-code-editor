import Split from 'split-grid'

export const splitWindow = () => {
	const $col1 = document.querySelector('.gutter-col-1') as HTMLElement
	const $row1 = document.querySelector('.gutter-row-1') as HTMLElement

	Split({
		snapOffset: 0,
		columnGutters: [
			{
				track: 1,
				element: $col1
			}
		],
		rowGutters: [
			{
				track: 1,
				element: $row1
			}
		]
	})
}
