const MateriaBoletin = require('../models/materiaBoletin')

const fetchMateriasBoletin = async (req, res) => {
  try {
    const materiasBoletin = await MateriaBoletin.find()
      .populate('materia')

    res.json({ materiasBoletin })
  } catch (err) {
    console.log('(fetchMateriasBoletin) Error al obtener materias del boletin:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const fetchMateriaBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const materiaBoletin = await MateriaBoletin.findById(id).populate('materia')

    if (!materiaBoletin) { return res.status(404).json({ error: 'Materia del boletin no encontrado' }) }

    res.json({ materiaBoletin })
  } catch (err) {
    console.error('(fetchMateriaBoletin) Error al obtener la materia del boletin:', err)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

const createMateriaBoletin = async (req, res) => {
  try {
    const {
      materia,
      notas
    } = req.body

    if (!materia) {
      return res.status(400).json({ error: 'Falta un campo' })
    }

    const materiaBoletin = await MateriaBoletin.create({
      materia,
      notas
    })

    await materiaBoletin.populate('materia')

    res.json({ materiaBoletin })
  } catch (err) {
    console.log('(createMateriaBoletin) Error al crear una materia en el boletin', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const updateMateriaBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const {
      materia,
      notas
    } = req.body

    const materiaBoletinExistente = await MateriaBoletin.findById(id)
    if (!materiaBoletinExistente) {
      return res.status(404).json({ error: 'No se ha encontrado la materia del boletin' })
    }

    await MateriaBoletin.findByIdAndUpdate(id, {
      materia,
      notas
    })

    const materiaBoletin = await MateriaBoletin.findById(id).populate('materia')

    res.json({ materiaBoletin })
  } catch (err) {
    console.log('(updateMateriaBoletin) Error al actualizar la materia del boletin:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteMateriaBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const materiaBoletin = await MateriaBoletin.findByIdAndDelete(id)

    if (!materiaBoletin) {
      return res.status(404).json({ error: 'No se ha encontrado la materia del boletin' })
    }

    res.json({ success: `Se ha eliminado la materia del boletin ${materiaBoletin._id}` })
  } catch (err) {
    console.log('(deleteMateriaBoletin) Error al eliminar la materia', err)
    res.status(500).json({ error: 'Error interno del servidor' })
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
