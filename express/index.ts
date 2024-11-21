import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import setupMiddlewares from "./setup/middlewares";
const app = express();

const port = Number(process.env.PORT);
const host = process.env.HOST || "localhost";
setupMiddlewares(app);

(() => {
  try {
    app.listen(port, host, () => {
      console.log(`Local server listening on http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    process.exit(1);
  }
})();
