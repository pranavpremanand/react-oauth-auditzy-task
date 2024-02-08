import React, { useEffect } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { ProductsList } from "../../components/ProductsList/ProductsList";
import { AddProductModal } from "../../components/AddProductModal/AddProductModal";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../APIs";
import { useDispatch } from "react-redux";
import { setLoading, setProducts } from "../../Redux/storeSlice";

const Products = () => {
  const isLargeScreen = useMediaQuery("(min-width: 650px)");
  const isSmallScreen = useMediaQuery("(max-width: 450px)");
  const [open, setOpen] = useState(false);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // fetch all products
  const { data: allProducts, isFetched } = useQuery({
    queryKey: ["products", isAscendingOrder],
    queryFn: () =>
      isAscendingOrder ? getProducts("desc") : getProducts("asc"),
  });

  useEffect(() => {
    dispatch(setProducts(allProducts?.data));
  }, [dispatch, allProducts?.data]);

  useEffect(() => {
    isFetched ? dispatch(setLoading(false)) : dispatch(setLoading(true));
  }, [dispatch, isFetched]);

  const handleSort = () => {
    setIsAscendingOrder((prev) => !prev);
  };
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
          flexDirection: isLargeScreen ? "row" : "column",
        }}
      >
        <Typography
          sx={{ textDecoration: "underline" }}
          component="span"
          variant="h5"
        >
          Products
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: isSmallScreen ? 1 : 3,
            justifyContent: isLargeScreen ? "flex-start" : "space-between",
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          <Button variant="contained" onClick={handleOpen}>
            <AddCircleIcon />
            &nbsp; Add Product
          </Button>
          {isAscendingOrder ? (
            <Button
              sx={{ textTransform: "capitalize" }}
              variant="text"
              onClick={handleSort}
            >
              <ArrowDropDownIcon />
              &nbsp; Sort by descending order
            </Button>
          ) : (
            <Button
              sx={{ textTransform: "capitalize" }}
              variant="text"
              onClick={handleSort}
            >
              <ArrowDropUpIcon />
              &nbsp; Sort by ascending order
            </Button>
          )}
        </Box>
      </Box>
      <ProductsList />
      <AddProductModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Products;
