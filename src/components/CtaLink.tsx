import Link from 'next/link';
import { Button, type ButtonProps } from '@/components/ui/button';
import type { ComponentPropsWithoutRef } from 'react';

type CtaLinkVariant = 'brand' | 'primary' | 'secondary' | 'destructive' | 'transparent' | 'outline' | 'accent' | 'info';
type CtaLinkSize = 'cta' | 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';

interface CtaLinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, 'className' | 'size'> {
	variant?: CtaLinkVariant;
	size?: CtaLinkSize;
	className?: string;
}

export default function CtaLink({ variant = 'primary', size = 'cta', className, children, href, ...props }: CtaLinkProps) {
	return (
		<Button variant={variant as ButtonProps['variant']} size={size} asChild className={className} nativeButton={false}>
			<Link href={href || '#'} {...props}>{children}</Link>
		</Button>
	);
}
