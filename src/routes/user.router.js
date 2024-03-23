import { Router } from "express"
import registerUser from "../controllr/user.controller.js"
import { upload } from "../middlewares/multer.middlewares.js"
const router = Router()

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverimages",
      maxCount: 1,
    },
  ]),
  registerUser
)

export default router
