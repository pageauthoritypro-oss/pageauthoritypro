import * as React from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"group/button inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					'rounded-lg border border-transparent bg-clip-padding text-sm font-medium bg-primary text-primary-foreground [a]:hover:bg-primary/80',
				brand: 'btn-primary',
				primary: 'btn-primary',
				secondary: 'btn-secondary',
				destructive:
					'rounded-full border border-transparent bg-clip-padding text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
				outline:
					'rounded-full border-border bg-background text-sm font-medium hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
				transparent:
					'rounded-full border border-transparent bg-clip-padding text-sm font-medium hover:bg-muted hover:text-foregroun dark:hover:bg-muted/50',
				ghost: 'rounded-lg border border-transparent bg-clip-padding text-sm font-medium hover:bg-muted hover:text-foreground dark:hover:bg-muted/50',
				accent: 'rounded-full border border-transparent bg-clip-padding px-4 py-3 font-heading text-base leading-none font-bold text-brand-gold hover:bg-brand-gold/20 hover:text-brand-gold dark:hover:bg-brand-gold/50',
				info: 'btn-secondary',
				link: 'text-sm font-medium text-primary underline-offset-4 hover:underline',
				solid: 'btn-primary',
			},
			size: {
				default: 'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
				cta: '',
				icon: 'size-8',
				'icon-xs': "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
				'icon-sm': 'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
				'icon-lg': 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

function Button({ className, variant = 'default', size = 'default', asChild, children, ...props }: ButtonProps) {
	if (asChild) {
		return (
			<ButtonPrimitive
				data-slot='button'
				className={cn(buttonVariants({ variant, size, className }))}
				render={children as React.ReactElement}
				{...props}
			/>
		);
	}

	return (
		<ButtonPrimitive data-slot='button' className={cn(buttonVariants({ variant, size, className }))} {...props}>
			{children}
		</ButtonPrimitive>
	);
}

export { Button, buttonVariants };
