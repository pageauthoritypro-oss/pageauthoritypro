import { defineType, defineField } from 'sanity';

export const processPhase = defineType({
	name: 'processPhase',
	title: 'Process Phase',
	type: 'object',
	fields: [
		defineField({
			name: 'number',
			title: 'Phase Number',
			type: 'string',
			description: "Display number e.g. '01', '02'",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'imageWithAlt',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'summary',
			title: 'Summary',
			type: 'text',
			rows: 2,
			description: 'Short summary shown in the overview grid.',
		}),
		defineField({
			name: 'detail',
			title: 'Detail',
			type: 'text',
			rows: 3,
			description: 'Longer description shown in the breakdown row.',
		}),
		defineField({
			name: 'checklistTitle',
			title: 'Checklist Title',
			type: 'string',
		}),
		defineField({
			name: 'checklistItems',
			title: 'Checklist Items',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'columns',
			title: 'Checklist Columns',
			type: 'number',
			options: {
				list: [
					{ title: '2 Columns', value: 2 },
					{ title: '3 Columns', value: 3 },
				],
			},
			initialValue: 2,
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'number',
		},
		prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
			return {
				title: title || 'Process Phase',
				subtitle: subtitle ? `Phase ${subtitle}` : undefined,
			};
		},
	},
});
