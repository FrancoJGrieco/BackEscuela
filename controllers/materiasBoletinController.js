const MateriaBoletin = require('../models/materiaBoletin')

const fetchMateriasBoletin = async (req, res) => {
  try {
    const materiasBoletin = await MateriaBoletin.find().populate('materia')

    res.json({ materiasBoletin })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const fetchMateriaBoletin = async (req, res) => {
  try {
    const id = req.params.id
    const materiaBoletin = await MateriaBoletin.findById(id).populate('materia')
    res.json({ materiaBoletin })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const createMateriaBoletin = async (req, res) => {
  try {
    const {
      materia,
      notas
    } = req.body

    const materiaBoletin = await MateriaBoletin.create({
      materia,
      notas
    })

    await materiaBoletin.populate('materia')

    res.json({ materiaBoletin })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const updateMateriaBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const {
      materia,
      notas
    } = req.body

    await MateriaBoletin.findByIdAndUpdate(id, {
      materia,
      notas
    })

    const materiaBoletin = await MateriaBoletin.findById(id).populate('materia')

    res.json({ materiaBoletin })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const deleteMateriaBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const materiaBoletin = await MateriaBoletin.findByIdAndDelete(id)

    res.json({ success: `Se ha eliminado el boletin ${materiaBoletin._id}` })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const errorPage = (req, res) => {
  res.send('<h1>404</h1><p>No se ha encontrado la página</p>')
}

module.exports = {
  fetchMateriasBoletin,
  fetchMateriaBoletin,
  createMateriaBoletin,
  updateMateriaBoletin,
  deleteMateriaBoletin,
  errorPage
}
