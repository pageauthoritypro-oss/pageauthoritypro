import { Fragment } from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import SectionContainer from '@/components/layout/SectionContainer';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import type { CampaignPlansSectionData, CampaignPlan } from '@/sanity/types';

function CheckItem({ text }: { text: string }) {
	return (
		<li className='flex items-center gap-2'>
			<CheckCircle className='h-5 w-5 shrink-0 text-[#C7933D]' />
			<span className='font-heading font-medium text-[14px] leading-[125%] text-[#B4BAC2]'>{text}</span>
		</li>
	);
}

function ServiceCard({ plan }: { plan: CampaignPlan }) {
	const hasPrice = !!plan.subtitle && !!plan.price;
	const hasPricingBlock = !!plan.pricingBlock?.title;

	return (
		<article className='flex flex-col gap-8 rounded-2xl p-8 bg-[rgba(15,31,56,0.2)]'>
			<div className='flex items-start gap-6'>
				<div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle,#241A0A,#060D15)] border-[1.5px] border-[#C7933D]'>
					<span className='font-heading font-bold text-[32px] leading-[125%] tracking-[-1.3px] text-[#C7933D]'>{plan.badgeNumber}</span>
				</div>

				<div className='flex flex-col gap-4'>
					<h2 className='font-heading font-bold text-[24px] leading-[125%] uppercase text-white'>{plan.title}</h2>
					{hasPrice && plan.subtitle && (
						<p className='font-heading font-medium text-[16px] leading-[125%] text-[#C7933D]'>{plan.subtitle}</p>
					)}
					{hasPrice && plan.price && (
						<p className='font-heading font-bold text-[36px] lg:text-[52px] tracking-[-4px] text-[#C7933D] leading-tight lg:leading-[80px]'>
							{plan.price}
						</p>
					)}
					{!hasPrice && plan.description && (
						<p className='font-heading font-normal text-[16px] leading-[112%] text-[#B4BAC2]'>{plan.description}</p>
					)}
				</div>
			</div>

			{hasPrice && plan.description && <p className='font-heading font-normal text-[16px] leading-[112%] text-[#B4BAC2]'>{plan.description}</p>}

			{!!plan.checklist?.length && (
				<Fragment>
					{plan.checklistLabel && (
						<p className='font-heading font-bold text-[24px] leading-[125%] uppercase text-[#C7933D]'>{plan.checklistLabel}</p>
					)}
					{/* CSS grid handles any number of items — 2 cols on sm+, 1 col on mobile */}
					<ul
						role='list'
						className={cn('grid list-none grid-cols-1 sm:grid-cols-2 gap-3', hasPricingBlock && 'pb-8 border-b border-[#1C2635]')}>
						{plan.checklist.map((item, i) => (
							<CheckItem key={i} text={item.text} />
						))}
					</ul>
				</Fragment>
			)}

			{hasPricingBlock && plan.pricingBlock && (
				<div className='flex flex-col gap-6'>
					<div className='flex flex-col gap-4'>
						{plan.pricingBlock.label && (
							<p className='font-heading font-medium text-[16px] leading-[125%] uppercase text-[#C7933D]'>{plan.pricingBlock.label}</p>
						)}
						<p className='font-heading font-medium text-[32px] leading-[120%] tracking-[-1px] text-[#C7933D] whitespace-pre-line'>
							{plan.pricingBlock.title}
						</p>
					</div>
					{plan.pricingBlock.description && (
						<p className='font-heading font-normal text-[16px] leading-[120%] text-[#B4BAC2]'>{plan.pricingBlock.description}</p>
					)}
				</div>
			)}
		</article>
	);
}

export default function CoreServicesSection({ plans, overlapPrevious = false }: CampaignPlansSectionData & { overlapPrevious?: boolean }) {
	if (!plans?.length) return null;

	return (
		<section aria-label='Core pricing services' className={cn('relative z-10 pb-12 lg:pb-0', overlapPrevious && 'lg:mt-[-200px]')}>
			<SectionContainer className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{plans.map((plan, i) => (
					<AnimatedFadeUp key={plan._key ?? i} className='h-full'>
						<ServiceCard plan={plan} />
					</AnimatedFadeUp>
				))}
			</SectionContainer>
		</section>
	);
}
