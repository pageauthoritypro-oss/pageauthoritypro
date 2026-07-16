import { z } from 'zod';
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js/min';

export function formatPhoneNumber(value: string): string {
	if (!value) return value;
	const phoneNumber = parsePhoneNumberFromString(value);
	if (!phoneNumber) return value;

	// For US and Canada (NANP, calling code 1)
	if (phoneNumber.countryCallingCode === '1') {
		return `+1 ${phoneNumber.formatNational()}`;
	}

	// For other countries, use standard international format (e.g. +44 7911 123456)
	return phoneNumber.formatInternational();
}

export const MESSAGE_MIN_WORDS = 5;

function countWords(value: string) {
	const trimmed = value.trim();
	return trimmed ? trimmed.split(/\s+/).length : 0;
}

export const contactFormSchema = z.object({
	fullName: z.string().trim().min(2, 'Please enter your full name'),
	email: z.string().trim().email('Please enter a valid email address'),
	phone: z.string().trim().superRefine((value, ctx) => {
		// Only ever raise one issue for this field — otherwise an empty value fails
		// both `min` and the format check, and the resolver ends up surfacing the
		// confusing "invalid phone number" message instead of "required".
		if (!value) {
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please enter your phone number' });
			return;
		}
		if (!isValidPhoneNumber(value)) {
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please enter a valid phone number for the selected country' });
		}
	}),
	message: z
		.string()
		.trim()
		.refine((value) => countWords(value) >= MESSAGE_MIN_WORDS, `Please write at least ${MESSAGE_MIN_WORDS} words`),
	hp_check: z.string().optional(),
	turnstileToken: z.string().optional(),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
