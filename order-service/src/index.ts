import express from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import { orderRoutes } from "./routes/orderRoute";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/order", orderRoutes);

app.listen(3002, () => {
  console.log("Order Service running on http://localhost:3002");
});
