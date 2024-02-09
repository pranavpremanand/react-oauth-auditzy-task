import React, { useRef, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  Modal,
} from "@mui/material";
import { darken } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addNewProduct, uploadImageToCloudinary } from "../../APIs";
import { useDispatch } from "react-redux";
import { addProductItem } from "../../Redux/storeSlice";

const schema = z.object({
  title: z
    .string()
    .refine((val) => val.trim() !== "", { message: "Title is required" }),
  price: z.preprocess((a) => parseInt(a, 10), z.number().positive().min(1)),
  image: z.string({ required_error: "Image is required" }),
  category: z
    .string()
    .refine((val) => val.trim() !== "", { message: "Category is required" }),
  description: z
    .string()
    .refine((val) => val.trim() !== "", { message: "Description is required" }),
});

export const AddProductModal = ({ open, handleClose }) => {
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

  const [img, setImg] = useState("");
  const [formData, setFormData] = useState("");
  const imgRef = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  // handle image change
  const onImgChange = (file) => {
    const fData = new FormData();
    fData.append("file", file.target.files[0]);
    fData.append("upload_preset", "myCloud");
    fData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    setFormData(fData);
    if (file.target.files && file.target.files[0]) {
      if (
        file.target.files[0].type === "image/x-png" ||
        file.target.files[0].type === "image/gif" ||
        file.target.files[0].type === "image/jpeg" ||
        file.target.files[0].type === "image/jpg" ||
        file.target.files[0].type === "image/png"
      ) {
        let img = file.target.files[0];
        setValue("image", URL.createObjectURL(img));
        clearErrors("image");
        setImg({ image: URL.createObjectURL(img) });
      } else {
        toast.error("Select an image file");
      }
    }
  };

  // upload image to cloudinary
  const uploadImage = async () => {
    try {
      console.log(formData, "FORMDATA");
      const response = await uploadImageToCloudinary(formData);
      const { data } = response;
      setValue("image", data.secure_url);
      return data;
    } catch (err) {
      console.log(err, "ERROR");
      toast.error(err.message);
    }
  };

  // handle form submit click
  const handleFormSubmit = async (values) => {
    try {
      const uploadImgSuccess = uploadImage();
      if (uploadImgSuccess) {
        const response = await addNewProduct(values);
        if (response.data) {
          dispatch(addProductItem(response.data));
          reset();
          setImg("");
          handleClose();
          toast.success("Product successfully added");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
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
          sx={{
            py: 2,
            px: 1,
            mx: 2,
          }}
        >
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            style={{
              width: isLargeScreen ? "40vw" : "100%",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <Typography
              component="span"
              variant="h5"
              sx={{ textDecoration: "underline" }}
            >
              Add Product
            </Typography>
            <Box sx={{ width: "100%" }}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                {...register("title")}
              />
              <small className="error-msg">{errors.title?.message}</small>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                {...register("price")}
              />
              <small className="error-msg">{errors.price?.message}</small>
            </Box>
            <Button
              variant="outlined"
              component="label"
              sx={{
                textTransform: "capitalize",
                width: "100%",
                color: "text.primary",
                mt: 3,
              }}
            >
              {img ? "Change selected image" : "Select image file"}
              <input
                type="file"
                hidden
                name="myImg"
                accept="image/x-png,image/gif,image/jpeg,image/png,image/jpg"
                onChange={(e) => onImgChange(e)}
                ref={imgRef}
              />
            </Button>
            <small className="error-msg">{errors.image?.message}</small>
            <img
              style={{
                width: "100%",
                height: "15rem",
                objectFit: "contain",
                marginBottom: 20,
              }}
              src={
                img
                  ? img.image
                  : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.webp"
              }
              alt="Product"
              loading="lazy"
            />
            <Box sx={{ width: "100%" }}>
              <TextField
                id="outlined-basic"
                label="Category"
                variant="outlined"
                {...register("category")}
              />
              <small className="error-msg">{errors.category?.message}</small>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                id="outlined-basic"
                label="Description"
                multiline
                rows="4"
                variant="outlined"
                {...register("description")}
              />
              <small className="error-msg">{errors.description?.message}</small>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                gap: 2,
              }}
            >
              <Button
                type="submit"
                sx={{
                  bgcolor: "#008ee4",
                  color: "background.primary",
                  "&:hover": { bgcolor: darken("#008ee4", 0.3) },
                  width: "100%",
                }}
              >
                Submit
              </Button>
              <Button
                type="button"
                sx={{
                  bgcolor: "text.secondary",
                  color: "background.primary",
                  "&:hover": { bgcolor: darken("#666", 0.3) },
                  width: "100%",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
