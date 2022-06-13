import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      minlength: 4,
      select: false,
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      default: "lastName",
    },
    location: {
      type: String,
      maxlength: 20,
      trim: true,
      default: "my city",
    },
  },
  { timestamps: true }
)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function (cb) {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  })
}

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}
const User = mongoose.model("users", userSchema)

export default User
