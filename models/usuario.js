const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  }
})
const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario
