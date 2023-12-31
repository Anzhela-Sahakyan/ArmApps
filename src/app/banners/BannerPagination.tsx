import TablePagination from "@mui/material/TablePagination";

interface BannerPaginationProps {
  totalItems: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (newPage: number) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const BannerPagination: React.FC<BannerPaginationProps> = ({
  totalItems,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <TablePagination
      component="div"
      count={totalItems}
      page={page}
      onPageChange={(_, page) => handleChangePage(page)}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 50]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default BannerPagination;
