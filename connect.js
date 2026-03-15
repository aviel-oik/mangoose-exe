import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
  } 
  catch (err) {
    console.error(err);
    process.exit(1); 
  }
}
