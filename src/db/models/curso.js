'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Curso.belongsTo(models.Profesor, {
        foreignKey: 'profesorId'
      })

      // Un curso tiene muchos alumnos
      Curso.hasMany(models.Alumno, {
        foreignKey: 'cursoId'
      })
    }
  }
  Curso.init({
    nombreCurso: DataTypes.STRING,
    profesorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};