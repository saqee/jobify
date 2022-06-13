import express from "express"
import "express-async-errors"
dotenv.config()
const app = express()
import dotenv from "dotenv"
import notFoundMiddleware from "./middleware/not_Found.js"
import errorHandlerMiddleware from "./middleware/errorMiddleware.js"
import connectDB from "./db/connect.js"
import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoute.js"
import cors from "cors"
import authenticatedUser from "./middleware/auth.js"
app.use(express.json())
app.use(cors())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", authenticatedUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(process.env.PORT || 5005, () => {
      console.log("server is running" + process.env.PORT)
    })
  } catch (error) {}
}

start()
