import mongoose, { model, Schema} from "mongoose";



const messageSchema = new Schema({
  text: {
    type: String,
    required: [true, "This Field is Required"],
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  
}, {timestamps: true});



const messageModel = model("message", messageSchema)


export default messageModel;