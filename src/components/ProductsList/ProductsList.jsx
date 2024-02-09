import * as React from "react";
import { useMediaQuery } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { deleteProduct } from "../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, setLoading } from "../../Redux/storeSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import { EditProductModal } from "../EditProductModal/EditProductModal";
import { darken } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import { DeleteProductModal } from "../DeleteProductModal/DeleteProductModal";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export const ProductsList = () => {
  const isLargeScreen = useMediaQuery("(min-width: 800px)");
  const isSmallScreen = useMediaQuery("(max-width: 500px)");
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.store);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [deletingProductId, setDeletingProductId] = useState("");

  const handleEditClick = (item) => {
    setProductToEdit(item);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeletingProductId(id);
    setShowDeleteModal(true);
  };

  // delete product
  const deleteProductItem = async () => {
    dispatch(setLoading(true));
    try {
      await deleteProduct(deletingProductId);
      dispatch(deleteItem(deletingProductId));
      toast.success("Product deleted successfully");
      setShowDeleteModal(false);
      setDeletingProductId("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 5 }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {isLargeScreen && <TableCell>No.</TableCell>}
              <TableCell>Title</TableCell>
              <TableCell align="right">Image</TableCell>
              {!isSmallScreen && <TableCell align="right">Price</TableCell>}
              {isLargeScreen && (
                <>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Description</TableCell>
                </>
              )}
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products ? (
              products.map((item, i) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: darken("#ecf4f7", 0.1),
                      transition: "background-color 0.3s ease",
                    },
                    cursor: "pointer",
                  }}
                >
                  {isLargeScreen && (
                    <TableCell
                      sx={{
                        maxWidth: 10,
                      }}
                    >
                      {i + 1}
                    </TableCell>
                  )}

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
                        width: isLargeScreen ? "4rem" : "2rem",
                        height: isLargeScreen ? "5rem" : "4rem",
                        objectFit: "contain",
                      }}
                    />
                  </TableCell>
                  {!isSmallScreen && (
                    <TableCell sx={{ maxWidth: 20 }} align="right">
                      ₹{item.price}
                    </TableCell>
                  )}
                  {isLargeScreen && (
                    <>
                      <TableCell sx={{ maxWidth: 20 }} align="right">
                        {item.category}
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
                  <TableCell
                    align="right"
                    sx={{
                      maxWidth: 10,
                    }}
                  >
                    <Tooltip title="Edit this product">
                      <BorderColorIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleEditClick(item)}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      maxWidth: 10,
                    }}
                  >
                    <Tooltip title="Delete this product">
                      <DeleteForeverIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleDeleteClick(item.id)}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Typography sx={{ p: 4 }}>No Data Available</Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <EditProductModal
        open={showEditModal}
        handleClose={() => setShowEditModal(false)}
        product={productToEdit}
      />
      <DeleteProductModal
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        deleteItem={deleteProductItem}
      />
    </>
  );
};
