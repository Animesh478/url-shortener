import express from "express";
import { shortenerRouter } from "./routes/shortener.routes.js";
import { connectDB } from "./config/db-client.js";
import { env } from "./config/env.js";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(shortenerRouter);
try {
  connectDB();
  app.listen(env.PORT, () => {
    console.log("server running");
  });
} catch (error) {}
