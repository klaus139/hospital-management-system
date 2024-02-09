import express from "express";
import { expressApp } from "./express-app";

import { connectDB, PORT, URL } from "./config";

const startServer = async () => {
  const app = express();
  connectDB();

  await expressApp(app);
  app
    .listen(PORT, () => {
      console.log(`server is running on ${URL}:${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

startServer();
