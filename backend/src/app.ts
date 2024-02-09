import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

//routes
import adminRoutes from "./routes/adminRoute";

import { connectDB, PORT, URL } from "./config";

const app = express();

app.use(express.urlencoded({ extended:false }))
app.use(logger("dev"));
app.use(express.json({}));
app.use(cookieParser());
app.use(cors());

//routers
app.use("/api/admin", adminRoutes);

//database
connectDB();

app.listen(PORT, () => {
  console.log(`server is running on ${URL}:${PORT}`)
})
