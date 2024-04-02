import DocumentEditIcon from '../icon/DocumentEditIcon'

interface Props {
	linkTo: string
	name: string
}

const BoxEdit = ({ linkTo, name }: Props) => {
	const handleClick = () => {
		window.location.href = linkTo
	}

	return (
		<button
			onClick={handleClick}
			class='hover:scale-105 transition-all hover:contrast-125 w-28 h-28 text-black shadow-lg shadow-black hover:opacity-70 grid content-center place-items-center rounded-md border-gray-700 border gap-3'
		>
			<i class='w-8 h-8 text-white opacity-80'>
				<DocumentEditIcon fill='none' strokeWidth='1' stroke='currentColor' />
			</i>
			<span class='text-white opacity-80 text-sm text-center px-2'>{name}</span>
		</button>
	)
}

export default BoxEdit
