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
    console.log(err)
    res.sendStatus(400)
  }
}

const fetchComision = async (req, res) => {
  try {
    const id = req.params.id
    const comision = await Comision.findById(id)
      .populate('materias')
      .populate('alumnos')
      .populate('curso')
    res.json({ comision })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
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

    console.log(numero, year, curso, alumnos)

    const resCurso = await Curso.findById(curso).populate('materias')

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

    const comision = await Comision.findById(resComision._id).populate('materias').populate('curso')

    res.json({ comision })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
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

    const resCurso = await Curso.findById(curso).populate('materias')

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
    console.log(err)
    res.sendStatus(400)
  }
}

const deleteComision = async (req, res) => {
  try {
    const id = req.params.id

    const comision = await Comision.findByIdAndDelete(id)

    res.json({ success: `Se ha eliminado la comision ${comision.numero}` })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const deleteComisiones = async (req, res) => {
  try {
    const _ids = req.body._ids
    console.log(_ids)

    const comisiones = await Comision.deleteMany({ _id: { $in: _ids } })

    res.json({ success: `Se ha eliminado ${comisiones}` })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
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
