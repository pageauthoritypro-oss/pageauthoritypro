import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js/min';

export const MESSAGE_MIN_WORDS = 5;

function countWords(value: string) {
	const trimmed = value.trim();
	return trimmed ? trimmed.split(/\s+/).length : 0;
}

export const contactFormSchema = z.object({
	fullName: z.string().trim().min(2, 'Please enter your full name'),
	email: z.string().trim().email('Please enter a valid email address'),
	phone: z
		.string()
		.trim()
		.min(1, 'Please enter your phone number')
		.refine((value) => isValidPhoneNumber(value), 'Please enter a valid phone number for the selected country'),
	message: z
		.string()
		.trim()
		.refine((value) => countWords(value) >= MESSAGE_MIN_WORDS, `Please write at least ${MESSAGE_MIN_WORDS} words`),
	hp_check: z.string().optional(),
	turnstileToken: z.string().optional(),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
