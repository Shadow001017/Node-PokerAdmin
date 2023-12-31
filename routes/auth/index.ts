import express from "express";
import * as authController from "../../controllers/auth";

const router = express.Router();

router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgotPassword);
router.post("/resetpassword", authController.resetPassword);

module.exports = router;
