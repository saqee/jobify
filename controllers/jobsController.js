import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import {
  BadRequestError,
  unAuthenticatedError,
  NotFoundError,
} from "../errors/index.js"
const createJob = async (req, res) => {
  const { position, company } = req.body

  if (!position || !company) {
    throw new BadRequestError("please provide all values")
  }
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId })
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
}

const deleteJob = async (req, res) => {}
const updateJob = async (req, res) => {}
const showStats = async (req, res) => {}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }
