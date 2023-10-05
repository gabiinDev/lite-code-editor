export const debounce = <Args extends any[]>(func: (...args: Args) => any, wait: number) => {
	let timeoutId: number | undefined
	return (...args: Args): void => {
		const later = () => {
			clearTimeout(timeoutId)
			func(...args)
		}
		clearTimeout(timeoutId)
		timeoutId = setTimeout(later, wait)
	}
}
