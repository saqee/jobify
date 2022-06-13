import jwt from "jsonwebtoken"
import { unAuthenticatedError } from "../errors/index.js"
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new unAuthenticatedError("Authentication Invalid")
  }
  const token = authHeader.split(" ")[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId }
    next()
  } catch (error) {
    throw new unAuthenticatedError("Authentication Invalid")
  }
}

export default auth
