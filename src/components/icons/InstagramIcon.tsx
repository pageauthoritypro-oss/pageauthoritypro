import type { SVGProps } from 'react';

export default function InstagramIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<path d='M5 14C3.34333 14 2 12.6567 2 11V5C2 3.34333 3.34333 2 5 2H11C12.6567 2 14 3.34333 14 5V11C14 12.6567 12.6567 14 11 14H5Z' stroke='currentColor' strokeOpacity='0.9' strokeWidth='1.46667' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M5.5 8C5.5 6.61933 6.61933 5.5 8 5.5C9.38067 5.5 10.5 6.61933 10.5 8C10.5 9.38067 9.38067 10.5 8 10.5C6.61933 10.5 5.5 9.38067 5.5 8Z' stroke='currentColor' strokeOpacity='0.9' strokeWidth='1.46667' strokeMiterlimit='10' />
			<path d='M10.5 4.75C10.5 4.336 10.836 4 11.25 4C11.664 4 12 4.336 12 4.75C12 5.164 11.664 5.5 11.25 5.5C10.836 5.5 10.5 5.164 10.5 4.75Z' fill='currentColor' fillOpacity='0.9' />
		</svg>
	);
}
