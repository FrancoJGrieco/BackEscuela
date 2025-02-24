const Comision = require('../models/comision')
const Curso = require('../models/curso')

const fetchComisiones = async (req, res) => {
  try {
    const comisiones = await Comision.find()
      .populate('materias')
      .populate('alumnos')
      .populate('curso')

    res.json({ success: true, comisiones })
  } catch (err) {
    console.log('(fetchComisiones) Error al obtener comisiones:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const fetchComision = async (req, res) => {
  try {
    const id = req.params.id

    const comision = await Comision.findById(id)
      .populate('materias')
      .populate('alumnos')
      .populate('curso')

    if (!comision) {
      return res.status(404).json({ success: false, message: 'Comision no encontrada' })
    }

    res.json({ success: true, comision })
  } catch (err) {
    console.log('(fetchComision) Error al obtener comisiones:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
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
      return res.status(400).json({ success: false, message: 'Falta un campo' })
    }
    const comisionExistente = await Comision.findOne({ numero })

    if (comisionExistente) {
      return res.status(409).json({ success: false, message: 'Ya existe una comision con ese numero' })
    }

    const resCurso = await Curso.findById(curso).populate('materias')

    if (!resCurso) {
      return res.status(404).json({ success: false, message: 'No se ha encontrado el curso' })
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

    const comision = await Comision.findById(resComision._id)
      .populate('materias')
      .populate('curso')

    res.json({ success: true, comision })
  } catch (err) {
    console.log('(createComision) Error al crear comision', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
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
    console.log(numero, year, curso, alumnos)
    if (!comisionExistente) {
      return res.status(404).json({ success: false, message: 'No se ha encontrado la comision' })
    }

    const resCurso = await Curso.findById(curso).populate('materias')

    if (!resCurso) {
      return res.status(404).json({ success: false, message: 'No se ha encontrado el curso' })
    }

    const materiasYear = resCurso.materias
      .filter((materia) => materia.year === year)
      .map((materia) => materia._id)

    console.log('Materias:', materiasYear)

    await Comision.findByIdAndUpdate(id, { numero, year, curso, materias: materiasYear, alumnos })

    const comision = await Comision.findById(id)
      .populate('materias')
      .populate('alumnos')
      .populate('curso')

    res.json({ success: true, comision })
  } catch (err) {
    console.log('(updateComision) Error al actualizar la comision:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteComision = async (req, res) => {
  try {
    const id = req.params.id

    const comision = await Comision.findByIdAndDelete(id)

    if (!comision) {
      return res.status(404).json({ success: false, message: 'No se ha encontrado la comision' })
    }

    res.json({ success: true, message: `Se ha eliminado la comision ${comision.numero}` })
  } catch (err) {
    console.log('(deleteComision) Error al eliminar la comision', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteComisiones = async (req, res) => {
  try {
    const _ids = req.body._ids

    if (!Array.isArray(_ids) || _ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Debe proporcionar un array de IDs valido' })
    }

    const comisiones = await Comision.deleteMany({ _id: { $in: _ids } })

    if (comisiones.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No se encontraron comisiones para eliminar' })
    }

    res.json({ success: true, message: `Se han eliminado ${comisiones.deletedCount} comisiones` })
  } catch (err) {
    console.log('(deleteComisiones) Error al eliminar las comisiones', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
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
