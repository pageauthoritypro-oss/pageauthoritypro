export type PaginationRangeItem = number | 'ellipsis';

/**
 * Builds a windowed page-number list (first, last, current +/- siblingCount,
 * with 'ellipsis' markers for gaps) so pagination controls stay usable when
 * totalPages is large, instead of rendering one link per page.
 */
export function getPaginationRange(
	currentPage: number,
	totalPages: number,
	siblingCount = 1
): PaginationRangeItem[] {
	const totalPageNumbers = siblingCount * 2 + 5;

	if (totalPages <= totalPageNumbers) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
	const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

	const shouldShowLeftEllipsis = leftSiblingIndex > 2;
	const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

	if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
		const leftItemCount = 3 + siblingCount * 2;
		const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
		return [...leftRange, 'ellipsis', totalPages];
	}

	if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
		const rightItemCount = 3 + siblingCount * 2;
		const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
		return [1, 'ellipsis', ...rightRange];
	}

	const middleRange = Array.from(
		{ length: rightSiblingIndex - leftSiblingIndex + 1 },
		(_, i) => leftSiblingIndex + i
	);
	return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
}
