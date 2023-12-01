import { Button } from "@mui/material";
import styles from "./addBunnerBtn.module.css";

export default function AddBunnerBtn({ onOpenAddAppDialog }: any) {
  return (
    <Button
      variant="contained"
      className={styles.btnAddNew}
      sx={{ width: "140px", height: "40px" }}
      onClick={onOpenAddAppDialog}
    >
      Add banner
    </Button>
  );
}
