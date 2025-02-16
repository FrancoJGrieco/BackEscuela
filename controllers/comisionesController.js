const Comision = require('../models/comision')
const Curso = require('../models/curso')

const fetchComisiones = async (req, res) => {
  try {
    const comisiones = await Comision.find()
      .populate('materias')
      .populate('alumnos')
      .populate('curso')

    res.json({ comisiones })
  } catch (err) {
    console.log('(fetchComisiones) Error al obtener comisiones:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const fetchComision = async (req, res) => {
  try {
    const id = req.params.id

    const comision = await Comision.findById(id)
      .populate('materias')
      .populate('alumnos')
      .populate('curso')

    if (!comision) { return res.status(404).json({ error: 'Comision no encontrada' }) }

    res.json({ comision })
  } catch (err) {
    console.log('(fetchComision) Error al obtener comisiones:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const createComision = async (req, res) => {
  try {
    const {
      numero,
      year,
      curso,
      alumnos
    } = req.body

    if (!numero || !year || !curso) {
      return res.status(400).json({ error: 'Falta un campo' })
    }

    const resCurso = await Curso.findById(curso).populate('materias')

    if (!resCurso) {
      res.status(404).json({ error: 'No se ha encontrado el curso' })
    }

    const materiasYear = resCurso.materias
      .filter((materia) => materia.year === year)
      .map((materia) => materia._id)

    const resComision = await Comision.create({
      numero,
      year,
      curso,
      materias: materiasYear,
      alumnos
    })

    const comisionExistente = await Comision.findOne({ numero })

    if (comisionExistente) {
      res.status(409).json({ error: 'Ya existe una comision con ese numero' })
    }

    const comision = await Comision.findById(resComision._id)
      .populate('materias')
      .populate('curso')

    res.json({ comision })
  } catch (err) {
    console.log('(createComision) Error al crear comision', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const updateComision = async (req, res) => {
  try {
    const id = req.params.id

    const {
      numero,
      year,
      curso,
      alumnos
    } = req.body

    const comisionExistente = await Comision.findById(id)
    if (!comisionExistente) {
      return res.status(404).json({ error: 'No se ha encontrado la comision' })
    }

    const resCurso = await Curso.findById(curso).populate('materias')

    if (!resCurso) {
      res.status(404).json({ error: 'No se ha encontrado el curso' })
    }

    const materiasYear = resCurso.materias
      .filter((materia) => materia.year === year)
      .map((materia) => materia._id)

    await Comision.findByIdAndUpdate(id, { numero, year, curso, materias: materiasYear, alumnos })

    const comision = await Comision.findById(id)
      .populate('materias')
      .populate('alumnos')
      .populate('curso')

    res.json({ comision })
  } catch (err) {
    console.log('(updateComision) Error al actualizar la comision:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteComision = async (req, res) => {
  try {
    const id = req.params.id

    const comision = await Comision.findByIdAndDelete(id)

    if (!comision) {
      return res.status(404).json({ error: 'No se ha encontrado la comision' })
    }

    res.json({ success: `Se ha eliminado la comision ${comision.numero}` })
  } catch (err) {
    console.log('(deleteComision) Error al eliminar la comision', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteComisiones = async (req, res) => {
  try {
    const _ids = req.body._ids

    if (!Array.isArray(_ids) || _ids.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar un array de IDs valido' })
    }

    const comisiones = await Comision.deleteMany({ _id: { $in: _ids } })

    if (comisiones.deletedCount === 0) {
      res.status(404).json({ error: 'No se encontraron comisiones para eliminar' })
    }

    res.json({ success: `Se han eliminado ${comisiones.deletedCount} comisiones` })
  } catch (err) {
    console.log('(deleteComisiones) Error al eliminar las comisiones', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = {
  fetchComisiones,
  fetchComision,
  createComision,
  updateComision,
  deleteComision,
  deleteComisiones
}
