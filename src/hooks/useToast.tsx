import { Dismiss, type DismissInterface, type DismissOptions } from 'flowbite'
import { useEffect, useRef, useState } from 'preact/hooks'

const useToast = () => {
	const toastRefElement = useRef(null as unknown as HTMLDivElement)
	const toastRef = useRef(null as unknown as DismissInterface)
	const [showToast, setShowToast] = useState(false)
	useEffect(() => {
		if (toastRefElement.current) {
			const options: DismissOptions = {
				transition: 'transition-opacity',
				duration: 1000,
				timing: 'ease-out',

				// callback functions
				onHide: (context, targetEl) => {
					console.log('element has been dismissed')
					console.log(targetEl)
					setShowToast(false)
				}
			}
			const dismiss: DismissInterface = new Dismiss(toastRefElement.current, null, options)
			toastRef.current = dismiss
		}
	}, [])

	const toastHtmlElement = (
		<div
			ref={toastRefElement}
			id='targetElement'
			className='p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-blue-200 dark:text-blue-800'
			role='alert'
		>
			<span class='font-medium'>Info alert!</span> Change a few things up and try submitting again.
		</div>
	)

	return {
		toastHtmlElement,
		showToast,
		setShowToast
	}
}

export default useToast
