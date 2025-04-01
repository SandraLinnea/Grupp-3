import express from "express";
import Product from "../models/Product.js";
import { adminAuth } from "../middleware/auth.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = express.Router();

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read products JSON file
const productsJSON = JSON.parse(
  readFileSync(join(__dirname, "../data/products.json"), "utf8")
);

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Inga produkter hittades" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getting products", error);
    res.status(500).json({ error: error.message });
  }
});



//TODO Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({error: "Produkten hittades inte!"})
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product (admin only)
router.post("/", adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//TODO Update product (admin only)


//TODO Delete product (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Produkten hittades inte!" });
    }
    res.json({ message: "Produkten har tagits bort!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
