const { Curso, Alumno } = require('../db/models')

// Mostrar todos los cursos
const mostrarCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      attributes: ['id', 'nombreCurso'],
      include: {
        model: Alumno,
        attributes: ['id', 'nombreCompleto']
      }
    })
    res.status(200).json(cursos)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos', error: error.message })
  }
}

// Mostrar un curso por ID
const mostrarCurso = async (req, res) => {
  try {
    const id = req.params.id;
    const curso = await Curso.findByPk(id, {
      attributes: ['id', 'nombreCurso'],
      include: {
        model: Alumno,
        attributes: ['id', 'nombreCompleto']
      }
    })
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ message: 'Curso no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar curso', error: error.message })
  }
}

// Crear un nuevo curso
const agregarCurso = async (req, res) => {
  try {
    const { nombreCurso } = req.body;
    if (!nombreCurso) {
      return res.status(400).json({ message: 'Falta el nombre del curso' })
    }
    const curso = await Curso.create({ nombreCurso });
    res.status(201).json({ id: curso.id, nombreCurso: curso.nombreCurso })
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ message: 'El curso ya existe' })
    } else {
      res.status(500).json({ message: 'Error al crear curso', error: error.message })
    }
  }
}

// Modificar parcialmente un curso (PATCH)
const modificarCurso = async (req, res) => {
  try {
    const id = req.params.id;
    const curso = await Curso.findByPk(id)
    if (curso) {
      const { nombreCurso } = req.body
      if (nombreCurso) curso.nombreCurso = nombreCurso
      await curso.save();
      res.status(200).json({ id: curso.id, nombreCurso: curso.nombreCurso })
    } else {
      res.status(404).json({ message: 'Curso no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar curso', error: error.message })
  }
}

// Reemplazar completamente un curso (PUT)
const actualizarCurso = async (req, res) => {
  try {
    const id = req.params.id;
    const curso = await Curso.findByPk(id)
    if (curso) {
      const { nombreCurso } = req.body;
      if (!nombreCurso) {
        return res.status(400).json({ message: 'Falta el nombre del curso' })
      }
      curso.nombreCurso = nombreCurso;
      await curso.save()
      res.status(200).json({ id: curso.id, nombreCurso: curso.nombreCurso })
    } else {
      res.status(404).json({ message: 'Curso no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar curso', error: error.message })
  }
}

// Eliminar un curso
const eliminarCurso = async (req, res) => {
  try {
    const id = req.params.id;
    const curso = await Curso.findByPk(id);
    if (curso) {
      await curso.destroy();
      res.status(200).json({ message: 'Curso eliminado' })
    } else {
      res.status(404).json({ message: 'Curso no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar curso', error: error.message })
  }
}

module.exports = {
  mostrarCursos,
  mostrarCurso,
  agregarCurso,
  modificarCurso,
  actualizarCurso,
  eliminarCurso
}
