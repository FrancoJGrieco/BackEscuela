const mongoose = require('mongoose')

const alumnoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  dni: String,
  boletines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boletin'
  }]
})

const Alumno = mongoose.model('Alumno', alumnoSchema)

module.exports = Alumno
