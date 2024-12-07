import express from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import createOrderRoute from "./routes/orderRoute";
import cors from "cors";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", createOrderRoute().getRouter());

app.listen(3002, () => {
  console.log("Order Service running on http://localhost:3002");
});
