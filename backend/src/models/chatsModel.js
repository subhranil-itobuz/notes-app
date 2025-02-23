import { mongoose, Schema } from "mongoose";
import userModel from "./userModel.js";

const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: userModel,
      required: true
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: userModel,
      required: true
    },

    adminId: {
      type: Schema.Types.ObjectId,
      ref: userModel,
    },

    messages: [{
      message: {
        type: String,
        required: true
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: userModel,
        required: true
      }
    }],

  },
  { timestamps: true }
);

const chatsModel = mongoose.model("chats", messageSchema);
export default chatsModel