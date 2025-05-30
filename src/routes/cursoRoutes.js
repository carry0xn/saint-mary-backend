const express = require('express')
const router = express.Router()
const cursoController = require('../controllers/cursoController')

router.get('/', cursoController.mostrarCursos)
router.get('/:id', cursoController.mostrarCurso)
router.post('/', cursoController.agregarCurso)
router.patch('/:id', cursoController.modificarCurso)
router.put('/:id', cursoController.actualizarCurso)
router.delete('/:id', cursoController.eliminarCurso)

module.exports = router