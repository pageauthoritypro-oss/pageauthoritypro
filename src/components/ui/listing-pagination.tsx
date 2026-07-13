import { getPaginationRange } from '@/lib/pagination';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export default function ListingPagination({ currentPage, totalPages, onPageChange, className }: Props) {
	if (totalPages <= 1) return null;

	return (
		<Pagination className={className}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} />
				</PaginationItem>

				{getPaginationRange(currentPage, totalPages).map((pageNum, i) =>
					pageNum === 'ellipsis' ? (
						<PaginationItem key={`ellipsis-${i}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={pageNum}>
							<PaginationLink onClick={() => onPageChange(pageNum)} isActive={currentPage === pageNum}>
								{pageNum}
							</PaginationLink>
						</PaginationItem>
					)
				)}

				<PaginationItem>
					<PaginationNext onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
