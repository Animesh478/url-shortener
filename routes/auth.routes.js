import express from "express";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/register")
  .get(authController.getRegisterPage)
  .post(authController.postRegister);

router
  .route("/login")
  .get(authController.getLoginPage)
  .post(authController.postLogin);

export const authRoutes = router;
