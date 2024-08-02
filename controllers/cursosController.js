const Curso = require('../models/curso')

const fetchCursos = async (req, res) => {
  try {
    const cursos = await Curso.find().populate('materias')

    res.json({ cursos })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const fetchCurso = async (req, res) => {
  try {
    const id = req.params.id
    const curso = await Curso.findById(id).populate('materias')
    res.json({ curso })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const createCurso = async (req, res) => {
  try {
    const {
      titulatura,
      years
    } = req.body

    const curso = await Curso.create({
      titulatura,
      years,
      materias: []
    })
    res.json({ curso })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
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

    await Curso.findByIdAndUpdate(id, { titulatura, years, materias })

    const curso = await Curso.findById(id).populate('materias')

    res.json({ curso })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const deleteCurso = async (req, res) => {
  try {
    const id = req.params.id

    const curso = await Curso.findByIdAndDelete(id)

    res.json({ success: `Se ha eliminado la curso ${curso.titulatura}` })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

module.exports = {
  fetchCursos,
  fetchCurso,
  createCurso,
  updateCurso,
  deleteCurso
}
