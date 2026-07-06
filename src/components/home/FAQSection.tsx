import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { FaqSectionData } from '@/sanity/types';
import RichText from '@/components/RichText';
import SectionHeader from '@/components/layout/SectionHeader';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';

export default function FAQSection(props: FaqSectionData) {
	const faqs = props.items;
	const allowMultiple = props.allowMultipleOpen;
	const footerText = props.footerText;

	return (
		<section className='px-5 relative overflow-hidden bg-background py-16 lg:py-24 2xl:py-40 2xl:pb-32 flex flex-col items-center'>
			<div className='relative z-10 w-full flex flex-col items-center gap-17'>
				<SectionHeader
					header={props?.header}
					align='center'
					headingClassName='font-bold lg:text-5xl'
					descriptionClassName='font-satoshi text-lg max-w-136'
					className='max-w-[800px] mx-auto gap-6'
				/>

				{faqs && faqs.length > 0 && (
					<Accordion multiple={allowMultiple} className='sm:max-w-2xl md: lg:max-w-2xl 2xl:max-w-[800px] w-full space-y-3 rounded-[1rem]'>
						{faqs.map(({ question, answer }, index) => {
							if (!question || !answer) return null;
							return (
								<AnimatedFadeUp key={index} className='w-full'>
									<AccordionItem value={index} className='border border-[#1C2635] bg-[#0C131B] rounded-[1rem] overflow-hidden'>
										<AccordionTrigger
											className={cn(
												'border-0 rounded-[1rem] focus-visible:outline-none focus-visible:ring-0 items-center py-5 px-6 text-left text-sm sm:text-[14px] font-satoshi font-medium leading-5 tracking-normal align-middle text-[#F5F5F5] aria-expanded:text-brand-gold data-open:text-brand-gold hover:no-underline transition-all [&_svg]:stroke-[#C7933D] [&_svg]:size-[18px] [&_svg]:stroke-[2.5px]',
											)}>
											{question}
										</AccordionTrigger>
										<AccordionContent className='px-6 pb-5 pt-1 text-sm sm:text-[14px] font-satoshi font-normal leading-7 text-text-muted'>
											<RichText value={answer} className='space-y-2' />
										</AccordionContent>
									</AccordionItem>
								</AnimatedFadeUp>
							);
						})}
					</Accordion>
				)}

				{footerText && (
					<AnimatedFadeUp>
						<RichText
							value={footerText}
							className='font-satoshi text-base leading-6 text-text-muted text-center max-w-2xl mt-4 select-none'
						/>
					</AnimatedFadeUp>
				)}
			</div>
		</section>
	);
}
