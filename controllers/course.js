// import student from '../models/student';
// import lecturer from '../models/lecturer';
// import course from '../models/course';


const student = require('../models').student;
const lecturer = require('../models').lecturer;
const course = require('../models').course;
import { courseValiation } from '../middleware/courseValidate';

module.exports = {
    list(req, res, next) {
        return course
            .findAll()
            .then((course) => res.status(200).send(course))
            .catch((error) => {
                console.log(error);
                res.status(404).send(error);
            });
    },
    getById(req, res, next) {
        return course
            .findByPk(req.params.id)
            .then((course) => {
                if (!course) {
                    return res.status(404).send({
                        message: 'course Not Found',
                    });
                }
                return res.status(200).send(course);
            })
            .catch((error) => {
                console.log(error);
                res.status(404).send(error);
            });
    },
    add(req, res, next) {
        return course
            .create({
                name: req.body.name,
                content: req.body.content,
                genre: req.body.genre,
                lecturerId: req.body.lecturerId,
                //const result = await courseValiation.validateAsync(req.body),


            })
            .then((course) => res.status(201).send(course))
            .catch((error) => res.status(400).send(error));
    },
    addcourse(req, res) {
        return student
            .findByPk(req.body.studentId, {
                include: [{
                    model: course,
                    as: 'course'
                }],
            })
            .then((student) => {
                if (!student) {
                    return res.status(404).send({
                        message: 'Student Not Found',
                    });
                }
                course.findByPk(re.body.courseId)
                    .then((course) => {
                        if (!course) {
                            return res.status(404).send({
                                message: 'course Not Found',
                            });
                        }
                        student.addcourse(course)
                        return res.status(200).send(student);
                    })
            })
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        return course
            .findByPk(req.params.id)
            .then(course => {
                if (!course) {
                    return res.status(404).send({
                        message: 'course Not Found',
                    });
                }
                return course
                    .update({
                        name: req.body.name,
                        content: req.body.content,
                        genre: req.body.genre,
                        lecturerId: req.body.lecturerId,
                    })
                    .then((course) => res.status(200).send(course))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));

    },
    delete(req, res) {
        return course
            .findByPk(req.params.id)
            .then(course => {
                if (!course) {
                    return res.status(404).send({
                        message: 'course Not Found',
                    });
                }
                return course
                    .destroy()
                    .then(() => res.status(204).send({ message: "successifull Deleted the course" }))

                .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};