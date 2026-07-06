import type { FieldPath } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ContactFormValues } from './types';

interface TextFieldProps {
	name: FieldPath<ContactFormValues>;
	label: string;
	type?: 'text' | 'email' | 'tel';
	placeholder?: string;
}

export default function TextField({ name, label, type = 'text', placeholder }: TextFieldProps) {
	return (
		<FormField
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className='font-inter text-[16px] leading-[22px] tracking-[-0.01em] text-[#B5C8DC]'>{label}</FormLabel>
					<FormControl>
						<Input
							type={type}
							placeholder={placeholder}
							className='h-[54px] rounded-lg border border-white/5 bg-[#1C2635]/20 px-[15px] py-4 font-inter text-[16px] leading-[22px] tracking-[-0.01em] text-white placeholder:text-[#5C6577] focus-visible:border-brand-gold/40 focus-visible:ring-brand-gold/20'
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
