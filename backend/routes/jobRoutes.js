const express = require("express");

const {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.route("/").get(getJobs).post(createJob);

router.route("/:id").get(getJobById).patch(updateJobStatus).delete(deleteJob);

module.exports = router;