import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import dotenv from "dotenv"
dotenv.config()

export const connectionDB = async () => {
  try {
    console.log("connection", process.env.MONGOOSE_URL)
    const connection_DB = mongoose.connect(
      `${process.env.MONGOOSE_URL}/${DB_NAME}`
    )
    // .then(() => console.log("database connected"))
    // .catch((err) => console.log(err))
    console.log("connected", process.env.MONGOOSE_URL)
  } catch (error) {
    console.log("errors", error)
    process.exit(1)
  }
}
