const mongoose = require('mongoose')

const cursoSchema = new mongoose.Schema({
  titulatura: String,
  years: String,
  materias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia'
  }]
})

const Curso = mongoose.model('Curso', cursoSchema)

module.exports = Curso
