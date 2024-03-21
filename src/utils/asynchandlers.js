const asyncHandler = (fun) => async (req, res, next) => {
  try {
    await fun(req, res, next)
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      messgae: error.messgae,
    })
    console.log("error", error)
  }
}

export { asyncHandler }
