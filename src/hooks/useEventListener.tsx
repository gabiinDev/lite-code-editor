import { useEffect } from 'preact/hooks'

interface UseSaveKeyEventListenerProps {
	(event: KeyboardEvent): void
}

const useSaveKeyEventListener = (listener: UseSaveKeyEventListenerProps) => {
	useEffect(() => {
		document.addEventListener('keydown', listener)
		return () => {
			document.removeEventListener('keydown', listener)
		}
	}, [])
}

export default useSaveKeyEventListener
