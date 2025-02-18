const MateriaBoletin = require('../models/materiaBoletin')

const fetchMateriasBoletin = async (req, res) => {
  try {
    const materiasBoletin = await MateriaBoletin.find()
      .populate('materia')

    res.json({ materiasBoletin })
  } catch (err) {
    console.log('(fetchMateriasBoletin) Error al obtener materias del boletin:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const fetchMateriaBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const materiaBoletin = await MateriaBoletin.findById(id).populate('materia')

    if (!materiaBoletin) {
      res.status(404).json({ error: 'Materia del boletin no encontrado' })
      return
    }

    res.json({ materiaBoletin })
  } catch (err) {
    console.error('(fetchMateriaBoletin) Error al obtener la materia del boletin:', err)
    if (!res.headersSent) res.status(500).json({ message: 'Error interno del servidor' })
  }
}

const createMateriaBoletin = async (req, res) => {
  try {
    const {
      materia,
      notas
    } = req.body

    if (!materia) {
      res.status(400).json({ error: 'Falta un campo' })
      return
    }

    const materiaBoletin = await MateriaBoletin.create({
      boletin: null,
      materia,
      notas
    })

    console.log(materiaBoletin)

    await materiaBoletin.populate('materia')

    res.json({ materiaBoletin })
  } catch (err) {
    console.log('(createMateriaBoletin) Error al crear una materia en el boletin', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const updateMateriaBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const {
      boletin,
      materia,
      notas
    } = req.body

    const materiaBoletinExistente = await MateriaBoletin.findById(id)
    if (!materiaBoletinExistente) {
      res.status(404).json({ error: 'No se ha encontrado la materia del boletin' })
      return
    }

    await MateriaBoletin.findByIdAndUpdate(id, {
      boletin,
      materia,
      notas
    })

    const materiaBoletin = await MateriaBoletin.findById(id).populate('materia')

    res.json({ materiaBoletin })
  } catch (err) {
    console.log('(updateMateriaBoletin) Error al actualizar la materia del boletin:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteMateriaBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const materiaBoletin = await MateriaBoletin.findByIdAndDelete(id)

    if (!materiaBoletin) {
      res.status(404).json({ error: 'No se ha encontrado la materia del boletin' })
      return
    }

    res.json({ success: `Se ha eliminado la materia del boletin ${materiaBoletin._id}` })
  } catch (err) {
    console.log('(deleteMateriaBoletin) Error al eliminar la materia', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
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
