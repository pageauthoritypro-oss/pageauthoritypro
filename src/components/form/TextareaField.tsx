import type { FieldPath } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { ContactFormValues } from './types';

interface TextareaFieldProps {
	name: FieldPath<ContactFormValues>;
	label: string;
	placeholder?: string;
	rows?: number;
	minWords?: number;
}

function countWords(value: string) {
	return value.trim().length ? value.trim().split(/\s+/).length : 0;
}

export default function TextareaField({ name, label, placeholder, rows = 5, minWords }: TextareaFieldProps) {
	return (
		<FormField
			name={name}
			render={({ field }) => (
				<FormItem>
					<div className='flex items-center justify-between'>
						<FormLabel className='font-inter text-[16px] leading-[22px] tracking-[-0.01em] text-[#B5C8DC]'>{label}</FormLabel>
						{minWords && (
							<span className='font-inter text-[12px] text-[#5C6577]'>
								{Math.min(countWords(field.value ?? ''), minWords)}/{minWords} words
							</span>
						)}
					</div>
					<FormControl>
						<Textarea
							rows={rows}
							placeholder={placeholder}
							className='h-[138px] resize-none rounded-lg border border-white/5 bg-[#1C2635]/20 px-[15px] py-4 font-inter text-[16px] leading-[22px] tracking-[-0.01em] text-white placeholder:text-[#5C6577] focus-visible:border-brand-gold/40 focus-visible:ring-brand-gold/20'
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
