const Alumno = require('../models/alumno')

const fetchAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find().populate('boletines')

    res.json({ alumnos })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const fetchAlumno = async (req, res) => {
  try {
    const id = req.params.id
    const alumno = await Alumno.findById(id)
      .populate('boletines')
      .populate({
        path: 'boletines',
        populate: [
          { path: 'curso', model: 'Curso' },
          { path: 'comision', model: 'Comision' },
          { path: 'materias', model: 'MateriaBoletin' },
          {
            path: 'materias',
            model: 'MateriaBoletin',
            populate: { path: 'materia', model: 'Materia' }
          }
        ]
      })

    res.json({ alumno })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const fetchAlumnoByDNI = async (req, res) => {
  try {
    const dni = req.params.dni
    const alumno = await Alumno.findOne({ dni })
    res.json({ alumno })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const createAlumno = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      edad,
      dni
    } = req.body

    const alumno = await Alumno.create({
      nombre,
      apellido,
      edad,
      dni,
      boletines: []
    })
    res.json({ alumno })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const updateAlumno = async (req, res) => {
  try {
    const id = req.params.id

    const {
      nombre,
      apellido,
      edad,
      dni,
      boletines
    } = req.body

    await Alumno.findByIdAndUpdate(id, {
      nombre,
      apellido,
      edad,
      dni,
      boletines
    })

    const alumno = await Alumno.findById(id)

    res.json({ alumno })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}

const deleteAlumno = async (req, res) => {
  try {
    const id = req.params.id

    const alumno = await Alumno.findByIdAndDelete(id)

    res.json({ success: `Se ha eliminado el alumno ${alumno.nombre}` })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}
const deleteAlumnos = async (req, res) => {
  try {
    const _ids = req.body._ids
    console.log(_ids)

    const alumnos = await Alumno.deleteMany({ _id: { $in: _ids } })

    res.json({ success: `Se ha eliminado el alumno ${alumnos}` })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
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
