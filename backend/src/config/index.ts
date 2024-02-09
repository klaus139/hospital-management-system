import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("succesfully connected to the database")

  } catch (error:any) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

export const PORT = process.env.PORT || 4000;
export const URL = process.env.URL as string;
