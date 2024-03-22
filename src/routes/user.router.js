import { Router } from "express"
import registerUser from "../controllrs/user.controller"

const router = Router()

router.route("/register").post(registerUser)

export default router
