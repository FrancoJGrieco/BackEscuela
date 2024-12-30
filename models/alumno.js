const mongoose = require('mongoose')

const alumnoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  dni: String
})

const Alumno = mongoose.model('Alumno', alumnoSchema)

module.exports = Alumno
