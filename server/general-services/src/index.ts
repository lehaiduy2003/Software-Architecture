import express from "express";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import createFoodRoute from "./routes/FoodRoute";
import createAuthRoute from "./routes/AuthRoute";
import createUsersRoute from "./routes/UserRoute";
import createStripeRoute from "./routes/StripeRoute";
import createInvoicesRoute from "./routes/InvoiceRoute";
import createRestaurantsRoute from "./routes/RestaurantRoute";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(session({
  secret: 'hhhhhhhhhhhhhhhhaaaaaaaaaaaaaaaa',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, maxAge: 60000 * 60 }
}));
app.use(cors(
  {
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true
  }
));
app.use(cookieParser("hahahahaahahahaahaha"));
app.set('trust proxy', true);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/foods", createFoodRoute().getRouter());
app.use("/api/v1/auth", createAuthRoute().getRouter());
app.use("/api/v1/users", createUsersRoute().getRouter());
app.use("/api/v1/stripe", createStripeRoute().getRouter());
app.use("/api/v1/invoices", createInvoicesRoute().getRouter());
app.use("/api/v1/restaurants", createRestaurantsRoute().getRouter());

app.listen(3001, () => {
  console.log("General Service running on http://localhost:3001");
});
