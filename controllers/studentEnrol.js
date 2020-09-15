 //import student from '../models/student';
 // import lecturer from '../models/lecturer';
 // import enroledCourse from '../models/course';
 const student = require('../models').student;
 const lecturer = require('../models').lecturer;
 const enroledCourse = require('../models').studentEnrol;
 import { courseValiation } from '../middleware/courseValidate';
 module.exports = {
     enrolCourse(req, res) {
         return enroledCourse
             .create({
                 studentId: req.body.studentId,
                 courseId: req.body.courseId
             })
             .then((enroledCourse) => res.status(201).send(enroledCourse))
             .catch((error) => {
                 res.status(400).send(error);
                 console.log(error);
             })
     },
     enroledStudent(req, res) {
         return enroledCourse
             .findByPk(req.params.id)
             .then((enroledCourse) => {
                 if (!enroledCourse) {
                     return res.status(404).send({
                         message: 'Student is not enlored'
                     })
                 }
                 res.status(200).send(enroledCourse)
             })
             .catch((error) => {
                 console.log(error);
                 res.status(400).send(error);
             })
     },
     listOfEnroled(req, res) {
         return enroledCourse
             .findAll()
             .then((enroledCourse) => res.status(200).send(enroledCourse))
             .catch((error) => {
                 console.log(error);
                 res.status(404).send(error);
             });
     },
 }

 // // import student from '../models/student';
 // // import lecturer from '../models/lecturer';
 // // import course from '../models/course';


 // const student = require('../models').student;
 // const lecturer = require('../models').lecturer;
 // const course = require('../models').course;
 // const studentEnrol = require('../models').studentcourse;
 // const { courseValiation } = require('../middleware/courseValidate');

 // module.exports = {
 //     list(req, res, next) {
 //         return studentEnrol
 //             .findAll()
 //             .then((studentEnrol) => res.status(200).send(studentEnrol))
 //             .catch((error) => {
 //                 console.log(error);
 //                 res.status(404).send(error);
 //             });
 //     },
 //     getById(req, res, next) {
 //         return studentEnrol
 //             .findByPk(req.params.id)
 //             .then((studentEnrol) => {
 //                 if (!studentEnrol) {
 //                     return res.status(404).send({
 //                         message: 'Data Not Found',
 //                     });
 //                 }
 //                 return res.status(200).send(studentEnrol);
 //             })
 //             .catch((error) => {
 //                 console.log(error);
 //                 res.status(404).send(error);
 //             });
 //     },
 //     add(req, res, next) {
 //         return studentEnrol
 //             .create({
 //                 lecturerId: req.body.lecturerId,
 //                 courseId: req.body.courseId,
 //             })
 //             .then((studentEnrol) => res.status(201).send(studentEnrol))
 //             .catch((error) => res.status(400).send(error));
 //     },
 // };