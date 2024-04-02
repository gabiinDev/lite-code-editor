import { useEffect } from 'preact/hooks'

interface UseSaveKeyEventListenerProps {
	(event: KeyboardEvent): void
}

const useSaveKeyEventListener = (listener: UseSaveKeyEventListenerProps) => {
	useEffect(() => {
		console.log('crea evenet')
		document.addEventListener('keydown', listener)

		// Limpiar el event listener al desmontar
		return () => {
			document.removeEventListener('keydown', listener)
		}
	}, [])
}

export default useSaveKeyEventListener
