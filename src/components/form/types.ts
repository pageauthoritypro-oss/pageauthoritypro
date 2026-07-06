import type { ContactFormPayload } from '@/lib/validations/contact';

export type FormFieldType = 'text' | 'email' | 'tel' | 'textarea';

export interface FormFieldConfig {
	name: string;
	label: string;
	type: FormFieldType;
	placeholder?: string;
	required?: boolean;
	rows?: number;
	minWords?: number;
}

export type ContactFormValues = ContactFormPayload;
