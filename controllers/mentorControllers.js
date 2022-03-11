const Mentor = require("..//models/mentorModel");
const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");

const createMentor = asyncHandler(async (req, res, next) => {
  const { name, students } = req.body;
  if (!name) throw new Error("name is required");
  const createdMentor = await Mentor.create({
    name,
    students,
  });
  const mentor = await Mentor.findById(createdMentor._id);
  res.status(201).json(mentor);
});

const fetchMentorById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new Error("id is missing");
  const mentor = await Mentor.findById(id).populate("students", "name");
  if (!mentor) throw new Error("Invalid mentor id");
  res.status(200).json(mentor);
});

const fetchMentors = asyncHandler(async (req, res, next) => {
  const mentors = await Mentor.find({}).populate("students", "name");
  if (!mentors) throw new Error("Something went wrong");
  res.status(200).json(mentors);
});

const assignStudent = asyncHandler(async (req, res, next) => {
  const { mentorId } = req.params;
  const { students } = req.body;

  if (!mentorId) throw new Error("mentorId is required");

  if (!students || students.length === 0) {
    throw new Error(
      "students id is missing or atleast on studentId is required"
    );
  }

  for (let i = 0; i < students.length; i++) {
    let studentId = students[i];

    // find if the mentor is valid before updating
    const mentorToBeUpdated = await Mentor.findById(mentorId);
    if (!mentorToBeUpdated) throw new Error("Invalid mentorId");

    // find if student is valid
    const findStudent = await Student.findById(studentId);
    if (!findStudent) throw new Error("student record does not exist");

    // if student is valid check whether he has already mentor assigned
    if (findStudent.mentor) {
      throw new Error(`mentor already exists for student `);
    }

    // update student with new mentor
    const studentToBeAssignedMentor = await Student.findByIdAndUpdate(
      studentId,
      {
        mentor: mentorId,
      }
    );
    if (!studentToBeAssignedMentor)
      throw new Error("student record does not exist");

    // update mentor with students
    await Mentor.findByIdAndUpdate(mentorId, {
      students: [...mentorToBeUpdated.students, studentId],
    });
  }
  // find the updated mentor and respond
  const mentor = await Mentor.findById(mentorId);
  res.status(200).json(mentor);
});

module.exports = { createMentor, fetchMentors, fetchMentorById, assignStudent };
