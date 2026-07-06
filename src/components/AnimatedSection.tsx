'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
	children: ReactNode;
	className?: string;
	isHero?: boolean;
	delay?: number;
}

export default function AnimatedSection({
	children,
	className,
	isHero = false,
	delay = 0,
}: AnimatedSectionProps) {
	if (isHero) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.8,
					delay,
					ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier for smooth deceleration
				}}
				className={className}
			>
				{children}
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{
				duration: 0.8,
				delay,
				ease: [0.215, 0.61, 0.355, 1],
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
