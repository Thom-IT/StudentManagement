// import Validate from '../middleware/courseValidate';
// import express from 'express';
import express from "express";
var router = express.Router();
const classroomController = require('../controllers').classroom;
const studentController = require('../controllers').student;
const courseController = require('../controllers').course;
const Lecturercontroller = require('../controllers').lecturer;
const studentEnlorController = require('../controllers').studentEnrol;
import verifyToken from '../middleware/varifyToken';
import { courseValidate } from '../middleware/courseValidate';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

// import classroomController from '../controllers/classroom';
// import studentController from '../controllers/student';
// import courseController from '../controllers/course';
// import Lecturercontroller from '../controllers/lecturer';

/* GET home page. */
// router.get("/", function(req, res, next) {
//     res.render("index", { title: "Express" });
// });
router.get("/", (req, res) => {
    res.send("Welcome to course Management System");
});
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/*classroom Router*/
router.get("/api/classrooms", classroomController.list);
router.get("/api/classrooms/:id", classroomController.getById);
router.post("/api/classrooms", classroomController.add);
router.patch("/api/classrooms/:id", classroomController.update);
router.delete("/api/classrooms/:id", classroomController.delete);
/*student Router*/
router.get("/api/students", studentController.list);
router.get("/api/students/:id", studentController.getById);
router.post("/api/students", studentController.add);
router.patch("/api/students/:id", studentController.update);
router.delete("/api/students/:id", studentController.delete);

/*course Router*/
router.get("/api/courses", courseController.list);
router.get("/api/courses/:id", courseController.getById);
//router.post("/api/courses", verifyToken, courseValidate, courseController.add);
router.post("/api/courses", courseValidate, courseController.add);
router.patch("/api/courses/:id", courseController.update);
router.delete("/api/courses/:id", courseController.delete);

/*Lecturer Router*/
router.get("/api/lecturers", Lecturercontroller.list);
router.get("/api/lecturers/:id", Lecturercontroller.getById);
router.post("/api/lecturers", Lecturercontroller.add);
router.patch("/api/lecturers/:id", Lecturercontroller.update);
router.delete("/api/lecturers/:id", Lecturercontroller.delete);

//student Enrol
//router.post('/api/lecturers', studentEnrolcontroller);
router.post("/api/courseEnrol", studentEnlorController.enrolCourse);
router.get("/api/courseEnrol/:id", studentEnlorController.enroledStudent);
router.get("/api/courseEnrol", studentEnlorController.listOfEnroled);

/*advanced rootes*/
// router.post('/api/classrooms/add_with_students', classroomController.addWithStudents);
// router.post('/api/lecturer/add_with_course', Lecturercontroller.addWithCourse);
// router.post('/api/student/add_course', studentController.addWithCourse);
module.exports = router;