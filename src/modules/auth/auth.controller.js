import { Router } from "express";
import * as authService from "./service/auth.service.js";
import { validation } from "../../utilities/validation.js";
import { signInValidationSchema, signUpValidationSchema } from "./auth.validation.js";


const authRoutes = Router();

authRoutes.post("/signup", validation(signUpValidationSchema), authService.register);
authRoutes.post("/login", validation(signInValidationSchema), authService.login);
authRoutes.get("/verify/:token", authService.verify);



export default authRoutes;