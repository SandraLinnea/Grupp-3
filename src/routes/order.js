import express from 'express';
import Order from '../models/Order.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all orders (endast admin)
router.get("/", adminAuth, async (req, res) => {
    try {
      const orders = await Order.find()
  
      return res.json(orders);
    } catch (error) {
      console.error('Fel vid hämtning av ordrar:', error);
      res.status(500).json({ error: 'Kunde inte hämta ordrar' });
    }
  });

  // Create order
  router.post("/", async (req, res) => {
    try {
      console.log(" Mottagen body:", req.body);

      const order = new Order(req.body);

      await order.save();
      res.status(201).json(order);
    } catch (error) {
      console.error(" Fel vid sparning av order:", error);
      
      res.status(400).json({ error: error.message });
    }
  });


export default router;