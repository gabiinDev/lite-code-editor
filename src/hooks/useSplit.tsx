import Split from 'split-grid'

const useSplit = () => {
	const initSplit = ({
		gutterColElement,
		gutterRowElement
	}: {
		gutterColElement: HTMLElement
		gutterRowElement: HTMLElement
	}) => {
		Split({
			snapOffset: 0,
			columnGutters: [
				{
					track: 1,
					element: gutterColElement
				}
			],
			rowGutters: [
				{
					track: 1,
					element: gutterRowElement
				}
			]
		})
	}

	return initSplit
}

export default useSplit
