import { StatusCodes } from "http-status-codes"
import CustomApiError from "./customApi.js"
class unAuthenticatedError extends CustomApiError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export default unAuthenticatedError
