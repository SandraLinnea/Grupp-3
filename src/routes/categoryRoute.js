// routes/categoryRoutes.js
import express from 'express';
import { getCategories } from '../controllers/categoryController.js';

const router = express.Router();

// Route för att hämta alla kategorier
router.get('/', getCategories);

export default router;

// Compare this snippet from src/controllers/productController.js:
// // controllers/productController.js 