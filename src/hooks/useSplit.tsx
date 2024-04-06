import Split from 'split-grid'
import type { ProjectType } from '../types/models/project/projectTypeModel'

const useSplit = ({ type }: { type: ProjectType }) => {
	const initSplit = ({
		gutterColElement,
		gutterRowElement
	}: {
		gutterColElement: HTMLElement
		gutterRowElement?: HTMLElement
	}) => {
		if (type === 'full-frontend' && gutterRowElement) {
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
		} else {
			Split({
				snapOffset: 0,
				columnGutters: [
					{
						track: 1,
						element: gutterColElement
					}
				]
			})
		}
	}

	return initSplit
}

export default useSplit
