'use client';

import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from 'motion/react';
import { useRef, useState } from 'react';
import SectionHeader from '@/components/layout/SectionHeader';
import { cn } from '@/lib/utils';
import { GraphSectionData } from '@/sanity/types';
import SectionContainer from '@/components/layout/SectionContainer';

const crossPatternActive = `url("data:image/svg+xml,%3Csvg width='42' height='42' viewBox='3.42578 3.42578 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.29094 4.02095C5.43083 3.22766 6.56917 3.22766 6.70906 4.02095L6.81189 4.60409C6.86445 4.90217 7.09783 5.13555 7.39591 5.18811L7.97905 5.29094C8.77234 5.43083 8.77234 6.56917 7.97905 6.70906L7.39591 6.81189C7.09783 6.86445 6.86445 7.09783 6.81189 7.39591L6.70906 7.97905C6.56917 8.77234 5.43083 8.77234 5.29094 7.97905L5.18811 7.39591C5.13555 7.09783 4.90217 6.86445 4.60409 6.81189L4.02095 6.70906C3.22766 6.56917 3.22766 5.43083 4.02095 5.29094L4.60409 5.18811C4.90217 5.13555 5.13555 4.90217 5.18811 4.60409L5.29094 4.02095Z' fill='%23C7933D'/%3E%3C/svg%3E")`;
const crossPatternInactive = `url("data:image/svg+xml,%3Csvg width='42' height='42' viewBox='3.42578 3.42578 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.29094 4.02095C5.43083 3.22766 6.56917 3.22766 6.70906 4.02095L6.81189 4.60409C6.86445 4.90217 7.09783 5.13555 7.39591 5.18811L7.97905 5.29094C8.77234 5.43083 8.77234 6.56917 7.97905 6.70906L7.39591 6.81189C7.09783 6.86445 6.86445 7.09783 6.81189 7.39591L6.70906 7.97905C6.56917 8.77234 5.43083 8.77234 5.29094 7.97905L5.18811 7.39591C5.13555 7.09783 4.90217 6.86445 4.60409 6.81189L4.02095 6.70906C3.22766 6.56917 3.22766 5.43083 4.02095 5.29094L4.60409 5.18811C4.90217 5.13555 5.13555 4.90217 5.18811 4.60409L5.29094 4.02095Z' fill='%23334561'/%3E%3C/svg%3E")`;

export default function GraphSection(props?: Partial<GraphSectionData>) {
	const graph = props?.graph;
	const stages = graph?.stages ?? [];

	const sectionRef = useRef<HTMLDivElement>(null);
	const graphContainerRef = useRef<HTMLDivElement>(null);

	const isGraphInView = useInView(graphContainerRef, {
		once: true,
		amount: 0.3,
	});

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end end'],
	});

	const [activeIndex, setActiveIndex] = useState(0);

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		// highlights progress through the stages as we scroll the sticky track
		const index = Math.min(stages.length - 1, Math.floor(latest * stages.length));
		setActiveIndex(index);
	});

	return (
		<section className='relative z-20 bg-background'>
			<SectionContainer className='pt-16 pb-8 lg:pt-24 lg:pb-12 2xl:pt-20'>
				<SectionHeader header={props?.header} descriptionClassName='max-w-[450px]' />
			</SectionContainer>

			{/* Sticky Scroll Container for the Graph */}
			<div ref={sectionRef} className='relative h-[250vh] pb-36'>
				<div className='sticky top-[80px] z-10 h-[calc(100dvh-80px)] overflow-hidden flex flex-col justify-center py-0'>
					<SectionContainer className='relative z-10 w-full'>
						{/* Graph Container */}
						<div
							ref={graphContainerRef}
							className=' [--text-headroom:48px] lg:[--text-headroom:116px] flex h-[50dvh] sm:h-[60dvh] lg:h-[70dvh] xl:h-[75dvh] max-h-[calc(100dvh-140px)] w-full items-end justify-between rounded-xl pb-0'>
							<div className='flex items-end justify-between gap-4 md:gap-6 lg:gap-[87.59px] w-full h-full border-b-4 border-white/10 pb-4'>
								{stages &&
									stages.map((stage, index) => {
										const active = index === activeIndex;
										const barHeight = stage.barHeight;

										return (
											<div
												key={stage.name}
												className='flex flex-col items-center justify-end w-full flex-1 min-w-0 h-full relative'>
												{/* Bar Container */}
												<motion.div
													className='w-full flex items-end justify-center relative'
													initial={{ height: 0 }}
													animate={{
														height: isGraphInView ? `calc((100% - var(--text-headroom)) * ${barHeight} / 100)` : 0,
													}}
													transition={{
														duration: 0.8,
														delay: index * 0.1,
														ease: 'easeOut',
													}}>
													{/* Text Container directly above the bar (absolutely positioned) */}
													<div className='absolute bottom-full left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-1 h-fit pointer-events-none pb-3'>
														<motion.p
															layout='position'
															className={cn(
																'text-center transition-all duration-300 w-full font-heading whitespace-normal wrap-break-words font-bold text-[9px] min-[530px]:text-[12px] sm:text-[16px]',
																active ? 'text-brand-gold' : 'text-[#F5F5F5]/50',
															)}>
															{stage.name}
														</motion.p>

														{/* Description */}
														<AnimatePresence initial={false}>
															{active && (
																<motion.div
																	initial={{ height: 0, opacity: 0, scale: 0.95, y: 5 }}
																	animate={{ height: 'auto', opacity: 1, scale: 1, y: 0 }}
																	exit={{ height: 0, opacity: 0, scale: 0.95, y: 5 }}
																	transition={{
																		height: { duration: 0.3, ease: 'easeInOut' },
																		opacity: { duration: 0.2, delay: 0.05 },
																		scale: { duration: 0.2 },
																		y: { duration: 0.2 },
																	}}
																	className='hidden lg:block overflow-hidden w-full max-w-[220px]'>
																	<p className='text-[11px] sm:text-xs leading-relaxed text-text-muted/80 mt-2 text-center'>
																		{stage.description}
																	</p>
																</motion.div>
															)}
														</AnimatePresence>
													</div>

													{/* The actual Bar */}
													<div className='relative w-full max-w-[186px] h-full overflow-hidden'>
														<div
															className={cn(
																'absolute inset-0 transition-all duration-500',
																active ? 'opacity-100' : 'opacity-45',
															)}>
															<div
																className='h-full w-full bg-size-[6px_6px] min-[500px]:bg-size-[8.5px_8.5px] md:bg-size-[11.5px_11.5px]'
																style={{
																	backgroundImage: active ? crossPatternActive : crossPatternInactive,
																}}
															/>
														</div>
													</div>
												</motion.div>
											</div>
										);
									})}
							</div>
						</div>
					</SectionContainer>
				</div>
			</div>
		</section>
	);
}
