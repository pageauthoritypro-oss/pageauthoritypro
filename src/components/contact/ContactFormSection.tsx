'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import SectionContainer from '@/components/layout/SectionContainer';
import DynamicHeading from '@/components/DynamicHeading';
import DynamicIcon from '@/components/DynamicIcon';
import FieldRenderer from '@/components/form/FieldRenderer';
import Honeypot from '@/components/form/Honeypot';
import Turnstile from '@/components/form/Turnstile';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Form } from '@/components/ui/form';
import { contactFormSchema, MESSAGE_MIN_WORDS } from '@/lib/validations/contact';
import type { ContactFormValues } from '@/components/form/types';
import type { ContactFormSectionData } from '@/sanity/types';

interface Props {
	data: ContactFormSectionData;
}

export default function ContactFormSection({ data }: Props) {
	const { header, contactInfo, formFields, submitButtonText } = data;

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: { fullName: '', email: '', phone: '', message: '', hp_check: '', turnstileToken: '' },
	});
	const {
		handleSubmit,
		reset,
		setValue,
		formState: { isSubmitting },
	} = form;

	const handleVerify = useCallback(
		(token: string) => {
			setValue('turnstileToken', token);
		},
		[setValue],
	);

	const onSubmit = handleSubmit(async (values) => {
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			});
			const data = await response.json();
			if (!response.ok) {
				toast.error(data?.error ?? 'Something went wrong. Please try again.');
				return;
			}
			toast.success("Message sent! We'll get back to you within 24 hours.");
			reset();
		} catch {
			toast.error('Something went wrong. Please try again.');
		}
	});

	return (
		<section className='bg-background w-full py-16 lg:py-24'>
			<SectionContainer className='flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[120px]'>
				<div className='flex flex-col gap-8 lg:w-[504px] lg:shrink-0'>
					<div className='flex flex-col gap-4'>
						{header?.eyebrow?.text && (
							<p className='font-inter text-[16px] font-medium uppercase tracking-[0.02em] text-brand-gold'>{header.eyebrow.text}</p>
						)}
						<DynamicHeading
							heading={header?.heading}
							tag={header?.headingTag}
							defaultTag='h2'
							className='font-heading text-[36px] font-medium leading-[120%] tracking-[-1px] text-white sm:text-[44px] lg:text-[52px]'
						/>
						{header?.description && (
							<p className='font-inter text-[18px] leading-[22px] tracking-[-0.01em] text-[#B5BBC3]'>{header.description}</p>
						)}
					</div>

					{contactInfo && contactInfo.length > 0 && (
						<div className='flex flex-row gap-6 lg:flex-col'>
							{contactInfo.map((item, index) => {
								const href = item.value.includes('@') ? `mailto:${item.value}` : `tel:${item.value.replace(/\s+/g, '')}`;
								return (
									<div
										key={item._key ?? index}
										className='flex items-center gap-3.5 border-r border-[#B4BAC2]/17 pr-6 last:border-r-0 lg:border-r-0 lg:border-b lg:pr-0 lg:pb-6 lg:last:border-b-0 lg:last:pb-0'>
										<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-brand-gold/7 bg-brand-gold/8'>
											<DynamicIcon icon={item.icon} size={17} className='text-brand-gold' />
										</span>
										<div className='flex flex-col gap-1.5'>
											<span className='font-inter text-[11px] font-semibold uppercase tracking-[0.04em] text-[#606070]'>{item.label}</span>
											<Link href={href} className='font-inter text-[13px] font-semibold text-brand-gold'>
												{item.value}
											</Link>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>

				<Form {...form}>
					<form
						onSubmit={onSubmit}
						noValidate
						className='flex w-full flex-col gap-6 rounded-xl bg-[#0F1F38]/20 p-8 shadow-[0px_2px_12px_rgba(0,0,0,0.02)] lg:max-w-[673px]'>
						<Honeypot />

						{formFields && formFields.length > 0 && (
							<div className='flex flex-col gap-[11px]'>
								{formFields.map((field) => (
									<FieldRenderer
										key={field._key ?? field.name}
										field={{
											name: field.name,
											label: field.label,
											type: field.type,
											placeholder: field.placeholder,
											required: field.required,
											minWords: field.name === 'message' ? MESSAGE_MIN_WORDS : undefined,
										}}
									/>
								))}
							</div>
						)}

						<Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} onVerify={handleVerify} />

						<Button
							type='submit'
							variant='solid'
							disabled={isSubmitting}
							aria-busy={isSubmitting}
							className='flex h-[52px] w-full items-center justify-center gap-2'>
							{isSubmitting ? (
								<>
									<Spinner className='size-4 text-black' />
									Sending...
								</>
							) : (
								<>
									{submitButtonText}
									<ArrowRight className='h-4 w-4' />
								</>
							)}
						</Button>
					</form>
				</Form>
			</SectionContainer>
		</section>
	);
}
