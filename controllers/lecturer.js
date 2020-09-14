const student = require('../models').student;
//const classroom=require('../models').classroom;
const course = require('../models').course;
const lecturer = require('../models').lecturer;

module.exports = {
    list(req, res) {
        return lecturer
            .findAll({
                include: [{
                    model: lecturer,
                    as: 'lecturer'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: lecturer, as: 'lecturer' }, 'createAt', 'DESC'],
                ],
            })
            .then((lecturer) => res.status(200).send(lecturer))
            .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) {
        return lecturer
            .findByPk(req.params.id, {
                include: [{
                    model: course,
                    as: 'course'
                }],
            })
            .then((lecturer) => {
                if (!lecturer) {
                    return res.status(404).send({
                        message: 'lecturer Not Found',
                    });
                }
                return res.status(200).send(lecturer);
            })
            .catch((error) => { res.status(400).send(error); });
    },
    add(req, res) {
        return lecturer
            .create({
                // classId: req.body.classId,
                name: req.body.name,
                email: req.body.email,
                dob: req.body.dob,
                address: req.body.address,
                phone: req.body.phone,

            })
            .then((lecturer) => res.status(201).send(lecturer))
            .catch((error) => res.status(400).send(error));
    },
    addcourse(req, res) {
        return lecturer
            .findByPk(req.body.lecturerId, {
                include: [{
                    model: course,
                    as: 'course'
                }],
            })
            .then((lecturer) => {
                if (!lecturer) {
                    return res.status(404).send({
                        message: 'lecturer Not Found',
                    });
                }
                course.findByPk(re.body.courseId)
                    .then((course) => {
                        if (!course) {
                            return res.status(404).send({
                                message: 'course Not Found',
                            });
                        }
                        lecturer.addcourse(course)
                        return res.status(200).send(lecturer);
                    })
            })
            .catch((error) => res.status(400).send(error));
    },
    addWithCourse(req, res) {
        return Lecturer
            .create({
                lecturer_name: req.body.name,
                course: req.body.course
            }, {
                include: [{
                    model: course,
                    as: 'course'
                }]
            })
            .then((lecturer) => res.status(201).send(lecturer))
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        return lecturer
            .findByPk(req.params.id, {
                include: [{
                    model: course,
                    as: 'course'
                }],
            })
            .then(lecturer => {
                if (!lecturer) {
                    return res.status(404).send({
                        message: 'lecturer Not Found',
                    });
                }
                return lecturer
                    .update[{
                        name: req.body.name || lecturer.name,
                    }]
                    .then(() => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));

    },
    delete(req, res) {
        return lecturer
            .findByPk(req.params.id)
            .then(lecturer => {
                if (!lecturer) {
                    return res.status(404).send({
                        message: 'lecturer Not Found',
                    });
                }
                return lecturer
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};