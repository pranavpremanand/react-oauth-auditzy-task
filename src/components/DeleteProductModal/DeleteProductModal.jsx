import React from "react";
import {
  Box,
  Typography,
  Button,
  Modal,useMediaQuery
} from "@mui/material";


export const DeleteProductModal = ({ open, handleClose, deleteItem }) => {
    const isLargeScreen = useMediaQuery("(min-width: 800px)");

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isLargeScreen ? "fit-content" : "90%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        maxHeight: "80vh",
        overflowY: "auto",
      };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{ padding: 5, display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Typography component="span" variant="h6">
            Are you sure to delete this product?
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button variant="contained" color="primary" onClick={deleteItem}>
              Confirm
            </Button>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
