import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { shortenerRouter } from "./routes/shortener.routes.js";
import { env } from "./config/env.js";
import { authRoutes } from "./routes/auth.routes.js";
import { verifyAuthentication } from "./middlewares/verify.middleware.js";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(verifyAuthentication);

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
