import { Router } from "express";
import * as org from "../controllers/org.controller.js";
import * as quiz from "../controllers/quiz.controller.js";
import * as attempt from "../controllers/attempt.controller.js";
import { requireOrg } from "../middlewares/auth.middlewares.js";

import {
    passwordValidator,
    ValidationMiddleware,
} from "../middlewares/validation.middlewares.js";
import {
    getCurrentUser,
    login,
    register,
    verifyEmail,
    resendEmailVerification,
    refreshAccessToken,
    forgotPassword,
    resetForgotPassword,
    changeCurrentPassword,
} from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/register").post(ValidationMiddleware, register);
router.route("/login").get(login);
router.route("/logout").delete(auth, login);
router.route("/me").get(auth, getCurrentUser);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/resend-email-verification").get(auth, resendEmailVerification);
router.route("/refresh-token").get(refreshAccessToken);
router.route("/forgot-password").get(forgotPassword);
router.route("/reset-password/:resetToken").post(passwordValidator, resetForgotPassword);
router.route("/changed-password").post(passwordValidator, auth, changeCurrentPassword);

// Organization / billing
router.route("/orgs").post( auth, org.createOrg); // create organization
router.route("/orgs/:id").get(auth, requireOrg, org.getOrg);

// Quizzes & attempts
router.route("/quizzes/:id").get(auth, requireOrg, quiz.getQuiz);
router.route("/quizzes").post(auth, requireOrg, quiz.createQuiz);
router.route("/quizzes").get(auth, requireOrg, quiz.listQuizzes);
router.route("/quizzes/:id").delete(auth, requireOrg, quiz.deleteQuiz);

router.route("/attempts").post(auth, requireOrg, attempt.submitAttempt);
router.route("/attempts").get(auth, requireOrg, attempt.listAttempts);
export default router;
