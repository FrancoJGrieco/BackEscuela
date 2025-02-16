const Materia = require('../models/materia')
const Curso = require('../models/curso')

const fetchMaterias = async (req, res) => {
  try {
    const materias = await Materia.find()

    res.json({ materias })
  } catch (err) {
    console.log('(fetchMaterias) Error al obtener materias:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const fetchMateria = async (req, res) => {
  try {
    const id = req.params.id

    const materia = await Materia.findById(id)

    if (!materia) { return res.status(404).json({ error: 'Alumno no encontrado' }) }

    res.json({ materia })
  } catch (err) {
    console.error('(fetchMateria) Error al obtener la materia:', err)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

const createMateria = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      year
    } = req.body

    if (!nombre || !descripcion || !year) {
      return res.status(400).json({ error: 'Falta un campo' })
    }

    const materiaExistente = await Materia.findOne({ nombre })

    if (materiaExistente) {
      res.status(409).json({ error: 'Ya existe un alumno con ese DNI' })
    }

    const materia = await Materia.create({
      nombre,
      descripcion,
      year
    })

    res.json({ materia })
  } catch (err) {
    console.log('(createMateria) Error al crear alumno', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const updateMateria = async (req, res) => {
  try {
    const id = req.params.id

    const {
      nombre,
      descripcion,
      year
    } = req.body

    const materiaExistente = await Materia.findById(id)
    if (!materiaExistente) {
      return res.status(404).json({ error: 'No se ha encontrado el materia' })
    }

    await Materia.findByIdAndUpdate(id, { nombre, descripcion, year })

    const materia = await Materia.findById(id)

    res.json({ materia })
  } catch (err) {
    console.log('(updateMateria) Error al actualizar la materia:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteMateria = async (req, res) => {
  try {
    const id = req.params.id

    const materiaDel = await Materia.findById(id)

    if (!materiaDel) {
      return res.status(404).json({ error: 'No se ha encontrado la materia' })
    }

    if (materiaDel.curso) {
      const curso = await Curso.findById(materiaDel.curso)

      if (!curso) {
        return res.status(404).json({ error: 'No se ha encontrado el curso' })
      }

      curso.materias.pop({ _id: materiaDel._id })

      await curso.save()
    }

    const materia = await Materia.findByIdAndDelete(id)

    res.json({ success: `Se ha eliminado la materia ${materia.nombre}` })
  } catch (err) {
    console.log('(deleteMateria) Error al eliminar la materia', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteMaterias = async (req, res) => {
  try {
    const _ids = req.body._ids

    if (!Array.isArray(_ids) || _ids.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar un array de IDs valido' })
    }

    const materias = await Materia.deleteMany({ _id: { $in: _ids } })

    if (materias.deletedCount === 0) {
      res.status(404).json({ error: 'No se encontraron materias para eliminar' })
    }

    res.json({ success: `Se ha eliminado ${materias}` })
  } catch (err) {
    console.log('(deleteMaterias) Error al eliminar las materis', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = {
  fetchMaterias,
  fetchMateria,
  createMateria,
  updateMateria,
  deleteMateria,
  deleteMaterias
}
