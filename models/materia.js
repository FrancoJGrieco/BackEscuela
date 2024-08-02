const mongoose = require('mongoose')

const materiaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  year: String
})

const Materia = mongoose.model('Materia', materiaSchema)

module.exports = Materia
