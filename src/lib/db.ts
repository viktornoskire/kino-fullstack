import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url =
  process.env.MONGODB_URI || "mongodb://localhost:27017/your_database_name";

export async function connectDB() {
  try {
    await mongoose.connect(url);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error to connect to Mongodb:", error);
    process.exit(1);
  }
}
connectDB();
