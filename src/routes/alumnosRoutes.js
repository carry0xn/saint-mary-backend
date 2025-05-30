const express = require('express')
const router = express.Router()
const alumnosController = require('../controllers/alumnosController')

router.get('/', alumnosController.mostrarAlumnos)
router.get('/:id', alumnosController.mostrarAlumno)
router.post('/login', alumnosController.loginAlumnos)
router.post('/register', alumnosController.registerAlumnos)
router.patch('/:id', alumnosController.modificarAlumnos)
router.put('/:id', alumnosController.actualizarAlumnos)
router.delete('/:id', alumnosController.eliminarAlumnos)

module.exports = router
