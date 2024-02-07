import React from "react";
import { Box, Typography } from "@mui/material";
import { ProductsList } from "../../components/ProductsList/ProductsList";

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
        px: 1,
        m: 5,
        color: "text.primary",
      }}
    >
      <Typography sx={{textDecoration:'underline'}} component="span" variant="h5">
        Products
      </Typography>
      <ProductsList />
    </Box>
  );
};

export default Products;
