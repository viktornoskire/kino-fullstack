import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url =
  process.env.MONGODB_URI || "mongodb://localhost:27017/your_database_name";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return; 
    }
    await mongoose.connect(url);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

export default connectDB;