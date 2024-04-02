import type { JSX } from 'preact/jsx-runtime'
import type { ISvgProps } from '../types/svgProps'

export interface Props {
	className?: string
}

export default function CloseIcon({
	className,
	fill,
	strokeWidth,
	stroke
}: ISvgProps): JSX.Element {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			class={className}
			viewBox='0 0 14 14'
			strokeWidth={strokeWidth}
			stroke={stroke}
			fill={fill}
		>
			<path
				stroke='currentColor'
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='2'
				d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
			/>
		</svg>
	)
}
