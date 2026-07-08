import type { FieldPath } from 'react-hook-form';
import TextField from './TextField';
import TextareaField from './TextareaField';
import PhoneField from './PhoneField';
import type { ContactFormValues, FormFieldConfig } from './types';

interface FieldRendererProps {
	field: FormFieldConfig;
}

export default function FieldRenderer({ field }: FieldRendererProps) {
	const name = field.name as FieldPath<ContactFormValues>;

	if (field.type === 'textarea') {
		return <TextareaField name={name} label={field.label} placeholder={field.placeholder} rows={field.rows} minWords={field.minWords} />;
	}

	if (field.type === 'tel') {
		return <PhoneField name={name} label={field.label} placeholder={field.placeholder} />;
	}

	return <TextField name={name} label={field.label} type={field.type === 'email' ? 'email' : 'text'} placeholder={field.placeholder} />;
}
