import { defineType, defineField } from 'sanity';
import { OlistIcon } from '@sanity/icons';
import { headingTagField } from '../../constants';

export const growthPhaseProcessSection = defineType({
	name: 'growthPhaseProcessSection',
	title: 'Growth Phase Process Section',
	type: 'object',
	icon: OlistIcon,
	fields: [
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			type: 'string',
			description: "Small label at the very top (e.g., 'THE FOUR PHASE DOMINATING PROCESS').",
		}),
		defineField({
			name: 'heading',
			title: 'Heading Parts',
			description: 'Create one or two heading parts with optional highlight and variant styling.',
			type: 'array',
			of: [{ type: 'headingPart' }],
		}),
		headingTagField,
		defineField({
			name: 'cards',
			title: 'Cards',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'growthPhaseProcessCard',
					title: 'Growth Phase Process Card',
					fields: [
						defineField({
							name: 'badgeNumber',
							title: 'Badge Number',
							type: 'string',
							description:
								"Leave the badge empty to auto-assign numbers by card order, or explicitly override it with a custom value such as '01', '02', '03'.",
						}),
						defineField({
							name: 'icon',
							title: 'Icon',
							type: 'imageWithAlt',
						}),
						defineField({
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 3,
						}),
						defineField({
							name: 'learnMoreLink',
							title: 'Learn More Link',
							type: 'link',
						}),
					],
					preview: {
						select: {
							title: 'title',
							subtitle: 'badgeNumber',
						},
						prepare({ title, subtitle }) {
							return {
								title: title || 'Badge Card',
								subtitle: subtitle ? `Number: ${subtitle}` : '',
							};
						},
					},
				},
			],
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			heading: 'heading.header',
			subtitle: 'header.description',
		},
		prepare({ heading, subtitle }: { heading?: Array<{ text: string }>; title?: string; subtitle?: string }) {
			const title =
				heading
					?.map((h) => h.text)
					.filter(Boolean)
					.join(' ') || 'Growth Phase Process Section';
			return {
				title: title,
				subtitle: subtitle || 'Growth Phase Process',
			};
		},
	},
});
