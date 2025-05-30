const express = require('express')
const router = express.Router()
const profesorController = require('../controllers/profesorController')

router.get('', profesorController.mostrarProfesores)
router.get('/:id', profesorController.mostrarProfesor)
router.post('/login', profesorController.loginProfesor)
router.post('/register', profesorController.registerProfesor)
router.patch('/:id', profesorController.modificarProfesor)
router.put('/:id', profesorController.actualizarProfesor)
router.delete('/:id', profesorController.eliminarProfesor)

module.exports = router
