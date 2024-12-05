import express from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import createFoodRoute from "./routes/FoodRoute";
import createAuthRoute from "./routes/AuthRoute";
import createUsersRoute from "./routes/UserRoute";
import createStripeRoute from "./routes/StripeRoute";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/foods", createFoodRoute().getRouter());
app.use("/api/v1/auth", createAuthRoute().getRouter());
app.use("/api/v1/users", createUsersRoute().getRouter());
app.use("/api/v1/stripe", createStripeRoute().getRouter());

app.listen(3001, () => {
  console.log("General Service running on http://localhost:3001");
});
