'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class studentEnrol extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    studentEnrol.init({
        studentId: DataTypes.INTEGER,
        courseId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'studentEnrol',
    });
    return studentEnrol;
};