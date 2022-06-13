import express from "express"

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from "../controllers/jobsController.js"

const router = express.Router()
router.get("/", getAllJobs)
router.get("/stats", showStats)
router.post("/", createJob)
router.route("/:id").delete(deleteJob).patch(updateJob)
export default router
