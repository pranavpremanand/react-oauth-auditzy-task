import React, { useRef, useState } from "react";
import { Box, TextField, Typography, Button, Form } from "@mui/material";
import { darken } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title: z
    .string()
    .refine((val) => val.trim() !== "", { message: "Title is required" }),
  price: z
    .string({
      required_error: "Price is required",
      invalid_type_error: "Price must be number",
    })
    .refine((val) => val.trim() !== "", { message: "Price is required" })
    .refine((val) => /^[0-9]+$/.test(val), { message: "Price must be number" }),
  image: z.string({ required_error: "Image is required" }),
  category: z
    .string()
    .refine((val) => val.trim() !== "", { message: "Category is required" }),
  description: z
    .string()
    .refine((val) => val.trim() !== "", { message: "Description is required" }),
});

const AddProduct = () => {
  const [img, setImg] = useState("");
  const [formData, setFormData] = useState("");
  const imgRef = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  // handle image change
  const onImgChange = (file) => {
    const fData = new FormData();
    fData.append("file", file.target.files[0]);
    fData.append("upload_preset", "aiaeajln");
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


  // handle form submit click
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box
      sx={{
        py: 2,
        px: 1,
        m: 5,
      }}
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{
          width: "40vw",
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
            rows="3"
            variant="outlined"
            {...register("description")}
          />
          <small className="error-msg">{errors.description?.message}</small>
        </Box>
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
      </form>
    </Box>
  );
};

export default AddProduct;
