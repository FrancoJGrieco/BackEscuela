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
    console.log(err)
    res.sendStatus(400)
  }
}

const createMateria = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      year
    } = req.body

    const materia = await Materia.create({
      nombre,
      descripcion,
      year
    })

    res.json({ materia })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
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

    await Materia.findByIdAndUpdate(id, { nombre, descripcion, year })

    const materia = await Materia.findById(id)

    res.json({ materia })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const deleteMateria = async (req, res) => {
  try {
    const id = req.params.id

    const materiaDel = await Materia.findById(id)

    if (materiaDel.curso) {
      const curso = await Curso.findById(materiaDel.curso)
      curso.materias.pop({ _id: materiaDel._id })
      await curso.save()
    }

    const materia = await Materia.findByIdAndDelete(id)

    res.json({ success: `Se ha eliminado la materia ${materia.nombre}` })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const deleteMaterias = async (req, res) => {
  try {
    const _ids = req.body._ids
    console.log(_ids)

    const materias = await Materia.deleteMany({ _id: { $in: _ids } })

    res.json({ success: `Se ha eliminado ${materias}` })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
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
