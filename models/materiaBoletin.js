const mongoose = require('mongoose')

const materiaBoletinSchema = new mongoose.Schema({
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia'
  },
  notas: []
})

const MateriaBoletin = mongoose.model('MateriaBoletin', materiaBoletinSchema)

module.exports = MateriaBoletin
