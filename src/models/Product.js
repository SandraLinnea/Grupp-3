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
  "product-price": { 
    type: Number, 
    required: true 
  },
  image: {
    type: String,
    default: ''
  },
  category: { 
    type: String 
  },
}, { 
  timestamps: true 
});

export default mongoose.model('Product', productSchema);