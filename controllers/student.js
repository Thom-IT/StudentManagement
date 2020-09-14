const student = require('../models').student;
const classroom = require('../models').classroom;
const course = require('../models').course;

module.exports = {
    list(req, res) {
        return student
            .findAll()
            .then((student) => res.status(200).send(student))
            .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) {
        return student
            .findByPk(req.params.id)
            .then(student => {
                if (!student) {
                    return res.status(404).send({
                        message: 'Student Not Found',
                    });
                }
                return res.status(200).send(student);
            })
            .catch((error) => { res.status(400).send(error); });
    },
    add(req, res) {
        return student
            .create({
                // classId: req.body.classId,
                name: req.body.name,
                email: req.body.email,
                dob: req.body.dob,
                address: req.body.address,
                phone: req.body.phone,

            })
            .then((student) => res.status(201).send(student))
            .catch((error) => {
                res.status(400).send(error);
                console.log(error);
            });
    },
    addWithCourse(req, res) {
        return Lecturer
            .create({
                name: req.body.name,
                course: req.body.course
            })
            .then((lecturer) => res.status(201).send(lecturer))
            .catch((error) => res.status(400).send(error));
    },
    update(req, res) {
        return student
            .findByPk(req.params.id, {
                include: [{
                    model: classroom,
                    as: 'classroom'
                }, {
                    model: course,
                    as: 'course'
                }],
            })
            .then(student => {
                if (!student) {
                    return res.status(404).send({
                        message: 'Student Not Found',
                    });
                }
                return student
                    .update[{
                        name: req.body.name || student.name,
                    }]
                    .then(() => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));

    },
    delete(req, res) {
        return student
            .findByPk(req.params.id)
            .then(student => {
                if (!student) {
                    return res.status(404).send({
                        message: 'Student Not Found',
                    });
                }
                return student
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
