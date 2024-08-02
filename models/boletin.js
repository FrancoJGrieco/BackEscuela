const mongoose = require('mongoose')

const boletinSchema = new mongoose.Schema({
  curso: String,
  comision: String, // también se puede poner que la id solo devuelva el numero de la comisión
  year: String,
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno'
  },
  materias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MateriaBoletin'
  }]
})

const Boletin = mongoose.model('Boletin', boletinSchema)

module.exports = Boletin
