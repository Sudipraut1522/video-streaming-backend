import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import asynchandlers from "../utils/asynchandlers.js"
import uploadOnCloudinary from "../utils/cloudnary.fileupload.js"
import { ApiResponce } from "../utils/ApiResponce.js"

const registerUser = asynchandlers(async (req, res) => {
  const { fullname, email, username, password } = req.body
  console.log("email:", email)

  if (
    [fullname, email, username, password].some((result) => result?.trim() == "")
  ) {
    throw new ApiError(400, "All field is required")
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  })
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist")
  }
  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImagesLocalPath = req.files?.coverimages[0]?.path

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avtar file is required")
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverimage = await uploadOnCloudinary(coverImagesLocalPath)

  if (!avatar) {
    throw new ApiError(400, "Avtar file is required")
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverimages: coverimage?.url,
    email,
    password,
    username: username.toLowerCase(),
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registing the user")
  }
  return res
    .statue(201)
    .json(new ApiResponce(200, createdUser, "User Registered Successfully"))
})

export default registerUser
