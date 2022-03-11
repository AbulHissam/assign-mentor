const express = require("express");
const router = express.Router();

const {
  createStudent,
  fetchStudents,
  assignMentor,
} = require("../controllers/studentControllers");

router.route("/").post(createStudent).get(fetchStudents);
router.put("/:studentId", assignMentor);

module.exports = router;
