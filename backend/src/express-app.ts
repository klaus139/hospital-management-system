import express from "express";
import cors from "cors";
import { admin } from "./controller";
import HandleErrors from "./utils/error-handler";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
dotenv.config();

export const  expressApp = async (app:express.Application) => {

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(cookieParser());
  app.use(express.static(__dirname + "/public"))

  //api
  admin(app)

  // error handling
  app.use(HandleErrors);

}
