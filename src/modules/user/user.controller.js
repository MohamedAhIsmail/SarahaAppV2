import { Router } from "express";
import * as userService from "./service/user.service.js";
import uploadImage  from "../../utilities/uploadImage.js";
import { protectRoute } from "../../middlewares/authmiddleware.js";
// import authRoutes from "../auth/auth.controller.js";

const userRoutes = Router();

userRoutes.put('/', protectRoute, userService.updateUser)
userRoutes.post( "/upload-image",protectRoute ,uploadImage, userService.uploadImage);




export default userRoutes;