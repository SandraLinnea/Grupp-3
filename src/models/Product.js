import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

  "product-title": { 
    type: String, 
    required: true 
  },
  "product-description": { 
    type: String ,
    default: ''
  },
  "product-weight": { 
    type: Number 
  },
  "product-producer": { 
    type: String },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String 
  },
}, { 
  timestamps: true 
});

export default mongoose.model('Product', productSchema);