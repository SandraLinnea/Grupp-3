import express from 'express';
import Order from '../models/Order.js';
import { adminAuth } from '../middleware/auth.js';
// import mongoose from 'mongoose';
// import Product from '../models/Product.js';

const router = express.Router();

// Hämta alla ordrar (endast admin)
router.get("/", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()

    
    return res.json(orders);
  } catch (error) {
    console.error('Fel vid hämtning av ordrar:', error);
    res.status(500).json({ error: 'Kunde inte hämta ordrar' });
  }
});


/*// Get all products
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.json(orders);
  } catch (error) {
    console.warn("Fel vid hämtning av produkter", error)
    res.status(500).json({ error: error.message });
  }
});*/

// Hämta en specifik order med ID
/* router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'email firstName lastName')
      .populate('orderItem.productId', 'name price');
    
    if (!order) {
      return res.status(404).json({ error: 'Ordern hittades inte' });
    }

    // Kontrollera att användaren har rätt att se ordern (admin eller orderägare)
    if (!req.isAdmin && order.user && order.user._id.toString() !== req.userId) {
      return res.status(403).json({ error: 'Åtkomst nekad' });
    }

    res.json(order);
  } catch (error) {
    console.error('Fel vid hämtning av order:', error);
    res.status(500).json({ error: 'Kunde inte hämta ordern' });
  }
});

// Hämta användarens ordrar
router.get('/user/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('orderItem.productId', 'name price');
    
    res.json(orders);
  } catch (error) {
    console.error('Fel vid hämtning av användarens ordrar:', error);
    res.status(500).json({ error: 'Kunde inte hämta dina ordrar' });
  }
}); */

// Skapa en ny order
/* router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { 
      email, 
      firstname, 
      lastname, 
      phonenumber, 
      shippingAddress, 
      orderItem 
    } = req.body;

    // Validera orderItems och beräkna totalpris
    if (!orderItem || orderItem.length === 0) {
      return res.status(400).json({ error: 'Ordern måste innehålla minst en produkt' });
    }

    // Kontrollera att alla produkter finns och har tillräckligt lager
    for (const item of orderItem) {
      const product = await Product.findById(item.productId);
      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: `Produkt med ID ${item.productId} hittades inte` });
      }
      
      // Här kan du lägga till lagerkontroll om det behövs
      // if (product.stock < item.quantity) {
      //   await session.abortTransaction();
      //   session.endSession();
      //   return res.status(400).json({ error: `Inte tillräckligt i lager för ${product.name}` });
      // }
    }

    // Skapa ny order
    const order = new Order({
      user: req.userId,
      email,
      firstname,
      lastname,
      phonenumber,
      shippingAddress,
      orderItem,
      status: 'in progress'
    });

    await order.save({ session });
    
    // Uppdatera lager om det behövs
    // for (const item of orderItem) {
    //   await Product.findByIdAndUpdate(
    //     item.productId,
    //     { $inc: { stock: -item.quantity } },
    //     { session }
    //   );
    // }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    console.error('Fel vid skapande av order:', error);
    res.status(400).json({ error: error.message });
  }
}); */

// Uppdatera orderstatus (endast admin)
/* router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['in progress', 'shipped', 'canceled', 'delivered'].includes(status)) {
      return res.status(400).json({ error: 'Ogiltig orderstatus' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Ordern hittades inte' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Fel vid uppdatering av orderstatus:', error);
    res.status(500).json({ error: 'Kunde inte uppdatera ordern' });
  }
});

// Avbryt en order (användare kan bara avbryta sina egna ordrar)
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Ordern hittades inte' });
    }

    // Kontrollera att användaren har rätt att avbryta ordern
    if (!req.isAdmin && order.user.toString() !== req.userId) {
      return res.status(403).json({ error: 'Åtkomst nekad' });
    }

    // Kontrollera att ordern kan avbrytas (inte redan levererad)
    if (order.status === 'delivered') {
      return res.status(400).json({ error: 'Kan inte avbryta en levererad order' });
    }

    order.status = 'canceled';
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Fel vid avbrytning av order:', error);
    res.status(500).json({ error: 'Kunde inte avbryta ordern' });
  }
}); */

export default router;