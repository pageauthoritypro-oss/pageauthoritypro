import type { SVGProps } from 'react';

export default function OfficeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width='88' height='88' viewBox='0 0 88 88' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<path
				d='M64.167 80.6666V12.8333C64.167 11.3746 63.5875 9.97561 62.5561 8.94416C61.5246 7.91271 60.1257 7.33325 58.667 7.33325H14.667C13.2083 7.33325 11.8094 7.91271 10.7779 8.94416C9.74645 9.97561 9.16699 11.3746 9.16699 12.8333V75.1666C9.16699 76.6253 9.74645 78.0242 10.7779 79.0557C11.8094 80.0871 13.2083 80.6666 14.667 80.6666H64.167ZM64.167 80.6666H73.3337C74.7923 80.6666 76.1913 80.0871 77.2227 79.0557C78.2542 78.0242 78.8337 76.6253 78.8337 75.1666V43.9999C78.8337 43.0275 78.4474 42.0948 77.7597 41.4072C77.0721 40.7196 76.1394 40.3333 75.167 40.3333H67.8337C66.8612 40.3333 65.9286 40.7196 65.2409 41.4072C64.5533 42.0948 64.167 43.0275 64.167 43.9999V80.6666Z'
				stroke='url(#office-gradient-0)'
				strokeWidth='7'
				strokeLinejoin='round'
			/>
			<path
				d='M20.167 22H34.8337M20.167 34.8333H42.167'
				stroke='url(#office-gradient-1)'
				strokeWidth='7'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<defs>
				<linearGradient id='office-gradient-0' x1='44.0003' y1='7.33325' x2='44.0003' y2='80.6666' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#C7933D' />
					<stop offset='1' stopColor='#61481E' />
				</linearGradient>
				<linearGradient id='office-gradient-1' x1='31.167' y1='22' x2='31.167' y2='34.8333' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#C7933D' />
					<stop offset='1' stopColor='#61481E' />
				</linearGradient>
			</defs>
		</svg>
	);
}
