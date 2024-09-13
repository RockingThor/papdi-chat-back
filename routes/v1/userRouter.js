import express from "express";
import { loginUser, registerUser } from "../../controllers/userController.js";

const v1UserRouter = express.Router();

v1UserRouter.route("/").post(registerUser);
v1UserRouter.route("/login").post(loginUser);

export default v1UserRouter;
