import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null

    const responce = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    })
    console.log("file is uploaded on cludinary", responce.url)
    return responce
  } catch (error) {
    fs.unlink(localFilePath) //remove loally save temporary file as the upload operation failed
    return null
  }
}

cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result)
  }
)
