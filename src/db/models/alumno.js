'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alumno extends Model {
     /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alumno.belongsTo(models.Curso, {
        foreignKey: 'cursoId'
      })
    }
  }
  Alumno.init({
    nombreCompleto: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    cursoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Alumno',
  });
  return Alumno;
};