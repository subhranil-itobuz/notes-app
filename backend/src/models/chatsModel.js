import { mongoose, Schema } from "mongoose";
import userModel from "./userModel.js";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: userModel,
      required: true
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: userModel,
      required: true
    },
    message: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const chatsModel = mongoose.model("chats", messageSchema);
export default chatsModel