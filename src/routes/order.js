import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

  // Create order
  router.post("/", async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      res.status(201).json(order);
    } catch (error) {

      console.error(" Fel vid sparning av order:", error);
      res.status(400).json({ error: error.message });
    }
  });

export default router;