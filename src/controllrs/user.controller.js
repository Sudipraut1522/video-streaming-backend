import asyncHandler from "../utils/asynchandlers.js"

const registerUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "ok",
  })
})

export default registerUser
