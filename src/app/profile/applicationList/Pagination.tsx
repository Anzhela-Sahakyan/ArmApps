import apps from "@/Data/apps";
import TablePagination from "@mui/material/TablePagination";

interface PaginationProps {
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

const Pagination: React.FC<PaginationProps> = ({
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

export default Pagination;
