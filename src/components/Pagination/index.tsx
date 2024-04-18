import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Paginations = ({
  totalItems,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers = Array.from({
    length: Math.ceil(totalItems / itemsPerPage),
  }).map((_, index) => index + 1);

  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - itemsPerPage),
    Math.min(currentPage - 1 + itemsPerPage + 1, pageNumbers.length),
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderedPages = activePages.map((page, idx) => (
    <PaginationItem
      key={idx}
      className={currentPage === page ? 'bg-neutral-100 rounded-md' : ''}
    >
      <PaginationLink onClick={() => setCurrentPage(page)}>
        {page}
      </PaginationLink>
    </PaginationItem>
  ));

  if (activePages[0] > 1) {
    renderedPages.unshift(
      <PaginationEllipsis
        key="ellipsis-start"
        onClick={() => setCurrentPage(activePages[0] - 1)}
      />,
    );
  }

  if (activePages[activePages.length - 1] < pageNumbers.length) {
    renderedPages.push(
      <PaginationEllipsis
        key="ellipsis-end"
        onClick={() => setCurrentPage(activePages[activePages.length - 1] + 1)}
      />,
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={handlePrevPage}>
          <PaginationPrevious />
        </PaginationItem>
        {renderedPages}
        <PaginationItem onClick={handleNextPage}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
