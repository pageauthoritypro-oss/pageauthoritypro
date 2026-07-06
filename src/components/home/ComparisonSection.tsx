import Image from 'next/image';
import { cn } from '@/lib/utils';
import CtaLink from '@/components/CtaLink';
import type { ComparisonSectionData } from '@/sanity/types/index';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionHeader from '@/components/layout/SectionHeader';
import DynamicIcon from '@/components/DynamicIcon';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';

export default function ComparisonSection(props: ComparisonSectionData) {
	const cta_btns = props?.header?.cta_btn;
	const columns = props?.columns;
	const bottomText = props?.bottomText;
	const tableHeader = columns?.map(({ heading, position, type }) => ({ heading, position, type }));
	const rows = Array.from(
		{
			length: columns
				? Math.max(
						columns.length > 0 ? (columns[0]?.items ? columns[0].items.length : 0) : 0,
						columns.length > 1 ? (columns[1]?.items ? columns[1].items.length : 0) : 0,
						columns.length > 2 ? (columns[2]?.items ? columns[2].items.length : 0) : 0,
					)
				: 0,
		},
		(_, rowIndex) => {
			const item =
				columns?.map((col) => {
					const feature = col?.items?.[rowIndex];
					return {
						highlight: col.type,
						position: col.position,
						icon: feature?.icon ?? col.icon,
						value: feature?.name,
					};
				}) || [];
			return item;
		},
	);

	return (
		<section aria-labelledby='comparison-heading' className='relative overflow-hidden bg-background py-16 lg:py-24 2xl:py-28'>
			{/* Decorative Left Pillar */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute h-full md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 xl:translate-x-[-44.5%] -translate-y-20 flex items-start md:items-end justify-center pb-12'>
				<Image
					src='/assets/column.webp'
					alt=''
					width={282}
					height={770}
					className='w-full h-[444px] sm:h-[550px] md:h-[88%] lg:h-[85%] aspect-auto opacity-16'
					loading='lazy'
				/>
				<div className='absolute w-full h-[444px] sm:h-[550px] md:h-5/6 bg-[linear-gradient(to_bottom,rgba(6,13,21,0)_17%,rgba(6,13,21,0.71)_59%,rgba(6,13,21,1)_96%)]'></div>
			</div>

			{/* Decorative Right Pillar */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute h-full md:top-1/2 right-0 translate-x-1/2 md:-translate-y-1/2 xl:translate-x-[44.5%] -translate-y-20 flex items-start md:items-end justify-center pb-12'>
				<Image
					src='/assets/column.webp'
					alt=''
					width={282}
					height={770}
					className='w-full h-[444px] sm:h-[550px] md:h-[88%] lg:h-[84%] aspect-auto opacity-16'
					loading='lazy'
				/>
				<div className='absolute w-full h-[444px] sm:h-[550px] md:h-5/6 bg-[linear-gradient(to_bottom,rgba(6,13,21,0)_17%,rgba(6,13,21,0.71)_59%,rgba(6,13,21,1)_96%)]'></div>
			</div>

			<div className='flex flex-col gap-10 md:gap-[72px]'>
				{/* Section Header */}
				<SectionHeader
					header={props?.header}
					align='center'
					showCta={false}
					className='z-10 relative px-20 gap-4'
					headingClassName='text-4xl min-[550px]:text-[32px] sm:text-[40px] lg:text-[52px] sm:leading-14'
					descriptionClassName='max-w-[498px] text-[14.75px] min-[550px]:text-base leading-normal tracking-normal'
				/>

				{/* Table Container */}
				<SectionContainer className='relative z-10 w-full'>
					<AnimatedFadeUp delay={0.1}>
						<div className='mx-auto max-w-4xl overflow-hidden rounded-xl border border-[#10171E] bg-[#060D15] shadow-2xl md:block'>
							<Table className='w-full table-fixed border-collapse overflow-hidden'>
								{tableHeader && tableHeader.length > 0 && (
									<TableHeader className='border-b border-[#C7933D12]'>
										<TableRow className='hover:bg-transparent border-none'>
											{tableHeader.map(({ heading, position, type }, i) => (
												<TableHead
													key={i}
													className={cn(
														'font-heading bg-[#03060B] h-auto sm:px-8 py-5 text-left text-xs font-bold uppercase tracking-[0.08em] leading-normal border-r border-[#C7933D12] last:border-r-0 whitespace-break-spaces',
														type == 'destructive' && 'text-[#E6092E]',
														type == 'transparent' && 'text-text-muted',
														type == 'brand' && 'text-[#C7933D]',
													)}>
													<div className={cn('flex gap-2.5 items-center', position == 'center' && 'justify-center')}>
														<span>{heading}</span>
													</div>
												</TableHead>
											))}
										</TableRow>
									</TableHeader>
								)}

								<TableBody className='divide-y divide-[#C7933D12] border-none'>
									{tableHeader &&
										tableHeader.length > 0 &&
										rows.map((row, i) => {
											return (
												<TableRow
													key={i}
													className='group text-sm font-heading font-medium hover:bg-transparent border-b border-[#C7933D12]'>
													{row &&
														row?.length > 0 &&
														row.map(({ highlight, icon, position, value }, i) => (
															<TableCell
																key={i}
																className={cn(
																	'transition-all ease-in-out text-sm sm:text-[14px] whitespace-normal break-words align-middle sm:px-8 py-4 group-hover:text-white border-r border-[#C7933D12] last:border-r-0',
																	highlight == 'destructive' &&
																		'font-normal leading-normal tracking-normal text-[#B4BAC2] bg-[#E6092E12] group-hover:bg-[#E6092E1F]',
																	highlight == 'transparent' &&
																		'text-center font-heading tracking-[0.02em] leading-normal text-text-muted bg-[#060D15] group-hover:bg-[#0E1622] ',
																	highlight == 'brand' &&
																		'font-heading font-medium leading-normal tracking-normal text-[#F5F5F5] bg-[#C7933D0A] group-hover:bg-[#C7933D14]',
																	position == 'center' ? 'text-center' : 'text-left',
																)}>
																<div
																	className={cn(
																		'flex items-center gap-3 ',
																		position == 'center' && 'justify-center',
																	)}>
																	{icon && highlight && (
																		<DynamicIcon
																			icon={icon === 'tick' ? 'Check' : icon === 'cross' ? 'X' : icon}
																			className={cn(
																				'sm:h-4 sm:w-4 h-3.5 w-3.5 shrink-0',
																				highlight == 'destructive' && 'text-[#E6092E]',
																				highlight == 'brand' && 'text-[#C7933D]',
																			)}
																			strokeWidth={2.5}
																		/>
																	)}
																	{value && <span>{value}</span>}
																</div>
															</TableCell>
														))}
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</div>
					</AnimatedFadeUp>
				</SectionContainer>

				{bottomText && (
					<AnimatedFadeUp>
						<p className='relative z-10 text-center font-heading font-normal text-[14px] lg:text-[16px] leading-normal text-[#B5BBC3] max-w-md lg:max-w-lg mx-auto px-5'>
							{bottomText}
						</p>
					</AnimatedFadeUp>
				)}

				{cta_btns && cta_btns?.length > 0 && (
					<AnimatedFadeUp>
						<div className='flex justify-center z-10 relative'>
							{cta_btns.map(({ cta_text, url, icon, target, variant }, i) => (
								<CtaLink key={i} href={url} variant={variant} target={target}>
									<span>{cta_text}</span>
									{icon && <DynamicIcon icon={icon} size={16} />}
								</CtaLink>
							))}
						</div>
					</AnimatedFadeUp>
				)}
			</div>
		</section>
	);
}
