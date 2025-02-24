const mongoose = require('mongoose')

const materiaBoletinSchema = new mongoose.Schema({
  boletin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boletin'
  },
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia'
  },
  notas: [],
  promedio: String
})

const MateriaBoletin = mongoose.model('MateriaBoletin', materiaBoletinSchema)

module.exports = MateriaBoletin
