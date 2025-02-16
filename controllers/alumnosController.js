const Alumno = require('../models/alumno')

const fetchAlumnos = async (req, res) => {
  try {
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
    res.json({ alumnos })
  } catch (err) {
    console.log('(fetchAlumnos) Error al obtener alumnos:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
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

    if (!alumno) { return res.status(404).json({ error: 'Alumno no encontrado' }) }

    res.json({ alumno })
  } catch (err) {
    console.error('(fetchAlumno) Error al obtener el alumno:', err)
    res.status(500).json({ message: 'Error interno del servidor' })
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
      return res.status(400).json({ error: 'Falta un campo' })
    }

    const alumnoExistente = await Alumno.findOne({ dni })

    if (alumnoExistente) {
      res.status(409).json({ error: 'Ya existe un alumno con ese DNI' })
    }

    const alumno = await Alumno.create({
      dni,
      nombre,
      apellido,
      mail,
      nacimiento,
      boletines: []
    })

    res.json({ alumno })
  } catch (err) {
    console.log('(createAlumno) Error al crear alumno', err)
    res.status(500).json({ error: 'Error interno del servidor' })
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
      return res.status(404).json({ error: 'No se ha encontrado el alumno' })
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

    res.json({ alumno })
  } catch (err) {
    console.log('(updateAlumno) Error al actualizar el alumno:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const deleteAlumno = async (req, res) => {
  try {
    const id = req.params.id

    const alumno = await Alumno.findByIdAndDelete(id)

    if (!alumno) {
      return res.status(404).json({ error: 'No se ha encontrado el alumno' })
    }

    res.json({ success: `Se ha eliminado el alumno ${alumno.nombre}` })
  } catch (err) {
    console.log('(deleteAlumno) Error al eliminar el alumno', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
const deleteAlumnos = async (req, res) => {
  try {
    const _ids = req.body._ids

    if (!Array.isArray(_ids) || _ids.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar un array de IDs valido' })
    }

    const alumnos = await Alumno.deleteMany({ _id: { $in: _ids } })

    if (alumnos.deletedCount === 0) {
      res.status(404).json({ error: 'No se encontraron alumnos para eliminar' })
    }

    res.json({ success: `Se han eliminado ${alumnos.deletedCount} alumnos` })
  } catch (err) {
    console.log('(deleteAlumnos) Error al eliminar los alumnos', err)
    res.status(500).json({ error: 'Error interno del servidor' })
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
