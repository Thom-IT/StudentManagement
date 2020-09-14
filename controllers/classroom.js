const classroom = require('../models').classroom;
const student = require('../models').student;

module.exports = {
    list(req, res) {
        return classroom
            .findAll({
                include: [{
                    model: classroom,
                    as: 'classroom'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{ model: classroom, as: 'classroom' }, 'createdAt', 'DESC'],
                ],
            })
            .then((classroom) => res.status(200).send(classroom))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return classroom
            .findByPk(req.params.id, {
                include: [{
                    model: student,
                    as: 'student'
                }],
            })
            .then((classroom) => {
                if (!classroom) {
                    return res.status(404).send({
                        message: 'Classroom Not Found',
                    });
                }
                return res.status(200).send(classroom);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },

    add(req, res) {
        return classroom
            .create({
                name: req.body.name,
                //classId: req.body.classId
            })
            .then((classroom) => res.status(201).send(classroom))
            .catch((error) => res.status(400).send(error));
    },

    addWithStudents(req, res) {
        return classroom
            .create({
                name: req.body.name,
                student: req.body.student,
            }, {
                include: [{
                    model: student,
                    as: 'student'
                }]
            })
            .then((classroom) => res.status(201).send(classroom))
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },

    update(req, res) {
        return classroom
            .findByPk(req.params.id, {
                include: [{
                    model: student,
                    as: 'student'
                }],
            })
            .then(classroom => {
                if (!classroom) {
                    return res.status(404).send({
                        message: 'Classroom Not Found',
                    });
                }
                return classroom
                    .update({
                        class_name: req.body.name || classroom.name,
                    })
                    .then(() => res.status(200).send(classroom))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return classroom
            .findByPk(req.params.id)
            .then(classroom => {
                if (!classroom) {
                    return res.status(400).send({
                        message: 'Classroom Not Found',
                    });
                }
                return classroom
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};