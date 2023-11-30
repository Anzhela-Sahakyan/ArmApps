import { Button } from "@mui/material";
import { Box } from "@mui/system";

import styles from "./page.module.css";

export default function AddApp({ onOpenAddAppDialog }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "40px",
        padding: "11px 16px",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px ",
      }}
    >
      <Button
        variant="contained"
        className={styles.btnAddNew}
        sx={{ width: "140px", height: "40px" }}
        onClick={onOpenAddAppDialog}
      >
        Add new app
      </Button>
      <Button
        variant="contained"
        className={styles.btnAddExisting}
        sx={{
          width: "200px",
          height: "40px",
          // backgroundColor: "transparent !important",
          // opacity: "0.5",
        }}
      >
        Add to existing app
      </Button>
    </Box>
  );
}
