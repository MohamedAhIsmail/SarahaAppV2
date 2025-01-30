import joi from "joi"

export const messageValidationSchema = joi.object({
  text: joi.string().required(),
  receiverId: joi.string().required()
})