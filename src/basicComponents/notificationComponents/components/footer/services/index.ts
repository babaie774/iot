export const handleClick = (setCurrentPage, e) => {
  setCurrentPage(e.target.value);
};

export const handlePrevious = (setCurrentPage, currentPage) => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

export const handleNext = (setCurrentPage, currentPage, paginationNumbers) => {
  if (currentPage < paginationNumbers) {
    setCurrentPage(currentPage + 1);
  }
};
