import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	as?: 'section' | 'div' | 'article' | 'header' | 'footer';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(({
	as: Component = 'section',
	className,
	children,
	...props
}, ref) => {
	return (
		<Component
			ref={ref as React.Ref<never>}
			className={cn(
				'relative w-full overflow-hidden bg-background py-16 lg:py-24',
				className
			)}
			{...props}
		>
			{children}
		</Component>
	);
});

Section.displayName = 'Section';

export default Section;
