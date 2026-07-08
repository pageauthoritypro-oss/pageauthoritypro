'use client';

import { motion } from 'motion/react';
import { ReactNode, useContext } from 'react';
import { LcpContext } from '@/components/AnimatedSection';

type MotionTag =
	| 'div'
	| 'span'
	| 'p'
	| 'li'
	| 'section'
	| 'article'
	| 'header'
	| 'footer'
	| 'nav'
	| 'aside'
	| 'main'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6';

interface AnimatedFadeUpProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
	y?: number;
	isHero?: boolean;
	isLcp?: boolean;
	as?: MotionTag;
}

export default function AnimatedFadeUp({
	children,
	className,
	delay = 0,
	duration = 0.6,
	y = 20,
	isHero = false,
	isLcp = false,
	as = 'div',
}: AnimatedFadeUpProps) {
	const MotionComponent = motion[as];
	const isLcpFromContext = useContext(LcpContext);
	const activeIsLcp = isLcp || isLcpFromContext;

	if (isHero || activeIsLcp) {
		return (
			<MotionComponent
				initial={activeIsLcp ? { y } : { opacity: 0, y }}
				animate={activeIsLcp ? { y: 0 } : { opacity: 1, y: 0 }}
				transition={{
					duration,
					delay,
					ease: [0.215, 0.61, 0.355, 1],
				}}
				className={className}>
				{children}
			</MotionComponent>
		);
	}

	return (
		<MotionComponent
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{
				duration,
				delay,
				ease: [0.215, 0.61, 0.355, 1],
			}}
			className={className}>
			{children}
		</MotionComponent>
	);
}
