import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export default function XIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg className={cn('w-4 h-4', className)} viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
			<path d='M10.6381 7.56895L17.2924 0H15.7154L9.93766 6.57186L5.32277 0H0L6.97857 9.93794L0 17.875H1.57702L7.67874 10.9349L12.5522 17.875H17.875L10.6377 7.56895H10.6381ZM8.47824 10.0254L7.77108 9.03581L2.14518 1.1616H4.56737L9.10733 7.51644L9.81435 8.50599L15.7161 16.7662H13.2942L8.47824 10.0258V10.0254Z' fill='currentColor' />
		</svg>
	);
}
