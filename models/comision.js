const mongoose = require('mongoose')

const comisionSchema = new mongoose.Schema({
  numero: String,
  year: String,
  materias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia'
  }],
  alumnos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno'
  }]
})

const Comision = mongoose.model('Comision', comisionSchema)

module.exports = Comision
