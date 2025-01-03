const mongoose = require('mongoose')

const boletinSchema = new mongoose.Schema({
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso'
  },
  comision: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comision'
  },
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno'
  },
  year: String, // que curso
  materias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MateriaBoletin'
  }]
})

const Boletin = mongoose.model('Boletin', boletinSchema)

module.exports = Boletin
