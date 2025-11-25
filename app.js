import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import session from "express-session";
import flash from "connect-flash";

import { shortenerRouter } from "./routes/shortener.routes.js";
import { env } from "./config/env.js";
import { authRoutes } from "./routes/auth.routes.js";
import { verifyAuthentication } from "./middlewares/verify.middleware.js";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret_key",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(verifyAuthentication);
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

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
