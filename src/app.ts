import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

export const app = express();
app.use(cors({ origin: process.env.APP_URL || "*", credentials: true }));
app.use(express.json());

app.all("/api/auth/*", toNodeHandler(auth));

app.get("/", async (req, res) => {
  res.status(200).json({ success: true, message: "Server on created" });
});
