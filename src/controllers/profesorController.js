const { Profesor } = require('../db/models')
const userController = require("./userController")

// Mostrar todos los profesores
const mostrarProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.findAll({
      attributes: ['id', 'nombreCompleto', 'username']
    })
    res.status(200).json(profesores)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los profesores', error: error.message })
  }
}
const mostrarProfesor = (req, res) => userController.mostrarUser(req, res, Alumno)
const loginProfesor = (req, res) => userController.login(req, res, Profesor)
const registerProfesor = (req, res) => userController.register(req, res, Profesor)
const modificarProfesor = (req, res) => userController.modificarUser(req, res, Profesor)
const actualizarProfesor = (req, res) => userController.actualizarUser(req, res, Profesor)
const eliminarProfesor = (req, res) => userController.eliminarUser(req, res, Profesor)

module.exports = {
  mostrarProfesor,
  mostrarProfesores,
  loginProfesor,
  registerProfesor,
  modificarProfesor,
  actualizarProfesor,
  eliminarProfesor
}
