import mongoose from 'mongoose';
import Product from './Product.js'

const orderSchema = new mongoose.Schema({
    /*user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
      },*/
    email: {
        type: String,
        required: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        match: /^[A-Za-zåäöÅÄÖ]+$/,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        match: /^[A-Za-zåäöÅÄÖ]+$/,
    },
    phonenumber: {
        type: String,
        required: true,
        match: [/^\d{6,10}$/, 'Telefonnummer måste vara 6 till 10 siffror'],
      },      
    shippingAddress: {
        street: { type: String, required: true, match: /^[A-Za-zåäöÅÄÖ0-9\s]+$/ },
        number: { type: String, required: true,match: /^[A-Za-z0-9]+$/ },    
        zipCode: { type: String, required: true,match: /^\d{5}$/ },    
        city: { type: String, required: true,match: /^[A-Za-zåäöÅÄÖ\s]+$/ }, 
    },
    orderItem: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
          // product: { type: String, required: true },
          quantity: { type: Number, required: true },
        }
    ],
    totalPrice: {
        type: Number,
    },
    vat: {
        type: Number,
    },
    orderNumber: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['in progress', 'shipped', 'canceled', 'delivered'],
        default: 'in progress'
    },
}, {timestamps: true});

orderSchema.pre('save', async function (next) {
    if (this.orderItem && this.orderItem.length > 0) {
        let products = await Promise.all(this.orderItem.map(orderItem => {
            return Product.findById(orderItem.productId)
        }))
        products = products.filter(p => !!p)
        console.log(products)
      const total = this.orderItem.reduce((sum, item) => {
        const product = products.find(p => p._if = item.productId)
        if(!product){
            return sum
        }
        return sum + product.price * item.quantity;
      }, 0);
      this.totalPrice = total;
      console.log("Total", total)
      this.vat = Number((total * 0.12).toFixed(2));
    }
    if (!this.orderNumber) {
      const orderCode = Math.floor(100000 + Math.random() * 900000);
      this.orderNumber = `ORD-${orderCode}`;
    }
  
    next();
  });

  export default mongoose.model('Order', orderSchema);