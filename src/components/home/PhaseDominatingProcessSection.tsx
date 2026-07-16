'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import SectionHeader from '@/components/layout/SectionHeader';
import { cn } from '@/lib/utils';
import type { PhaseDominatingProcessSectionData } from '@/sanity/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Circle } from 'lucide-react';
import DynamicIcon from '@/components/DynamicIcon';
import SectionContainer from '@/components/layout/SectionContainer';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';

export default function PhaseDominatingProcessSection(props: PhaseDominatingProcessSectionData) {
	const phases = props?.phases || [];

	const containerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [containerWidth, setContainerWidth] = useState(1240);
	const [windowWidth, setWindowWidth] = useState(1200);
	const [windowHeight, setWindowHeight] = useState(800);
	const [headerHeight, setHeaderHeight] = useState(0);
	const [isFullSectionSticky, setIsFullSectionSticky] = useState(true);
	const [galleryStickyTop, setGalleryStickyTop] = useState<number | null>(null);

	// Measure container width, window width, and content height for dynamic stickiness
	useEffect(() => {
		let rafId: number | null = null;

		const updateDimensions = () => {
			if (rafId) window.cancelAnimationFrame(rafId);

			rafId = window.requestAnimationFrame(() => {
				const nextWidth = window.innerWidth;
				const nextHeight = window.innerHeight;

				setWindowWidth((prev) => (prev !== nextWidth ? nextWidth : prev));
				setWindowHeight((prev) => (prev !== nextHeight ? nextHeight : prev));

				let currentContainerWidth = 1240;
				if (galleryRef.current) {
					currentContainerWidth = galleryRef.current.offsetWidth;
					setContainerWidth((prev) => (prev !== currentContainerWidth ? currentContainerWidth : prev));
				}

				// Determine if the whole section fits within the viewport height minus the fixed nav.
				const currentHeaderHeight = headerRef.current?.offsetHeight || 0;
				const galleryHeight = galleryRef.current?.offsetHeight || 0;
				const totalContentHeight = currentHeaderHeight + galleryHeight + 120;

				setHeaderHeight((prev) => (prev !== currentHeaderHeight ? currentHeaderHeight : prev));

				const availableHeight = nextHeight - 96;
				const fits = nextHeight >= 720 && totalContentHeight < availableHeight;
				setIsFullSectionSticky((prev) => (prev !== fits ? fits : prev));

				if (!fits) {
					const calculatedTop = Math.max(82, Math.min(118, (nextHeight - galleryHeight) / 2));
					setGalleryStickyTop((prev) => (prev !== calculatedTop ? calculatedTop : prev));
				} else {
					setGalleryStickyTop((prev) => (prev !== null ? null : prev));
				}
			});
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		const resizeObserver = new ResizeObserver(updateDimensions);
		if (headerRef.current) resizeObserver.observe(headerRef.current);
		if (galleryRef.current) resizeObserver.observe(galleryRef.current);
		return () => {
			if (rafId) window.cancelAnimationFrame(rafId);
			window.removeEventListener('resize', updateDimensions);
			resizeObserver.disconnect();
		};
	}, []);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	// Precise card parameters (keeping card styles exactly untouched)
	const cardWidth = 276;
	const isDesktop = windowWidth >= 1024;
	const isTablet = windowWidth >= 768 && windowWidth < 1024;
	const isShortViewport = windowHeight < 720;

	let GAP = 24;

	if (isDesktop) {
		// Calculate the exact gap so 3 cards span the container width perfectly with Card 1 left-aligned and Card 3 right-aligned
		GAP = Math.max(16, (containerWidth - 3 * cardWidth) / 2);
	} else if (isTablet) {
		// Calculate the exact gap so 2 cards span the container width perfectly with Card 1 left-aligned and Card 2 right-aligned
		GAP = Math.max(16, containerWidth - 2 * cardWidth);
	} else {
		// Mobile: 1 card visible on screen. GAP puts the next card exactly off-screen to align perfectly on scroll
		GAP = Math.max(16, containerWidth - cardWidth);
	}

	const trackWidth = phases.length * cardWidth + Math.max(0, phases.length - 1) * GAP;
	const totalDistance = Math.max(0, trackWidth - containerWidth);
	const scrollTrackHeight = Math.max(windowHeight + totalDistance, windowHeight * 2);

	// Calculate the start progress percentage so horizontal scroll only starts when the section becomes sticky
	let startProgress = 0;
	if (!isFullSectionSticky) {
		const stickyTopValue = galleryStickyTop !== null ? galleryStickyTop : 100;
		const scrollBeforeSticky = Math.max(0, 80 + headerHeight - stickyTopValue);
		const totalScrollableDistance = scrollTrackHeight + 220 - windowHeight;
		startProgress = totalScrollableDistance > 0 ? Math.min(0.9, scrollBeforeSticky / totalScrollableDistance) : 0;
	}

	const x = useTransform(scrollYProgress, [startProgress, 1], [0, -totalDistance]);

	// Update active index based on scroll position (relative to the active progress range)
	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		const activeProgress = latest < startProgress ? 0 : (latest - startProgress) / (1 - startProgress);
		const idx = Math.min(Math.round(activeProgress * (phases.length - 1)), phases.length - 1);
		setActiveIndex(idx);
	});

	// Left offset of the container relative to the screen width (used for right side calculations)
	const leftOffset = Math.max(0, (windowWidth - containerWidth) / 2);

	// Progression line starts at container X = 0 and extends to the right window limit
	const totalLineWidth = containerWidth + leftOffset;

	// The sliding marker starting position inside the track matches Card 1's center circle (X = cardWidth / 2)
	const leftStart = cardWidth / 2;
	const maxMarkerDistance = containerWidth - cardWidth;
	const activeProgressWidth = useTransform(scrollYProgress, [startProgress, 1], [leftStart, leftStart + maxMarkerDistance]);

	// Dynamic linear-gradient peaking at the active marker's percentage position along the track
	const progressGradient = useTransform(scrollYProgress, (latest) => {
		const activeProgress = latest < startProgress ? 0 : (latest - startProgress) / (1 - startProgress);
		const markerPos = leftStart + activeProgress * maxMarkerDistance;
		const percent = totalLineWidth > 0 ? (markerPos / totalLineWidth) * 100 : 0;
		return `linear-gradient(90deg, rgba(199, 147, 61, 0) 0%, #C7933D ${percent}%, rgba(199, 147, 61, 0) 100%)`;
	});

	const headerContent = (
		<SectionContainer ref={headerRef} className={cn('w-full shrink-0', isShortViewport ? 'mb-6' : 'mb-12')}>
			<SectionHeader header={props?.header} className='gap-6 w-full' descriptionClassName='max-w-[530px]' />
		</SectionContainer>
	);

	const galleryContent = (
		<AnimatedFadeUp delay={0.1} className='w-full flex flex-col gap-7 overflow-visible'>
			{/* Thick 7px Progress Line Container - static position aligned with card centers */}
			<div
				className='relative z-0 pointer-events-none overflow-visible h-[7px] shrink-0'
				style={{
					width: isDesktop || isTablet ? `${totalLineWidth}px` : '100%',
				}}>
				{/* Track with dynamic gradient focused on marker */}
				<motion.div
					className='w-full h-full rounded-full'
					style={{
						background: progressGradient,
					}}
				/>

				{/* Sliding Gold Indicator Marker */}
				<motion.div
					className='absolute w-[22px] h-[22px] rounded-full border-[3px] border-brand-gold bg-background flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_12px_rgba(199,147,61,0.6)]'
					style={{
						top: '3.5px',
						left: activeProgressWidth,
					}}>
					<div className='w-1.5 h-1.5 rounded-full bg-brand-gold' />
				</motion.div>
			</div>

			{/* Scrollable Gallery container */}
			{phases && phases.length > 0 && (
				<div ref={galleryRef} className='w-full relative overflow-hidden md:overflow-visible'>
					<motion.div
						data-process-track
						style={{ x, gap: `${GAP}px`, width: `${trackWidth}px` }}
						className='h-full relative flex flex-row shrink-0 w-max min-w-max'>
						{phases.map((phase, i) => {
							const { title, badge, description, icon } = phase;
							const isActive = activeIndex === i;

							return (
								<div
									key={i}
									data-process-card={i}
									style={{ width: `${cardWidth}px` }}
									className={cn('flex flex-col items-center shrink-0', isShortViewport ? 'gap-4' : 'gap-8')}>
									<Card
										className={cn(
											'w-full h-full rounded-[6px] border transition-all duration-500 text-center bg-[--background-secondary] max-w-[276px] gap-0',
											isShortViewport ? 'pt-3 pb-5' : 'pt-5 pb-7',
											isActive
												? 'border-brand-gold bg-[#0C131B] shadow-[0_0_30px_rgba(199,147,61,0.12)]'
												: 'border-text-muted/7 bg-background ',
										)}>
										<CardHeader className='relative flex items-center justify-center w-full'>
											<div className='relative grid place-items-center'>
												<Circle className={cn(isActive ? 'stroke-brand-gold/35' : 'stroke-text-muted/35')} />
												<Circle
													className={cn(
														'absolute fill-brand-gold stroke-transparent size-2',
														isActive ? 'fill-brand-gold' : 'fill-white/20',
													)}
												/>
											</div>
										</CardHeader>

										<CardContent className={cn('flex flex-col items-center w-full pb-0', isShortViewport ? 'mt-6' : 'mt-12')}>
											<div
												className={cn(
													'w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300',
													isActive
														? 'border-brand-gold/7 bg-brand-gold/7 stroke-brand-gold text-brand-gold'
														: 'border-text-muted/7 bg-text-muted/7 text-[#5E5E5E] stroke-[#5E5E5E]',
												)}>
												{icon && <DynamicIcon icon={icon} size={20} />}
											</div>

											<div className={cn(isShortViewport ? 'mt-3' : 'mt-[18px]')}>
												{badge && (
													<span
														className={cn(
															'text-[9px] font-heading font-medium leading-normal tracking-[0.16em] uppercase transition-colors duration-300',
															isActive ? 'text-[#7A5A24]' : 'text-text-muted ',
														)}>
														{badge}
													</span>
												)}
												{title && (
													<CardTitle
														className={cn(
															'font-heading font-medium leading-normal tracking-normal transition-colors duration-300',
															isShortViewport ? 'mt-2 text-lg' : 'mt-3.5 text-xl',
															isActive ? 'text-brand-gold' : 'text-heading',
														)}>
														{title}
													</CardTitle>
												)}

												{description && (
													<CardDescription
														className={cn(
															'font-heading text-sm font-normal tracking-normal text-text-muted transition-colors duration-300',
															isShortViewport ? 'mt-2 leading-5' : 'mt-3.5 leading-5.5',
														)}>
														{description}
													</CardDescription>
												)}
											</div>
										</CardContent>
									</Card>
								</div>
							);
						})}
					</motion.div>
				</div>
			)}
		</AnimatedFadeUp>
	);

	if (isFullSectionSticky) {
		return (
			<div ref={containerRef} data-process-section className='relative bg-background w-full' style={{ height: `${scrollTrackHeight}px` }}>
				<div data-process-full-sticky className='sticky top-0 h-dvh w-full flex flex-col justify-center overflow-hidden z-10 py-12'>
					<div className='w-full'>
						{headerContent}
						<SectionContainer className='relative w-full flex flex-col justify-center space-y-7 overflow-visible'>
							{galleryContent}
						</SectionContainer>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			data-process-section
			className='relative bg-background w-full pt-20 pb-12'
			style={{ height: `${scrollTrackHeight + 220}px` }}>
			{headerContent}
			<SectionContainer
				style={galleryStickyTop !== null ? { top: `${galleryStickyTop}px` } : undefined}
				data-process-gallery-sticky
				className={cn(
					'sticky w-full flex flex-col justify-center overflow-visible z-20 py-4',
					isShortViewport ? 'space-y-4' : 'space-y-7',
					galleryStickyTop === null && 'top-[100px] md:top-[120px]',
				)}>
				{galleryContent}
			</SectionContainer>
		</div>
	);
}
