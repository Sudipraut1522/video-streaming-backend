// import "dotenv/config"
import { app } from "./app.js"
import dotenv from "dotenv"

import { connectionDB } from "./db/index.js"

dotenv.config({ path: "./.env" })

connectionDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running in the Port" + `${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log("MONGO DB connetion Failed!!", error)
  })
