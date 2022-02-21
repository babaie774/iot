export const handleClick: any = ({ setCurrentPage, e }: any) => {
  setCurrentPage(e.target.value);
};

export const handlePrevious: any = ({ setCurrentPage, currentPage }) => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

export const handleNext: any = ({
  setCurrentPage,
  currentPage,
  paginationNumbers,
}) => {
  if (currentPage < paginationNumbers) {
    setCurrentPage(currentPage + 1);
  }
};
