import express from "express";

import {
  postShortener,
  getShortenerPage,
  redirectLink,
} from "../controllers/shortener.controller.js";

const router = express.Router();

router.route("/").get(getShortenerPage).post(postShortener);

// router.get("/", getShortenerPage);

// router.post("/", postShortener);

router.get("/:shortCode", redirectLink);

export const shortenerRouter = router;
