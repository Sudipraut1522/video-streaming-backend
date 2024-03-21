class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stak = ""
  ) {
    super(message), (this.statusCode = statusCode)
    this.data = null
    this.message = message
    this.success = false
    this.errors = errors

    if (stak) {
      this.stack = stak
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
export { ApiError }
