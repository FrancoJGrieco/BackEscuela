const mongoose = require('mongoose')

const alumnoSchema = new mongoose.Schema({
  dni: String,
  nombre: String,
  apellido: String,
  nacimiento: String,
  mail: String,
  boletines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boletin'
  }]
})

const Alumno = mongoose.model('Alumno', alumnoSchema)

module.exports = Alumno
