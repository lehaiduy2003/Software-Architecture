import express from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import redisClient from "./config/redisClient";
import createOrderRoute from "./routes/orderRoute";
import { rateLimit } from 'express-rate-limit'
dotenv.config();

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 30, // Limit each IP to 10000 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // `X-RateLimit-*` headers
})

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
app.use(limiter)
app.set("trust proxy", true);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", createOrderRoute().getRouter());

app.listen(3002, () => {
  console.log("Order Service running on http://localhost:3002");
});
