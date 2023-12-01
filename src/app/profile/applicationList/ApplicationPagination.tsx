import TablePagination from "@mui/material/TablePagination";

interface ApplicationPaginationProps {
  totalItems: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ApplicationPagination: React.FC<ApplicationPaginationProps> = ({
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
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 50]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default ApplicationPagination;
