const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");
const Mentor = require("../models/mentorModel");

const createStudent = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) throw new Error("name is missing");
  const createStudent = await Student.create({
    name,
  });
  const student = await Student.findById(createStudent._id);
  res.status(200).json(student);
});

const fetchStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.find({}).populate("mentor", "name");
  if (!students) throw new Error("Something went wrong");
  res.status(200).json(students);
});

const assignMentor = asyncHandler(async (req, res, next) => {
  const { studentId } = req.params;
  if (!studentId) throw new Error("studentId is missing in the request");

  const { mentorId } = req.body;
  if (!mentorId) throw new Error("mentorId is missing");

  const mentorToBeAssignedStudent = await Mentor.findById(mentorId);

  const studentToBeAssignedMentor = await Student.findById(studentId);

  if (!mentorToBeAssignedStudent || !studentToBeAssignedMentor)
    throw new Error("invalid mentor or student");

  // if student is not having any mentor assign mentor and return
  if (!studentToBeAssignedMentor.mentor) {
    // updated student to have mento
    await Student.findByIdAndUpdate(studentId, {
      mentor: mentorId,
    });
    // update to mentor to have this student
    await Mentor.findByIdAndUpdate(mentorId, {
      students: [...mentorToBeAssignedStudent.students, studentId],
    });
    return res.sendStatus(200);
  }

  // If a student is already having a mentor below things has to be done

  // 1.check if the student is not already assigned to this this mentor
  if (mentorToBeAssignedStudent.students.includes(studentId)) {
    throw new Error(
      `student is already having ${mentorToBeAssignedStudent.name} as mentor`
    );
  }

  // 2.remove the student from the old mentor
  const existingMentor = await Mentor.findById(
    studentToBeAssignedMentor.mentor
  );
  await Mentor.findByIdAndUpdate(existingMentor._id, {
    students: existingMentor.students.filter(
      (stdnt) => stdnt._id.toString() !== studentId
    ),
  });

  // 3.assign student to new mentor
  await Student.findByIdAndUpdate(studentId, {
    mentor: mentorId,
  });

  // 4.update to mentor to have this student
  await Mentor.findByIdAndUpdate(mentorId, {
    students: [...mentorToBeAssignedStudent.students, studentId],
  });

  res.sendStatus(200);
});

module.exports = { createStudent, fetchStudents, assignMentor };
