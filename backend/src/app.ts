import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(logger("dev"));
app.use(express.json({}));
app.use(cookieParser());
app.use(cors());


