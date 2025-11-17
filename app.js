import express from "express";
// import { db } from "./config/db-client.js";
import { shortenerRouter } from "./routes/shortener.routes.js";
import { env } from "./config/env.js";
import { authRoutes } from "./routes/auth.routes.js";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(authRoutes);
app.use(shortenerRouter);

try {
  app.listen(env.PORT, () => {
    console.log("server running");
  });
} catch (error) {
  console.log(error);
}
