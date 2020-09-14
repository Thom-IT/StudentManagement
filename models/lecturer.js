'use strict';
import {
    Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class lecturer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            //     lecturer.hasOne(models.course, {
            //         foreignKey: 'lecturerId',
            //         as: 'course',
            //     });
        }
    };
    lecturer.init({
        classId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        dob: DataTypes.DATE,
        address: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'lecturer',
    });
    return lecturer;
};