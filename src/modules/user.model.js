import { Schema } from "mongoose"
import mongoose from "mongoose"

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      index: true,
      lowercase: true,
      tream: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverimages: {
      type: String,
      required: true,
    },
    watchhistory: [
      {
        type: Schema.Types.ObjectId,
        ref: Video,
      },
    ],
    password: {
      type: String,
      requird: [true, "Password is required"],
    },
    referseToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const user = mongoose.model("User", userSchema)
