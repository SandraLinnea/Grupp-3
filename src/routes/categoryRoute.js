/*Jonatans react som han visade på lektionen*/

/*const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.warn("Error fetching categories", error);
        res.json([])
    }
});

router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            throw new Error("Category not found");
        }
        res.status(200).json(category);
    } catch (error) {
        console.warn("Error fetching category", error);
        res.status(404).json({ message: "Category not found" });
    }
});

router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const categoryData = {
            name: req.body.name,
            slug: req.body.name.toLowerCase().replace(/ /g, "-")
        }
        const category = await Category.create(categoryData);
        res.status(201).json(category);
    } catch (error) {
        console.warn("Error creating category", error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const categoryData = {}
        if(req.body.name) {
            categoryData.name = req.body.name
            categoryData.slug = req.body.name.toLowerCase().replace(/ /g, "-")
        }
        const category = await Category.findByIdAndUpdate(req.params.id, categoryData, { new: true });
        if (!category) {
            throw new Error("Category not found");
        }
        res.status(200).json(category);
    } catch (error) {
        console.warn("Error updating category", error);
        res.status(404).json({ message: "Category not found" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            throw new Error("Category not found");
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.warn("Error deleting category", error);
        res.status(404).json({ message: "Category not found" });
    }
});

router.delete("/admin/all", async (req, res) => {
    try {
        await Category.deleteMany()
        res.status(200).json({ message: "All categories deleted successfully" })
    } catch (error) {
        console.warn("Error deleting all categories", error)
    }
})
module.exports = router;
*/




// routes/categoryRoutes.js
import express from 'express';
import { getCategories } from '../controllers/categoryController';

const router = express.Router();

// Route för att hämta alla kategorier
router.get('/categories', getCategories);

export default router;

// Compare this snippet from src/controllers/productController.js:
// // controllers/productController.js 