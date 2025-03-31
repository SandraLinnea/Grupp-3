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
<<<<<<< HEAD
   type: String,
   required: true
=======
    type: String, 
    required: true 
>>>>>>> 25ca2da127e443e9b65d045b11a043dda7e7b53e
  },
}, { 
  timestamps: true 
});

export default mongoose.model('Product', productSchema);