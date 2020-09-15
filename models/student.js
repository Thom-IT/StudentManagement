'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // student.belongsTo(models.classroom, {
            //     foreignKey: 'classId',
            //     as: 'classroom'
            // });
            // student.belongsToMany(models.course, {
            //     through: 'studentCourse',
            //     as: 'courses',
            //     foreignKey: 'studentId'
            // });
        }
    };
    student.init({
        classId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        dob: DataTypes.DATE,
        address: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'student',
    });
    return student;
};