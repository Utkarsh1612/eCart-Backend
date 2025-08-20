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

const newProduct = {
  image:
    "https://m.media-amazon.com/images/I/71q9o1FGvDL._AC_UL480_FMwebp_QL65_.jpg",
  name: "HEALTH SAFE",
  price: 699,
  inStock: true,
};

const createProduct = async (newProduct) => {
  try {
    const product = new Product(newProduct);
    const createdProduct = await product.save();
  } catch (error) {
    console.log("Error in creating product:", error);
  }
};

//createProduct(newProduct);

const fetchAllProducts = async () => {
    try{
     const products = await Product.find();
     return products;
    }catch(error){
        console.log(error);
    }
}

app.get("/products", async (req, res) => {
    try{
        const allProducts = await fetchAllProducts();
        if(allProducts.length){
            res.status(200).json(allProducts);
        }else{
            res.status(400).json({message: "No Product Found!"});
        }
    }catch(error){
        res.status(500).json({message: "Failed to fetch products", error});
    }
})

app.listen(PORT, () => {
    console.log("server is running on port:", PORT);
})

