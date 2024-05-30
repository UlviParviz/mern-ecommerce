import mongoose from "mongoose";
import Product from "../models/product.model.js";
import products from "./data.js";

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb+srv://ulvispaethe:lanadelrey@shopit.c5cy4km.mongodb.net/?retryWrites=true&w=majority&appName=shopit");

    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("Products are inserted");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
