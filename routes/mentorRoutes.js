const express = require("express");
const router = express.Router();

const {
  createMentor,
  fetchMentors,
  assignStudent,
  fetchMentorById,
} = require("../controllers//mentorControllers");

router.route("/").post(createMentor).get(fetchMentors);
router.get("/:id", fetchMentorById);
router.put("/assignStudent/:mentorId", assignStudent);

module.exports = router;
