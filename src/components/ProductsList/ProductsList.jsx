import * as React from "react";
import { useMediaQuery } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../APIs";

export const ProductsList = () => {
  const isLargeScreen = useMediaQuery("(min-width: 800px)");

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  console.log(products);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Price</TableCell>
            {isLargeScreen && (
              <>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Description</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {products ? (
            products?.data.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "background.primary",
                    transition: "background-color 0.3s ease",
                  },
                }}
              >
                <TableCell
                  sx={{
                    maxWidth: 10,
                  }}
                >
                  {item.id}
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: 90,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  component="th"
                  scope="row"
                >
                  {item.title}
                </TableCell>
                <TableCell sx={{ width: 25 }} align="right">
                  <img
                    alt={item.title}
                    src={item.image}
                    loading="lazy"
                    style={{
                      width: "4rem",
                      height: "5rem",
                      objectFit: "contain",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 20 }} align="right">
                ₹{item.price}
                </TableCell>
                {isLargeScreen && (
                  <>
                    <TableCell sx={{ maxWidth: 20 }} align="right">
                      {item.category}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 15 }} align="right">
                      {item.rating.rate}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 100,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      align="right"
                    >
                      {item.description}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))
          ) : (
            <Typography>No Data Available</Typography>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
