import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export default function FacebookIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg className={cn('w-4 h-4', className)} viewBox='0 0 10 19' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<path d='M6.41667 10.5417H8.70833L9.625 6.875H6.41667V5.04167C6.41667 4.0975 6.41667 3.20833 8.25 3.20833H9.625V0.128333C9.32617 0.0889167 8.19775 0 7.00608 0C4.51733 0 2.75 1.51892 2.75 4.30833V6.875H0V10.5417H2.75V18.3333H6.41667V10.5417Z' fill='currentColor' />
		</svg>
	);
}
