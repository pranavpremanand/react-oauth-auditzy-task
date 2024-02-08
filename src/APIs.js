import axios from "axios";

const baseUrl = "https://fakestoreapi.com/products";

// get all products
export const getProducts = (order) => {
  return axios.get(`${baseUrl}?sort=${order}`);
};

// upload product image to cloudinary
export const uploadImageToCloudinary = (data) => {
  return axios.post(process.env.REACT_APP_CLOUDINARY_API, data);
};

// add new product
export const addNewProduct = (data) => {
  return axios.post(baseUrl, data);
};

// update product
export const updateProduct = (data) => {
  return axios.patch(`${baseUrl}/${data.id}`, data);
};

// delete product
export const deleteProduct = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
