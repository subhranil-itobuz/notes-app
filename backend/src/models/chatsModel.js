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
      room: {
        type: Schema.Types.ObjectId,
        ref: userModel,
        required: true
      },

      message: {
        type: String,
        required: true
      },

      author: {
        type: String,
        required: true
      },

      role: {
        type: String,
        required: true
      },

      time: {
        type: String,
      }
    }],

  },
  { timestamps: true }
);

const chatsModel = mongoose.model("chats", messageSchema);
export default chatsModel