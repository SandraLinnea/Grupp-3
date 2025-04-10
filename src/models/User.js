import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

userSchema.pre('save',async function(next) {
  const user = this
  if(user.isModified('password')) {
      try {
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(user.password, salt)
          user.password = hashedPassword
          next()
      } catch (error) {
          console.warn("Fel vid hashning av lösenord")
          next(error)
      }
  }
})

export default mongoose.model('User', userSchema);
