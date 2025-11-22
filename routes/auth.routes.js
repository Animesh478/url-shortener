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

router.route("/me").get(authController.getMe);
router.route("/logout").get(authController.logoutUser);

export const authRoutes = router;
