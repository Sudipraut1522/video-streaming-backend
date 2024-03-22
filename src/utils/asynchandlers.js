// const asyncHandler = (fun) => async (req, res, next) => {
//   try {
//     await fun(req, res, next)
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       messgae: error.messgae,
//     })
//     console.log("error", error)
//   }
// }

const asyncHandler = (requestHandeler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandeler(req, res, next)).catch((error) => {
      next(error)
    })
  }
}

export { asyncHandler }
