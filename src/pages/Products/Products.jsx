import React from "react";
import { Box, Typography } from "@mui/material";

const Products = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "fit-content",
        borderRadius: 1,
        py: 2,
        pl: 2,
        pr: 10,
        m: 5,
        color: "text.primary",
      }}
    >
      <Typography component="span" variant="h4">
        Products
      </Typography>
    </Box>
  );
};

export default Products;
