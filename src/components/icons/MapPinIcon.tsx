import type { SVGProps } from 'react';

export default function MapPinIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width='80' height='78' viewBox='0 0 80 78' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<path
				d='M13.7397 55.7212C7.103 57.7122 3 60.4622 3 63.5C3 69.5757 19.4157 74.5 39.6667 74.5C59.9177 74.5 76.3333 69.5757 76.3333 63.5C76.3333 60.4622 72.2285 57.7122 65.5937 55.7212'
				stroke='url(#map-pin-gradient-0)'
				strokeWidth='6'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M39.6668 59.8333C39.6668 59.8333 63.5002 44.2573 63.5002 26.2503C63.5002 13.4097 52.8302 3 39.6668 3C26.5035 3 15.8335 13.4097 15.8335 26.2503C15.8335 44.2573 39.6668 59.8333 39.6668 59.8333Z'
				stroke='url(#map-pin-gradient-1)'
				strokeWidth='6'
				strokeLinejoin='round'
			/>
			<path
				d='M39.6667 36C42.0978 36 44.4294 35.0342 46.1485 33.3152C47.8676 31.5961 48.8333 29.2645 48.8333 26.8334C48.8333 24.4022 47.8676 22.0706 46.1485 20.3515C44.4294 18.6325 42.0978 17.6667 39.6667 17.6667C37.2355 17.6667 34.9039 18.6325 33.1849 20.3515C31.4658 22.0706 30.5 24.4022 30.5 26.8334C30.5 29.2645 31.4658 31.5961 33.1849 33.3152C34.9039 35.0342 37.2355 36 39.6667 36Z'
				stroke='url(#map-pin-gradient-2)'
				strokeWidth='6'
				strokeLinejoin='round'
			/>
			<defs>
				<linearGradient id='map-pin-gradient-0' x1='39.6667' y1='55.7212' x2='39.6667' y2='74.5' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#C7933D' />
					<stop offset='1' stopColor='#61481E' />
				</linearGradient>
				<linearGradient id='map-pin-gradient-1' x1='39.6668' y1='3' x2='39.6668' y2='59.8333' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#C7933D' />
					<stop offset='1' stopColor='#61481E' />
				</linearGradient>
				<linearGradient id='map-pin-gradient-2' x1='39.6667' y1='17.6667' x2='39.6667' y2='36' gradientUnits='userSpaceOnUse'>
					<stop stopColor='#C7933D' />
					<stop offset='1' stopColor='#61481E' />
				</linearGradient>
			</defs>
		</svg>
	);
}
