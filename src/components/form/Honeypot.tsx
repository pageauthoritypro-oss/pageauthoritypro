'use client';

import { useFormContext } from 'react-hook-form';
import type { ContactFormValues } from './types';

export default function Honeypot() {
	const { register } = useFormContext<ContactFormValues>();

	return (
		<div aria-hidden='true' className='absolute left-[-9999px] top-auto h-px w-px overflow-hidden'>
			<input
				id='hp_check'
				type='text'
				tabIndex={-1}
				autoComplete='off'
				aria-hidden='true'
				{...register('hp_check')}
			/>
		</div>
	);
}
