import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  userName:{
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  }
});

const Users = mongoose.models.User || mongoose.model('User', userSchema);

export default Users;