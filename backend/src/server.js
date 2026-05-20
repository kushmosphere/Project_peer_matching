import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { connectDatabase } from "./services/database.js";
import { errorHandler } from "./middleware/error-handler.js";
import analysisRoutes from "./routes/analysis.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json({ limit: "5mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "recallradar-api" });
});

app.use("/api", analysisRoutes);
app.use(errorHandler);

const port = process.env.PORT || 8080;

await connectDatabase();

server.listen(port, () => {
  console.log(`RecallRadar API listening on ${port}`);
});
