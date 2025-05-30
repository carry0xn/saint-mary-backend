const { Alumno, Curso } = require('../db/models')
const userController = require("./userController")

// Mostrar todos los alumnos
const mostrarAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.findAll({
      attributes: ['id', 'nombreCompleto', 'username'],
      include: {
        model: Curso,
        attributes: ['nombreCurso']
      }
    })
    res.status(200).json(alumnos)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los alumnos', error: error.message })
  }
}
const mostrarAlumno = (req, res) => userController.mostrarUser(req, res, Alumno)
const loginAlumnos = (req, res) => userController.login(req, res, Alumno)
const registerAlumnos = (req, res) => userController.register(req, res, Alumno)
const modificarAlumnos = (req, res) => userController.modificarUser(req, res, Alumno)
const actualizarAlumnos = (req, res) => userController.actualizarUser(req, res, Alumno)
const eliminarAlumnos = (req, res) => userController.eliminarUser(req, res, Alumno)

module.exports = {
  mostrarAlumno,
  mostrarAlumnos,
  loginAlumnos,
  registerAlumnos,
  modificarAlumnos,
  actualizarAlumnos,
  eliminarAlumnos
}
