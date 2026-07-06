import type { SVGProps } from 'react';

export default function TargetIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<path
				d='M34.9313 29.7356C33.3433 30.494 31.9604 31.6223 30.8988 33.0258C29.8372 34.4293 29.1279 36.0671 28.8303 37.8015C28.5327 39.5359 28.6556 41.3165 29.1886 42.9936C29.7217 44.6707 30.6493 46.1954 31.8937 47.4398C33.1381 48.6842 34.6628 49.6118 36.3399 50.1449C38.017 50.6779 39.7976 50.8008 41.532 50.5032C43.2664 50.2056 44.9042 49.4963 46.3077 48.4347C47.7112 47.373 48.8395 45.9902 49.5979 44.4022'
				stroke='url(#target-gradient-0)'
				strokeWidth='6'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M47.5135 17.1534C45.0568 16.3009 42.4168 15.8334 39.6668 15.8334C26.5035 15.8334 15.8335 26.5034 15.8335 39.6667C15.8335 52.8301 26.5035 63.5001 39.6668 63.5001C52.8302 63.5001 63.5002 52.8301 63.5002 39.6667C63.5002 36.9167 63.0345 34.2767 62.1802 31.8201'
				stroke='url(#target-gradient-1)'
				strokeWidth='6'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M57.208 7.46055C51.8284 4.5239 45.7956 2.98986 39.6667 3.00005C19.4157 3.00005 3 19.4157 3 39.6667C3 59.9177 19.4157 76.3334 39.6667 76.3334C59.9177 76.3334 76.3333 59.9177 76.3333 39.6667C76.3438 33.5385 74.8104 27.5065 71.8747 22.1272M76.3333 3.00005L39.6667 39.6667'
				stroke='url(#target-gradient-2)'
				strokeWidth='6'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<defs>
				<linearGradient id='target-gradient-0' x1='39.1349' y1='29.7356' x2='39.1349' y2='50.6616' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#C7933D' />
					<stop offset='1' stopColor='#61481E' />
				</linearGradient>
				<linearGradient id='target-gradient-1' x1='39.6668' y1='15.8334' x2='39.6668' y2='63.5001' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#C7933D' />
					<stop offset='1' stopColor='#61481E' />
				</linearGradient>
				<linearGradient id='target-gradient-2' x1='39.6667' y1='3' x2='39.6667' y2='76.3334' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#C7933D' />
					<stop offset='1' stopColor='#61481E' />
				</linearGradient>
			</defs>
		</svg>
	);
}
