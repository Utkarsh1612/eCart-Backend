const Product = require("./models/Product.model");
const initialiseDatabase = require("./db/connect.db");
const express = require("express");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

initialiseDatabase();

const newProducts = [
 {
  image: "https://m.media-amazon.com/images/I/61Hg56EKC3L._AC_UL480_FMwebp_QL65_.jpg",
  name: "Impakto",
  price: 999,
  inStock: true,
 },
 {
  image: "https://m.media-amazon.com/images/I/51GOpp8rAJL._AC_UL480_FMwebp_QL65_.jpg",
  name: "Puma",
  price: 1599,
  inStock: true,
 },
 {
  image: "https://m.media-amazon.com/images/I/51f8-BLfiNL._AC_UL480_FMwebp_QL65_.jpg",
  name: "AADI",
  price: 498,
  inStock: true,
 },
 {
  image: "https://m.media-amazon.com/images/I/71cflgAolqL._AC_UL480_FMwebp_QL65_.jpg",
  name: "ASIAN",
  price: 769,
  inStock: true,
 },
 {
  image: "https://m.media-amazon.com/images/I/81umQJztTxL._AC_UL480_FMwebp_QL65_.jpg",
  name: "RXN",
  price: 1349,
  inStock: true,
 },
 {
  image: "https://m.media-amazon.com/images/I/61Z8kRV-HCL._AC_UL480_FMwebp_QL65_.jpg",
  name: "CHILWELL",
  price: 499,
  inStock: true,
 },
 {
  image: "https://m.media-amazon.com/images/I/71V-00jKq1L._AC_UL480_FMwebp_QL65_.jpg",
  name: "Vector X",
  price: 1465,
  inStock: true,
 },
 {
  image: "https://m.media-amazon.com/images/I/51JZ0OZlIGL._AC_UL480_FMwebp_QL65_.jpg",
  name: "Nike",
  price: 15295,
  inStock: true,
 }

];

// const createProduct = async (newProduct) => {
//   try {
//     const product = new Product(newProduct);
//     const createdProduct = await product.save();
//   } catch (error) { 
//     console.log("Error in creating product:", error);
//   }
// };

const createdProducts = async (newProducts) => {
  try{  
    for (const element of newProducts){
      const product = new Product(element);
      const createdProduct = await product.save();
    }
  }catch(error){
    console.log("Error in adding products", error.message);
  }
}

//createdProducts(newProducts);
//createProduct(newProduct); 

const fetchAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
};

app.get("/products", async (req, res) => {
  try {
    const allProducts = await fetchAllProducts();
    console.log(allProducts);
    if (allProducts.length) {
      res.status(200).json(allProducts);
    } else {
      res.status(400).json({ message: "No Product Found!" });
    }
  } catch (error) {
    console.log("catch error", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
