const Boletin = require('../models/boletin')

const fetchBoletines = async (req, res) => {
  try {
    const boletines = await Boletin.find()
      .populate('alumno')
      .populate('curso')
      .populate('comision')
      .populate({
        path: 'materias',
        populate: {
          path: 'materia',
          model: 'Materia'
        }
      })

    res.json({ success: true, boletines })
  } catch (err) {
    console.log('(fetchBoletines) Error al obtener alumnos:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const fetchBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const boletin = await Boletin.findById(id)
      .populate('alumno')
      .populate('comision')
      .populate('curso')
      .populate({
        path: 'materias',
        populate: {
          path: 'materia',
          model: 'Materia'
        }
      })

    if (!boletin) {
      return res.status(404).json({ success: false, message: 'Boletin no encontrado' })
    }

    res.json({ success: true, boletin })
  } catch (err) {
    console.error('(fetchBoletin) Error al obtener el boletin:', err)
    if (!res.headersSent) res.status(500).json({ message: 'Error interno del servidor' })
  }
}
const fetchBoletinAlumno = async (req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return res.status(400).json({ success: false, message: 'Se requiere un ID' })
    }

    const boletin = await Boletin.findOne({ alumno: id })
      .populate('alumno')
      .populate({
        path: 'materias',
        populate: {
          path: 'materia',
          model: 'Materia'
        }
      })

    if (!boletin) {
      return res.status(404).json({ success: false, message: 'No se ha encontrado el boletin' })
    }

    res.json({ success: true, boletin })
  } catch (err) {
    console.log('(fetchBoletinAlumno) Error al buscar boletin:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
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

    if (!curso || !comision || !year || !alumno || !materias) {
      return res.status(400).json({ success: false, message: 'Falta un campo' })
    }

    const boletinExistente = await Boletin.findOne({ alumno, comision })

    if (boletinExistente) {
      return res.status(409).json({ success: false, message: 'Ya existe un boletin con esa comision para ese alumno' })
    }

    const resBoletin = await Boletin.create({
      curso,
      comision,
      year,
      alumno,
      materias
    })

    const boletin = await Boletin.findById(resBoletin._id)
      .populate('materias')
      .populate('alumno')
      .populate('comision')
      .populate('curso')
      .populate({
        path: 'materias',
        populate: { path: 'materia' }
      })

    res.json({ success: true, boletin })
  } catch (err) {
    console.log('(createBoletin) Error al crear boletin', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
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

    const boletinExistente = await Boletin.findById(id)
    if (!boletinExistente) {
      return res.status(404).json({ success: false, message: 'No se ha encontrado el boletin' })
    }

    await Boletin.findByIdAndUpdate(id, {
      curso,
      comision,
      year,
      alumno,
      materias
    })

    const boletin = await Boletin.findById(id)
      .populate('materias')
      .populate('alumno')
      .populate('comision')
      .populate('curso')
      .populate({
        path: 'materias',
        populate: { path: 'materia' }
      })

    res.json({ success: true, boletin })
  } catch (err) {
    console.log('(updateBoletin) Error al actualizar el boletin:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteBoletin = async (req, res) => {
  try {
    const id = req.params.id

    const boletin = await Boletin.findByIdAndDelete(id)

    if (!boletin) {
      return res.status(404).json({ success: false, message: 'No se ha encontrado el boletin' })
    }

    res.json({ success: true, message: `Se ha eliminado el boletin ${boletin._id}` })
  } catch (err) {
    console.log('(deleteBoletin) Error al eliminar el boletin', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
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
