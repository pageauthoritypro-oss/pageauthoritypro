'use client';

import { useRef, useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { CaseStudyItem } from '@/sanity/types';
import { HomeCaseStudyCard, ListingCaseStudyCard } from '@/components/cards/CaseStudyCard';
import CaseStudyCardSkeleton from '@/components/cards/CaseStudyCard/CaseStudyCardSkeleton';
import type { ComponentType } from 'react';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import ListingPagination from '@/components/ui/listing-pagination';
import { fetchCaseStudiesPage } from '@/sanity/actions/listing-actions';

const cardVariantMap: Record<'primary' | 'secondary', ComponentType<CaseStudyItem>> = {
	primary: HomeCaseStudyCard,
	secondary: ListingCaseStudyCard,
};

interface Props {
	cardVariant: 'primary' | 'secondary';
	initialCaseStudies: CaseStudyItem[];
	initialTotalPages: number;
	limit: number;
	useManualOrder: boolean;
	manualCaseStudies: Array<{ _id?: string; _ref?: string }>;
}

function GridSkeleton({ count }: { count: number }) {
	return (
		<div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8'>
			{Array.from({ length: count }, (_, i) => (
				<CaseStudyCardSkeleton key={i} />
			))}
		</div>
	);
}

export default function CaseStudiesClient({
	cardVariant,
	initialCaseStudies,
	initialTotalPages,
	limit,
	useManualOrder,
	manualCaseStudies,
}: Props) {
	const CardComponent = cardVariantMap[cardVariant] ?? HomeCaseStudyCard;

	const [page, setPage] = useState(1);
	const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
	const [totalPages, setTotalPages] = useState(initialTotalPages);
	const [isPending, startTransition] = useTransition();
	const requestId = useRef(0);
	const cache = useRef(new Map<number, { caseStudies: CaseStudyItem[]; totalPages: number }>());
	if (cache.current.size === 0) {
		cache.current.set(1, { caseStudies: initialCaseStudies, totalPages: initialTotalPages });
	}

	function goTo(nextPage: number) {
		if (isPending || nextPage === page) return;
		const cached = cache.current.get(nextPage);
		if (cached) {
			setCaseStudies(cached.caseStudies);
			setTotalPages(cached.totalPages);
			setPage(nextPage);
			return;
		}
		const thisRequest = ++requestId.current;
		startTransition(async () => {
			const result = await fetchCaseStudiesPage({
				page: nextPage,
				limit,
				useManualOrder,
				manualCaseStudies,
			});
			if (requestId.current !== thisRequest) return;
			cache.current.set(nextPage, result);
			setCaseStudies(result.caseStudies);
			setTotalPages(result.totalPages);
			setPage(nextPage);
		});
	}

	return (
		<>
			{isPending ? (
				<GridSkeleton count={Math.min(limit, 9)} />
			) : caseStudies.length > 0 ? (
				<div
					className={cn(
						cardVariant == 'primary' && 'grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-8',
						cardVariant == 'secondary' && 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 lg:gap-8',
					)}>
					{caseStudies.map((study, i) => (
						<AnimatedFadeUp key={`${study._id}-${i}`} className='h-full'>
							<CardComponent {...study} />
						</AnimatedFadeUp>
					))}
				</div>
			) : (
				<div className='text-center py-16 bg-[#08101C] border border-white/5 rounded-2xl'>
					<p className='text-[#B4BAC2] text-lg'>No case studies found.</p>
				</div>
			)}

			<ListingPagination currentPage={page} totalPages={totalPages} onPageChange={goTo} className='mt-8' />
		</>
	);
}
