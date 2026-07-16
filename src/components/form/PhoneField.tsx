import { useRef } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import type { FieldPath } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { ContactFormValues } from './types';

interface PhoneFieldProps {
	name: FieldPath<ContactFormValues>;
	label: string;
	placeholder?: string;
}

export default function PhoneField({ name, label, placeholder }: PhoneFieldProps) {
	// The widget fires onChange once on mount with just "+<dialCode>" (nothing
	// typed yet). That very first call must be swallowed entirely — not even
	// forwarded as an empty string — otherwise it still counts as a "change"
	// and can retrigger validation right after a post-submit reset/remount.
	// Any later dial-code-only value (the user backspacing everything) should
	// still propagate as empty.
	const isInitialPrefillRef = useRef(true);

	return (
		<FormField
			name={name}
			render={({ field: { value, onChange, onBlur, name: fieldName } }) => (
				<FormItem>
					<FormLabel className='font-inter text-[16px] leading-[22px] tracking-[-0.01em] text-[#B5C8DC]'>{label}</FormLabel>
					<PhoneInput
						defaultCountry='us'
						name={fieldName}
						value={value}
						onChange={(next, meta) => {
							const dialCode = meta?.country?.dialCode;
							const isDialCodeOnly = dialCode ? next === `+${dialCode}` : false;
							const nextValue = isDialCodeOnly ? '' : (next ?? '');

							// Prevent programmatic resets (e.g. from RHF reset())
							// from triggering unnecessary change events back to RHF.
							if (nextValue === value) {
								return;
							}

							if (isDialCodeOnly && isInitialPrefillRef.current) {
								isInitialPrefillRef.current = false;
								return;
							}
							isInitialPrefillRef.current = false;
							onChange(nextValue);
						}}
						onBlur={onBlur}
						placeholder={placeholder}
						className='h-[54px] w-full'
						inputClassName='!h-[54px] !flex-1 !min-w-0 !rounded-lg !rounded-l-none !border !border-white/5 !bg-[#1C2635]/20 !px-[15px] !font-inter !text-[16px] !leading-[22px] !tracking-[-0.01em] !text-white placeholder:!text-[#5C6577] focus:!border-brand-gold/40 focus:!ring-3 focus:!ring-brand-gold/20 !outline-none'
						countrySelectorStyleProps={{
							buttonClassName:
								'!h-[54px] !rounded-lg !rounded-r-none !border !border-r-0 !border-white/5 !bg-[#1C2635]/20 !px-3 hover:!bg-[#1C2635]/40',
							buttonContentWrapperClassName: '!gap-1.5',
							dropdownArrowClassName: '!border-t-[#5C6577]',
							dropdownStyleProps: {
								className:
									'!max-h-[280px] !overflow-y-auto !rounded-lg !border !border-white/5 !bg-[#1C2635] !shadow-md !py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
								listItemClassName: '!px-3 !py-2 !text-[14px] !text-white hover:!bg-brand-gold/10',
								listItemSelectedClassName: '!bg-brand-gold/15',
								listItemFocusedClassName: '!bg-brand-gold/10',
								listItemDialCodeClassName: '!text-[#5C6577]',
							},
						}}
					/>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
