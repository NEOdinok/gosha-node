import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import express from "express";

import { checkUser } from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const port = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI;

const app = express();

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

(async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("📙 Connected to MongoDB");

    app.listen(port, () => {
      console.log("👂 Server is listening on http://localhost:3000");
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
  }
})();

app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));

app.use(authRoutes);
app.use(productRoutes);
