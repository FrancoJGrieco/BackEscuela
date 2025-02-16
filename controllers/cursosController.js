const Curso = require('../models/curso')

const fetchCursos = async (req, res) => {
  try {
    const cursos = await Curso.find()
      .populate('materias')

    res.json({ cursos })
  } catch (err) {
    console.log('(fetchCursos) Error al obtener cursos:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const fetchCurso = async (req, res) => {
  try {
    const id = req.params.id

    const curso = await Curso.findById(id)
      .populate('materias')

    if (!curso) { return res.status(404).json({ error: 'Curso no encontrado' }) }

    res.json({ curso })
  } catch (err) {
    console.error('(fetchComision) Error al obtener el curso:', err)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

const createCurso = async (req, res) => {
  try {
    const {
      titulatura,
      years
    } = req.body

    if (!titulatura || !years) {
      return res.status(400).json({ error: 'Falta un campo' })
    }

    const cursoExistente = await Curso.findOne({ titulatura })

    if (cursoExistente) {
      res.status(409).json({ error: 'Ya existe un curso con esa titulatura' })
    }

    const curso = await Curso.create({
      titulatura,
      years,
      materias: []
    })

    res.json({ curso })
  } catch (err) {
    console.log('(createCurso) Error al crear curso', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const updateCurso = async (req, res) => {
  try {
    const id = req.params.id

    const {
      titulatura,
      years,
      materias
    } = req.body

    const cursoExistente = await Curso.findById(id)
    if (!cursoExistente) {
      return res.status(404).json({ error: 'No se ha encontrado el curso' })
    }

    await Curso.findByIdAndUpdate(id, { titulatura, years, materias })

    const curso = await Curso.findById(id)
      .populate('materias')

    res.json({ curso })
  } catch (err) {
    console.log('(updateCurso) Error al actualizar el curso:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteCurso = async (req, res) => {
  try {
    const id = req.params.id

    const curso = await Curso.findByIdAndDelete(id)

    if (!curso) {
      return res.status(404).json({ error: 'No se ha encontrado el curso' })
    }

    res.json({ success: `Se ha eliminado la curso ${curso.titulatura}` })
  } catch (err) {
    console.log('(deleteCurso) Error al eliminar el curso', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
const deleteCursos = async (req, res) => {
  try {
    const _ids = req.body._ids

    if (!Array.isArray(_ids) || _ids.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar un array de IDs valido' })
    }

    const cursos = await Curso.deleteMany({ _id: { $in: _ids } })

    if (cursos.deletedCount === 0) {
      res.status(404).json({ error: 'No se encontraron cursos para eliminar' })
    }

    res.json({ success: `Se han eliminado ${cursos.deletedCount} cursos` })
  } catch (err) {
    console.log('(deleteCursos) Error al eliminar los cursos', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = {
  fetchCursos,
  fetchCurso,
  createCurso,
  updateCurso,
  deleteCurso,
  deleteCursos
}
