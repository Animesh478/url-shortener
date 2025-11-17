import express from "express";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/register", authController.getRegisterPage);
router
  .route("/login")
  .get(authController.getLoginPage)
  .post(authController.postLogin);

export const authRoutes = router;
