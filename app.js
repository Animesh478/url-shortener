import express from "express";
import { shortenerRouter } from "./routes/shortener.routes.js";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(shortenerRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log("server running");
});
