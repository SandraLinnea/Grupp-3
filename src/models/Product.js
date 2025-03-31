import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String,
    default: ''
  },
  weight: { 
    type: String 
  },
  producer: { 
    type: String 
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: {
    type: String,
    default: ''
  },
 category: {
   type: String,
   required: true
},
}, { 
  timestamps: true 
});

export default mongoose.model('Product', productSchema);