import { Router } from "express";
import * as messages from "./service/message.service.js";
import { validation } from "../../utilities/validation.js";
import { messageValidationSchema } from "./messages.validation.js";
import { protectRoute } from "../../middlewares/authmiddleware.js";


const messageRoutes = Router()


messageRoutes.post('/send', protectRoute, validation(messageValidationSchema) ,messages.createMessage)
messageRoutes.get('/show/:receiverId', protectRoute, messages.getMessages)
messageRoutes.delete('/delete/:messageId', protectRoute, messages.deleteMessage)



export default messageRoutes