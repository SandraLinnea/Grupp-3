import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categoryRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Documentation route
app.get('/api', (req, res) => {
  res.json({
    name: "Hakim Livs API",
    version: "1.0.0",
    endpoints: {
      auth: {
        "POST /api/auth/register": "Register a new user",
        "POST /api/auth/login": "Login with username and password"
      },
      products: {
        "GET /api/products": "Get all products",
        "GET /api/products/:id": "Get a single product by ID",
        "POST /api/products": "Create a new product (Admin only)",
        "PUT /api/products/:id": "Update a product (Admin only)",
        "DELETE /api/products/:id": "Delete a product (Admin only)"
      },
      categories: {
        "GET /api/categories": "Get all categories"
      }
    },
    authentication: "Use Bearer token in Authorization header for protected routes"
  });
});

import dataMigrationRouterModule from "./migration/data.migration.route_module.js";
import Category from "./models/CategoryModel.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Skapa dirname manuellt för ES-moduler
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

// Rätt dataPath
const dataPathCategories = join(_dirname, "data", "categories.json");
const dataPathProducts = join(_dirname, "data", "products.json");
const dataPathUsers = join(_dirname, "data", "users.json");

console.log("Datapath", dataPathCategories)
app.use(
  "/api/data-migration/categories",
  dataMigrationRouterModule(Category, dataPathCategories)
);

app.use(
  "/api/data-migration/products",
  dataMigrationRouterModule(Product, dataPathProducts)
);

app.use(
  "/api/data-migration/users",
  dataMigrationRouterModule(User, dataPathUsers)
);


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hakim-livs')
  .then(() => console.log('Connected to MongoDB', process.env.MONGODB_URI))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
