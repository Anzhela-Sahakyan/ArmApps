import apps from "@/Data/apps";
import TablePagination from "@mui/material/TablePagination";

interface PaginationProps {
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
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <TablePagination
      component="div"
      count={apps.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 50]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
