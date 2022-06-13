import { StatusCodes } from "http-status-codes"
import User from "../models/User.js"

import { BadRequestError, unAuthenticatedError } from "../errors/index.js"

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values")
  }
  const userAlreadyExits = await User.findOne({ email })
  if (userAlreadyExits) {
    throw new BadRequestError("email already exits")
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
    location: user.location,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError("please provide all values")
  }
  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    throw new unAuthenticatedError("invalid credentials")
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new unAuthenticatedError("invalid credentials")
  }
  const token = await user.createJWT()
  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body
  if (!name || !email || !lastName) {
    throw new BadRequestError("please provide all values")
  }
  const user = await User.findOne({ _id: req.user.userId })
  user.name = name
  user.email = email
  user.location = location
  user.lastName = lastName
  await user.save()
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  })
}

export { register, login, updateUser }
