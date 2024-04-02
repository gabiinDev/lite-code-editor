import type { ISvgProps } from '../types/svgProps'

const SaveIcon = ({ className, fill, strokeWidth, stroke }: ISvgProps) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			class={className}
			viewBox='0 0 24 24'
			strokeWidth={strokeWidth}
			stroke={stroke}
			fill={fill}
		>
			<path
				stroke='currentColor'
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='2'
				d='m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z'
			></path>
		</svg>
	)
}

export default SaveIcon
