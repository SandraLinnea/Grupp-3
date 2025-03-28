import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String ,
    default: ''
  },
  weight: { 
    type: Number 
  },
  producer: { 
    type: String },
  price: { 
    type: Number, 
    required: true 
  },
  image: {
    type: String,
    default: ''
  },
 category: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Category',
   required: true
  },
}, { 
  timestamps: true 
});

export default mongoose.model('Product', productSchema);