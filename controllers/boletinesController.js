const Boletin = require('../models/boletin')

const fetchBoletines = async (req, res) => {
  try {
    const boletines = await Boletin.find().populate('alumno')
      .populate({
        path: 'materias',
        populate: {
          path: 'materia',
          model: 'Materia'
        }
      })

    res.json({ boletines })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const fetchBoletin = async (req, res) => {
  try {
    const id = req.params.id
    // const boletin = await Boletin.findById(id).populate('materias').populate('alumno')

    const boletin = await Boletin.findById(id)
      .populate('alumno')
      .populate({
        path: 'materias',
        populate: {
          path: 'materia',
          model: 'Materia'
        }
      })
    res.json({ boletin })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}
const fetchBoletinAlumno = async (req, res) => {
  try {
    const id = req.params.id

    const boletin = await Boletin.findOne({ alumno: id })
      .populate('alumno')
      .populate({
        path: 'materias',
        populate: {
          path: 'materia',
          model: 'Materia'
        }
      })
    res.json({ boletin })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const createBoletin = async (req, res) => {
  try {
    const {
      curso,
      comision,
      year,
      alumno,
      materias
    } = req.body

    const boletin = await Boletin.create({
      curso,
      comision,
      year,
      alumno,
      materias
    })

    await boletin.populate('alumno')

    res.json({ boletin })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const updateBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const {
      curso,
      comision,
      year,
      alumno,
      materias
    } = req.body

    await Boletin.findByIdAndUpdate(id, {
      curso,
      comision,
      year,
      alumno,
      materias
    })

    const boletin = await Boletin.findById(id).populate('materias').populate('alumno').populate({ path: 'materias.materia' })

    res.json({ boletin })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const deleteBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const boletin = await Boletin.findByIdAndDelete(id)

    res.json({ success: `Se ha eliminado el boletin ${boletin._id}` })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const errorPage = (req, res) => {
  res.send('<h1>404</h1><p>No se ha encontrado la página</p>')
}

module.exports = {
  fetchBoletines,
  fetchBoletin,
  fetchBoletinAlumno,
  createBoletin,
  updateBoletin,
  deleteBoletin,
  errorPage
}
