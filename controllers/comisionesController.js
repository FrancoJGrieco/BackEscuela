const Comision = require('../models/comision')

const fetchComisiones = async (req, res) => {
  try {
    const comisiones = await Comision.find().populate('materias').populate('alumnos')

    res.json({ comisiones })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const fetchComision = async (req, res) => {
  try {
    const id = req.params.id
    const comision = await Comision.findById(id).populate('materias')
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
      materias,
      alumnos
    } = req.body

    const comision = await Comision.create({
      numero,
      year,
      materias,
      alumnos
    })
    await comision.populate('materias')

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
      materias,
      alumnos
    } = req.body

    console.log(numero, year, materias, alumnos)

    await Comision.findByIdAndUpdate(id, { numero, year, materias, alumnos })

    const comision = await Comision.findById(id).populate('materias').populate('alumnos')

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

module.exports = {
  fetchComisiones,
  fetchComision,
  createComision,
  updateComision,
  deleteComision
}
