import mongoose, { Schema } from "mongoose"

const videoSchema = new Schema(
  {
    videoFiles: {
      type: String,
      required: true,
      thumbnail: true,
    },
    title: {
      type: String,
      required: true,
      tream: true,
    },
    description: {
      type: String,
      required: true,
    },
    deuration: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)
export const Video = mongoose.model("Video", videoSchema)
