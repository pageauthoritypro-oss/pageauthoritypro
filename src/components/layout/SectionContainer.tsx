import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	as?: 'div' | 'section' | 'nav' | 'header' | 'footer';
}

const SectionContainer = React.forwardRef<HTMLDivElement, SectionContainerProps>(({ as: Component = 'div', className, children, ...props }, ref) => {
	return (
		<Component ref={ref} className={cn('mx-auto max-w-7xl px-5 min-[1440px]:px-0', className)} {...props}>
			{children}
		</Component>
	);
});

SectionContainer.displayName = 'SectionContainer';

export default SectionContainer;
