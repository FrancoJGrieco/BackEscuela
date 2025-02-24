const Alumno = require('../models/alumno')
const Boletin = require('../models/boletin')
const Comision = require('../models/comision')

const fetchAlumnos = async (req, res) => {
  try {
    console.log('hola')
    const alumnos = await Alumno.find()
      .populate({
        path: 'boletines',
        populate: [
          { path: 'curso', model: 'Curso' },
          { path: 'comision', model: 'Comision' },
          {
            path: 'materias',
            model: 'MateriaBoletin',
            populate: { path: 'materia', model: 'Materia' }
          }
        ]
      })
    res.json({ success: true, alumnos })
  } catch (err) {
    console.error('(fetchAlumnos) Error al obtener alumnos:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const fetchAlumno = async (req, res) => {
  try {
    const id = req.params.id

    const alumno = await Alumno.findById(id)
      .populate({
        path: 'boletines',
        populate: [
          { path: 'curso', model: 'Curso' },
          { path: 'comision', model: 'Comision' },
          {
            path: 'materias',
            model: 'MateriaBoletin',
            populate: { path: 'materia', model: 'Materia' }
          }
        ]
      })

    if (!alumno) {
      return res.status(404).json({ success: false, message: 'Alumno no encontrado' })
    }

    res.json({ success: true, alumno })
  } catch (err) {
    console.error('(fetchAlumno) Error al obtener el alumno:', err)
    if (!res.headersSent) res.status(500).json({ message: 'Error interno del servidor' })
  }
}

const fetchAlumnoByDNI = async (req, res) => {
  try {
    const dni = req.params.dni

    if (!dni) {
      return res.status(400).json({ success: false, message: 'Se requiere un DNI' })
    }

    const alumno = await Alumno.findOne({ dni })

    if (!alumno) {
      return res.status(404).json({ success: false, message: 'No se ha encontrado el alumno' })
    }

    res.json({ success: true, alumno })
  } catch (err) {
    console.log('(fetchAlumnoByDNI) Error al buscar alumno:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const createAlumno = async (req, res) => {
  try {
    const {
      dni,
      nombre,
      apellido,
      mail,
      nacimiento
    } = req.body

    if (!dni || !nombre || !apellido || !mail || !nacimiento) {
      return res.status(400).json({ success: false, message: 'Falta un campo' })
    }

    const alumnoExistente = await Alumno.findOne({ dni })

    if (alumnoExistente) {
      return res.status(409).json({ success: false, message: 'Ya existe un alumno con ese DNI' })
    }

    const alumno = await Alumno.create({
      dni,
      nombre,
      apellido,
      mail,
      nacimiento,
      boletines: []
    })

    res.json({ success: true, alumno })
  } catch (err) {
    console.log('(createAlumno) Error al crear alumno', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const updateAlumno = async (req, res) => {
  try {
    const id = req.params.id

    const {
      dni,
      nombre,
      apellido,
      mail,
      nacimiento,
      boletines
    } = req.body

    const alumnoExistente = await Alumno.findById(id)
    if (!alumnoExistente) {
      return res.status(404).json({ success: false, message: 'No se ha encontrado el alumno' })
    }

    await Alumno.findByIdAndUpdate(id, {
      dni,
      nombre,
      apellido,
      mail,
      nacimiento,
      boletines
    })

    const alumno = await Alumno.findById(id)

    res.json({ success: true, alumno })
  } catch (err) {
    console.log('(updateAlumno) Error al actualizar el alumno:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteAlumno = async (req, res) => {
  try {
    const id = req.params.id

    const alumno = await Alumno.findByIdAndDelete(id)

    if (!alumno) {
      return res.status(404).json({ success: false, message: 'No se ha encontrado el alumno' })
    }

    res.json({ success: true, message: `Se ha eliminado el alumno ${alumno.nombre}` })
  } catch (err) {
    console.log('(deleteAlumno) Error al eliminar el alumno', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}
const deleteAlumnos = async (req, res) => {
  try {
    const _ids = req.body._ids

    if (!Array.isArray(_ids) || _ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Debe proporcionar un array de IDs valido' })
    }

    const alumnosBoletines = await Alumno.find({ _id: { $in: _ids } })

    const alumnos = await Alumno.deleteMany({ _id: { $in: _ids } })

    if (alumnos.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No se encontraron alumnos para eliminar' })
    }

    await Comision.updateMany(
      { alumnos: { $in: _ids } },
      { $pull: { alumnos: { $in: _ids } } }
    )

    const boletinesIds = alumnosBoletines.flatMap(alumno => alumno.boletines)

    await Boletin.deleteMany({ _id: { $in: boletinesIds } })

    res.json({ success: true, message: `Se han eliminado ${alumnos.deletedCount} alumnos` })
  } catch (err) {
    console.log('(deleteAlumnos) Error al eliminar los alumnos', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const errorPage = (req, res) => {
  res.send('<h1>404</h1><p>No se ha encontrado la página</p>')
}

module.exports = {
  fetchAlumnos,
  fetchAlumno,
  fetchAlumnoByDNI,
  createAlumno,
  updateAlumno,
  deleteAlumno,
  deleteAlumnos,
  errorPage
}
