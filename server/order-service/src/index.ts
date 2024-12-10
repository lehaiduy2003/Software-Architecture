import express from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import createOrderRoute from "./routes/OrderRoute";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import redisClient from "./config/redisClient";
dotenv.config();
const app = express();
redisClient.connect();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 60000 * 60 },
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET as string));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true,
  })
);
app.set("trust proxy", true);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", createOrderRoute().getRouter());

app.listen(3002, () => {
  console.log("Order Service running on http://localhost:3002");
});
