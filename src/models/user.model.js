import { Schema } from "mongoose"
import mongoose from "mongoose"
import Jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Video } from "./video.model.js"
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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 8)
  next()
})
userSchema.methods.isPaswordcorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return Jwt.Sign(
    {
      id: this.id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRATE,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}

userSchema.methods.generateRefreshToken = function () {
  return Jwt.Sign(
    {
      id: this.id,
    },
    process.env.REFRESH_TOKEN_GENERATE,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  )
}

export const User = mongoose.model("User", userSchema)
