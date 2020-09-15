module.exports = (sequilize, DataTypes) => {
    const course = sequilize.define("course", {
        name: DataTypes.STRING,
        content: DataTypes.STRING,
        genre: DataTypes.STRING,
        lecturerId: DataTypes.INTEGER
    });
    // course.association = models => {
    //     course.belongsToMany(models.student, {
    //         through: 'studentCourse',
    //         as: 'students',
    //         foreignKey: 'courseId'
    //     });
    //     course.belongsTo(models.lecturer, {
    //         foreignKey: 'lecturerId',
    //         as: 'lecturer'
    //     });
    // };
    return course
};

// 'use strict';
// const {
//     Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//     class course extends Model {
//         static associate(models) {
//             course.belongsToMany(models.student, {
//                 through: 'studentCourse',
//                 as: 'students',
//                 foreignKey: 'courseId'
//             });
//             course.belongsTo(models.lecturer, {
//                 foreignKey: 'lecturerId',
//                 as: 'lecturer'
//             });
//         }
//     };


//     course.init({
//         name: DataTypes.STRING,
//         content: DataTypes.STRING,
//         genre: DataTypes.STRING,
//         lecturerId: DataTypes.INTEGER
//     }, {
//         sequelize,
//         modelName: 'course',
//     });
//     return course;
// };