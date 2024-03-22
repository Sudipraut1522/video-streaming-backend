import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/user.router.js"

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
),
  app.use(express.json({ limit: "16kb" })),
  app.use(urlencoded({ extended: true, limit: "16kb" })),
  app.use(express.static("public")),
  app.use(cookieParser())

// // Routes import

app.use("/users", router)

export { app }
