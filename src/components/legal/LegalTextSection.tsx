import SectionContainer from '@/components/layout/SectionContainer';
import LegalRichText from './LegalRichText';
import type { RichTextSectionData } from '@/sanity/types';
import { cn } from '@/lib/utils';

export default function LegalTextSection(props: RichTextSectionData) {
	if (!props.content) return null;

	const sizeMap = {
		default: 'max-w-4xl',
		narrow: 'max-w-2xl',
		wide: 'max-w-7xl',
	};

	const maxSize = sizeMap[props.containerSize ?? 'default'] ?? sizeMap.default;

	return (
		<section className='bg-background py-16 lg:py-24 relative overflow-hidden'>
			<SectionContainer className={cn('mx-auto px-6', maxSize)}>
				<LegalRichText value={props.content} />
			</SectionContainer>
		</section>
	);
}
